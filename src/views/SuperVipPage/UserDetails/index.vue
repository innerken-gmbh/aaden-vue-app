<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './UserDetailsDialog.css'

// Import tab components
import UserInfoTab from './tabs/UserInfoTab.vue'
import AwardProgressTab from './tabs/AwardProgressTab.vue'
import AssetRecordsTab from './tabs/AssetRecordsTab.vue'
import OrderRecordsTab from './tabs/OrderRecordsTab.vue'
import PointRecordsTab from './tabs/PointRecordsTab.vue'
import BalanceRecordsTab from './tabs/BalanceRecordsTab.vue'

// Import utility functions
import { formatRelativeTime } from './utils'
import PageSubHeader from '@/components/Base/Form/PageSubHeader.vue'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import BalanceTransaction from '@/api/NewVipApi/BalanceTransaction'
import { getUserOrdersByDeviceId } from '@/api/NewVipApi/UserMembership'
import { getUserBusinessLayerDetail } from '@/api/NewVipApi/UserDetail'
import LoadingProvider from '@/views/Widget/LoadingProvider.vue'

// Initialize dayjs plugins
dayjs.extend(relativeTime)

export default {
  name: 'UserDetailsPage',
  components: {
    LoadingProvider,
    PageSubHeader,
    UserInfoTab,
    AwardProgressTab,
    AssetRecordsTab,
    OrderRecordsTab,
    PointRecordsTab,
    BalanceRecordsTab
  },
  props: {
    userId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      userDetails: null,
      userOrders: [],
      balanceTransactions: [],
      orderPagination: {
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
      },
      assetRecordsPagination: {
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
      },
      pointTransactionsPagination: {
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
      },
      orderLoading: false,
      balanceTransactionsLoading: false,
      activeTab: 0
    }
  },
  computed: {
    // User basic information
    userName () {
      return this.userDetails?.cloudUserInfo?.displayName ||
          this.userDetails?.cloudUserInfo?.username ||
          'Unknown User'
    },
    userAvatar () {
      return this.userDetails?.cloudUserInfo?.photoUrl || null
    },
    userInitial () {
      return this.userName.charAt(0).toUpperCase()
    },
    // Current membership information
    currentMembership () {
      return this.userDetails?.currentMembership || null
    },
    currentMembershipLevel () {
      return this.currentMembership?.currentLevel || null
    }
  },
  watch: {
    userId: {
      immediate: true,
      deep: true,
      handler (newUserId) {
        if (newUserId) {
          this.loadUserData(newUserId)
        }
      }
    }
  },
  methods: {
    // Utility methods
    formatRelativeTime (dateString) {
      return formatRelativeTime(dateString, dayjs)
    },

    async loadUserData (userId) {
      this.loading = true
      try {
        // Get the user business layer details
        this.userDetails = await getUserBusinessLayerDetail(userId)
        console.log('User details:', this.userDetails)

        // Ensure membershipLevels is an array
        if (!this.userDetails.membershipLevels) {
          this.userDetails.membershipLevels = []
        }

        // Load user orders
        await this.loadUserOrders(userId)

        // Load user balance transactions if business layer ID is available
        if (this.userDetails.businessLayer && this.userDetails.businessLayer.id) {
          await this.loadUserBalanceTransactions(userId, this.userDetails.businessLayer.id)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
      this.loading = false
    },

    /**
     * Load user balance transactions
     *
     * @param {string} userId - The user ID
     * @param {number} blId - The business layer ID
     */
    async loadUserBalanceTransactions (userId, blId) {
      if (!userId || !blId) return

      try {
        this.balanceTransactionsLoading = true

        // Get all user balance transactions
        const transactions = await BalanceTransaction.getAllUserTransactions(userId, blId)

        this.balanceTransactions = transactions || []
      } catch (error) {
        console.error('Error loading user balance transactions:', error)
      } finally {
        this.balanceTransactionsLoading = false
      }
    },

    /**
     * Load user orders by device ID
     *
     * @param {string} userId - The user ID
     */
    async loadUserOrders (userId) {
      if (!userId) return

      try {
        this.orderLoading = true

        // Get the device ID from GlobalConfig
        const deviceId = GlobalConfig.DeviceId

        if (!deviceId) {
          console.error('Device ID not found in GlobalConfig')
          return
        }

        // Get user orders by device ID
        const response = await getUserOrdersByDeviceId(userId, deviceId)

        // Transform the response to match the expected format
        const transformedOrders = response.map(orderData => {
          // Parse the billDetail JSON string if it exists
          let billDetail = null
          if (orderData.orderDetail && orderData.orderDetail.billDetail) {
            try {
              billDetail = JSON.parse(orderData.orderDetail.billDetail)
            } catch (e) {
              console.error('Error parsing billDetail:', e)
            }
          }

          // Extract order items from billOrderInfo
          const items = billDetail && billDetail.billOrderInfo
            ? billDetail.billOrderInfo.map(item => ({
              name: item.name || item.currentName,
              quantity: parseInt(item.sumCount) || 1,
              price: parseFloat(item.price) || 0
            }))
            : []

          return {
            orderId: orderData.order.localOrderId,
            items,
            totalAmount: orderData.order.total,
            status: orderData.order.checkoutState,
            createdAt: orderData.order.createTimestamp,
            paymentStatus: orderData.order.paymentStatus,
            checkoutTimestamp: orderData.order.checkoutTimestamp,
            businessLayer: orderData.businessLayer,
            rawData: orderData // Keep the raw data for debugging
          }
        })

        // Update orders
        this.userOrders = transformedOrders || []

        // Since the new API doesn't support pagination, we'll handle it client-side
        const totalElements = this.userOrders.length
        const totalPages = Math.ceil(totalElements / this.orderPagination.size)

        this.orderPagination = {
          ...this.orderPagination,
          totalPages,
          totalElements
        }
      } catch (error) {
        console.error('Error loading user orders:', error)
      } finally {
        this.orderLoading = false
      }
    },

    /**
     * Handle page change for pagination
     *
     * @param {string} type - The type of pagination (orders, assets, points, balance)
     * @param {number} newPage - The new page number
     */
    handlePageChange (type, newPage) {
      if (type === 'orders') {
        this.orderPagination.page = newPage
      } else if (type === 'assets') {
        this.assetRecordsPagination.page = newPage
      } else if (type === 'points') {
        this.pointTransactionsPagination.page = newPage
      }
    },

    /**
     * Open bill detail dialog for an order
     *
     * @param {Object} order - The order object
     */
    openBillDetail (order) {
      this.showBillDetail(order.orderId)
    }
  }
}
</script>

<template>
  <loading-provider :loading="loading">
    <v-card
        v-if="userDetails"
        class="pa-0"
        elevation="0"
    >
      <!-- Header Section -->
      <page-sub-header class="px-4 pt-4">
        <div class="d-flex align-center">
          <v-avatar
              class="user-avatar mr-4"
              size="48"
              :color="currentMembershipLevel?.displayInfo?.color || 'grey lighten-2'"
          >
            <v-img
                v-if="userAvatar"
                :src="userAvatar"
                alt="User Avatar"
            />
            <span
                v-else
                class="text-h5"
            >{{ userInitial }}</span>
          </v-avatar>
          <div>
            <h2 class="text-h5 font-weight-bold mb-0">
              {{ userName }}
            </h2>
            <div class="d-flex align-center mt-1">
              <v-chip
                  v-if="currentMembership"
                  x-small
                  class="mr-2"
                  color="info"
                  outlined
              >
                会员
              </v-chip>
              <v-chip
                  v-if="currentMembershipLevel"
                  x-small
                  class="mr-2"
                  :color="currentMembershipLevel.displayInfo?.color || 'accent'"
                  outlined
              >
                {{ currentMembershipLevel.displayInfo?.name }}
              </v-chip>
            </div>
          </div>
        </div>
      </page-sub-header>

      <!-- User Stats -->
      <div class="user-stats-container px-4 py-3">
        <div class="d-flex flex-wrap">
          <div class="stat-item mr-6 mb-2">
            <div class="d-flex align-center">
              <v-icon
                  color="info"
                  class="mr-2"
                  small
              >
                mdi-cash-multiple
              </v-icon>
              <span class="stat-label">总消费</span>
            </div>
            <div class="stat-value info--text">
              {{ (currentMembership?.userTotalConsume || 0) | priceDisplay }}
            </div>
          </div>

          <div class="stat-item mr-6 mb-2">
            <div class="d-flex align-center">
              <v-icon
                  color="success"
                  class="mr-2"
                  small
              >
                mdi-clock-outline
              </v-icon>
              <span class="stat-label">最近消费</span>
            </div>
            <div class="stat-value success--text">
              {{ formatRelativeTime(currentMembership?.userLastConsumeAt) }}
            </div>
          </div>

          <div class="stat-item mr-6 mb-2">
            <div class="d-flex align-center">
              <v-icon
                  color="warning"
                  class="mr-2"
                  small
              >
                mdi-star
              </v-icon>
              <span class="stat-label">积分</span>
            </div>
            <div class="stat-value warning--text">
              {{ currentMembership?.currentPoints || 0 }}
            </div>
          </div>

          <div class="stat-item mr-6 mb-2">
            <div class="d-flex align-center">
              <v-icon
                  color="purple"
                  class="mr-2"
                  small
              >
                mdi-wallet
              </v-icon>
              <span class="stat-label">账户余额</span>
            </div>
            <div class="stat-value purple--text">
              {{ (userDetails?.balance || 0) | priceDisplay }}
            </div>
          </div>

          <div class="stat-item mb-2">
            <div class="d-flex align-center">
              <v-icon
                  color="accent"
                  class="mr-2"
                  small
              >
                mdi-shopping
              </v-icon>
              <span class="stat-label">订单数量</span>
            </div>
            <div class="stat-value accent--text">
              {{ userDetails.orderCount || 0 }}
            </div>
          </div>
        </div>
      </div>

      <!-- Main Tabs -->
      <v-tabs
          v-model="activeTab"
          background-color="transparent"
          show-arrows
          class="px-4 mt-2"
          height="36"
      >
        <v-tab class="text-body-2 px-4">
          <v-icon
              left
              x-small
              class="mr-1"
          >
            mdi-account-details
          </v-icon>
          会员信息
        </v-tab>
        <v-tab class="text-body-2 px-4">
          <v-icon
              left
              x-small
              class="mr-1"
          >
            mdi-trophy-award
          </v-icon>
          奖励进度
        </v-tab>
        <v-tab class="text-body-2 px-4">
          <v-icon
              left
              x-small
              class="mr-1"
          >
            mdi-ticket-percent
          </v-icon>
          资产记录
        </v-tab>
        <v-tab class="text-body-2 px-4">
          <v-icon
              left
              x-small
              class="mr-1"
          >
            mdi-cart
          </v-icon>
          订单记录
        </v-tab>
        <v-tab class="text-body-2 px-4">
          <v-icon
              left
              x-small
              class="mr-1"
          >
            mdi-star-circle
          </v-icon>
          积分记录
        </v-tab>
        <v-tab class="text-body-2 px-4">
          <v-icon
              left
              x-small
              class="mr-1"
          >
            mdi-wallet
          </v-icon>
          余额记录
        </v-tab>
      </v-tabs>

      <v-divider class="mt-0"/>

      <v-tabs-items v-model="activeTab">
        <!-- 会员信息 Tab -->
        <v-tab-item>
          <user-info-tab :user-details="userDetails"/>
        </v-tab-item>

        <!-- 奖励进度 Tab -->
        <v-tab-item>
          <award-progress-tab :user-details="userDetails"/>
        </v-tab-item>

        <!-- 资产记录 Tab -->
        <v-tab-item>
          <asset-records-tab
              :user-details="userDetails"
              :asset-records-pagination="assetRecordsPagination"
              @page-change="handlePageChange"
          />
        </v-tab-item>

        <!-- 订单记录 Tab -->
        <v-tab-item>
          <order-records-tab
              :user-orders="userOrders"
              :order-pagination="orderPagination"
              :order-loading="orderLoading"
              @page-change="handlePageChange"
              @open-bill-detail="openBillDetail"
          />
        </v-tab-item>

        <!-- 积分记录 Tab -->
        <v-tab-item>
          <point-records-tab
              :user-details="userDetails"
              :point-transactions-pagination="pointTransactionsPagination"
              @page-change="handlePageChange"
              @open-bill-detail="openBillDetail"
          />
        </v-tab-item>

        <!-- 余额记录 Tab -->
        <v-tab-item>
          <balance-records-tab
              :balance-transactions="balanceTransactions"
              :balance-transactions-loading="balanceTransactionsLoading"
              @open-bill-detail="openBillDetail"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </loading-provider>

</template>
