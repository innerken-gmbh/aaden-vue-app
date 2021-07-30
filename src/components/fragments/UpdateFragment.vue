<template>
  <v-card class="ma-2" v-if="!Config.backendIsOk">
    <template v-if="!loading">
      <v-card-title class="d-flex">
        {{ $t('Achtung! Bitte Upgrade') }}
      </v-card-title>

      <v-card-text v-if="!fold" v-html="$t('AchtungText')">
      </v-card-text>
      <v-btn large
             @click="fold=!fold"
             block>
        <v-icon v-if="!fold" left>mdi-unfold-less-horizontal</v-icon>
        <v-icon v-else left>mdi-unfold-more-horizontal</v-icon>
        {{ $t('点击这里') }} {{ fold ? $t('展开') : $t('收起') }} {{ $t('提示') }}
      </v-btn>
      <v-btn large
             v-if="!fold"
             @click="updateBackend"
             color="success" block>
        <v-icon left>mdi-update</v-icon>
        {{ $t('点击这里执行自动更新') }}
      </v-btn>
    </template>
    <template v-else>
      <v-card-title>{{ $t('正在尝试更新') }}</v-card-title>
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
      fold: GlobalConfig.updateFold,
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
  watch: {
    fold: function (val) {
      GlobalConfig.updateSettings('updateFold', val)
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
