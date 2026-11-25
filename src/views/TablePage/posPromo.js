import Vue from 'vue'
import IKUtils from 'innerken-js-utils'
import i18n from '@/i18n'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { dishIdOf, findDishById } from '@/oldjs/StaticModel'
import { DishDocker } from 'aaden-base-model'
import { posMenuPromotions, posQuote } from '@/api/posPromotions'
import { cloudDeviceId } from '@/api/cloudJson'

/**
 * 收银台活动（POS-1106，和快消版 antelope、跑堂手机 POS-1105 一个口径）：收银员加的菜按「收银台」渠道的活动算价。
 * 购物车每变一次，防抖 0.3 秒发给云端 pos-quote，拿回门店 PHP 能吃的行；收银机不自己算折扣。
 * 购物车本身（cartListModel）不改，报价结果是另一份「算好价的行」：购物车显示、下单都用它。
 *
 * - 每行按它自己的用餐方式取活动：外带桌整单外带，堂食桌上换成外带的行（overrideConsumeTypeId=2）按外带，其余堂食。
 *   按用餐方式分组，每组单独报价（套餐、满减只在同一组里凑），结果合回来；收银员的选择（取消活动、赠品、换购）也按组记。
 * - 云端说这家店没配收银台活动（posPromotionsConfigured=false：没开扫码、门店还有本地折扣规则、后端太老、不含税模式），
 *   或者云端还没有这个接口（404）：什么都不显示，照原来的方式下单，门店本地折扣规则照旧，10 分钟内不再问；下单也不等报价。
 * - 配了但这次没拿到（断网、超时、5xx，或 available=false）：显示「活动暂不可用」，按原价卖，每行写 "0.00"
 *   （不让门店再套本地折扣规则），已经选好的换购按原价、赠品按 0 元一起提交（下单前问一句），不拦下单。
 */

export const IN_HOUSE = 'IN_HOUSE'
export const TAKEAWAY = 'TAKEAWAY'

const DEBOUNCE_MS = 300
/** 下单前最多等报价这么久：防抖 0.3 秒 + 一次报价超时 5 秒（两组并行），再留一点余量 */
const AWAIT_MS = 7000
const SKIP_MS = 10 * 60 * 1000
const BADGE_TTL_MS = 5 * 60 * 1000
const CONFIGURED_KEY = 'posPromotionsDevice'
/** 这几种原因云端回 posPromotionsConfigured=false：退回本地折扣规则，整块隐藏、不显示离线 */
const LOCAL_FALLBACK_REASONS = ['QUICK_ORDER_NOT_ENABLED', 'BACKEND_TOO_OLD', 'TAX_EXCLUSIVE', 'LOCAL_DISCOUNT_RULES']

/** 界面要跟着变的状态 */
export const posPromoState = Vue.observable({
  /** 配了活动，但这一次报价没拿到 */
  offline: false,
  /** 选择变了、结果变了时加一，让界面重算 */
  version: 0,
  /** 赠品 / 换购选择弹窗：{ type, promotion } */
  picker: null,
  /** 菜单角标：菜 id → { price, originalPrice, promotions } */
  menuBadges: {}
})

/** 每组（每种用餐方式）的报价：{ signature, result } */
let results = {}
/** 每组收银员的选择 */
let selections = {}
let lastLines = []
let tableConsumeTypeId = 1
let timer = null
let running = null
let skipUntil = 0
let badgesKey = null
/** 每次购物车变化加一：报价回来时不是最新的就丢掉，旧结果不会冲掉新的 */
let quoteSeq = 0
const dishFormatter = DishDocker.StandardDishesListFactory()
let badgesAt = 0

function bump () {
  posPromoState.version++
}

function now () {
  return Date.now()
}

export function promoLang () {
  const l = (i18n.locale || 'de').slice(0, 2).toLowerCase()
  return ['de', 'en', 'zh'].includes(l) ? l : 'de'
}

/** 上一次云端说这家店（这个设备号）配了收银台活动；存在本机，重启后断网也按「配了」写 "0.00" */
export function storeHasPosPromotions () {
  const device = String(GlobalConfig.DeviceId ?? '')
  return device !== '' && device !== '-1' && localStorage.getItem(CONFIGURED_KEY) === device
}

function setConfigured (value) {
  if (value === storeHasPosPromotions()) return
  if (value) localStorage.setItem(CONFIGURED_KEY, String(GlobalConfig.DeviceId))
  else localStorage.removeItem(CONFIGURED_KEY)
}

function selectionsOf (type) {
  if (!selections[type]) selections[type] = { optOut: new Set(), gifts: new Map(), declinedGifts: new Set(), addOns: new Map() }
  return selections[type]
}

/** 四舍五入到分；加一点点余量，避开 2.675 * 100 = 267.49999… 这类浮点误差 */
function round2 (v) {
  const n = Number(v) || 0
  return Math.sign(n) * Math.round(Math.abs(n) * 100 + 1e-7) / 100
}

/** 减额写成两位小数的数字串（"15.00"），和云端给的 tempDiscountStr 一个格式 */
function twoDecimals (v) {
  return round2(v).toFixed(2)
}

/** 购物车一行的 id：DishDocker 给每行的自增 hash，这一行在购物车里一直不变 */
export function lineId (line) {
  return 'L' + line.hash
}

/** 这一行按哪种用餐方式取活动：外带桌整单外带，堂食桌上按这一行自己的（换成外带的是 2） */
export function typeOf (line) {
  return parseInt(line.overrideConsumeTypeId ?? tableConsumeTypeId) === 2 ? TAKEAWAY : IN_HOUSE
}

function isFreeDish (line) {
  return line.isFree === true || line.isFree === '1' || line.isFree === 1
}

/** 一份的单价 = 菜价 + 规格加价（含税）；免费菜的菜价按 0 算（只收规格加价），和 DishDocker、跑堂手机一样 */
function unitPrice (line) {
  const base = isFreeDish(line) ? 0 : Number(line.originPrice ?? line.price ?? 0)
  return round2(base + Number(line.addPrice ?? 0))
}

/** 原价就是 0 的行（免费菜、0 元菜）：「隐藏免费菜」只藏这些 */
export function originallyFree (row) {
  return isFreeDish(row) || unitPrice(row) === 0
}

/**
 * 按菜 id 从本机菜单找菜，规格照云端的 apply（[{groupId, selectId: [...]}]）挑出来，套成购物车行的样子
 * （displayApply、addPrice 等由 DishDocker 算）。本机菜单没有这道菜返回 null
 */
function menuDish (dishId, apply = []) {
  const dish = findDishById(dishId)
  if (!dish) return null
  const copy = IKUtils.deepCopy(dish)
  copy.apply = (apply ?? []).map(a => {
    const group = (copy.modInfo ?? []).find(m => String(m.id) === String(a.groupId))
    if (!group) return null
    const ids = [a.selectId].flat().filter(id => id != null).map(String).filter(id => (group.selectValue ?? []).includes(id))
    return ids.length ? { ...group, groupId: group.id, selectId: ids } : null
  }).filter(a => a)
  copy.count = 1
  return dishFormatter.formatList([copy])[0]
}

function isPfand (line) {
  return parseInt(line.isPfandDish ?? 0) === 1
}

/**
 * 发给云端算价的行：没手动打折、不是押金，数量 1–99、单价不是负数（押金退回这类行云端会整单 400）。
 * 不发的行原样提交，配了活动时写 "0.00"
 */
function eligible (line) {
  return !line.tempDiscountStr && !isPfand(line) && line.count >= 1 && line.count <= 99 && unitPrice(line) >= 0
}

function groupsOf (lines) {
  const groups = {}
  lines.filter(eligible).forEach(l => {
    const t = typeOf(l)
    ;(groups[t] = groups[t] || []).push(l)
  })
  return groups
}

function buildRequest (type, lines) {
  const s = selections[type]
  return {
    consumeType: type,
    lang: promoLang(),
    lines: lines.map(l => ({
      lineId: lineId(l),
      dishId: String(dishIdOf(l)),
      qty: l.count,
      attributeIds: (l.apply ?? []).flatMap(a => (a.selectId ?? []).map(String)),
      unitPrice: unitPrice(l)
    })),
    addOns: s ? [...s.addOns.values()].map(a => a.input) : [],
    gifts: s ? [...s.gifts.values()] : [],
    declinedGiftPromotionIds: s ? [...s.declinedGifts] : [],
    optOutLineIds: s ? [...s.optOut] : []
  }
}

/** 购物车显示时会重新排序，签名和行的顺序无关 */
function signature (request) {
  return JSON.stringify({ ...request, lang: '', lines: [...request.lines].sort((a, b) => a.lineId.localeCompare(b.lineId)), optOutLineIds: [...request.optOutLineIds].sort() })
}

/** 购物车变了，或者用餐方式变了：[consumeTypeId] 是这一桌（这张单）的消费类型 */
export function onCartChanged (lines, consumeTypeId) {
  lastLines = [...lines]
  tableConsumeTypeId = consumeTypeId ?? 1
  clearTimeout(timer)
  const seq = ++quoteSeq
  running = new Promise(resolve => {
    timer = setTimeout(() => {
      quote(seq).catch(e => {
        if (seq !== quoteSeq) return
        console.warn('POS quote failed', e)
        results = {}
        posPromoState.offline = storeHasPosPromotions()
        bump()
      }).finally(resolve)
    }, DEBOUNCE_MS)
  })
}

function requote () {
  onCartChanged(lastLines, tableConsumeTypeId)
}

async function quote (seq) {
  const groups = groupsOf(lastLines)
  if (Object.keys(groups).length === 0) {
    results = {}
    posPromoState.offline = false
    bump()
    return
  }
  if (!storeHasPosPromotions() && now() < skipUntil) return
  // 两种用餐方式的报价一起发，最长也只等一次超时
  const answers = await Promise.all(Object.entries(groups).map(async ([type, lines]) => {
    const request = buildRequest(type, lines)
    let res = null
    try {
      res = await posQuote(request)
    } catch (e) {
      // 老云端还没有这个接口：当成没配，10 分钟内不再问
      if (e?.code === 'HTTP_404') res = { available: false, reasonCode: 'NOT_FOUND', posPromotionsConfigured: false }
    }
    return { type, request, res }
  }))
  // 等报价期间购物车又变了：这是旧请求的结果，丢掉（新的那次会自己算）
  if (seq !== quoteSeq) return
  apply(answers)
}

/** 记下这次报价的结果（每组一个）。只按 posPromotionsConfigured 判断退不退回本地规则；有一组没拿到就整单按离线 */
function apply (answers) {
  const configured = answers.filter(a => a.res).map(a => a.res.posPromotionsConfigured ?? (a.res.available || !LOCAL_FALLBACK_REASONS.includes(a.res.reasonCode)))
  const groups = groupsOf(lastLines)
  const mapped = {}
  answers.forEach(({ type, request, res }) => {
    mapped[type] = res?.available && mapRows(type, res, groups[type] ?? []) ? { signature: signature(request), result: res } : null
  })
  results = {}
  if (configured.some(c => !c)) {
    setConfigured(false)
    posPromoState.offline = false
    skipUntil = now() + SKIP_MS
  } else if (Object.values(mapped).some(m => m == null)) {
    // 没拿到（断网、available=false），或者返回的行对不回购物车：整单按离线，不用这次的 rows
    if (configured.some(c => c)) setConfigured(true)
    posPromoState.offline = storeHasPosPromotions()
  } else {
    setConfigured(true)
    posPromoState.offline = false
    results = mapped
  }
  bump()
}

/** 下单前：配了活动的店等正在跑的报价（最多 AWAIT_MS），还是对不上就显示离线、按离线提交。没配的店不等 */
export async function awaitFresh (lines) {
  if (!storeHasPosPromotions()) return
  if (running) await Promise.race([running, new Promise(resolve => setTimeout(resolve, AWAIT_MS))])
  if (storeHasPosPromotions() && !posPromoState.offline && !fresh(lines) && Object.keys(groupsOf(lines)).length > 0) {
    posPromoState.offline = true
    bump()
  }
}

/** 每一组都有对得上当前购物车的报价 */
function fresh (lines) {
  const groups = groupsOf(lines)
  const types = Object.keys(groups)
  return types.length > 0 && types.every(t => results[t]?.signature === signature(buildRequest(t, groups[t])))
}

/** 界面上要不要显示活动那一套（分组、凑单提示、已优惠） */
export function promoActive () {
  return storeHasPosPromotions() && !posPromoState.offline && Object.keys(results).length > 0
}

/** 离线下单前要问一句：已经选好了换购或赠品（换购按原价、赠品按 0 元提交） */
export function offlineWithExtras () {
  return storeHasPosPromotions() && posPromoState.offline && Object.values(selections).some(s => s.addOns.size > 0 || s.gifts.size > 0)
}

/** 新开一单 / 下单完 / 清空购物车：选择和报价都清掉 */
export function resetPosPromo () {
  clearTimeout(timer)
  quoteSeq++
  running = null
  results = {}
  selections = {}
  lastLines = []
  posPromoState.picker = null
  posPromoState.offline = false
  bump()
}

// ---------------------------------------------------------------- 算好价的行

/**
 * 算好价的一项：[source] 购物车原行（赠品 / 换购那一份为空），[base] 显示和提交用的菜（原行或菜单里的菜），
 * [count] 份数，[fields] 提交给门店的活动字段，[display] 只给界面用的
 */
function entry (base, source, count, fields, display) {
  return { base, source, count, fields, display }
}

function labelFor (labels, fallback) {
  const l = labels?.[promoLang()]
  return l && String(l).trim() ? l : (fallback ?? '')
}

function fieldsOf (type, row, unsyncedIds = []) {
  const own = (row.promotions ?? []).find(p => p.key && p.key === row.instanceKey) ??
    (row.promotions ?? []).find(p => p.layer === 'ITEM') ??
    (row.promotions ?? []).find(p => p.kind === 'ORDER_ADD_ON' || p.kind === 'ORDER_GIFT')
  const hasOwn = row.instanceKey != null || row.label != null || own != null
  const groupKey = row.instanceKey ?? own?.key ?? (row.promotionId != null ? 'p' + row.promotionId : null)
  return {
    fields: {
      tempDiscountStr: row.tempDiscountStr || '0.00',
      promotionKey: row.instanceKey ?? null,
      promotionLabel: row.promotionLabel ?? null,
      promotionLabels: row.promotionLabels ?? null,
      orderPromotions: (row.orderPromotions ?? []).length ? row.orderPromotions : null,
      // 只有参加了活动的行（有实例号）才写行类型，普通行不写，门店照原来按菜合并
      promotionRowKind: row.instanceKey ? (row.kind ?? null) : null
    },
    display: {
      // 两组可能有同一个实例号（各自从 1 数）：组号带上用餐方式，分组显示不串
      promoGroupKey: groupKey ? type + '/' + groupKey : null,
      promoLabel: hasOwn ? labelFor(row.promotionLabels, row.label ?? own?.label) : null,
      promoOptedOut: row.passthrough === 'OPT_OUT',
      // 云端镜像菜价和本机不一样：减额按本机价调整过，行上提示一下
      promoUnsynced: !!row.priceUnsynced || unsyncedIds.includes(String(row.dishesId)),
      quoteType: type,
      extraKind: row.lineIds?.length ? null : (row.kind ?? null)
    }
  }
}

/** 触发活动的那一行：这一组里最后加的那一行（让这一组凑满条件的那一行），赠品 / 换购跟着它的用餐方式和来源标记 */
function triggerOf (group) {
  return group.length ? group[group.length - 1] : null
}

function inheritFields (group) {
  const t = triggerOf(group)
  return t ? { overrideConsumeTypeId: t.overrideConsumeTypeId ?? null, sourceMark: t.sourceMark ?? null } : {}
}

/** 一组的行映射回购物车原行。每条原行分到的份数合计必须等于它自己的份数，对不上返回 null（整单按离线） */
function mapRows (type, result, lines) {
  const byId = {}
  lines.forEach(l => { byId[lineId(l)] = l })
  const addOns = selections[type]?.addOns ?? new Map()
  const unsyncedIds = (result.unsyncedDishIds ?? []).map(String)
  const used = {}
  const out = []
  for (const row of result.rows ?? []) {
    const { fields, display } = fieldsOf(type, row, unsyncedIds)
    if (!row.lineIds?.length) {
      // 赠品那一份：购物车里没有原行，按 dishesId 找菜、照云端的 apply 挑规格造一行（本机菜单里找不到这道菜就不显示这一份）
      const dish = menuDish(row.dishesId, row.apply)
      if (!dish) continue
      out.push(entry(dish, null, row.count, { ...fields, ...inheritFields(lines) }, display))
      continue
    }
    let left = row.count
    for (const id of row.lineIds) {
      const source = byId[id]
      const extra = addOns.get(id)
      if (!source && !extra) continue
      const capacity = (source ? source.count : 1) - (used[id] ?? 0)
      const take = Math.min(left, capacity)
      if (take <= 0) continue
      out.push(source
        ? entry(source, source, take, fields, { ...display, sourceLineId: id })
        : entry(extra.dish, null, take, { ...fields, ...inheritFields(lines) }, { ...display, sourceLineId: id, extraKind: 'ADD_ON' }))
      used[id] = (used[id] ?? 0) + take
      left -= take
    }
    if (left > 0) return null
  }
  if (Object.entries(byId).some(([id, l]) => (used[id] ?? 0) !== l.count)) return null
  return out
}

/** 不报价、按原价的行：配了活动时写 "0.00"（不让门店再套本地折扣规则） */
function plainEntries (lines) {
  return lines.map(l => entry(l, l, l.count, l.tempDiscountStr ? {} : { tempDiscountStr: '0.00' }, { sourceLineId: lineId(l), quoteType: typeOf(l) }))
}

/** 整单离线：原价 + "0.00"，再把已经选好的换购（按原价）和赠品（按 0 元）一起提交，不悄悄丢掉。只在整单离线时补 */
function offlineEntries (lines) {
  const extras = []
  Object.entries(selections).forEach(([type, s]) => {
    const group = lines.filter(l => typeOf(l) === type)
    if (!group.length) return
    s.addOns.forEach((a, id) => {
      extras.push(entry(a.dish, null, a.input.qty, { tempDiscountStr: '0.00', promotionRowKind: 'ADD_ON', ...inheritFields(group) }, { sourceLineId: id, quoteType: type, extraKind: 'ADD_ON' }))
    })
    s.gifts.forEach(g => {
      const dish = menuDish(g.dishId)
      if (!dish) return
      // 赠品按 0 元：每份减额就是它的单价
      // 离线补交的赠品 / 换购没有实例号，也写上行类型：门店和「隐藏免费菜」都认得出这是活动的行（#88 复审）
      extras.push(entry(dish, null, 1, { tempDiscountStr: twoDecimals(unitPrice(dish)), promotionRowKind: 'GIFT', ...inheritFields(group) }, { quoteType: type, giftPromotionId: g.promotionId, extraKind: 'GIFT' }))
    })
  })
  return plainEntries(lines).concat(extras)
}

/** 算好价的各项；没配活动时为 null（照原来的方式）。算的时候出错按离线（原价、0.00），不让购物车整个画不出来 */
function pricedEntries (lines) {
  if (!storeHasPosPromotions()) return null
  try {
    return computeEntries(lines)
  } catch (e) {
    console.warn('POS priced rows failed', e)
    try {
      return plainEntries(lines)
    } catch (e2) {
      return null
    }
  }
}

function computeEntries (lines) {
  if (posPromoState.offline || !fresh(lines)) return offlineEntries(lines)
  const groups = groupsOf(lines)
  const out = []
  for (const [type, ls] of Object.entries(groups)) {
    const mapped = mapRows(type, results[type].result, ls)
    if (!mapped) return offlineEntries(lines)
    out.push(...mapped)
  }
  // 没送去算价的行（押金、手动打折）只写 "0.00"，换购和赠品已经在 rows 里了，不再补
  return out.concat(plainEntries(lines.filter(l => !eligible(l))))
}

/**
 * 购物车显示用的行：没配活动就是购物车原样；配了就是算好价的行。每一行是购物车原行的代理（原型是原行）：
 * 加减、改规格这些调的 change / edit 都落回原行，备注也写回原行；价格和活动字段用算好的
 */
export function pricedRows (lines) {
  // eslint-disable-next-line no-unused-expressions
  posPromoState.version
  const entries = pricedEntries(lines)
  if (!entries) return null
  try {
    return entries.map((e, i) => toRow(e, i))
  } catch (e) {
    console.warn('POS priced rows failed', e)
    return null
  }
}

function toRow (e, i) {
  const row = Object.create(e.base)
  const discount = Number(e.fields.tempDiscountStr ?? 0) || 0
  const unit = unitPrice(e.base)
  Object.assign(row, e.fields, e.display, {
    count: e.count,
    sumCount: e.count,
    tempDiscountMod: e.fields.tempDiscountStr != null ? -discount : (e.base.tempDiscountMod ?? 0),
    // 有减额时实收不会低于 0（比如赠品带了加价规格、减额按菜价算）
    realPrice: e.fields.tempDiscountStr != null
      ? (discount > 0 ? Math.max(0, round2(unit - discount)) : round2(unit - discount))
      : round2(unit + Number(e.base.tempDiscountMod ?? 0)),
    promoRowKey: (e.display.sourceLineId ?? 'x') + ':' + i,
    promoSource: e.source,
    promoExtra: e.source == null
  })
  if (e.source) {
    Object.defineProperty(row, 'note', {
      get: () => e.source.note,
      set: v => { Vue.set(e.source, 'note', v) },
      enumerable: true,
      configurable: true
    })
    // 购物车原行参加了活动（或者取消了活动）：可以取消 / 恢复这一行的活动
    if (row.promoGroupKey || row.promoOptedOut) row.promoToggle = () => toggleOptOut(row)
  } else {
    // 赠品 / 换购那一份：菜单里的菜，没有 change / edit；减一份、删掉都是去掉这份
    row.haveMod = 0
    row.change = n => { if (n < 0) removeExtraRow(row) }
  }
  return row
}

/** 客显（Firebase）用的行：算好价的行摊平成普通对象（折后价、赠品、换购都在），去掉函数和购物车原行的引用 */
export function customerDisplayRows (rows) {
  return rows.map(r => {
    const flat = Object.assign({}, Object.getPrototypeOf(r), r)
    delete flat.promoSource
    delete flat.promoToggle
    delete flat.change
    delete flat.edit
    return flat
  })
}

/** 下单提交给门店的行：没配活动就是购物车原样；配了就是算好价的行（每行带减额和活动字段） */
export function submitPayload (lines) {
  const entries = pricedEntries(lines)
  if (!entries) return lines
  return entries.map(e => {
    const plain = IKUtils.deepCopy(e.base)
    delete plain.change
    delete plain.edit
    return Object.assign(plain, e.fields, { count: e.count, sumCount: e.count })
  })
}

// ---------------------------------------------------------------- 收银员操作

/** 取消 / 恢复这一行（购物车原行）的活动：客人不要这个活动 */
export function toggleOptOut (row) {
  const id = row.sourceLineId
  if (!id || !row.promoSource) return
  const s = selectionsOf(row.quoteType ?? typeOf(row.promoSource))
  if (s.optOut.has(id)) s.optOut.delete(id)
  else s.optOut.add(id)
  requote()
}

/** 赠品 / 换购弹窗选好了 */
export function pick (target, choice) {
  const { type, promotion } = target
  const s = selectionsOf(type)
  const dish = menuDish(choice.dishId)
  if (promotion.kind === 'ORDER_ADD_ON') {
    if (!dish) return
    const id = `A${promotion.promotionId}-${choice.dishId}`
    s.addOns.set(id, {
      dish,
      input: { lineId: id, promotionId: promotion.promotionId, dishId: String(choice.dishId), qty: 1, attributeIds: [], unitPrice: unitPrice(dish) }
    })
  } else {
    s.declinedGifts.delete(promotion.promotionId)
    s.gifts.set(promotion.promotionId, { promotionId: promotion.promotionId, dishId: String(choice.dishId), code: choice.code, attributeIds: [], unitPrice: dish ? unitPrice(dish) : null })
  }
  posPromoState.picker = null
  requote()
}

/** 「不要赠品」/「不换购」 */
export function decline (target) {
  const { type, promotion } = target
  if (promotion.kind !== 'ORDER_ADD_ON') {
    const s = selectionsOf(type)
    s.gifts.delete(promotion.promotionId)
    s.declinedGifts.add(promotion.promotionId)
    requote()
  }
  posPromoState.picker = null
}

/** 赠品 / 换购那一行减一份：去掉这份。是这种行返回 true */
export function removeExtraRow (row) {
  if (!row.promoExtra) return false
  const type = row.quoteType
  const s = selections[type]
  if (!s) return false
  if (row.extraKind === 'ADD_ON') {
    if (!row.sourceLineId || !s.addOns.delete(row.sourceLineId)) return false
    requote()
    return true
  }
  if (row.extraKind === 'GIFT') {
    const pid = row.giftPromotionId ??
      results[type]?.result?.promotions?.find(p => p.instanceKey === row.promotionKey)?.promotionId ??
      [...s.gifts.values()].find(g => String(g.dishId) === String(dishIdOf(row)))?.promotionId
    if (pid == null) return false
    s.gifts.delete(pid)
    s.declinedGifts.add(pid)
    requote()
    return true
  }
  return false
}

// ---------------------------------------------------------------- 显示用

/** 凑单提示：最多 3 条，后端挑的那条在最前，能直接操作的（领赠品、换购）其次，再按离达成最近 */
export function nudges () {
  // eslint-disable-next-line no-unused-expressions
  posPromoState.version
  if (!promoActive()) return []
  const candidates = []
  Object.entries(results).forEach(([type, q]) => {
    ;(q.result.promotions ?? []).forEach(p => {
      const ok = (p.state === 'PARTIAL' || p.state === 'NOT_MET') ? ((p.missingUnits ?? 0) > 0 || Number(p.missingAmount ?? 0) > 0)
        : p.state === 'UNCLAIMED' ? (p.kind === 'ORDER_GIFT' && (p.choices ?? []).length > 0)
          : p.state === 'AVAILABLE' ? (p.kind === 'ORDER_ADD_ON' && (p.choices ?? []).length > 0 && ![...(selections[type]?.addOns?.values() ?? [])].some(a => a.input.promotionId === p.promotionId))
            : false
      if (ok) candidates.push({ type, promotion: p, nudgeKey: q.result.nudge })
    })
  })
  const rank = c => [
    c.nudgeKey && c.promotion.instanceKey === c.nudgeKey ? 0 : 1,
    c.promotion.state === 'UNCLAIMED' || c.promotion.state === 'AVAILABLE' ? 0 : 1,
    c.promotion.missingUnits ?? Number.MAX_SAFE_INTEGER
  ]
  return candidates.sort((a, b) => {
    const ra = rank(a)
    const rb = rank(b)
    for (let i = 0; i < ra.length; i++) if (ra[i] !== rb[i]) return ra[i] - rb[i]
    return 0
  }).slice(0, 3)
}

/** 还有赠品可领没领：下单前提醒一次 */
export function unclaimedGift () {
  if (!promoActive()) return null
  for (const [type, q] of Object.entries(results)) {
    const p = (q.result.promotions ?? []).find(p => p.kind === 'ORDER_GIFT' && p.state === 'UNCLAIMED' && (p.choices ?? []).length > 0)
    if (p) return { type, promotion: p }
  }
  return null
}

/** 有一组的镜像价和本机价对不上 */
export function priceUnsynced () {
  // eslint-disable-next-line no-unused-expressions
  posPromoState.version
  return promoActive() && Object.values(results).some(q => q.result.priceUnsynced)
}

export function promotionName (p) {
  return labelFor(p.labels, p.label ?? p.name)
}

// ---------------------------------------------------------------- 菜单角标

/**
 * 进点菜页、切换用餐方式、换语言时读一次菜单角标（同一个设备、用餐方式、语言 5 分钟内不重读）。
 * 没配的店照报价的规矩 10 分钟内不问；读不到（断网、老云端没有这个接口）就保留上一次的、下次再读
 */
export async function loadMenuBadges (takeaway) {
  let device
  try {
    // 刚打开收银时本机还没读过设备号：先读一次（读过就是缓存）
    device = String(await cloudDeviceId())
  } catch (e) {
    return
  }
  const type = takeaway ? TAKEAWAY : IN_HOUSE
  const key = `${device}/${type}/${promoLang()}`
  if (key === badgesKey && now() - badgesAt < BADGE_TTL_MS) return
  if (!storeHasPosPromotions() && now() < skipUntil) return
  let res
  try {
    res = await posMenuPromotions(type, promoLang())
  } catch (e) {
    return
  }
  badgesKey = key
  badgesAt = now()
  const map = {}
  if (res?.available) (res.dishes ?? []).forEach(d => { map[String(d.dishId)] = d })
  posPromoState.menuBadges = map
  // 口径和 pos-quote 一样：顺便记下这家店配没配收银台活动，没配的 10 分钟内不再问
  if (res?.posPromotionsConfigured != null) setConfigured(res.posPromotionsConfigured)
  if (res?.posPromotionsConfigured === false) skipUntil = now() + SKIP_MS
}

// ---------------------------------------------------------------- 分组（购物车和已下的单共用）

function parseJson (v) {
  if (v == null || v === '') return null
  if (typeof v === 'object') return v
  try {
    return JSON.parse(v)
  } catch (e) {
    return null
  }
}

/** 这一行的活动分组：{ key, label }；没参加活动、取消了活动为 null。购物车的算好价的行和已下的单（门店读回来的行）都认 */
export function promoGroupOf (row) {
  if (row.promoOptedOut) return null
  if (row.promoGroupKey) return row.promoLabel ? { key: row.promoGroupKey, label: row.promoLabel } : null
  const own = row.promotionKey || (row.promotionLabel ? 'label:' + row.promotionLabel : null)
  if (!own) return null
  // 实例号每次报价都从 1 数，外带和堂食各报各的：分组带上这一行的用餐方式，两组同号的不并在一起
  const key = (row.overrideConsumeTypeId ?? '') + '/' + own
  return { key, label: labelFor(parseJson(row.promotionLabels), row.promotionLabel) || row.promotionLabel || '' }
}

/** 这一行分到的满减（每份），给分组省了多少时减掉 */
function orderPart (row) {
  return (parseJson(row.orderPromotions) ?? []).reduce((a, op) => a + (Number(op.amount) || 0), 0)
}

/**
 * 这一行的活动被收银员手动打折盖掉了：减额不再是一个数（比如按比例 "10p"），或者比满减分摊还少。
 * 满减合计不算这些行，和快消版一样
 */
export function manuallyOverridden (row) {
  const s = String(row.tempDiscountStr ?? '')
  if (s === '') return false
  if (!/^\d+(\.\d+)?$/.test(s)) return true
  return Number(s) < orderPart(row)
}

/** 一组省了多少：原价 − 实收（和行上划线价同一个算法），满减分摊那部分另外显示 */
export function groupSaved (rows) {
  return round2(rows.reduce((a, r) => a + ((-(Number(r.tempDiscountMod) || 0)) - orderPart(r)) * (Number(r.count ?? r.sumCount) || 0), 0))
}

/** 满减：按活动名合计总减额 [{ label, amount }]，按出现的顺序；被手动打折盖掉的行不算 */
export function orderPromotionTotals (rows) {
  const totals = new Map()
  rows.filter(r => !manuallyOverridden(r)).forEach(r => {
    ;(parseJson(r.orderPromotions) ?? []).forEach(op => {
      const amount = Number(op.amount)
      const key = op.key ?? op.label
      if (!key || !amount) return
      const prev = totals.get(key)
      totals.set(key, { label: labelFor(op.labels, op.label), amount: round2((prev?.amount ?? 0) + amount * (Number(r.count ?? r.sumCount) || 0)) })
    })
  })
  return [...totals.values()].filter(t => t.amount !== 0)
}
