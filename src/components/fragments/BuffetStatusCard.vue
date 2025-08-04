<template>
  <v-card class="pa-2" outlined>
    <div class="d-flex align-center justify-center text-caption">
      <div>{{ $t('当前轮数') }}/{{ $t('总轮数') }}</div>
      <v-spacer/>
      {{ currentRound }}/{{ tableBuffetConfig.totalRound }}
    </div>
    <div class="d-flex align-center justify-center text-caption">
      <div>{{ $t('每轮时间') }}/{{ $t('总用餐时间') }}</div>
      <v-spacer/>
      {{ tableBuffetConfig.roundTime / 60 }}
      /
      {{ tableBuffetConfig.maxDineTime / 60 }}
    </div>
    <div class="d-flex align-center justify-center text-caption">
      <div>{{ $t('成人/儿童可点菜品数') }}</div>
      <v-spacer/>
      {{
        tableBuffetConfig.roundDishCount
      }}/{{ tableBuffetConfig.childRoundDishCount }}
    </div>
  </v-card>
</template>

<script>
import { DefaultBuffetSetting } from '@/oldjs/StaticModel'

export default {
  name: 'BuffetStatusCard',
  props: {
    buffetSettingInfo: {},
    currentRound: {}
  },
  computed: {
    tableBuffetConfig: function () {
      return Object.assign({}, DefaultBuffetSetting, this.buffetSettingInfo)
    }
  }
}
</script>

<style scoped>

</style>
