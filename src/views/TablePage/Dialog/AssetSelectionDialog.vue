<template>
  <v-dialog
    v-model="show"
    max-width="800"
    persistent
  >
    <v-card class="asset-dialog">
      <div class="fixed-header">
        <v-card-title class="headline d-flex justify-space-between align-center pa-4 rounded-t">
          <div class="d-flex align-center">
            <v-icon
              left
              color="primary"
              size="28"
            >mdi-package-variant-closed
            </v-icon>
            <span class="primary--text font-weight-bold">{{ $t("SelectAssets") }}</span>
            <!-- Selection count chip moved to header -->
            <v-chip
              v-if="selectedAssets.length > 0"
              color="primary"
              outlined
              small
              class="ml-4 font-weight-medium"
            >
              <v-icon
                left
                x-small
              >mdi-check-circle
              </v-icon>
              {{ $t("SelectedCount", { count: selectedAssets.length }) }}
            </v-chip>
          </div>
          <div class="d-flex align-center">
            <v-btn
              color="primary"
              :disabled="!currentMemberId"
              depressed
              small
              class="mr-2"
              @click="save"
            >
              <v-icon
                left
                small
              >mdi-content-save
              </v-icon>
              {{ $t("Save") }}
            </v-btn>
            <v-btn
              icon
              @click="close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
      </div>

      <div class="scrollable-content">
        <v-card
          v-if="!currentMemberId"
          class="mb-4 pa-4 rounded-lg"
          color="blue lighten-5"
          elevation="0"
        >
          <div class="d-flex align-center">
            <v-avatar
              size="48"
              color="blue lighten-4"
              class="mr-4"
            >
              <v-icon
                color="blue darken-1"
                size="32"
              >mdi-account-question
              </v-icon>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold blue--text text--darken-1">{{
                  $t("SelectMemberFirst")
                }}
              </div>
              <div class="text-body-2 blue--text text--darken-2">{{ $t("SelectMemberToSeeAssets") }}</div>
            </div>
          </div>
        </v-card>

        <div v-else>
          <!-- Group assets by type -->
          <v-card
            class="mb-4 rounded-lg"
            elevation="0"
          >
            <v-tabs
              v-model="activeTab"
              background-color="white"
              grow
              slider-color="primary"
              slider-size="3"
              class="rounded-t-lg"
            >
              <v-tab
                v-for="(group, type) in groupedAssets"
                :key="type"
                class="text-capitalize font-weight-medium"
              >
                <v-icon
                  left
                  small
                  class="mr-1"
                >{{ getAssetTypeIcon(type) }}
                </v-icon>
                {{ $t(type) }}
                <v-chip
                  class="ml-2"
                  x-small
                  color="primary"
                  text-color="white"
                  pill
                >
                  {{ group.length }}
                </v-chip>
              </v-tab>
            </v-tabs>
          </v-card>

          <v-tabs-items v-model="activeTab">
            <v-tab-item
              v-for="(group, type) in groupedAssets"
              :key="type"
            >
              <v-card flat>
                <v-card-text
                  v-if="loading"
                  class="text-center py-8"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="64"
                    width="5"
                  ></v-progress-circular>
                  <div class="mt-4 text-h6 primary--text">{{ $t("LoadingAssets") }}</div>
                </v-card-text>

                <v-card-text
                  v-else-if="group.length === 0"
                  class="text-center py-8"
                >
                  <v-icon
                    size="64"
                    color="primary lighten-4"
                  >{{ getAssetTypeIcon(type) }}
                  </v-icon>
                  <div class="mt-4 text-h6 primary--text">{{ $t("NoAssetsOfType") }}</div>
                  <div class="text-body-2 primary--text text--darken-1">
                    {{ $t("NoAssetsOfTypeDescription") }}
                  </div>
                </v-card-text>

                <v-card-text v-else>
                  <v-row>
                    <v-col
                      v-for="asset in group"
                      :key="asset.id"
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-card
                        class="mx-auto rounded-lg asset-card transition-swing"
                        :elevation="isAssetSelected(asset.id) ? 4 : 1"
                        :class="{
                          'selected-asset': isAssetSelected(asset.id),
                          'asset-card-hover': !isAssetSelected(asset.id)
                        }"
                      >
                        <div
                          class="asset-card-ribbon"
                          v-if="isAssetSelected(asset.id)"
                        >
                          <v-icon
                            color="white"
                            small
                          >mdi-check
                          </v-icon>
                        </div>

                        <v-img
                          v-if="asset.assetInfo?.displayInfo?.imageUrl"
                          :src="asset.assetInfo.displayInfo.imageUrl"
                          height="140"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7)"
                        >
                          <v-card-title class="text-subtitle-1 font-weight-bold pb-2">
                            {{ asset.assetInfo?.displayInfo?.name }}
                          </v-card-title>
                        </v-img>
                        <v-card-title
                          v-else
                          class="text-subtitle-1 primary lighten-5 font-weight-bold"
                        >
                          <v-icon
                            left
                            color="primary"
                            class="mr-2"
                          >
                            {{ getAssetTypeIcon(asset.assetInfo?.assetType || "OTHER") }}
                          </v-icon>
                          {{ asset.assetInfo?.displayInfo?.name }}
                        </v-card-title>

                        <v-card-text class="pt-3">
                          <div
                            class="text-body-2 primary--text text--lighten-1 mb-3"
                            style="min-height: 40px;"
                          >
                            {{ asset.assetInfo?.displayInfo?.description || $t("NoDescription") }}
                          </div>

                          <div class="d-flex align-center mb-2">
                            <v-chip
                              small
                              :color="getAssetStatusColor(asset.status)"
                              text-color="white"
                              class="mr-2"
                              pill
                            >
                              <v-icon
                                left
                                x-small
                              >{{ getAssetStatusIcon(asset.status) }}
                              </v-icon>
                              {{ formatAssetStatus(asset.status) }}
                            </v-chip>

                            <v-chip
                              v-if="asset.assetInfo?.assetType === 'VOUCHER'"
                              small
                              color="amber lighten-1"
                              text-color="white"
                              pill
                            >
                              <v-icon
                                left
                                x-small
                              >mdi-sale
                              </v-icon>
                              {{ getDiscountText(asset.assetInfo?.assetConfig) }}
                            </v-chip>
                          </div>

                          <v-divider class="my-2"></v-divider>

                          <div class="d-flex justify-end mt-2">
                            <v-tooltip
                              v-if="asset.assetInfo?.assetType === 'VOUCHER' && !isVoucherSelectable(asset) && !isAssetSelected(asset.id)"
                              bottom
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  small
                                  :color="isAssetSelected(asset.id) ? 'error' : 'grey'"
                                  :outlined="!isAssetSelected(asset.id)"
                                  :depressed="isAssetSelected(asset.id)"
                                  rounded
                                  disabled
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon
                                    left
                                    small
                                  >mdi-block-helper
                                  </v-icon>
                                  {{ $t("CannotSelect") }}
                                </v-btn>
                              </template>
                              <span>{{ voucherReasons[asset.id] || $t("VoucherCannotBeSelected") }}</span>
                            </v-tooltip>
                            <v-btn
                              v-else
                              small
                              :color="isAssetSelected(asset.id) ? 'error' : 'primary'"
                              :outlined="!isAssetSelected(asset.id)"
                              :depressed="isAssetSelected(asset.id)"
                              rounded
                              @click="toggleAssetSelection(asset)"
                            >
                              <v-icon
                                left
                                small
                              >{{ isAssetSelected(asset.id) ? "mdi-minus-circle" : "mdi-plus-circle" }}
                              </v-icon>
                              {{ isAssetSelected(asset.id) ? $t("Remove") : $t("Select") }}
                            </v-btn>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { getCurrentBLID, getUserBusinessLayerDetails } from '@/api/MemberCloud/MemberCloudApi'
import { mapState } from 'vuex'
import IKUtils from 'innerken-js-utils'

export default {
  name: 'AssetSelectionDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // Previously selected asset IDs (from rawAddressInfo)
    initialAssets: {
      type: Array,
      default: () => []
    },
    // Current order total price for checking voucher conditions
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: false,
      error: null,
      memberAssets: [],
      selectedAssets: [],
      businessLayerId: null,
      activeTab: 0,
      initialAssetIds: [], // Temporary storage for initial asset IDs
      voucherReasons: {} // Reasons why vouchers are not selectable, keyed by asset ID
    }
  },
  computed: {
    ...mapState(['currentMemberId']),

    show: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },

    /**
     * Groups assets by their type for display in tabs
     *
     * @returns {Object} An object with asset types as keys and arrays of assets as values
     */
    groupedAssets () {
      const groups = {}

      this.memberAssets.forEach(asset => {
        const type = asset.assetInfo?.assetType || 'OTHER'
        if (!groups[type]) {
          groups[type] = []
        }
        groups[type].push(asset)
      })

      return groups
    },

    /**
     * Calculates the discount based on selected voucher assets
     *
     * @returns {string} The discount string
     */
    calculatedDiscount () {
      // Find voucher assets
      const voucher = this.selectedAssets.find(asset => asset.assetInfo?.assetType === 'VOUCHER')
      if (voucher) {
        return this.calculateDiscount(voucher)
      }
      return ''
    }
  },
  watch: {
    value (newVal) {
      if (newVal) {
        // When dialog opens, reset selected assets based on initialAssets
        console.log('initialAssets', this.initialAssets)
        if (this.initialAssets && this.initialAssets.length > 0) {
          // Store the IDs temporarily
          this.initialAssetIds = this.initialAssets.map(asset => asset.id)
        } else {
          this.selectedAssetIds = []
        }

        this.loadMemberAssets()
      }
    },

    currentMemberId: {
      immediate: true,
      handler (newVal) {
        if (newVal && this.show) {
          this.loadMemberAssets()
        } else if (!newVal) {
          this.memberAssets = []
          this.selectedAssets = []
        }
      }
    },

    initialAssets: {
      immediate: true,
      handler (newVal) {
        if (newVal && newVal.length > 0) {
          // Store the IDs temporarily
          this.initialAssetIds = newVal.map(asset => asset.id)

          // If we already have loaded assets, match them now
          if (this.memberAssets.length > 0) {
            this.matchAssetIdsWithLoadedAssets()
          }
        }
      }
    }
  },
  methods: {
    /**
     * Loads the member's assets from the cloud API
     */
    async loadMemberAssets () {
      if (!this.currentMemberId) return

      try {
        this.loading = true
        this.error = null
        this.voucherReasons = {} // Reset voucher reasons

        // Get the current Business Layer ID (BLID)
        this.businessLayerId = await getCurrentBLID()

        // Load member details including assets
        const memberDetails = await getUserBusinessLayerDetails(this.currentMemberId, this.businessLayerId)

        // Filter assets to only include DISTRIBUTED status (available for use)
        this.memberAssets = (memberDetails.assetRecords || []).filter(asset =>
          asset.status === 'DISTRIBUTED'
        )

        // Check all vouchers for selectability
        this.memberAssets.forEach(asset => {
          if (asset.assetInfo?.assetType === 'VOUCHER') {
            const reason = this.getVoucherReason(asset)
            if (reason) {
              this.voucherReasons[asset.id] = reason
            }
          }
        })

        // If we have initialAssetIds, match them with the loaded assets
        if (this.initialAssetIds && this.initialAssetIds.length > 0) {
          this.matchAssetIdsWithLoadedAssets()
        }
      } catch (error) {
        console.error('Error loading member assets:', error)
        this.error = this.$t('ErrorLoadingAssets')
      } finally {
        this.loading = false
      }
    },

    /**
     * Checks if a voucher is selectable based on its conditions
     *
     * @param {Object} asset - The asset to check
     * @returns {boolean} True if the voucher is selectable
     */
    isVoucherSelectable (asset) {
      return !this.getVoucherReason(asset)
    },

    /**
     * Gets the reason why a voucher is not selectable
     *
     * @param {Object} asset - The asset to check
     * @returns {string|null} The reason why the voucher is not selectable, or null if it is selectable
     */
    getVoucherReason (asset) {
      if (!asset || !asset.assetInfo || asset.assetInfo.assetType !== 'VOUCHER') {
        return null
      }

      const assetConfig = asset.assetInfo.assetConfig
      if (!assetConfig) {
        return this.$t('InvalidVoucherConfig')
      }

      try {
        const config = JSON.parse(assetConfig)

        // Check usageMinAmount condition
        if (config.usageMinAmount && parseFloat(config.usageMinAmount) > 0) {
          const minAmount = parseFloat(config.usageMinAmount)
          if (this.totalPrice < minAmount) {
            return this.$t('MinimumOrderAmountNotMet', { amount: minAmount })
          }
        }

        // Add more condition checks here if needed
        // For example, check productCodes if implemented

        return null // Voucher is selectable
      } catch (error) {
        console.error('Error checking voucher selectability:', error)
        return this.$t('InvalidVoucherConfig')
      }
    },

    /**
     * Matches the initialAssetIds with the loaded assets
     * This is used when we only have asset IDs and need to find the full asset objects
     */
    matchAssetIdsWithLoadedAssets () {
      if (!this.initialAssetIds || !this.initialAssetIds.length || !this.memberAssets.length) return

      // Find the matching assets in the loaded assets
      this.selectedAssets = this.memberAssets.filter(asset =>
        this.initialAssetIds.includes(asset.id)
      )
    },

    /**
     * Toggles the selection of an asset
     *
     * @param {Object} asset - The asset to toggle
     */
    toggleAssetSelection (asset) {
      const isSelected = this.isAssetSelected(asset.id)
      const isVoucher = asset.assetInfo?.assetType === 'VOUCHER'

      if (isSelected) {
        // Remove the asset from selection
        this.selectedAssets = this.selectedAssets.filter(a => a.id !== asset.id)

        // If it was a voucher, update the discount to empty string
        if (isVoucher) {
          this.$emit('discount-updated', '')
        }
      } else {
        // For vouchers, check if it's selectable based on conditions
        if (isVoucher) {
          // Check if the voucher is selectable
          if (!this.isVoucherSelectable(asset)) {
            // Show error message with the reason
            const reason = this.voucherReasons[asset.id] || this.$t('VoucherCannotBeSelected')
            IKUtils.showError(reason)
            return
          }

          // Remove any existing voucher
          this.selectedAssets = this.selectedAssets.filter(a => a.assetInfo?.assetType !== 'VOUCHER')

          // Calculate and emit the discount string immediately
          const discountStr = this.calculateDiscount(asset)
          this.$emit('discount-updated', discountStr)
        }

        // Add the asset to selection
        this.selectedAssets.push(asset)
      }
    },

    /**
     * Checks if an asset is selected
     *
     * @param {string} assetId - The ID of the asset to check
     * @returns {boolean} True if the asset is selected
     */
    isAssetSelected (assetId) {
      return this.selectedAssets.some(asset => asset.id === assetId)
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
        DISTRIBUTED: this.$t('Available'),
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
     * Gets the icon for an asset type
     *
     * @param {string} type - The asset type
     * @returns {string} The icon for the type
     */
    getAssetTypeIcon (type) {
      const iconMap = {
        VOUCHER: 'mdi-ticket-percent',
        COUPON: 'mdi-ticket',
        MEMBERSHIP: 'mdi-card-account-details',
        GIFT_CARD: 'mdi-gift',
        OTHER: 'mdi-package-variant'
      }

      return iconMap[type] || 'mdi-package-variant'
    },

    /**
     * Gets a user-friendly text description of the discount from AssetConfig
     *
     * @param {string} assetConfig - The asset configuration JSON string
     * @returns {string} A user-friendly description of the discount
     */
    getDiscountText (assetConfig) {
      if (!assetConfig) return this.$t('NoDiscount')

      try {
        const config = JSON.parse(assetConfig)

        if (config.discountStr) {
          // If it's a percentage discount
          if (config.discountStr.includes('%')) {
            return config.discountStr
          }

          // If it's a fixed amount discount
          return `${config.discountStr} ${this.$t('Off')}`
        }

        if (config.maxDiscountAmount) {
          return `${this.$t('MaxDiscount')}: ${config.maxDiscountAmount}`
        }

        return this.$t('Discount')
      } catch (error) {
        console.error('Error parsing asset config:', error)
        return this.$t('Discount')
      }
    },

    /**
     * Calculates and returns the discount string from a voucher asset
     *
     * @param {Object} asset - The asset object
     * @returns {string} The processed discount string
     */
    calculateDiscount (asset) {
      if (!asset || !asset.assetInfo || asset.assetInfo.assetType !== 'VOUCHER') return ''

      const assetConfig = asset.assetInfo.assetConfig
      if (!assetConfig) return ''

      try {
        const config = JSON.parse(assetConfig)

        if (config.discountStr) {
          return config.discountStr
        }

        return ''
      } catch (error) {
        console.error('Error calculating discount:', error)
        return ''
      }
    },

    /**
     * Closes the dialog without saving
     */
    close () {
      this.show = false
    },

    /**
     * Saves the selected assets and closes the dialog
     * Emits only the asset IDs instead of full objects for efficiency
     */
    save () {
      // Extract just the asset IDs from the selected assets
      const selectedAssetIds = this.selectedAssets.map(asset => ({ id: asset.id }))

      this.$emit('save', {
        selectedAssets: selectedAssetIds,
        discount: this.calculatedDiscount
      })
      this.show = false
    }
  }
}
</script>

<style scoped>
.asset-dialog {
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8f9ff;
  display: flex;
  flex-direction: column;
  height: 80vh; /* Set a fixed height for the dialog */
}

/* Fixed header styles */
.fixed-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f8f9ff;
  border-bottom: 1px solid rgba(25, 118, 210, 0.1);
}

/* Scrollable content styles */
.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
}

.asset-card {
  position: relative;
  overflow: hidden;
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(25, 118, 210, 0.1);
  background-color: rgba(25, 118, 210, 0.02);
}

.asset-card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(25, 118, 210, 0.15) !important;
  border: 1px solid rgba(25, 118, 210, 0.3);
}

.selected-asset {
  border: 2px solid #1976d2 !important;
  background-color: rgba(25, 118, 210, 0.05);
}

.asset-card-ribbon {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  overflow: hidden;
  z-index: 1;
}

.asset-card-ribbon:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 40px 40px 0;
  border-color: transparent #1976d2 transparent transparent;
}

.asset-card-ribbon .v-icon {
  position: absolute;
  top: 8px;
  right: 8px;
}

.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}

/* Custom scrollbar for a more refined look */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  display: block !important;
}

::-webkit-scrollbar-track {
  background: #e3f2fd;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #bbdefb;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #90caf9;
}
</style>
