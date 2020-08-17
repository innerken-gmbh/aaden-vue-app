import { fetchConfig } from 'aaden-base-model/lib/Models/AadenApi'
import { IKUtils } from 'innerken-utils'

const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig)

export const NeededKeys = Object.keys(defaultConfig)
const sumupInfo = require('@/assets/aaden.web.app.json')

GlobalConfig.sumupInfo = sumupInfo

function filterNeededKey (config) {
  const saveConfig = IKUtils.deepCopy(config)
  const deleteKeys = Object.keys(saveConfig).filter(k => typeof defaultConfig[k] === 'undefined')
  deleteKeys.forEach(k => {
    delete saveConfig[k]
  })
  return saveConfig
}

function localStorageManager () {
  const get = function (key) {
    const value = localStorage.getItem(key)
    if (['true', 'false'].includes(value)) {
      return value === 'true'
    }
    return localStorage.getItem(key)
  }
  return {
    deleteAll: function () {
      return localStorage.clear()
    },
    getAll: function () {
      return Object.keys(localStorage).reduce((obj, k) => {
        obj[k] = get(k)
        return obj
      }, {})
    },
    get,
    set: function (key, value) {
      return localStorage.setItem(key, value)
    },
    setAll: function (config) {
      Object.entries(config).forEach(i => {
        const [k, v] = i
        localStorage[k] = v
      })
    }
  }
}

async function electronSettingManager () {
  try {
    const settings = (await import('electron-settings')).default
    return {
      deleteAll: function () {
        return settings.deleteAll()
      },
      ok: true,
      getAll: function () {
        return settings.get('config')
      },
      get: function (key) {
        return settings.get('config.' + key)
      },
      set: function (key, value) {
        return settings.set('config.' + key, value)
      },
      setAll: function (config) {
        return settings.set('config', config)
      }
    }
  } catch (e) {
    console.warn(e)
    console.warn('no FileSystemConfig Available')
    return {
      ok: false,
      getAll: () => {
      }
    }
  }
}

function updateSetting (key, value) {
  if (NeededKeys.includes(key)) {
    GlobalConfig.settingManager.set(key, value)
  }
}

async function loadNet () {
  try {
    return await fetchConfig()
  } catch (e) {
    return {}
  }
}

function loadUrl () {
  const searchParams = location.search.substr(1).split('&')
  return searchParams.reduce((obj, i) => {
    const [k, v] = i.split('=')
    obj[k] = v
    return obj
  }, {})
}

export async function loadConfig () {
  const localManager = localStorageManager()
  const electronManager = await electronSettingManager()
  const netConfig = await loadNet()
  const localConfig = localManager.getAll()
  const electronConfig = electronManager.getAll()
  const urlConfig = loadUrl()
  console.log({ GlobalConfig, netConfig, localConfig, electronConfig, urlConfig })
  GlobalConfig = Object.assign(GlobalConfig, netConfig, localConfig, electronConfig, urlConfig)
  GlobalConfig.settingManager = electronManager.ok ? electronManager : localManager
  window.Config = GlobalConfig
}

window.useCurrentConfig = useCurrentConfig
window.hardReload = hardReload
window.setDeviceId = setDeviceId

export function isWeb () {
  return !process.env.IS_WEB
}

export function reload () {
  if (!isWeb()) {
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('reload')
  } else {
    window.location.reload(true)
  }
}

export function useCurrentConfig () {
  GlobalConfig.settingManager.setAll(filterNeededKey(GlobalConfig))
  reload()
}

export function hardReload () {
  GlobalConfig.settingManager.deleteAll()
}

export function setDeviceId (id) {
  updateSetting('DeviceId', id)
  reload()
}

export function changeLanguage (l) {
  updateSetting('lang', l)
  reload()
}

export default GlobalConfig
