<template>
  <v-card outlined>
    <v-list dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('CurrentRound') }}/{{ $t('TotalNumberOfRounds') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action-text>{{ currentRound }}/{{ tableBuffetConfig.totalRound }}</v-list-item-action-text>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('TimePerRoundMin') }}/{{ $t('MinMaxMealtime') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action-text>
          {{ tableBuffetConfig.roundTime / 60 }}
          /
          {{ tableBuffetConfig.maxDineTime / 60 }}
        </v-list-item-action-text>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('AdultChildCanOrderPerRound') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action-text>{{
            tableBuffetConfig.roundDishCount
          }}/{{ tableBuffetConfig.childRoundDishCount }}
        </v-list-item-action-text>
      </v-list-item>
    </v-list>
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
