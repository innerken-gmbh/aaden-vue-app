import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import IKUtils from 'innerken-js-utils'
import i18n from '../i18n'

export async function update () {
  await hillo.get('MyVersion.php?op=update', {}, { timeout: 100000 })
  // IKUtils.toast('loading ok')
  if (!await checkCurrentVersion()) {
    // IKUtils.showError(i18n.t('Automatisches Update fehler.'), i18n.t('AadenSupport'))
  }
}

export async function getCurrentBackendVersion () {
  return (await hillo.get('MyVersion.php?op=version', {}, {
    mode: 'no-cors'
  })).version
}

export function checkVersion (version, target) {
  const [main, sub, patch] = version.split('.').map(c => parseInt(c))

  const [mainT, subT, patchT] = target.split('.').map(c => parseInt(c))

  return main === mainT && (sub > subT || (sub === subT && patch >= patchT))
}

export async function checkCurrentVersion (slient = false) {
  try {
    const currentVersion = await getCurrentBackendVersion()
    console.log(currentVersion, '当前后台版本')
    console.log(GlobalConfig.requiredBackendVersion, '需求后台版本')
    GlobalConfig.backendIsOk = checkVersion(currentVersion, GlobalConfig.requiredBackendVersion)
    return GlobalConfig.backendIsOk
  } catch (e) {
    IKUtils.showError(i18n.t('BackendOutdatedErrorMessage'), i18n.$t('Notice'))
    GlobalConfig.backendIsOk = true
    return true
  }
}
