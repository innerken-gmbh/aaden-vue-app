import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import IKUtils from 'innerken-js-utils'

export function checkVersion (version, target) {
  const [main, sub, patch] = version.split('.').map(c => parseInt(c))

  const [mainT, subT, patchT] = target.split('.').map(c => parseInt(c))

  return main === mainT && (sub > subT || (sub === subT && patch >= patchT))
}

export async function update () {
  (await hillo.get('MyVersion.php?op=update'))
  IKUtils.hideLoading()
  return await checkCurrentVersion()
}

export async function getCurrentBackendVersion () {
  return (await hillo.get('MyVersion.php?op=version', {}, {
    mode: 'no-cors'
  })).version
}

export async function checkCurrentVersion () {
  try {
    const currentVersion = await getCurrentBackendVersion()
    console.log(currentVersion, '当前后台版本')
    console.log(GlobalConfig.requiredBackendVersion, '需求后台版本')
    GlobalConfig.backendIsOk = checkVersion(currentVersion, GlobalConfig.requiredBackendVersion)

    if (!GlobalConfig.backendIsOk) {
      throw new Error()
    }
    return currentVersion
  } catch (e) {
    IKUtils.showError('Deine Backend Version ist zu alt. Bitte Aaden Support kontakt und Upgrade', 'Achtung')
  }
}
