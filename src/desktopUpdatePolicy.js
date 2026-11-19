// Windows 桌面版自动更新：什么时候能装、装没装上（POS-798）
// 这里只放纯函数，不碰 electron，方便单独测试；background.js 负责读写文件和调用 electron-updater。
//
// 规矩：
//   - 白天（营业时间）不弹提示、不自动装、不关收银
//   - 夜里 03:00–06:00、电脑 10 分钟没人操作时自动装；每晚最多试一次（失败后 12 小时内不再试）
//   - 右下角提示条也只在这个时段出现
//   - 开机 / 改设备号重开时顺便装：只在这个版本还没失败过时
//   - 同一个版本失败 2 次：不再显示提示条，只在夜里再自动试一次；失败 3 次：这个版本不再装，等下一个版本
//   - 店员自己关程序时 electron-updater 顺便装（reason = quit）的失败照样上报，但不算次数：那不是我们关的收银

export const QUIET_START_HOUR = 3
export const QUIET_END_HOUR = 6
export const PROMPT_MAX_FAILURES = 2
export const AUTO_MAX_FAILURES = 3
export const RETRY_AFTER_FAILURE_MS = 12 * 3600 * 1000

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

export function isQuietHour (date) {
  const h = date.getHours()
  return h >= QUIET_START_HOUR && h < QUIET_END_HOUR
}

/** 这个版本已经失败了几次（state 记的是别的版本就算 0） */
export function failuresFor (state, version) {
  return state && version && state.version === version ? (state.failures || 0) : 0
}

/** 右下角提示条：只在夜里，且这个版本失败不到 2 次 */
export function canPrompt (state, version, now) {
  return !!version && isQuietHour(now) && failuresFor(state, version) < PROMPT_MAX_FAILURES
}

/** 店员在提示条上点了「立即更新」 */
export function canInstallOnRequest (state, version) {
  return !!version && failuresFor(state, version) < PROMPT_MAX_FAILURES
}

/** 程序本来就要重开（开机、改设备号）时顺便装：只在这个版本还没失败过时 */
export function canInstallOnRestart (state, version) {
  return !!version && failuresFor(state, version) === 0
}

/** 夜里空闲自动装 */
export function canAutoInstall (state, version, now) {
  if (!version || !isQuietHour(now)) return false
  if (failuresFor(state, version) >= AUTO_MAX_FAILURES) return false
  const lastFailureAt = state && state.version === version ? state.lastFailureAt : null
  return !lastFailureAt || now.getTime() - lastFailureAt >= RETRY_AFTER_FAILURE_MS
}

/** 失败 3 次以后，连「关程序时顺便装」也停掉 */
export function gaveUp (state, version) {
  return failuresFor(state, version) >= AUTO_MAX_FAILURES
}

/** 要启动安装器了：记下从哪个版本装到哪个版本、为什么装 */
export function recordAttempt (state, { from, to, reason, at }) {
  const same = state && state.version === to
  return {
    version: to,
    failures: same ? (state.failures || 0) : 0,
    lastFailureAt: same ? (state.lastFailureAt || null) : null,
    attempt: { from, reason, at }
  }
}

/**
 * 启动时对一下上次的安装：当前版本不比目标旧就是装上了。
 * 返回 { state: 新的状态（null 表示可以删掉），outcome: null | { ok, from, to, reason, failures } }
 */
export function resolveAttempt (state, currentVersion, now) {
  if (!state || !state.attempt) {
    return { state, outcome: null }
  }
  const { from, reason } = state.attempt
  if (notOlder(currentVersion, state.version)) {
    return { state: null, outcome: { ok: true, from, to: currentVersion, reason, failures: state.failures || 0 } }
  }
  const counted = reason !== 'quit'
  const failures = (state.failures || 0) + (counted ? 1 : 0)
  return {
    state: {
      version: state.version,
      failures,
      lastFailureAt: counted ? now.getTime() : (state.lastFailureAt || null),
      attempt: null
    },
    outcome: { ok: false, from, to: state.version, reason, failures, counted }
  }
}

/** 安装助手写的结果：「exit=0 killed=0 relaunched=0 waited=1」或「exit=-1 skipped=1 waited=20」，只留认识的字段 */
export function parseInstallResult (text) {
  const fields = {}
  String(text || '').replace(/(exit|skipped|killed|relaunched|waited)=(-?\d+)/g, (m, k, v) => {
    fields[k] = v
    return m
  })
  return fields
}

export function formatOutcome (outcome, result, extra = '') {
  const r = Object.keys(result).length
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
// 1. 等收银程序完全退出，20 秒还没退就强制结束（安装器发现程序还开着会直接放弃）。
//    店员自己关程序时顺便装的（没有 --force-run）不强制结束：20 秒后程序还开着，说明店员又打开了，这次就不装
// 2. 运行安装器，记下退出码
// 3. 装完要自动打开（--force-run）但 8 秒后程序没起来，说明没装上：把原来的程序重新打开，别让收银一直关着
// 4. 结果写进 AADEN_RESULT，下次启动时读出来报到云端
// 不用 timeout 命令：没有控制台输入时它会直接报错退出，改用 ping 等待
export const INSTALL_HELPER_SCRIPT = [
  '@echo off',
  'rem Aaden Desktop update helper (POS-798)',
  'setlocal',
  'set KILLED=0',
  'set RELAUNCHED=0',
  'set /a WAITED=0',
  ':wait',
  'tasklist /FI "IMAGENAME eq %AADEN_EXE%" /NH 2>nul | find /I "%AADEN_EXE%" >nul',
  'if errorlevel 1 goto install',
  'if %WAITED% GEQ 20 goto timeout',
  'set /a WAITED+=1',
  'ping -n 2 127.0.0.1 >nul',
  'goto wait',
  ':timeout',
  'if not "%AADEN_FORCE_RUN%"=="1" goto skip',
  'taskkill /F /T /IM "%AADEN_EXE%" >nul 2>&1',
  'set KILLED=1',
  'ping -n 3 127.0.0.1 >nul',
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
  '> "%AADEN_RESULT%" echo exit=-1 skipped=1 waited=%WAITED%',
  'goto end',
  ':done',
  '> "%AADEN_RESULT%" echo exit=%RC% killed=%KILLED% relaunched=%RELAUNCHED% waited=%WAITED%',
  ':end',
  ''
].join('\r\n')
