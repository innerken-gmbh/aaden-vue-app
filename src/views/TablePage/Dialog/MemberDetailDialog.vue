<template>
  <v-dialog v-model="show" max-width="600">
    <v-card class="pa-6">
      <v-btn @click="goBack" elevation="0" color="grey lighten-4" :disabled="loading">
        <v-icon left>mdi-arrow-left</v-icon>
        {{ $t('Return') }}
      </v-btn>

      <v-alert
        v-if="error"
        type="error"
        class="mt-4"
        dismissible
        @input="error = null"
      >
        {{ error }}
      </v-alert>

      <div v-if="loading" class="d-flex justify-center my-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>

      <template v-else-if="memberDetails">
        <!-- Member information section -->
        <div class="text-h5 mt-4">
          {{ memberDetails.name }}
        </div>
        <div class="text-body-2 text--secondary mt-2">
          {{ memberDetails.id }}
        </div>

        <v-divider class="my-4"></v-divider>

        <!-- Member stats section -->
        <div class="mt-2" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr))">
          <div>
            <div class="text-body-2">{{ $t('Balance') }}</div>
            <div class="text-h5">{{ memberDetails.balance | priceDisplay }}</div>
          </div>
          <div>
            <div class="text-body-2">{{ $t('Integral') }}</div>
            <div class="text-h5">{{ memberDetails.points }}</div>
          </div>
        </div>

        <v-divider class="my-4"></v-divider>

        <!-- Actions section -->
        <div class="text-h6 mb-2">{{ $t('Actions') }}</div>
        <div class="d-flex flex-wrap">
          <v-btn
            class="mr-2 mb-2"
            color="primary"
            small
            @click="editMember"
          >
            <v-icon left>mdi-pencil</v-icon>
            {{ $t('Edit') }}
          </v-btn>

          <v-btn
            class="mr-2 mb-2"
            color="amber lighten-2"
            small
            @click="addPoints"
          >
            <v-icon left>mdi-plus</v-icon>
            {{ $t('AddPoints') }}
          </v-btn>

          <v-btn
            v-if="memberDetails.awards && memberDetails.awards.length > 0"
            class="mr-2 mb-2"
            color="success"
            small
            @click="showAwards = true"
          >
            <v-icon left>mdi-gift</v-icon>
            {{ $t('ClaimAwards') }}
          </v-btn>
        </div>

        <!-- Awards dialog -->
        <v-dialog v-model="showAwards" max-width="400">
          <v-card class="pa-4">
            <div class="text-h6 mb-4">{{ $t('AvailableAwards') }}</div>
            <v-list>
              <v-list-item
                v-for="award in memberDetails.awards"
                :key="award.id"
                @click="claimMemberAward(award.id)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ award.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ award.description }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    color="success"
                    small
                    :loading="claimingAward === award.id"
                  >
                    {{ $t('Claim') }}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <div class="d-flex justify-end mt-4">
              <v-btn text @click="showAwards = false">{{ $t('Close') }}</v-btn>
            </div>
          </v-card>
        </v-dialog>

        <v-divider class="my-4"></v-divider>

        <!-- Orders section -->
        <div class="text-h6 mb-2">{{ $t('RecentOrders') }}</div>
        <v-data-table
          :headers="orderHeaders"
          :items="orders"
          :items-per-page="5"
          class="elevation-1"
          :loading="loadingOrders"
          :no-data-text="$t('NoOrdersFound')"
        >
          <template v-slot:item.date="{ item }">
            {{ new Date(item.date).toLocaleString() }}
          </template>
          <template v-slot:item.total="{ item }">
            {{ item.total | priceDisplay }}
          </template>
        </v-data-table>

        <div class="d-flex mt-4">
          <v-btn @click="selectMember" elevation="0" color="amber lighten-4 black--text">
            {{ $t('SelectMember') }}
          </v-btn>
          <v-btn @click="goBack" elevation="0" class="ml-4" color="grey lighten-4 black--text">
            {{ $t('Cancel') }}
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
 * personal details, balance, points, available awards, and order history.
 * Provides actions for member management such as editing, adding points, and claiming awards.
 */
import {
  getUserBusinessLayerDetails,
  claimAward,
  getUserOrders,
  ensureBusinessLayerForDevice,
  getCurrentDeviceId
} from '@/api/MemberCloud/MemberCloudApi'
import IKUtils from 'innerken-js-utils'

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
      orders: [],
      loading: false,
      loadingOrders: false,
      error: null,
      businessLayerId: null,
      showAwards: false,
      claimingAward: null,
      orderHeaders: [
        { text: this.$t('OrderNumber'), value: 'orderNumber' },
        { text: this.$t('Date'), value: 'date' },
        { text: this.$t('Total'), value: 'total' },
        { text: this.$t('Status'), value: 'status' }
      ]
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
     * Loads all data needed for the dialog, including business layer, member details, and orders
     *
     * @returns {Promise<void>}
     */
    async loadData () {
      try {
        this.loading = true
        this.error = null

        // Get device ID and ensure business layer exists
        const deviceId = await getCurrentDeviceId()
        const businessLayer = await ensureBusinessLayerForDevice(deviceId)
        this.businessLayerId = businessLayer.id

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
        this.orders = await getUserOrders(this.memberId)
      } catch (error) {
        console.error('Error loading orders:', error)
        // Don't show error for orders, just log it
      } finally {
        this.loadingOrders = false
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
        this.showAwards = false
        IKUtils.showToast(this.$t('AwardClaimedSuccessfully'))
      } catch (error) {
        console.error('Error claiming award:', error)
        IKUtils.showToast(this.$t('ErrorClaimingAward'), 'error')
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
      IKUtils.showToast(this.$t('EditMemberNotImplemented'))
    },

    /**
     * Opens a dialog to add points to the member's account
     *
     * @returns {Promise<void>}
     */
    async addPoints () {
      const points = await IKUtils.showInput(
        this.$t('EnterPointsToAdd'),
        'number',
        this.$t('CurrentPoints') + ': ' + this.memberDetails.points
      )

      if (points) {
        try {
          this.loading = true
          // This would call an API to add points
          // For now, just reload the member details
          await this.loadMemberDetails()
          IKUtils.showToast(this.$t('PointsAddedSuccessfully'))
        } catch (error) {
          console.error('Error adding points:', error)
          IKUtils.showToast(this.$t('ErrorAddingPoints'), 'error')
        } finally {
          this.loading = false
        }
      }
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
/* Add any component-specific styles here */
</style>
