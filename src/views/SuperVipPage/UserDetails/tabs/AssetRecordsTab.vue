<script>
export default {
  name: 'AssetRecordsTab',
  props: {
    userDetails: {
      type: Object,
      required: true
    },
    assetRecordsPagination: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Helper computed properties for UI display
    hasAssetRecords () {
      return this.userDetails?.assetRecords && this.userDetails.assetRecords.length > 0
    },
    // Pagination for asset records
    paginatedAssetRecords () {
      if (!this.userDetails?.assetRecords) return []

      const startIndex = this.assetRecordsPagination.page * this.assetRecordsPagination.size
      return this.userDetails.assetRecords.slice(
        startIndex,
        startIndex + this.assetRecordsPagination.size
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
     * @param {string} type - The type of status (order, asset, etc.)
     * @returns {string} - The color for the status chip
     */
    getStatusColor (status, type = 'order') {
      if (!status) return 'grey'

      const statusColors = {
        order: {
          COMPLETED: 'success',
          PENDING: 'warning',
          CANCELLED: 'error',
          REFUNDED: 'info',
          PROCESSING: 'info',
          Finished: 'success',
          UNPAID: 'warning',
          PAID: 'success'
        },
        asset: {
          ACTIVE: 'success',
          EXPIRED: 'error',
          USED: 'info',
          PENDING: 'warning'
        },
        award: {
          COMPLETED: 'success',
          IN_PROGRESS: 'info',
          NOT_STARTED: 'grey',
          CLAIMABLE: 'info'
        }
      }

      return (statusColors[type] && statusColors[type][status]) || 'grey'
    },

    /**
     * Get asset status display text
     *
     * @param {Object} asset - The asset record
     * @returns {string} - The status display text
     */
    getAssetStatusDisplay (asset) {
      if (!asset || !asset.status) return '-'

      const statusMap = {
        DISTRIBUTED: '已发放',
        USED: '已使用',
        EXPIRED: '已过期',
        CANCELLED: '已取消'
      }

      return statusMap[asset.status] || asset.status
    },

    /**
     * Handle page change for pagination
     *
     * @param {string} type - The type of pagination (assets)
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
      <div v-if="!hasAssetRecords" class="text-center pa-4">
        <v-icon color="grey lighten-1" size="36">mdi-ticket-outline</v-icon>
        <div class="text-subtitle-2 grey--text mt-2">暂无资产记录数据</div>
      </div>

      <div v-else>
        <div class="section-title d-flex align-center mb-3">
          <v-icon small color="info" class="mr-2">mdi-ticket-percent</v-icon>
          <span class="text-subtitle-1 font-weight-medium">资产记录列表</span>
        </div>

        <v-data-table
          :headers="[
            { text: 'ID', value: 'id', width: '80px' },
            { text: '资产名称', value: 'assetName' },
            { text: '资产类型', value: 'assetType', width: '120px' },
            { text: '价值', value: 'value', width: '100px' },
            { text: '状态', value: 'status', width: '120px' },
            { text: '有效期', value: 'validPeriod' },
            { text: '发放时间', value: 'distributedAt', width: '180px' }
          ]"
          :items="userDetails.assetRecords"
          :items-per-page="5"
          class="elevation-0"
          :footer-props="{
            'items-per-page-options': [5, 10, 20],
            'items-per-page-text': '每页显示'
          }"
          dense
        >
          <template #item.value="{ item }">
            <span class="text-body-2">{{ item.value ? (item.value | priceDisplay) : '-' }}</span>
          </template>
          <template #item.assetType="{ item }">
            <span class="text-body-2">{{ item.assetInfo?.assetType || '-' }}</span>
          </template>
          <template #item.assetName="{ item }">
            <span class="text-body-2">{{ item.assetInfo?.displayInfo?.name || '-' }}</span>
          </template>
          <template #item.status="{ item }">
            <v-chip
              x-small
              :color="getStatusColor(item.status, 'asset')"
              outlined
            >
              {{ getAssetStatusDisplay(item) }}
            </v-chip>
          </template>
          <template #item.validPeriod="{ item }">
            <div class="d-flex flex-column">
              <span class="caption">从: {{ item.distributedAt ? formatDate(item.distributedAt) : '-' }}</span>
              <span class="caption">至: {{ item.expiresAt ? formatDate(item.expiresAt) : (item.assetInfo?.expiredAt ? formatDate(item.assetInfo.expiredAt) : '-') }}</span>
            </div>
          </template>
          <template #item.distributedAt="{ item }">
            <span class="text-body-2">{{ formatDate(item.distributedAt) }}</span>
          </template>
        </v-data-table>

        <!-- Pagination -->
        <div class="text-center py-2 mt-1" v-if="assetRecordsPagination.totalPages > 1">
          <v-pagination
            v-model="assetRecordsPagination.page"
            :length="assetRecordsPagination.totalPages"
            :total-visible="7"
            color="info"
            @input="handlePageChange('assets', $event)"
            dense
          />
        </div>
      </div>
    </div>
  </div>
</template>
