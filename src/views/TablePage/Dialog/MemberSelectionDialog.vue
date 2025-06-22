<script>
/**
 * @component MemberSelectionDialog
 * @description A dialog for selecting members. Supports searching by name, ID, or NFC input.
 * Enhanced to handle NFC input format (aaden:member:shortCode) and improved error handling.
 * Uses only the new membership API as documented in membership_api.md.
 */
import {
  getBusinessLayerMembers,
  getCurrentBLID,
  getUserByShortCode,
  getMemberDisplayName
} from '@/api/MemberCloud/MemberCloudApi'
import dayjs from 'dayjs'
import MemberDetailDialog from './MemberDetailDialog.vue'

export default {
  name: 'MemberSelectionDialog',
  props: {
    /**
     * Controls the visibility of the dialog
     */
    value: {},
    /**
     * The ID of the currently selected member, if any
     */
    currentMemberId: {}
  },
  data: function () {
    return {
      show: null,
      memberList: [],
      selectedMemberId: null,
      searchText: null,
      loading: false,
      error: null,
      businessLayerId: null,
      showDetailDialog: false,
      detailMemberId: null
    }
  },
  components: {
    MemberDetailDialog
  },
  computed: {
    selectedMember () {
      return this.memberList.find(it => it.userId === this.selectedMemberId)
    },
    filteredList () {
      return this.memberList.filter(it => {
        if (!this.searchText) {
          return true
        } else {
          // Adapt to the new API data structure (UserBusinessLayerListDTO)
          const cloudUser = it.cloudUserInfo || {}
          const str = [
            cloudUser.name,
            it.userId,
            cloudUser.email,
            cloudUser.displayName
          ].filter(Boolean).join(',')
          return str.toLowerCase().includes(this.searchText.toLowerCase())
        }
      }).slice(0, 10)
    }
  },
  methods: {
    /**
     * Formats a date string to a user-friendly format
     *
     * @param {string} dateString - The date string to format
     * @returns {string} The formatted date string
     */
    formatDate (dateString) {
      if (!dateString) return this.$t('NoConsumption')
      return dayjs(dateString).format('YYYY-MM-DD HH:mm')
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
     * Gets the display name for a member
     *
     * @param {Object} member - The member object
     * @returns {string} The member's display name
     */
    getDisplayName (member) {
      return getMemberDisplayName(member, this.$t('NoName'))
    },

    // These methods are no longer needed as we close the dialog immediately after selection

    /**
     * Gets the business layer ID for the current device
     *
     * @returns {Promise<string>} The business layer ID
     */
    async getBusinessLayerId () {
      if (this.businessLayerId) {
        return this.businessLayerId
      }

      try {
        // Get the current Business Layer ID (BLID)
        this.businessLayerId = await getCurrentBLID()
        return this.businessLayerId
      } catch (error) {
        console.error('Error getting business layer ID:', error)
        throw error
      }
    },

    /**
     * Parses NFC input to extract the shortCode
     *
     * @param {string} input - The input string to parse
     * @returns {string|null} The extracted shortCode or null if not in NFC format
     */
    parseNfcInput (input) {
      // Check if input is in the format "aaden:member:shortCode"
      const regex = /^aaden:member:(.+)$/
      const match = input.match(regex)
      if (match) {
        return match[1] // Return the shortCode
      }
      return null
    },

    /**
     * Searches for a member by their shortCode using the cloud API
     *
     * @param {string} shortCode - The shortCode to search for
     * @returns {Promise<void>}
     */
    async searchByShortCode (shortCode) {
      try {
        this.loading = true
        this.error = null
        const member = await getUserByShortCode(shortCode)
        if (member) {
          // Transform the member to match the UserBusinessLayerListDTO structure
          // This is a temporary solution until the API is fully updated
          const transformedMember = {
            userId: member.id,
            cloudUserInfo: {
              name: member.name,
              displayName: member.displayName,
              email: member.email
            },
            currentMembership: {
              points: member.points,
              balance: member.balance,
              userTotalConsume: member.totalConsume || 0,
              userLastConsumeAt: member.lastConsumeAt || null
            }
          }
          this.memberList = [transformedMember]
          this.selectedMemberId = transformedMember.userId
        } else {
          this.error = this.$t('MemberNotFound')
        }
      } catch (error) {
        console.error('Error searching by short code:', error)
        this.error = this.$t('ErrorSearchingMember')
      } finally {
        this.loading = false
      }
    },

    /**
     * Initializes the component by loading the member list
     */
    async init () {
      try {
        this.loading = true
        this.error = null

        // Get the business layer ID
        const blId = await this.getBusinessLayerId()

        // Get the members for the business layer
        const members = await getBusinessLayerMembers(blId)
        this.memberList = members || []

        this.searchText = ''
        this.selectedMemberId = null
        if (this.currentMemberId) {
          this.selectedMemberId = this.currentMemberId
        }
      } catch (error) {
        console.error('Error initializing member list:', error)
        this.error = this.$t('ErrorLoadingMembers')
      } finally {
        this.loading = false
      }
    },

    /**
     * Opens the member detail dialog for the specified member
     *
     * @param {string} memberId - The ID of the member to show details for
     */
    openMemberDetail (memberId) {
      this.detailMemberId = memberId
      this.showDetailDialog = true
    },

    /**
     * Handles the back event from the detail dialog
     */
    handleDetailBack () {
      this.showDetailDialog = false
    },

    /**
     * Handles the select event from the detail dialog
     *
     * @param {string} memberId - The ID of the selected member
     */
    handleDetailSelect (memberId) {
      this.selectedMemberId = memberId
      this.showDetailDialog = false
    },

    /**
     * Confirms the selection of the current member and closes the dialog
     * This is called when the user explicitly clicks the "Select" button
     */
    confirmSelection () {
      if (this.selectedMember) {
        // Get the member's display name using our method
        const memberName = this.getDisplayName(this.selectedMember)

        // Emit both the member ID, name, and balance
        this.$emit('update', {
          id: this.selectedMemberId,
          name: memberName,
          balance: this.selectedMember.balance || 0
        })
      }
      this.show = false
    }
  },
  watch: {
    value (val) {
      this.show = val
      if (val) {
        this.init()
      }
    },
    show (val) {
      if (!val) {
        this.$emit('input', val)
      }
    },
    async searchText (val) {
      if (!val) return

      // Check if input is in NFC format
      const shortCode = this.parseNfcInput(val)
      if (shortCode) {
        // If it's in NFC format, search by shortCode
        await this.searchByShortCode(shortCode)
      }
    }
  }
}
</script>

<template>
  <v-dialog max-width="400" v-model="show">
    <v-card class="pa-6">
      <!-- Member detail dialog -->
      <member-detail-dialog
        v-model="showDetailDialog"
        :member-id="detailMemberId"
        @back="handleDetailBack"
        @select="handleDetailSelect"
      ></member-detail-dialog>
      <div class="text-h5">
        {{ $t('SelectVipMemberReferToOrder') }}
      </div>
      <v-text-field
          @focus="searchText=''"
          v-model="searchText"
          class="mt-4"
          autofocus
          filled
          hide-details
          outlined
          append-icon="mdi-magnify"
          :loading="loading"
          :disabled="loading"
      />
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
      <div v-else style="max-height: 40vh;overflow-y: scroll">
        <v-card
          elevation="0"
          class="my-4 pa-4"
          color="grey lighten-4"
          v-for="member in filteredList"
          :key="member.userId"
        >
          <!-- Top row with name or email -->
          <div class="d-flex align-center mb-2">
            <div
              class="text-body-1"
              :class="{'font-weight-bold black--text': member.userId === currentMemberId, 'font-weight-medium': member.userId !== currentMemberId}"
            >
              {{ getDisplayName(member) }}
            </div>
            <v-spacer></v-spacer>
            <v-chip
              v-if="member.userId === currentMemberId"
              color="primary"
              small
              class="px-2 font-weight-medium white--text"
            >
              {{ $t('Selected') }}
            </v-chip>
          </div>

          <!-- Middle row with email and shortcode -->
          <div class="d-flex align-center mb-2">
            <div class="text-caption text--secondary">
              <v-icon small class="mr-1">mdi-email</v-icon>
              {{ member.cloudUserInfo?.email || $t('NoEmail') }}
            </div>
            <v-spacer></v-spacer>
            <div class="text-caption text--secondary">
              <v-icon small class="mr-1">mdi-card-account-details</v-icon>
              {{ member.cloudUserInfo?.shortcode || $t('NoShortCode') }}
            </div>
          </div>

          <!-- Bottom row with last consumption and total consumption -->
          <div class="d-flex align-center">
            <div class="text-caption text--secondary">
              <v-icon small class="mr-1">mdi-clock-outline</v-icon>
              {{ member.currentMembership?.userLastConsumeAt ? formatDate(member.currentMembership.userLastConsumeAt) : $t('NoConsumption') }}
            </div>
            <v-spacer></v-spacer>
            <div class="text-caption text--secondary">
              <v-icon small class="mr-1">mdi-cash-multiple</v-icon>
              {{ member.currentMembership?.userTotalConsume ? formatCurrency(member.currentMembership.userTotalConsume) : '0.00' }}
            </div>
          </div>

          <!-- Action buttons -->
          <div class="d-flex justify-end mt-2">
            <v-btn
              small
              text
              color="primary"
              class="mr-2"
              @click.stop="openMemberDetail(member.userId)"
            >
              <v-icon left small>mdi-information</v-icon>
              {{ $t('Details') }}
            </v-btn>
            <v-btn
              small
              text
              :color="member.userId === currentMemberId ? 'success' : 'primary'"
              @click.stop="selectedMemberId=member.userId; confirmSelection()"
            >
              <v-icon left small>{{ member.userId === currentMemberId ? 'mdi-check-circle' : 'mdi-check' }}</v-icon>
              {{ $t('Select') }}
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
