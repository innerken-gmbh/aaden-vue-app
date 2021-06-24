import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import IKUtils from 'innerken-js-utils'

export function checkVersion (version, target) {
  const [main, sub, patch] = version.split('.').map(c => parseInt(c))

  const [mainT, subT, patchT] = target.split('.').map(c => parseInt(c))

  return main === mainT && (sub > subT || (sub === subT && patch >= patchT))
}

export async function update () {
  setTimeout(() => IKUtils.hideLoading(0), 30000)
  await hillo.get('MyVersion.php?op=update')
  IKUtils.toast('update ok')
  if (!await checkCurrentVersion()) {
    IKUtils.showError('Automatisch Update felher.', 'Bitte update Sie manual')
  }
}

export async function getCurrentBackendVersion () {
  return (await hillo.get('MyVersion.php?op=version', {}, {
    mode: 'no-cors'
  })).version
}

export async function checkCurrentVersionAndUpdate () {
  const versionOk = await checkCurrentVersion(false)
  if (!versionOk) {
    IKUtils.showLoading(false)
    update()
  }
}

export async function checkCurrentVersion (slient = false) {
  try {
    const currentVersion = await getCurrentBackendVersion()
    console.log(currentVersion, '当前后台版本')
    console.log(GlobalConfig.requiredBackendVersion, '需求后台版本')
    GlobalConfig.backendIsOk = checkVersion(currentVersion, GlobalConfig.requiredBackendVersion)
    return GlobalConfig.backendIsOk
  } catch (e) {
    if (!slient) {
      IKUtils.showError('Deine Backend Version ist zu alt. Bitte Aaden Support kontakt und Upgrade', 'Achtung')
    }
    return false
  }
}
