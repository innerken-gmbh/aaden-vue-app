<template>
  <div
      v-if="version"
      class="desktop-update-banner"
  >
    <v-icon
        color="green darken-1"
        left
    >
      mdi-update
    </v-icon>
    <span class="text-body-2">{{ $t('DesktopUpdateReady', { version }) }}</span>
    <v-btn
        class="ml-3"
        color="green darken-1"
        dark
        elevation="0"
        small
        @click="confirm = true"
    >
      {{ $t('DesktopUpdateNow') }}
    </v-btn>
    <v-dialog
        v-model="confirm"
        max-width="460"
    >
      <v-card class="pa-6">
        <div class="text-h6">{{ $t('DesktopUpdateReady', { version }) }}</div>
        <div class="text-body-2 mt-3">{{ $t('DesktopUpdateConfirmHint') }}</div>
        <div class="d-flex justify-end mt-6">
          <v-btn
              elevation="0"
              text
              @click="confirm = false"
          >
            {{ $t('Cancel') }}
          </v-btn>
          <v-btn
              :loading="installing"
              class="ml-2"
              color="green darken-1"
              dark
              elevation="0"
              @click="install"
          >
            {{ $t('DesktopUpdateNow') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import hillo from 'hillo'

// 桌面版（Electron）主进程下载好新版本后通知这里（POS-130）：
// 店员点「立即更新」→ 收银程序关闭、静默安装、约半分钟后自动重新打开。
// POS-798：主进程在这个版本失败不到 2 次时发版本号过来；失败 2 次以后发 null，提示条收起（主进程还会退避着空闲自动装）。
// 不点也会在店里空闲时自动装：主进程每分钟（电脑 10 分钟没人碰时）发 update-idle-check 来问这里店里空不空。
export default {
  name: 'DesktopUpdateBanner',
  data: () => ({
    version: null,
    confirm: false,
    installing: false
  }),
  mounted () {
    if (!window.process?.versions?.electron) {
      return
    }
    const { ipcRenderer } = require('electron')
    this.ipc = ipcRenderer
    ipcRenderer.on('update-ready', (event, version) => {
      this.version = version || null
      if (!this.version) {
        this.confirm = false
      }
    })
    ipcRenderer.on('update-idle-check', async (event, id) => {
      let answer = null
      try {
        answer = await this.posIdleState()
      } catch (e) {
        answer = null
      }
      ipcRenderer.send('update-idle-state', id, answer)
    })
    ipcRenderer.send('update-ui-ready')
  },
  methods: {
    install () {
      this.installing = true
      this.ipc.send('install-update')
    },
    /**
     * 店里空不空：busy = 在点单页（/table，可能有没送出的菜、正在结账），或者结账框 / 接单框 / 密码框开着，
     * 或者正在确认堂食开桌（POS-991：从选中这一桌、输密码、到确认或拒绝完，中间装更新会把确认打断）；
     * openTables = 门店服务器上未结的桌数，问不到是 null（主进程白天就不装）
     */
    async posIdleState () {
      if (this.posBusy()) {
        return { busy: true, openTables: null }
      }
      let openTables = null
      try {
        const tables = (await hillo.silentGet('Tables.php')).content
        if (Array.isArray(tables)) {
          openTables = tables.filter(t => t.usageStatus === '1').length
        }
      } catch (e) {
        openTables = null
      }
      // 等门店回答的时候店员可能已经开始做事（比如点开了待开桌）：回答之前再看一次
      if (this.posBusy()) {
        return { busy: true, openTables: null }
      }
      return { busy: false, openTables }
    },
    posBusy () {
      const s = this.$store.state
      return this.$route?.name === 'table' || !!s.showCheckoutDialog || !!s.showOrderAcceptDialog ||
        !!s.pinDialogShow || !!s.dineOpenTarget || this.confirm
    }
  }
}
</script>

<style scoped>
.desktop-update-banner {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 300;
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 14px;
  border-radius: 8px;
  background: #e8f5e9;
  color: #1b5e20;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
