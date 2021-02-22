<template>
  <div style="position: fixed;top:48px;left: 0">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ displayData.servant.name }}:{{ $t('销售额') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="realShow=!realShow">mdi-close</v-icon>
      </v-toolbar>
      <v-tabs v-model="tabIndex">
        <v-tab>单日</v-tab>
        <v-tab>时间段</v-tab>
      </v-tabs>
      <v-card-text>

        <v-list>
          <template v-for="p in displayData.paymentDetail">
            <v-list-item :key="p.name">
              <v-list-item-content>
                <v-list-item-title>{{ p.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ p.total }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

        </v-list>

      </v-card-text>

      <v-card-actions>

      </v-card-actions>

    </v-card>
  </div>
</template>

<script>

import { hillo } from 'hillo'

const defaultDisplayData = {
  content: {
    total: 0,
    bar: 0,
    ec: 0,
    notPayed: 0,
    tip: 0
  },
  servant: {
    id: -1,
    name: 'Servant 1'
  },
  paymentDetail: []
}

export default {
  name: 'SalesDialog',
  props: {
    salesDialogShow: {
      default: false
    },
    id: {},
    initialUI: {}
  },
  data: function () {
    return {
      tabIndex: null,
      displayData: defaultDisplayData
    }
  },
  methods: {
    async loadData () {
      if (this.id != null) {
        const res = (await hillo.get('Servant.php?op=previewSummary', { pw: this.id })).content
        this.displayData = Object.assign({}, defaultDisplayData, res)
      }
    }
  },

  watch: {
    realShow (val) {
      if (val) {
        this.loadData()
      }
    }
  },
  computed: {
    realShow: {
      get: function () {
        return this.salesDialogShow
      },
      set: function (val) {
        this.$emit('visibility-changed', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
