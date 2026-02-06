<script>
export default {
  name: 'PointRecordsTab',
  props: {
    userDetails: {
      type: Object,
      required: true
    },
    pointTransactionsPagination: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Helper computed properties for UI display
    hasPointTransactions () {
      return this.userDetails?.pointTransactions && this.userDetails.pointTransactions.length > 0
    },
    // Pagination for point transactions
    paginatedPointTransactions () {
      if (!this.userDetails?.pointTransactions) return []

      const startIndex = this.pointTransactionsPagination.page * this.pointTransactionsPagination.size
      return this.userDetails.pointTransactions.slice(
        startIndex,
        startIndex + this.pointTransactionsPagination.size
      )
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
     * Open bill detail dialog for an order
     *
     * @param {Object} order - The order object
     */
    openBillDetail (order) {
      this.$emit('open-bill-detail', order)
    },

    /**
     * Handle page change for pagination
     *
     * @param {string} type - The type of pagination (points)
     * @param {number} newPage - The new page number
     */
    handlePageChange (type, newPage) {
      this.$emit('page-change', type, newPage)
    }
  }
}
</script>

<template>
  <div class="pt-4 px-4">
    <div class="pa-4">
      <div v-if="!hasPointTransactions" class="text-center pa-4">
        <v-icon color="grey lighten-1" size="36">mdi-star-off</v-icon>
        <div class="text-subtitle-2 grey--text mt-2">暂无积分交易记录</div>
      </div>

      <div v-else>
        <div class="section-title d-flex align-center mb-3">
          <v-icon small color="warning" class="mr-2">mdi-star-circle</v-icon>
          <span class="text-subtitle-1 font-weight-medium">积分交易记录</span>
        </div>

        <v-data-table
          :headers="[
            { text: 'ID', value: 'id', width: '80px' },
            { text: '描述', value: 'description' },
            { text: '积分', value: 'points', width: '100px' },
            { text: '时间', value: 'createTimestamp', width: '180px' },
            { text: '订单ID', value: 'orderId', width: '150px' }
          ]"
          :items="userDetails.pointTransactions"
          :items-per-page="10"
          class="elevation-0"
          :footer-props="{
            'items-per-page-options': [5, 10, 20],
            'items-per-page-text': '每页显示'
          }"
          dense
        >
          <template #item.description="{ item }">
            <div class="text-body-2">
              {{ item.description || '无描述' }}
            </div>
          </template>
          <template #item.points="{ item }">
            <div class="d-flex align-center">
              <v-icon
                x-small
                :color="item.points > 0 ? 'success' : 'error'"
                class="mr-1"
              >
                {{ item.points > 0 ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold' }}
              </v-icon>
              <span
                class="text-body-2"
                :class="item.points > 0 ? 'success--text' : 'error--text'"
              >
                {{ item.points > 0 ? '+' : '' }}{{ item.points }}
              </span>
            </div>
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
            <span v-else class="text-body-2 grey--text">-</span>
          </template>
        </v-data-table>

        <!-- Pagination -->
        <div class="text-center py-2 mt-1" v-if="pointTransactionsPagination.totalPages > 1">
          <v-pagination
            v-model="pointTransactionsPagination.page"
            :length="pointTransactionsPagination.totalPages"
            :total-visible="7"
            color="warning"
            @input="handlePageChange('points', $event)"
            dense
          />
        </div>
      </div>
    </div>
  </div>
</template>
