<template>
  <v-card class="fill-height lighten-4 grey">
    <v-subheader>
      <h2 style="color: black">{{ $t('OrderDetails') }}: {{ orderInfo.id }}</h2>
      <v-spacer></v-spacer>
      <v-btn icon @click="cancel">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-subheader>
    <div style="width: 100%;display: grid;grid-template-columns: repeat(2,1fr);grid-gap: 4px">
      <v-list class="mx-2" flat>
        <v-list-item-group>
          <v-list-item>
            <span>{{ $t('WaiterInfo') }}</span>
            <v-spacer></v-spacer>
            <span>
            {{ orderInfo.servantName }}
          </span>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <span>{{ $t('TableNumber') }}</span>
            <v-spacer></v-spacer>
            <span>
            {{ orderInfo.tableName }}
          </span>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <span>{{ $t('ConsumeType') }}</span>
            <v-spacer></v-spacer>
            <span>
            {{ consumeTypeName | shorterName }}
            </span>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <span>{{ $t('OrderStatus') }}</span>
            <v-spacer></v-spacer>
            <v-chip :color="isPaid?'success':'error'" label small>
              {{ isPaid ? $t('Paid') : $t('PaidNot') }}
            </v-chip>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <span>{{ $t('TotalPrice') }}</span>
            <v-spacer></v-spacer>
            <span>{{ orderInfo.totalPrice | priceDisplay }}</span>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="isPaid">
            <span>{{ $t('PaymentMethod') }}</span>
            <v-spacer></v-spacer>
            <v-chip color="primary" label small>
              {{ order.billPaymentInfo[0].name }}
            </v-chip>
          </v-list-item>
          <v-divider></v-divider>
          <v-btn v-if="isBoss"
                 :disabled="isReturned"
                 block
                 class="mt-2"
                 color="error"
                 elevation="0"
                 small
                 @click="$emit('return-order', orderInfo.id)">
            <v-icon>mdi-file-cancel-outline</v-icon>
            {{ isReturned ? $t('Refunded') : $t('CancelOrderAndRefundMoney') + ' ' + orderInfo.id }}
          </v-btn>
        </v-list-item-group>
      </v-list>
      <div v-if="orderInfo">
        <div class="timeLineGridContainer">
          <strong>{{ orderInfo.startTime }}</strong>
          <div><strong>{{ $t('StartDining') }}</strong></div>
          <strong v-if="!isPaid" class="red--text">{{ $t('CheckoutPending') }}</strong>
        </div>
        <template v-if="displayDetailInfo">
          <template v-for="t in Object.keys(displayDetailInfo)">
            <div :key="t" class="timeLineGridContainer">
              <strong>{{ t }}</strong>
              <div>
                <div v-for="op in Object.keys(displayDetailInfo[t])" :key="t+'op'+op">
                  <strong>{{ op }}</strong>
                  <div class="mt-1">
                    <v-card v-for="d in displayDetailInfo[t][op]" :key="d.id"
                            class="pa-1  ml-0 ma-1 text-body-2"
                            elevation="0">
                      <div>
                        <div class="d-flex">
                          <span>{{ Math.abs(d.count) }}&times; </span>
                          <span class="ml-1 text-capitalize text-no-wrap text-truncate font-weight-bold">{{
                              d.currentCode
                            }}</span>
                          <v-spacer></v-spacer>
                          <template v-if="parseFloat(d.tempDiscountMod)!==0">
                              <span class="text-decoration-line-through warning--text text--darken-1"
                                    style="font-size: 10px">{{ d.price | priceDisplay }}</span>
                            <span class="text-no-wrap">
                                {{ parseFloat(d.price) + parseFloat(d.tempDiscountMod) | priceDisplay }}</span>
                          </template>
                          <span v-else class="text-no-wrap">{{ d.price | priceDisplay }}</span>
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
          </template>
        </template>
      </div>
    </div>
  </v-card>
</template>

<script>
import { loadAllConsumeType } from '@/api/api'
import { groupBy } from 'lodash-es'

export default {
  name: 'OrderDetailDialog',
  props: {
    isBoss: {},
    order: {}
  },
  data: () => {
    return {
      consumeTypeName: null
    }
  },
  computed: {
    isReturned () {
      console.log(this.order)
      return this.order.isReturned === '1' || this.orderInfo.totalPrice < 0
    },
    orderInfo () {
      return this.order.billInfo
    },
    isPaid () {
      return this.order.billInfo.paymentStatus === '1'
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
            name = this.$t('CancelOrder')
            break
          case '-100':
            name = this.$t('BillSplit')
            break
          default:
            name = this.$t('OrderHistory')
        }
        o.dishStatusName = name
        return o
      })
    }
  },
  methods: {
    cancel () {
      this.$emit('close-detail')
    }
  },
  async mounted () {
    this.consumeTypeList = await loadAllConsumeType()
    this.consumeTypeName = this.consumeTypeList.find(i => i.id === this.order.billInfo.consumeTypeId)?.printName
  }
}
</script>

<style scoped>
.tableName {
  color: orange
}

</style>
