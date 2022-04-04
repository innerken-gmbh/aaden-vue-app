<template>
  <v-card class="fill-height lighten-4 grey">
    <v-subheader>
      <h2 style="color: black">Order: {{ orderInfo.id }}
<!--        <v-card-subtitle class="tableName"> Table:{{ orderInfo.tableName }}</v-card-subtitle>-->
      </h2>
      <v-spacer></v-spacer>
      <v-btn icon @click="cancel">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-subheader>
    <div style="min-height: 100%" class="d-flex flex-column mx-2">
      <div style="display: grid;grid-template-columns: repeat(3,1fr);grid-gap: 8px" class="my-1">
        <info-block title="Servant" :main-info="orderInfo.servantName"></info-block>
        <info-block title="TableName" :main-info="orderInfo.tableName"></info-block>
        <info-block title="Type" :main-info="consumeTypeName"></info-block>
      </div>
    </div>
    <v-list flat class="mx-2">
      <v-list-item-group>
        <v-list-item>
          <span>订单状态</span>
          <v-spacer></v-spacer>
          <v-chip label small :color="orderInfo.paymentStatus==='1'?'success':'error'">
            {{ orderInfo.paymentStatus === '1' ? $t('paid') : $t('not_paid') }}
          </v-chip>
        </v-list-item>
        <v-list-item>
          <span>totalPrice</span>
          <v-spacer></v-spacer>
          <span>{{ orderInfo.totalPrice | priceDisplay }}</span>
        </v-list-item>
        <v-list-item>
          <span>支付方式</span>
          <v-spacer></v-spacer>
          <v-chip color="primary" small label>
            {{ orderInfo.payMethodName }}
          </v-chip>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-subheader class="mt-2">
      <h3>用餐详情</h3></v-subheader>
    <v-timeline
      align-top
      dense
      v-if="orderInfo"
      class="mx-4 pb-3"
    >
      <v-timeline-item
        color="amber"
        small
      >
        <div class="timeLineGridContainer">
          <strong>{{ orderInfo.startTime }}</strong>
          <div><strong>开始用餐</strong></div>
        </div>
      </v-timeline-item>
      <template v-if="displayDetailInfo">
        <template v-for="t in Object.keys(displayDetailInfo)">
          <v-timeline-item small :key="t">
            <div class="timeLineGridContainer">
              <strong>{{ t }}</strong>
              <div>
                <div v-for="op in Object.keys(displayDetailInfo[t])" :key="t+'op'+op">
                  <strong>{{ op }}</strong>
                  <div class="mt-1">
                    <v-card v-for="d in displayDetailInfo[t][op]" :key="d.id"
                            elevation="0"
                            class="pa-1  ml-0 ma-1 text-body-2">
                      <div>
                        <div class="d-flex">
                          <span>{{ Math.abs(d.count) }}&times; </span>
                          <span class="text-capitalize text-no-wrap text-truncate font-weight-bold"> {{
                              d.currentCode
                            }} </span>
                          <v-spacer></v-spacer>
                          <template v-if="parseFloat(d.tempDiscountMod)!==0">
                                <span class="text-decoration-line-through warning--text text--darken-1"
                                      style="font-size: 10px">{{ d.price | priceDisplay }}</span>
                            <span class="text-no-wrap" >
                                  {{ parseFloat(d.price) + parseFloat(d.tempDiscountMod) | priceDisplay }}</span>
                          </template>
                          <span  v-else class="text-no-wrap">{{ d.price | priceDisplay }}</span>
                        </div>

                        <span class="maxLine2">{{ d.name }}</span>
                      </div>
                      <template v-if="d.aName">
                        <div class="text-caption">
                          {{ d.aName }}
                        </div>
                      </template>

                    </v-card>

                  </div>

                </div>
              </div>

            </div>
          </v-timeline-item>
        </template>
      </template>
      <v-timeline-item
        color="success"
        small
      >
        <div class="timeLineGridContainer">
          <strong>{{ orderInfo.endTime }}</strong>
          <div><strong>用餐结束</strong></div>
        </div>
      </v-timeline-item>

    </v-timeline>
  </v-card>
</template>

<script>
import InfoBlock from '@/components/GlobalDialog/infoBlock'
import { loadAllConsumeType } from '@/api/api'
import { groupBy } from 'lodash-es'

export default {
  name: 'OrderDetailDialog',
  components: { InfoBlock },
  props: {
    id: {},
    order: {}
  },
  data: () => {
    return {
      consumeTypeName: null
    }
  },
  computed: {
    orderInfo () {
      return this.order.billInfo
    },
    displayDetailInfo () {
      const groupedInfo = groupBy(this.detailedOrders, 'time')
      for (const time in groupedInfo) {
        groupedInfo[time] = groupBy(groupedInfo[time], 'dishStatusName')
        for (const key in groupedInfo[time]) {
          const timeInfo = groupBy(groupedInfo[time][key], (i) => {
            return i.currentCode + i.name + i.note + i.aName + i.tempDiscountStr
          })
          groupedInfo[time][key] = Object.keys(timeInfo).reduce((arr, i) => {
            arr.push(timeInfo[i].reduce((obj, t) => {
              obj.count = parseInt(obj.count) + parseInt(t.count)
              return obj
            }))
            return arr
          }, [])
        }
      }
      return groupedInfo
    },
    detailedOrders () {
      return (this.order?.orderDetailInfo ?? []).map(o => {
        let name
        switch (o.dishStatus) {
          case '-1':
            name = '退菜'
            break
          case '-100':
            name = '分单'
            break
          default:
            name = '点餐'
        }
        o.dishStatusName = name
        return o
      })
    }
  },
  methods: {
    cancel () {
      this.$emit('closeDetail')
    },
    findInList (id, list) {
      console.log(list.filter(i => i.id === id))
      return list.map(i => i.id === id)
    }
  },
  async mounted () {
    this.consumeTypeList = await loadAllConsumeType()
    console.log(this.consumeTypeList, 'consumeTypeList')
    console.log(this.order.billInfo.consumeTypeId, 'consumeTypeId')
    this.consumeTypeName = this.consumeTypeList.find(i => i.id === this.order.billInfo.consumeTypeId)?.printName
  }
}
</script>

<style scoped>
.tableName {
  color: orange
}

</style>
