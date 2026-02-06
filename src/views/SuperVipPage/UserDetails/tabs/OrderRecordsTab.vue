<script>
export default {
  name: 'OrderRecordsTab',
  props: {
    userOrders: {
      type: Array,
      required: true
    },
    orderPagination: {
      type: Object,
      required: true
    },
    orderLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Helper computed properties for UI display
    hasOrders () {
      return this.userOrders && this.userOrders.length > 0
    },
    // Pagination for orders
    paginatedOrders () {
      const startIndex = this.orderPagination.page * this.orderPagination.size
      return this.userOrders.slice(
        startIndex,
        startIndex + this.orderPagination.size
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
     * Get color for status chip
     *
     * @param {string} status - The status
     * @returns {string} - The color for the status chip
     */
    getStatusColor (status) {
      if (!status) return 'grey'

      const statusColors = {
        COMPLETED: 'success',
        PENDING: 'warning',
        CANCELLED: 'error',
        REFUNDED: 'info',
        PROCESSING: 'info',
        Finished: 'success',
        UNPAID: 'warning',
        PAID: 'success'
      }

      return statusColors[status] || 'grey'
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
     * @param {string} type - The type of pagination (orders)
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
      <div
        v-if="!hasOrders && !orderLoading"
        class="text-center pa-4"
      >
        <v-icon
          color="grey lighten-1"
          size="36"
        >
          mdi-receipt-text-outline
        </v-icon>
        <div class="text-subtitle-2 grey--text mt-2">
          暂无订单数据
        </div>
      </div>

      <div
        v-else-if="orderLoading"
        class="text-center pa-4"
      >
        <v-progress-circular
          indeterminate
          color="info"
          size="36"
        />
        <div class="text-body-2 mt-2">
          加载订单数据中...
        </div>
      </div>

      <div v-else>
        <div class="section-title d-flex align-center mb-3">
          <v-icon
            small
            color="success"
            class="mr-2"
          >
            mdi-cart
          </v-icon>
          <span class="text-subtitle-1 font-weight-medium">订单记录列表</span>
        </div>

        <v-data-table
          :headers="[
            { text: '订单号', value: 'orderId', width: '120px' },
            { text: '金额', value: 'totalAmount', width: '100px' },
            { text: '状态', value: 'status', width: '120px' },
            { text: '创建时间', value: 'createdAt', width: '180px' },
            { text: '操作', value: 'actions', sortable: false, width: '100px' }
          ]"
          :items="paginatedOrders"
          :items-per-page="5"
          class="elevation-0"
          :footer-props="{
            'items-per-page-options': [5, 10, 20],
            'items-per-page-text': '每页显示'
          }"
          dense
        >
          <template #item.orderId="{ item }">
            <span class="text-body-2">{{ item.orderId }}</span>
          </template>
          <template #item.totalAmount="{ item }">
            <span class="success--text text-body-2">{{ item.totalAmount | priceDisplay }}</span>
          </template>
          <template #item.status="{ item }">
            <v-chip
              x-small
              :color="getStatusColor(item.status)"
              outlined
            >
              {{ item.status }}
            </v-chip>
          </template>
          <template #item.createdAt="{ item }">
            <span class="text-body-2">{{ formatDate(item.createdAt) }}</span>
          </template>
          <template #item.actions="{ item }">
            <v-btn
              x-small
              color="info"
              text
              @click="openBillDetail(item)"
            >
              <v-icon
                x-small
                class="mr-1"
              >
                mdi-eye
              </v-icon>
              详情
            </v-btn>
          </template>
        </v-data-table>

        <!-- Pagination -->
        <div
          class="text-center py-2 mt-1"
          v-if="orderPagination.totalPages > 1"
        >
          <v-pagination
            v-model="orderPagination.page"
            :length="orderPagination.totalPages"
            :total-visible="7"
            color="info"
            @input="handlePageChange('orders', $event)"
            dense
          />
        </div>
      </div>
    </div>
  </div>
</template>
