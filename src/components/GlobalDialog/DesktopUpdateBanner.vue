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
// 桌面版（Electron）主进程下载好新版本后通知这里（POS-130）：
// 店员点「立即更新」→ 收银程序关闭、静默安装、约半分钟后自动重新打开。
// 不点也会在电脑 10 分钟没人操作时自动装。
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
      this.version = version
    })
    ipcRenderer.send('update-ui-ready')
  },
  methods: {
    install () {
      this.installing = true
      this.ipc.send('install-update')
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
