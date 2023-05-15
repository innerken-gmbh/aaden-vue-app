import hillo from 'hillo'
import i18n from '@/i18n'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import router from '@/router'

export async function getBaseAndUrlForDeviceId (deviceId) {
  const url = (await findDeviceInSaaSSystem(deviceId))
    ?.baseUrl ?? getNgrokUrl(deviceId)
  return {
    deviceId,
    url
  }
}
export async function findDeviceInSaaSSystem (deviceId) {
  return (await hillo.jsonPost('http://3.73.120.210:8083/virtualDevice/search', { deviceId: deviceId })).data?.[0]
}

export function getNgrokUrl (deviceId) {
  return `${location.protocol}//ik${deviceId.padStart(4, '0')}.ngrok.aaden.io`
}

export async function getInfoForDeviceId (deviceId) {
  const { url } = await getBaseAndUrlForDeviceId(deviceId)
  try {
    return (await hillo.get(url + '/PHP/Restaurant.php?op=view')).content[0]
  } catch (e) {
    // return {name: "店内主机未连接网络", adress1: "无法读取该店铺数据" + counter++}
    return {
      name: i18n.t('Shop_net_error'),
      adress1: i18n.t('cant_get_data') + ':' + deviceId,
      broken: true
    }
  }
}

export async function resetBaseUrl (deviceId) {
  const { url } = await getBaseAndUrlForDeviceId(deviceId)
  GlobalConfig.Base = url.split('//')[1]
  await hillo.initial(url + '/PHP/')
  setTimeout(async () => {
    await router.push({ name: 'order' })
  }, 1000)
}
