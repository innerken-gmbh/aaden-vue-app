<template>
  <v-card class="fill-height lighten-4 grey">
    <v-subheader>
      <v-card-title>Order {{ orderInfo.id }}
        <v-card-subtitle class="tableName"> Table:{{ orderInfo.tableName }}</v-card-subtitle>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="cancel">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-subheader>
    <div style="overflow-y: scroll;min-height: 100%" class="d-flex flex-column mx-2">
      <div style="display: grid;grid-template-columns: repeat(3,1fr);grid-gap: 8px" class="my-1">
        <info-block title="Servant" :main-info="orderInfo.servantName"></info-block>
        <info-block title="TableName" :main-info="orderInfo.tableName"></info-block>
        <info-block title="Type" :main-info="orderInfo.consumeTypeName"></info-block>
      </div>
    </div>
    <v-list flat class="mx-2">
      <v-list-item-group>
        <v-list-item>
          <span>开始时间</span>
          <v-spacer></v-spacer>
          <span>{{ orderInfo.startTime }}</span>
        </v-list-item>
        <v-list-item>
          <span>TipIncome</span>
          <v-spacer></v-spacer>
          <span>{{ orderInfo.tipIncome | priceDisplay }}</span>
        </v-list-item>
        <v-list-item>
          <span>totalPrice</span>
          <v-spacer></v-spacer>
          <span>{{ orderInfo.totalPrice | priceDisplay }}</span>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-card-text>{{ order }}</v-card-text>
  </v-card>
</template>

<script>
import InfoBlock from '@/components/GlobalDialog/infoBlock'
import { loadDetailOrder } from '@/api/api'

export default {
  name: 'OrderDetailDialog',
  components: { InfoBlock },
  props: {
    id: {},
    order: {}
  },
  data: () => {
    return {}
  },
  computed: {
    orderInfo () {
      return this.order.billInfo
    }
  },
  methods: {
    cancel () {
      this.$emit('closeDetail')
    },
    async beforeEnter () {
      this.info = await loadDetailOrder(this.order.orderId)
      console.log(this.info, 'this.info')
    }
  },
  mounted () {
    console.log(this.order)
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      await vm.beforeEnter()
    })
  }
}
</script>

<style scoped>
.tableName {
  color: orange
}

</style>
