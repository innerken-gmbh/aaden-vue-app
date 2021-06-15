import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export async function previewZBon (startDate, endDate) {
  return (await hillo.get('ZBon.php?op=previewBySpan', { startDate, endDate })).content
}

export async function previewZBonByTimeSpan (startTime, endTime) {
  return (await hillo.get('ZBon.php?op=previewByTimeSpan', { startTime, endTime })).content
}

export async function printXBon (startDate, endDate) {
  return (await hillo.post('Complex.php?op=printSummary', {
    timespan: startDate + ' - ' + endDate
  })).content
}

export async function printZBon () {
  return (await hillo.post('ZBon.php?op=printZbon')).content
}

export async function printZBonUseDate (startDate, endDate, printByDay = 1, resetTable = 0) {
  return (await hillo.post('ZBon.php?op=printZbonBySpan',
    { startDate, endDate, printByDay, resetTable }))
}

export async function ZBonList () {
  return (await hillo.get('ZBon.php')).content
}

export async function acceptOrder (reason, id) {
  IKUtils.showLoading(true)
  await hillo.post('Orders.php?op=acceptTakeawayOrder', {
    tableId: id,
    reason: reason
  })
  IKUtils.toast('ok')
}

export async function previewServantSummary (pw, start, end) {
  return (await hillo.get('Servant.php?op=previewSummary', { pw, start, end })).content
}

export async function printServantSummary (pw, start, end) {
  return (await hillo.get('Servant.php?op=printSummaryBonByPassword', { pw, start, end })).content
}

export async function loadMemberCard () {
  return (await hillo.get('MemberCard.php?op=showAllMemberCardSaleRecord')).content
}

export async function checkOneMemberCard (longId) {
  return (await hillo.get('MemberCard.php?op=check', { id: longId, amount: 0 })).content
}

export async function renameMemberCard (oldName, newName) {
  return (await hillo.get('MemberCard.php?op=renameMemberCard', { old: oldName, new: newName }))
}

export async function getBillListForServant (pw, date) {
  return (await hillo.get('BackendData.php?op=mobileV3StatWithLang', { pw, date, lang: GlobalConfig.lang })).content
}
