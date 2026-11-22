// Windows 桌面版自动更新：什么时候能装、装没装上（POS-798）
// 这里只放纯函数，不碰 electron，方便单独测试；background.js 负责读写文件和调用 electron-updater。
//
// 规矩：
//   - 店里空闲时自动装，白天也装（很多店晚上关电脑，只在夜里装永远轮不到）。空闲 = 同时满足：
//       1. 电脑 10 分钟没人碰（键盘、鼠标、触屏）
//       2. 收银页面不在点单页（/table），结账框、接单框、密码框都没开
//       3. 门店服务器上没有未结的桌（夜里 03:00–06:00 不看这一条：那时还开着的多半是忘了结的桌，重开收银也不丢单）
//     第 2、3 条由页面回答；页面没回答、或者问不到门店服务器（白天），就当作不空闲，不装
//   - 右下角提示条：这个版本失败不到 2 次就显示，店员可以自己挑时间点「立即更新」
//   - 开机 / 改设备号重开时顺便装（程序本来就要重开）
//   - 失败了不放弃，退避重试：空闲自动装在第 1 次失败后隔 1 小时、第 2 次后隔 4 小时、第 3 次起每 24 小时试一次，一直试下去。
//     有更新的版本出来，失败次数和退避从头算
//   - 失败 2 次以后：不再弹提示条；开机 / 改设备号重开时也要等退避时间到了才顺便装
//   - 下载好的新版本 3 天还没装上（不管是一直装失败，还是一直等不到空闲），报一条 DESKTOP_UPDATE_STUCK，之后每天报一次，
//     让客服去人工处理，免得这台机器一直停在旧版本、慢慢和云端脱节。装上了就清掉
//   - 不算失败次数的：店员自己关程序时 electron-updater 顺带的安装（reason = quit），
//     以及店员点更新 / 开机 / 重开时安装助手发现程序又被打开、这次没装（skipped）。照样上报。
//     空闲自动装（idle / night）时的 skipped 要算：那时没人在用，多半是残留进程，不算的话每 11 分钟就会再关一次收银
//   - 上一次安装还没有结果时，不开始新的安装（免得两个安装器撞在一起）

export const NIGHT_START_HOUR = 3
export const NIGHT_END_HOUR = 6
export const IDLE_INSTALL_MIN_IDLE_SECONDS = 10 * 60
export const PROMPT_MAX_FAILURES = 2
/** 空闲自动装的退避：第 n 次失败后隔多久再试，超过的都按最后一个（每天一次） */
export const RETRY_BACKOFF_MS = [1 * 3600 * 1000, 4 * 3600 * 1000, 24 * 3600 * 1000]
/** 下载好的新版本这么久还没装上，就报 DESKTOP_UPDATE_STUCK */
export const STUCK_REPORT_AFTER_MS = 3 * 24 * 3600 * 1000
/** DESKTOP_UPDATE_STUCK 之后每隔这么久再报一次 */
export const STUCK_REPORT_EVERY_MS = 24 * 3600 * 1000
/** 记下安装后这么久还没结果、版本也没变，就当安装助手还在跑：先别下结论，也别开始新的安装 */
export const ATTEMPT_IN_PROGRESS_MS = 3 * 60 * 1000

export function parseVersion (v) {
  return String(v || '').split('.').map(n => parseInt(n, 10) || 0)
}

/** a 比 b 新 */
export function newerVersion (a, b) {
  const pa = parseVersion(a)
  const pb = parseVersion(b)
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0)
  }
  return false
}

/** a 不比 b 旧 */
export function notOlder (a, b) {
  return !newerVersion(b, a)
}

/** 夜里 03:00–06:00 */
export function isNightHour (date) {
  const h = date.getHours()
  return h >= NIGHT_START_HOUR && h < NIGHT_END_HOUR
}

/** 这个版本已经失败了几次（state 记的是别的版本就算 0） */
export function failuresFor (state, version) {
  return state && version && state.version === version ? (state.failures || 0) : 0
}

/** 上一次安装还没有结果 */
export function attemptPending (state) {
  return !!(state && state.attempt)
}

/** 右下角提示条：这个版本失败不到 2 次 */
export function canPrompt (state, version) {
  return !!version && !attemptPending(state) && failuresFor(state, version) < PROMPT_MAX_FAILURES
}

/** 店员在提示条上点了「立即更新」 */
export function canInstallOnRequest (state, version) {
  return !!version && !attemptPending(state) && failuresFor(state, version) < PROMPT_MAX_FAILURES
}

/** 程序本来就要重开（开机、改设备号）时顺便装：失败不到 2 次，或者退避时间到了（开机时还没人用，正好装） */
export function canInstallOnRestart (state, version, now) {
  if (!version || attemptPending(state)) return false
  return failuresFor(state, version) < PROMPT_MAX_FAILURES || canAutoInstall(state, version, now)
}

/** 第 failures 次失败后，要隔多久才能再空闲自动装 */
export function retryDelay (failures) {
  if (!failures) return 0
  return RETRY_BACKOFF_MS[Math.min(failures, RETRY_BACKOFF_MS.length) - 1]
}

/** 按失败次数（退避），现在能不能空闲自动装（不管店里忙不忙，那个看 idleInstallReason）。不放弃，一直重试 */
export function canAutoInstall (state, version, now) {
  if (!version || attemptPending(state)) return false
  const failures = failuresFor(state, version)
  const lastFailureAt = state && state.version === version ? state.lastFailureAt : null
  if (!failures || !lastFailureAt) return true
  return now.getTime() - lastFailureAt >= retryDelay(failures)
}

/**
 * 店里现在空不空，能不能关掉收银去装。返回安装原因 'idle' / 'night'，不能装返回 null。
 *   idleSeconds：电脑多久没人碰（powerMonitor.getSystemIdleTime）
 *   pos：页面的回答 { busy, openTables }，没回答传 null。
 *        busy = 在点单页，或者结账框 / 接单框 / 密码框开着、正在确认堂食开桌；openTables = 门店服务器上未结的桌数，问不到是 null
 */
export function idleInstallReason (idleSeconds, pos, now) {
  if (!(idleSeconds >= IDLE_INSTALL_MIN_IDLE_SECONDS) || !pos || pos.busy !== false) return null
  if (pos.openTables === 0) return 'idle'
  return isNightHour(now) ? 'night' : null
}

/** 关程序时让 electron-updater 顺带装：没有正在进行的安装就装 */
export function canInstallOnQuit (state) {
  return !attemptPending(state)
}

/** 「新版本下载好了还没装上」从什么时候开始算：跨版本保留，装上了才清掉 */
function stuckFields (state) {
  return {
    pendingVersion: (state && state.pendingVersion) || null,
    pendingSince: (state && state.pendingSince) || null,
    stuckReportedAt: (state && state.stuckReportedAt) || null
  }
}

/** 要启动安装器了：记下从哪个版本装到哪个版本、为什么装 */
export function recordAttempt (state, { from, to, reason, at }) {
  const same = state && state.version === to
  return {
    version: to,
    failures: same ? (state.failures || 0) : 0,
    lastFailureAt: same ? (state.lastFailureAt || null) : null,
    attempt: { from, reason, at },
    ...stuckFields(state)
  }
}

/** 下载好了比当前新的版本：开始算「多久没装上」（已经在算就不动，换了更新的版本也接着算） */
export function notePendingUpdate (state, version, now) {
  if (state && state.pendingSince) {
    return state.pendingVersion === version ? state : { ...state, pendingVersion: version }
  }
  return { version: null, failures: 0, lastFailureAt: null, attempt: null, ...state, pendingVersion: version, pendingSince: now.getTime(), stuckReportedAt: null }
}

/** 启动时：已经是 pendingVersion 或更新的版本了（比如手动重装过），清掉「多久没装上」 */
export function clearPendingIfInstalled (state, currentVersion) {
  if (!state || !state.pendingVersion || !notOlder(currentVersion, state.pendingVersion)) return state
  return { ...state, pendingVersion: null, pendingSince: null, stuckReportedAt: null }
}

/** 该不该报 DESKTOP_UPDATE_STUCK：新版本下载好 3 天还没装上，之后每天一次 */
export function shouldReportStuck (state, now) {
  if (!state || !state.pendingSince) return false
  const t = now.getTime()
  if (t - state.pendingSince < STUCK_REPORT_AFTER_MS) return false
  return !state.stuckReportedAt || t - state.stuckReportedAt >= STUCK_REPORT_EVERY_MS
}

export function formatStuck (state, currentVersion, now) {
  const days = Math.floor((now.getTime() - state.pendingSince) / (24 * 3600 * 1000))
  const since = new Date(state.pendingSince).toISOString().slice(0, 10)
  const failures = failuresFor(state, state.pendingVersion)
  return `DESKTOP_UPDATE_STUCK ${currentVersion} -> ${state.pendingVersion} not installed for ${days} days (since ${since}), failures=${failures}`
}

/**
 * 启动时对一下上次的安装。
 *   result：安装助手的结果（parseInstallResult 的返回值），还没有就传 null
 *   final：不再等结果了（等够了时间）
 * 返回 { state, outcome, pending }：
 *   - 当前版本不比目标旧：装上了，state = null（可以删掉，「多久没装上」也一起清掉）
 *   - 没装上、没结果、刚装不久、也不是 final：pending = true，state 不变（安装助手可能还在跑）
 *   - 没装上：算一次失败（reason = quit 的不算；skipped 只在空闲自动装 idle / night 时算）
 */
export function resolveAttempt (state, currentVersion, result, now, final = false) {
  if (!state || !state.attempt) {
    return { state, outcome: null, pending: false }
  }
  const { from, reason, at } = state.attempt
  if (notOlder(currentVersion, state.version)) {
    return {
      state: null,
      outcome: { ok: true, from, to: currentVersion, reason, failures: state.failures || 0 },
      pending: false
    }
  }
  if (!result && !final && now.getTime() - (at || 0) < ATTEMPT_IN_PROGRESS_MS) {
    return { state, outcome: null, pending: true }
  }
  const skipped = !!(result && result.skipped === '1')
  const counted = reason !== 'quit' && (!skipped || reason === 'idle' || reason === 'night')
  const failures = (state.failures || 0) + (counted ? 1 : 0)
  return {
    state: {
      version: state.version,
      failures,
      lastFailureAt: counted ? now.getTime() : (state.lastFailureAt || null),
      attempt: null,
      ...stuckFields(state)
    },
    outcome: { ok: false, from, to: state.version, reason, failures, counted },
    pending: false
  }
}

/** 安装助手写的结果：「exit=0 killed=0 relaunched=0 waited=1」或「exit=-1 skipped=1 waited=20」，只留认识的字段 */
export function parseInstallResult (text) {
  if (!text) return null
  const fields = {}
  String(text).replace(/(exit|skipped|killed|relaunched|waited)=(-?\d+)/g, (m, k, v) => {
    fields[k] = v
    return m
  })
  return Object.keys(fields).length ? fields : null
}

export function formatOutcome (outcome, result, extra = '') {
  const r = result
    ? Object.entries(result).map(([k, v]) => `${k}=${v}`).join(' ')
    : 'exit=none'
  if (outcome.ok) {
    return `DESKTOP_UPDATE_INSTALLED ${outcome.from} -> ${outcome.to} ${outcome.reason} ${r}${extra}`
  }
  const count = outcome.counted === false ? 'uncounted' : `#${outcome.failures}`
  return `DESKTOP_UPDATE_INSTALL_FAILED ${outcome.from} -> ${outcome.to} ${outcome.reason} ${count} ${r}${extra}`
}

/** 把参数拼进 cmd 命令行：有空格或 cmd 特殊字符就加引号（和 Node 直接 spawn 时安装器收到的一样） */
export function quoteArg (arg) {
  const s = String(arg)
  return /^[\w\-.:\\/=+@#~]+$/.test(s) ? s : `"${s.replace(/"/g, '')}"`
}

// 安装助手（cmd 脚本，只含 ASCII；路径都从环境变量传进来，中文/德语用户名也没问题）：
// 1. 按进程号等收银主进程退出。要装完自动打开的（--force-run，是我们主动关的收银）20 秒还没退就按进程号强制结束；
//    店员自己关程序时顺带装的（没有 --force-run）不强制结束，这次不装
//    （不用 taskkill /T：安装助手是收银主进程起的，/T 会把助手自己也结束掉）
// 2. 主进程退了以后，最多再等 5 秒让它的子进程也退干净；这时还看到收银程序，说明店员又打开了（或者有残留进程），这次不装。
//    是我们主动关的就再 start 一次：店员已经打开了的话，单实例锁会让新起的直接退出，只把原来的窗口拉到前面；残留进程的话收银也能回来
// 3. 运行安装器，记下退出码
// 4. 要装完自动打开，但 8 秒后程序没起来，说明没装上：把原来的程序重新打开，别让收银一直关着
// 5. 结果写进 AADEN_RESULT，下次启动时读出来报到云端
// 不用 timeout 命令：没有控制台输入时它会直接报错退出，改用 ping 等待
export const INSTALL_HELPER_SCRIPT = [
  '@echo off',
  'rem Aaden Desktop update helper (POS-798)',
  'setlocal DisableDelayedExpansion',
  'set KILLED=0',
  'set RELAUNCHED=0',
  'set /a WAITED=0',
  'set /a REST=0',
  ':wait',
  'tasklist /FI "PID eq %AADEN_PID%" /NH 2>nul | find "%AADEN_PID%" >nul',
  'if errorlevel 1 goto gone',
  'if %WAITED% GEQ 20 goto timeout',
  'set /a WAITED+=1',
  'ping -n 2 127.0.0.1 >nul',
  'goto wait',
  ':timeout',
  'if not "%AADEN_FORCE_RUN%"=="1" goto skip',
  'taskkill /F /PID %AADEN_PID% >nul 2>&1',
  'set KILLED=1',
  ':gone',
  'tasklist /FI "IMAGENAME eq %AADEN_EXE%" /NH 2>nul | find /I "%AADEN_EXE%" >nul',
  'if errorlevel 1 goto install',
  'if %REST% GEQ 5 goto skip',
  'set /a REST+=1',
  'ping -n 2 127.0.0.1 >nul',
  'goto gone',
  ':install',
  '"%AADEN_CMD%" %AADEN_ARGS%',
  'set RC=%ERRORLEVEL%',
  'if not "%AADEN_FORCE_RUN%"=="1" goto done',
  'ping -n 9 127.0.0.1 >nul',
  'tasklist /FI "IMAGENAME eq %AADEN_EXE%" /NH 2>nul | find /I "%AADEN_EXE%" >nul',
  'if not errorlevel 1 goto done',
  'set RELAUNCHED=1',
  '> "%AADEN_RESULT%" echo exit=%RC% killed=%KILLED% relaunched=%RELAUNCHED% waited=%WAITED%',
  'start "" "%AADEN_APP%"',
  'goto end',
  ':skip',
  'if "%AADEN_FORCE_RUN%"=="1" set RELAUNCHED=1',
  '> "%AADEN_RESULT%" echo exit=-1 skipped=1 killed=%KILLED% relaunched=%RELAUNCHED% waited=%WAITED%',
  'if "%AADEN_FORCE_RUN%"=="1" start "" "%AADEN_APP%"',
  'goto end',
  ':done',
  '> "%AADEN_RESULT%" echo exit=%RC% killed=%KILLED% relaunched=%RELAUNCHED% waited=%WAITED%',
  ':end',
  ''
].join('\r\n')
