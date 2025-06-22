<template>
  <v-dialog v-model="show" max-width="800" content-class="member-detail-dialog">
    <v-card class="pa-6 rounded-lg" elevation="8">
      <div class="d-flex align-center">
        <v-btn @click="goBack" elevation="0" color="grey lighten-4" :disabled="loading" class="transition-swing" depressed rounded>
          <v-icon left>mdi-arrow-left</v-icon>
          {{ $t('Return') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-alert
        v-if="error"
        type="error"
        class="mt-4"
        dismissible
        dense
        outlined
        @input="error = null"
      >
        {{ error }}
      </v-alert>

      <div v-if="loading" class="d-flex justify-center my-8">
        <v-progress-circular indeterminate color="primary" size="64" width="5"></v-progress-circular>
      </div>

      <template v-else-if="memberDetails">
        <!-- Member header section - Always visible -->
        <div class="member-header mt-4 pa-4 rounded-lg">
          <div class="d-flex align-center">
            <v-avatar size="64" color="primary" class="mr-4">
              <span class="white--text text-h5">{{ getInitials(memberDetails.cloudUserInfo?.displayName || memberDetails.cloudUserInfo?.username) }}</span>
            </v-avatar>
            <div>
              <div class="text-h4 font-weight-medium">
                {{ memberDisplayName }}
              </div>
              <div class="text-subtitle-1 grey--text text--darken-1">
                {{ memberDetails.cloudUserInfo?.email || $t('NoEmail') }}
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex flex-column align-end">
              <v-chip
                v-if="memberDetails.currentMembership?.currentLevel"
                :color="memberDetails.currentMembership.currentLevel.displayInfo.color || 'primary'"
                text-color="white"
                class="mb-2 elevation-2"
                pill
              >
                <v-icon left small>mdi-crown</v-icon>
                {{ memberDetails.currentMembership.currentLevel.displayInfo.name }}
              </v-chip>
              <v-chip
                v-if="isBirthday"
                color="pink lighten-2"
                text-color="white"
                class="elevation-2"
                pill
              >
                <v-icon left small>mdi-cake-variant</v-icon>
                {{ $t('Birthday') }}
              </v-chip>
            </div>
          </div>
        </div>

        <v-divider class="my-4"></v-divider>

        <!-- Stats summary cards -->
        <div class="stats-summary d-flex flex-wrap mb-4">
          <v-card class="stat-card ma-2 elevation-2" outlined>
            <v-card-text class="text-center">
              <div class="text-overline grey--text">{{ $t('Integral') }}</div>
              <div class="text-h4 font-weight-bold primary--text">
                {{ memberDetails.currentMembership?.currentPoints || 0 }}
              </div>
              <v-icon color="primary" class="mt-2">mdi-star-circle</v-icon>
            </v-card-text>
          </v-card>

          <v-card class="stat-card ma-2 elevation-2" outlined>
            <v-card-text class="text-center">
              <div class="text-overline grey--text">{{ $t('Balance') }}</div>
              <div class="text-h4 font-weight-bold success--text">
                {{ formatCurrency(memberDetails.balance) }}
              </div>
              <v-icon color="success" class="mt-2">mdi-wallet</v-icon>
            </v-card-text>
          </v-card>

          <v-card class="stat-card ma-2 elevation-2" outlined>
            <v-card-text class="text-center">
              <div class="text-overline grey--text">{{ $t('CumulativeConsumption') }}</div>
              <div class="text-h4 font-weight-bold deep-purple--text">
                {{ formatCurrency(memberDetails.currentMembership?.userTotalConsume) }}
              </div>
              <v-icon color="deep-purple" class="mt-2">mdi-cash-multiple</v-icon>
            </v-card-text>
          </v-card>

          <v-card class="stat-card ma-2 elevation-2" outlined>
            <v-card-text class="text-center">
              <div class="text-overline grey--text">{{ $t('OrderCount') }}</div>
              <div class="text-h4 font-weight-bold orange--text">
                {{ memberDetails.orderCount || 0 }}
              </div>
              <v-icon color="orange" class="mt-2">mdi-receipt</v-icon>
            </v-card-text>
          </v-card>

          <v-card class="stat-card ma-2 elevation-2" outlined>
            <v-card-text class="text-center">
              <div class="text-overline grey--text">{{ $t('LastConsumption') }}</div>
              <div class="text-subtitle-1 font-weight-medium">
                {{ formatDate(memberDetails.currentMembership?.userLastConsumeAt) }}
              </div>
              <v-icon color="grey darken-1" class="mt-2">mdi-clock-outline</v-icon>
            </v-card-text>
          </v-card>
        </div>

        <!-- Tabs for different sections -->
        <v-tabs
          v-model="activeTab"
          background-color="transparent"
          slider-color="primary"
          slider-size="3"
          class="rounded-lg elevation-1"
        >
          <v-tab class="px-4 py-3">
            <v-icon left>mdi-account-details</v-icon>
            {{ $t('Details') }}
          </v-tab>
          <v-tab class="px-4 py-3">
            <v-icon left>mdi-package-variant-closed</v-icon>
            {{ $t('Assets') }}
          </v-tab>
          <v-tab class="px-4 py-3">
            <v-icon left>mdi-trophy-award</v-icon>
            {{ $t('Awards') }}
          </v-tab>
          <v-tab class="px-4 py-3">
            <v-icon left>mdi-receipt</v-icon>
            {{ $t('Orders') }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab" class="mt-4">
          <!-- Details tab -->
          <v-tab-item>
            <v-card flat class="rounded-lg">
              <v-card-text class="details-tab-content pa-0">
                <!-- Member information section -->
                <v-card class="mb-4 rounded-lg" outlined>
                  <v-card-title class="py-2 primary lighten-5">
                    <v-icon left>mdi-account-details</v-icon>
                    {{ $t('VipMemberInformation') }}
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-list-item two-line>
                          <v-list-item-avatar color="primary lighten-5">
                            <v-icon color="primary">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-subtitle class="text-caption grey--text">{{ $t('name') }}</v-list-item-subtitle>
                            <v-list-item-title>{{ memberDisplayName }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-list-item two-line>
                          <v-list-item-avatar color="blue lighten-5">
                            <v-icon color="blue">mdi-email</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-subtitle class="text-caption grey--text">{{ $t('Email') }}</v-list-item-subtitle>
                            <v-list-item-title>{{ memberDetails.cloudUserInfo?.email || $t('NoEmail') }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>

                      <v-col cols="12" sm="6" v-if="memberDetails.cloudUserInfo?.phoneNumber">
                        <v-list-item two-line>
                          <v-list-item-avatar color="green lighten-5">
                            <v-icon color="green">mdi-phone</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-subtitle class="text-caption grey--text">{{ $t('telefon') }}</v-list-item-subtitle>
                            <v-list-item-title>{{ memberDetails.cloudUserInfo?.phoneNumber }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>

                      <v-col cols="12" sm="6" v-if="memberDetails.cloudUserInfo?.birthday">
                        <v-list-item two-line>
                          <v-list-item-avatar color="pink lighten-5">
                            <v-icon color="pink">mdi-cake-variant</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-subtitle class="text-caption grey--text">{{ $t('Birthday') }}</v-list-item-subtitle>
                            <v-list-item-title>{{ formatDate(memberDetails.cloudUserInfo?.birthday, 'YYYY-MM-DD') }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>

                      <v-col cols="12" sm="6" v-if="memberDetails.cloudUserInfo?.shortcode">
                        <v-list-item two-line>
                          <v-list-item-avatar color="purple lighten-5">
                            <v-icon color="purple">mdi-barcode</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-subtitle class="text-caption grey--text">{{ $t('ShortCode') }}</v-list-item-subtitle>
                            <v-list-item-title>{{ memberDetails.cloudUserInfo?.shortcode }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>

                      <v-col cols="12" sm="6" v-if="memberDetails.currentMembership?.currentLevel">
                        <v-list-item two-line>
                          <v-list-item-avatar :color="memberDetails.currentMembership.currentLevel.displayInfo.color + ' lighten-5' || 'primary lighten-5'">
                            <v-icon :color="memberDetails.currentMembership.currentLevel.displayInfo.color || 'primary'">mdi-crown</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-subtitle class="text-caption grey--text">{{ $t('MembershipLevel') }}</v-list-item-subtitle>
                            <v-list-item-title>
                              <v-chip
                                :color="memberDetails.currentMembership.currentLevel.displayInfo.color || 'primary'"
                                text-color="white"
                                small
                                pill
                              >
                                {{ memberDetails.currentMembership.currentLevel.displayInfo.name }}
                              </v-chip>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Assets tab -->
          <v-tab-item>
            <v-card flat class="rounded-lg">
              <v-card-text class="pa-0">
                <div v-if="memberDetails.assetRecords && memberDetails.assetRecords.length > 0" class="assets-tab-content">
                  <v-row>
                    <v-col
                      v-for="asset in memberDetails.assetRecords"
                      :key="asset.id"
                      cols="12" sm="6" md="4"
                    >
                      <v-card class="mx-auto rounded-lg" outlined hover>
                        <v-img
                          v-if="asset.assetInfo?.displayInfo?.imageUrl"
                          :src="asset.assetInfo.displayInfo.imageUrl"
                          height="120"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6)"
                        >
                          <v-card-title class="text-subtitle-1">{{ asset.assetInfo?.displayInfo?.name }}</v-card-title>
                        </v-img>
                        <v-card-title v-else class="text-subtitle-1">
                          <v-icon left color="primary">mdi-package-variant-closed</v-icon>
                          {{ asset.assetInfo?.displayInfo?.name }}
                        </v-card-title>

                        <v-card-text>
                          <div class="text-caption mb-2">{{ asset.assetInfo?.displayInfo?.description }}</div>
                          <v-chip
                            small
                            :color="getAssetStatusColor(asset.status)"
                            text-color="white"
                            class="mt-1"
                            pill
                          >
                            <v-icon left x-small>{{ getAssetStatusIcon(asset.status) }}</v-icon>
                            {{ formatAssetStatus(asset.status) }}
                          </v-chip>

                          <div class="text-caption mt-2">
                            <v-icon x-small class="mr-1">mdi-calendar</v-icon>
                            {{ formatDate(asset.distributedAt, 'YYYY-MM-DD') }}
                          </div>

                          <div v-if="asset.shortcode" class="text-caption mt-1">
                            <v-icon x-small class="mr-1">mdi-barcode</v-icon>
                            {{ asset.shortcode }}
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
                <div v-else class="text-center pa-8">
                  <v-icon size="64" color="grey lighten-1">mdi-package-variant-closed</v-icon>
                  <div class="text-h6 grey--text text--darken-1 mt-2">{{ $t('NoAssetsFound') }}</div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Awards tab -->
          <v-tab-item>
            <v-card flat class="rounded-lg">
              <v-card-text class="pa-0">
                <div v-if="memberDetails.awardProgress && memberDetails.awardProgress.length > 0" class="awards-tab-content">
                  <v-row>
                    <v-col
                      v-for="award in memberDetails.awardProgress"
                      :key="award.id"
                      cols="12"
                    >
                      <v-card class="mb-3 rounded-lg" outlined hover>
                        <v-card-title class="py-2">
                          <v-icon
                            left
                            :color="award.currentProgress >= award.awardInfo?.requiredProgress ? 'amber darken-2' : 'grey'"
                          >
                            {{ award.currentProgress >= award.awardInfo?.requiredProgress ? 'mdi-trophy' : 'mdi-trophy-outline' }}
                          </v-icon>
                          {{ award.awardInfo?.displayInfo?.name }}
                          <v-spacer></v-spacer>
                          <v-chip
                            small
                            :color="award.currentProgress >= award.awardInfo?.requiredProgress ? 'success' : 'grey'"
                            text-color="white"
                            pill
                          >
                            {{ award.currentProgress }} / {{ award.awardInfo?.requiredProgress }}
                          </v-chip>
                        </v-card-title>

                        <v-card-text>
                          <div class="text-body-2 mb-2">{{ award.awardInfo?.displayInfo?.description }}</div>

                          <v-progress-linear
                            :value="(award.currentProgress / award.awardInfo?.requiredProgress) * 100"
                            height="10"
                            rounded
                            :color="getProgressColor(award.currentProgress, award.awardInfo?.requiredProgress)"
                            background-opacity="0.2"
                            class="mb-2"
                          ></v-progress-linear>

                          <div class="d-flex justify-end mt-3">
                            <v-btn
                              v-if="award.currentProgress >= award.awardInfo?.requiredProgress"
                              color="success"
                              :loading="claimingAward === award.id"
                              @click="claimMemberAward(award.id)"
                              rounded
                              elevation="2"
                            >
                              <v-icon left>mdi-gift</v-icon>
                              {{ $t('Claim') }}
                            </v-btn>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
                <div v-else class="text-center pa-8">
                  <v-icon size="64" color="grey lighten-1">mdi-trophy-outline</v-icon>
                  <div class="text-h6 grey--text text--darken-1 mt-2">{{ $t('NoAwardsFound') }}</div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Orders tab -->
          <v-tab-item>
            <v-card flat class="rounded-lg">
              <v-card-text class="pa-0">
                <div class="orders-tab-content">
                  <v-data-table
                    :headers="orderHeaders"
                    :items="orders.content || []"
                    :items-per-page="5"
                    class="elevation-2 rounded-lg"
                    :loading="loadingOrders"
                    :no-data-text="$t('NoOrdersFound')"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 15],
                      'items-per-page-text': $t('RowsPerPage')
                    }"
                  >
                    <template v-slot:item.createTimestamp="{ item }">
                      <div class="d-flex align-center">
                        <v-icon small color="grey" class="mr-1">mdi-calendar-clock</v-icon>
                        {{ formatDate(item.createTimestamp) }}
                      </div>
                    </template>

                    <template v-slot:item.totalPrice="{ item }">
                      <div class="font-weight-medium" :class="getPriceColor(item.totalPrice)">
                        {{ formatCurrency(item.totalPrice) }}
                      </div>
                    </template>

                    <template v-slot:item.status="{ item }">
                      <v-chip
                        x-small
                        :color="getOrderStatusColor(item.status)"
                        text-color="white"
                        pill
                      >
                        {{ item.status }}
                      </v-chip>
                    </template>

                    <template v-slot:item.actions>
                      <v-btn icon small>
                        <v-icon small>mdi-eye</v-icon>
                      </v-btn>
                    </template>

                    <template v-slot:no-data>
                      <div class="text-center pa-4">
                        <v-icon size="48" color="grey lighten-1">mdi-receipt</v-icon>
                        <div class="text-subtitle-1 grey--text text--darken-1 mt-2">{{ $t('NoOrdersFound') }}</div>
                      </div>
                    </template>
                  </v-data-table>

                  <div class="d-flex justify-center mt-4" v-if="orders.content && orders.content.length > 0 && orders.currentPage < orders.totalPages - 1">
                    <v-btn
                      color="primary"
                      outlined
                      rounded
                      @click="loadMoreOrders"
                      :loading="loadingMoreOrders"
                      class="px-4"
                    >
                      <v-icon left>mdi-refresh</v-icon>
                      {{ $t('LoadMore') }}
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <div class="d-flex justify-end mt-4">
          <v-btn
            @click="goBack"
            elevation="0"
            color="grey lighten-4"
            class="mr-2"
            rounded
          >
            <v-icon left>mdi-close</v-icon>
            {{ $t('Cancel') }}
          </v-btn>
          <v-btn
            @click="selectMember"
            elevation="2"
            color="primary"
            rounded
            class="px-6"
          >
            <v-icon left>mdi-check</v-icon>
            {{ $t('SelectMember') }}
          </v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * @component MemberDetailDialog
 * @description A dialog for displaying detailed member information, including
 * personal details, membership level, balance, points, cumulative consumption,
 * last consumption, assets, awards, and order history.
 * Provides actions for member management such as editing, adding points, and claiming awards.
 */
import {
  getUserBusinessLayerDetails,
  claimAward,
  getUserOrders,
  getCurrentBLID
} from '@/api/MemberCloud/MemberCloudApi'
import IKUtils from 'innerken-js-utils'
import dayjs from 'dayjs'

export default {
  name: 'MemberDetailDialog',
  props: {
    /**
     * Controls the visibility of the dialog
     */
    value: Boolean,
    /**
     * The ID of the member to display details for
     */
    memberId: String
  },
  data () {
    return {
      show: false,
      memberDetails: null,
      orders: {
        content: [],
        totalPages: 0,
        currentPage: 0
      },
      loading: false,
      loadingOrders: false,
      loadingMoreOrders: false,
      error: null,
      businessLayerId: null,
      showAwards: false,
      claimingAward: null,
      activeTab: 0,
      orderHeaders: [
        { text: this.$t('OrderNumber'), value: 'orderNumber' },
        { text: this.$t('Date'), value: 'createTimestamp' },
        { text: this.$t('Total'), value: 'totalPrice' },
        { text: this.$t('Status'), value: 'status' }
      ]
    }
  },
  computed: {
    /**
     * Gets the display name for the current member
     *
     * @returns {string} The member's display name
     */
    memberDisplayName () {
      return this.getMemberDisplayName(this.memberDetails, this.$t('NoName'))
    },

    /**
     * Determines if today is the member's birthday
     *
     * @returns {boolean} True if today is the member's birthday
     */
    isBirthday () {
      if (!this.memberDetails?.cloudUserInfo?.birthday) return false

      const birthday = dayjs(this.memberDetails.cloudUserInfo.birthday)
      const today = dayjs()

      return birthday.month() === today.month() && birthday.date() === today.date()
    }
  },
  watch: {
    value (val) {
      this.show = val
      if (val && this.memberId) {
        this.loadData()
      }
    },
    show (val) {
      if (!val) {
        this.$emit('input', val)
      }
    },
    memberId (val) {
      if (val && this.show) {
        this.loadData()
      }
    }
  },
  methods: {
    /**
     * Gets the display name for a member from their member info object.
     *
     * @param {Object} memberInfo - The member info object containing cloudUserInfo
     * @param {string} fallback - The fallback text to use if no name is available
     * @returns {string} The member's display name, name, email, or the fallback
     */
    getMemberDisplayName (memberInfo, fallback = 'Member') {
      if (!memberInfo || !memberInfo.cloudUserInfo) return fallback

      return memberInfo.cloudUserInfo.displayName ||
             memberInfo.cloudUserInfo.name ||
             memberInfo.cloudUserInfo.email ||
             fallback
    },

    /**
     * Formats a date string to a user-friendly format
     *
     * @param {string} dateString - The date string to format
     * @returns {string} The formatted date string
     */
    formatDate (dateString, format = 'YYYY-MM-DD HH:mm') {
      if (!dateString) return this.$t('NoData')
      return dayjs(dateString).format(format)
    },

    /**
     * Formats a currency value to a user-friendly format
     *
     * @param {number|string} value - The currency value to format
     * @returns {string} The formatted currency string
     */
    formatCurrency (value) {
      if (!value) return '0.00'
      return parseFloat(value).toFixed(2)
    },

    /**
     * Formats an asset status to a user-friendly string
     *
     * @param {string} status - The asset status
     * @returns {string} The formatted status string
     */
    formatAssetStatus (status) {
      if (!status) return this.$t('Unknown')

      const statusMap = {
        DISTRIBUTED: this.$t('Distributed'),
        USED: this.$t('Used'),
        EXPIRED: this.$t('Expired')
      }

      return statusMap[status] || status
    },

    /**
     * Gets the color for an asset status
     *
     * @param {string} status - The asset status
     * @returns {string} The color for the status
     */
    getAssetStatusColor (status) {
      if (!status) return 'grey'

      const colorMap = {
        DISTRIBUTED: 'blue',
        USED: 'green',
        EXPIRED: 'red'
      }

      return colorMap[status] || 'grey'
    },

    /**
     * Gets the icon for an asset status
     *
     * @param {string} status - The asset status
     * @returns {string} The icon for the status
     */
    getAssetStatusIcon (status) {
      if (!status) return 'mdi-help-circle'

      const iconMap = {
        DISTRIBUTED: 'mdi-package-variant',
        USED: 'mdi-check-circle',
        EXPIRED: 'mdi-clock-end'
      }

      return iconMap[status] || 'mdi-help-circle'
    },

    /**
     * Gets the color for a progress bar based on completion percentage
     *
     * @param {number} current - The current progress
     * @param {number} required - The required progress
     * @returns {string} The color for the progress bar
     */
    getProgressColor (current, required) {
      if (!current || !required) return 'grey'

      const percentage = (current / required) * 100

      if (percentage >= 100) return 'success'
      if (percentage >= 75) return 'light-green'
      if (percentage >= 50) return 'amber'
      if (percentage >= 25) return 'orange'
      return 'red'
    },

    /**
     * Gets the color class for a price value
     *
     * @param {number|string} price - The price value
     * @returns {string} The color class for the price
     */
    getPriceColor (price) {
      if (!price) return 'grey--text'

      const value = parseFloat(price)

      if (value >= 100) return 'green--text text--darken-2'
      if (value >= 50) return 'green--text'
      if (value >= 20) return 'blue--text'
      return 'grey--text text--darken-1'
    },

    /**
     * Gets the color for an order status
     *
     * @param {string} status - The order status
     * @returns {string} The color for the status
     */
    getOrderStatusColor (status) {
      if (!status) return 'grey'

      const statusLower = status.toLowerCase()

      if (statusLower.includes('complete') || statusLower.includes('paid')) return 'success'
      if (statusLower.includes('pending')) return 'amber darken-2'
      if (statusLower.includes('cancel') || statusLower.includes('refund')) return 'error'
      if (statusLower.includes('process')) return 'info'

      return 'grey'
    },

    /**
     * Gets the initials from a name
     *
     * @param {string} name - The name to get initials from
     * @returns {string} The initials
     */
    getInitials (name) {
      if (!name) return '?'

      return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2)
    },

    /**
     * Loads all data needed for the dialog, including business layer, member details, and orders
     *
     * @returns {Promise<void>}
     */
    async loadData () {
      try {
        this.loading = true
        this.error = null

        // Get the current Business Layer ID (BLID)
        this.businessLayerId = await getCurrentBLID()

        // Load member details
        await this.loadMemberDetails()

        // Load orders
        await this.loadOrders()
      } catch (error) {
        console.error('Error loading data:', error)
        this.error = this.$t('ErrorLoadingData')
      } finally {
        this.loading = false
      }
    },

    /**
     * Loads the member details from the cloud API
     *
     * @returns {Promise<void>}
     */
    async loadMemberDetails () {
      try {
        this.loading = true
        this.error = null
        this.memberDetails = await getUserBusinessLayerDetails(this.memberId, this.businessLayerId)
      } catch (error) {
        console.error('Error loading member details:', error)
        this.error = this.$t('ErrorLoadingMemberDetails')
      } finally {
        this.loading = false
      }
    },

    /**
     * Loads the member's order history from the cloud API
     *
     * @returns {Promise<void>}
     */
    async loadOrders () {
      try {
        this.loadingOrders = true
        const response = await getUserOrders(this.memberId)

        // Handle case where response is null or undefined
        if (!response) {
          this.orders = {
            content: [],
            totalPages: 1,
            currentPage: 0
          }
          return
        }

        this.orders = {
          content: response.content || [],
          totalPages: response.totalPages || 1,
          currentPage: 0
        }
      } catch (error) {
        console.error('Error loading orders:', error)
        // Don't show error for orders, just log it
        this.orders = {
          content: [],
          totalPages: 1,
          currentPage: 0
        }
      } finally {
        this.loadingOrders = false
      }
    },

    /**
     * Loads more orders when the user clicks the "Load More" button
     *
     * @returns {Promise<void>}
     */
    async loadMoreOrders () {
      if (this.loadingMoreOrders) return

      try {
        this.loadingMoreOrders = true
        const nextPage = this.orders.currentPage + 1

        const response = await getUserOrders(this.memberId, nextPage)

        // Handle case where response is null or undefined
        if (!response) {
          return
        }

        this.orders = {
          content: [...this.orders.content, ...(response.content || [])],
          totalPages: response.totalPages || 1,
          currentPage: nextPage
        }
      } catch (error) {
        console.error('Error loading more orders:', error)
        IKUtils.toast(this.$t('ErrorLoadingMoreOrders'), 'error')
      } finally {
        this.loadingMoreOrders = false
      }
    },

    /**
     * Claims an award for the member
     *
     * @param {string} awardProgressId - The ID of the award progress to claim
     * @returns {Promise<void>}
     */
    async claimMemberAward (awardProgressId) {
      try {
        this.claimingAward = awardProgressId
        await claimAward(this.memberId, awardProgressId)
        // Reload member details to reflect changes
        await this.loadMemberDetails()
        IKUtils.toast(this.$t('AwardClaimedSuccessfully'))
      } catch (error) {
        console.error('Error claiming award:', error)
        this.error = this.$t('ErrorClaimingAward')
      } finally {
        this.claimingAward = null
      }
    },

    /**
     * Opens a dialog to edit the member's information
     * Note: This would be implemented in a future task
     *
     * @returns {Promise<void>}
     */
    async editMember () {
      // This would be implemented in a future task
      IKUtils.toast(this.$t('EditMemberNotImplemented'))
    },

    /**
     * Opens a dialog to add points to the member's account
     *
     * @returns {Promise<void>}
     */
    async addPoints () {
      // This functionality is not yet implemented
      // Just show a toast message for now
      IKUtils.toast(this.$t('AddPointsNotImplemented'))
    },

    /**
     * Selects the current member and closes the dialog
     */
    selectMember () {
      this.$emit('select', this.memberId)
      this.show = false
    },

    /**
     * Goes back to the previous dialog/view
     */
    goBack () {
      this.$emit('back')
      this.show = false
    }
  }
}
</script>

<style scoped>
.member-detail-dialog {
  border-radius: 16px;
}

.member-header {
  background-color: rgba(0, 0, 0, 0.02);
  border-left: 4px solid #1976d2; /* Primary color */
  transition: all 0.3s ease;
}

.member-header:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.details-tab-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.assets-tab-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.awards-tab-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.orders-tab-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.stat-card {
  flex: 1;
  min-width: 150px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
}

/* Add transitions for smoother interactions */
.v-tab {
  transition: all 0.2s ease;
}

.v-card {
  transition: all 0.3s ease;
}

.v-btn {
  transition: all 0.2s ease;
}

/* Custom scrollbar for a more refined look */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
</style>
