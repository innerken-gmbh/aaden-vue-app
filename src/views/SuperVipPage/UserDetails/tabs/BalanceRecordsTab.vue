<script>
export default {
  name: 'BalanceRecordsTab',
  props: {
    balanceTransactions: {
      type: Array,
      required: true
    },
    balanceTransactionsLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Helper computed properties for UI display
    hasBalanceTransactions () {
      return this.balanceTransactions && this.balanceTransactions.length > 0
    }
  },
  methods: {

    /**
     * Format date to localized string
     *
     * @param {string} dateString - The date string
     * @returns {string} - The formatted date
     */
    formatDate (dateString) {
      if (!dateString) return '-'

      try {
        return new Date(dateString).toLocaleString()
      } catch (error) {
        return dateString
      }
    },

    /**
     * Get transaction type display text
     *
     * @param {string} type - The transaction type
     * @returns {string} - The display text
     */
    getTransactionTypeText (type) {
      if (!type) return '-'

      const typeMap = {
        RECHARGE: '充值',
        CONSUME: '消费',
        REFUND: '退款',
        ADJUSTMENT: '调整',
        GIFT: '赠送'
      }

      return typeMap[type] || type
    },

    /**
     * Open bill detail dialog for an order
     *
     * @param {Object} order - The order object
     */
    openBillDetail (order) {
      this.$emit('open-bill-detail', order)
    }
  }
}
</script>

<template>
  <div class="pt-4 px-4">
    <div class="pa-4">
      <div
        v-if="balanceTransactionsLoading"
        class="text-center pa-4"
      >
        <v-progress-circular
          indeterminate
          color="purple"
          size="36"
        />
        <div class="text-body-2 mt-2">
          加载余额交易记录中...
        </div>
      </div>

      <div
        v-else-if="!hasBalanceTransactions"
        class="text-center pa-4"
      >
        <v-icon
          color="grey lighten-1"
          size="36"
        >
          mdi-wallet-outline
        </v-icon>
        <div class="text-subtitle-2 grey--text mt-2">
          暂无余额交易记录
        </div>
      </div>

      <div v-else>
        <div class="section-title d-flex align-center mb-3">
          <v-icon
            small
            color="purple"
            class="mr-2"
          >
            mdi-wallet
          </v-icon>
          <span class="text-subtitle-1 font-weight-medium">余额交易记录</span>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                x-small
                color="grey"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
            <span>
              余额交易记录显示用户的所有余额变动，包括：<br>
              - 充值：用户充值金额<br>
              - 消费：用户消费金额<br>
              - 退款：退还给用户的金额<br>
              - 调整：管理员手动调整的金额<br>
              - 赠送：系统赠送的金额
            </span>
          </v-tooltip>
        </div>

        <v-data-table
          :headers="[
            { text: 'ID', value: 'id', width: '80px' },
            { text: '描述', value: 'description' },
            { text: '金额', value: 'amount', width: '150px' },
            { text: '类型', value: 'transactionType', width: '100px' },
            { text: '时间', value: 'createTimestamp', width: '180px' },
            { text: '订单ID', value: 'orderId', width: '150px' }
          ]"
          :items="balanceTransactions"
          :items-per-page="-1"
          hide-default-footer
          class="elevation-0"
          dense
        >
          <template #item.description="{ item }">
            <div class="text-body-2">
              {{ item.description || '无描述' }}
            </div>
          </template>
          <template #item.amount="{ item }">
            <div class="d-flex align-center">
              <v-icon
                x-small
                :color="item.transactionType === 'RECHARGE' ? 'success' : 'error'"
                class="mr-1"
              >
                {{ item.transactionType === 'RECHARGE' ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold' }}
              </v-icon>
              <span
                class="text-body-2"
                :class="item.transactionType === 'RECHARGE' ? 'success--text' : 'error--text'"
              >
                {{ item.amount | priceDisplay }}
              </span>
            </div>
          </template>
          <template #item.transactionType="{ item }">
            <v-chip
              x-small
              :color="item.transactionType === 'RECHARGE' ? 'success' : (item.transactionType === 'REFUND' ? 'warning' : 'error')"
              outlined
            >
              {{ getTransactionTypeText(item.transactionType) }}
            </v-chip>
          </template>
          <template #item.createTimestamp="{ item }">
            <span class="text-body-2">{{ formatDate(item.createTimestamp) }}</span>
          </template>
          <template #item.orderId="{ item }">
            <v-btn
              v-if="item.orderId"
              x-small
              text
              color="info"
              class="px-1 py-0"
              @click="openBillDetail({orderId: item.orderId})"
            >
              <v-icon
                x-small
                class="mr-1"
              >
                mdi-eye
              </v-icon>
              <span class="text-body-2">{{ item.orderId }}</span>
            </v-btn>
            <span
              v-else
              class="text-body-2 grey--text"
            >-</span>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>
