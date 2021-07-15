<template>
  <v-card class="ma-2" v-if="!Config.backendIsOk">
    <template v-if="!loading">
      <v-card-title class="d-flex">
        {{ $t('Achtung! Bitte Upgrade') }}
      </v-card-title>
      <v-card-text v-if="!fold">
        1. 更新根据店里的网络情况，将会需要1-10分钟。<br>
        2. 更新只能在有网络的情况下进行。<br>
        3. 更新成功后，建议重新启动应用。重新启动应用的方法是：按一下键盘上的Windows键（四个方块），然后点红色叉叉关掉应用，然后重新打开。<br>
        4. 如果提示更新失败，请尽快联系我们进行手动更新。
      </v-card-text>
      <v-btn large
             @click="fold=!fold"
             block>
        <v-icon v-if="!fold" left>mdi-unfold-less-horizontal</v-icon>
        <v-icon v-else left>mdi-unfold-more-horizontal</v-icon>
        点击这里{{ fold ? '展开' : '收起' }}提示
      </v-btn>
      <v-btn large
             v-if="!fold"
             @click="updateBackend"
             color="success" block>
        <v-icon left>mdi-update</v-icon>
        点击这里执行自动更新
      </v-btn>
    </template>
    <template v-else>
      <v-card-title>正在尝试更新</v-card-title>
      <div style="width: 100%;" class="d-flex justify-center align-center pa-4">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-card>

</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { checkCurrentVersion, update } from '@/api/nightwatch'

export default {
  name: 'UpdateFragment',
  data: function () {
    return {
      Config: GlobalConfig,
      fold: false,
      loading: false
    }
  },
  methods: {
    async updateBackend () {
      this.loading = true
      await update()
      this.loading = false
    }
  },
  async mounted () {
    try {
      const versionOk = await checkCurrentVersion(true)
      if (!versionOk) {
        await this.updateBackend()
      }
    } catch (e) {

    }
  }
}
</script>

<style scoped>

</style>
