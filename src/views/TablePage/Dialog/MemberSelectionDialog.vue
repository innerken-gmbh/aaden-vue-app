<script>
/**
 * @component MemberSelectionDialog
 * @description A dialog for selecting members. Supports searching by name, ID, or NFC input.
 * Enhanced to handle NFC input format (aaden:member:shortCode) and improved error handling.
 */
import { addBonusPoint, getBonusRecord, searchNfcCard } from '@/api/VIPCard/VIPApi'
import { getUserByShortCode } from '@/api/MemberCloud/MemberCloudApi'
import IKUtils from 'innerken-js-utils'

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
      bonusList: [],
      selectedMemberId: null,
      searchText: null,
      loading: false,
      error: null
    }
  },
  computed: {
    totalBonus () {
      return this.bonusList?.reduce((sum, i) => sum + parseInt(i.bonusPointChange), 0) ?? 0
    },
    selectedMember () {
      return this.memberList.find(it => it.id === this.selectedMemberId)
    },
    filteredList () {
      return this.memberList.filter(it => {
        if (!this.searchText) {
          return true
        } else {
          const str = [it.name, it.birthday, it.uid, it.email].join(',')
          return str.includes(this.searchText)
        }
      }).slice(0, 10)
    }
  },
  methods: {
    /**
     * Confirms the member selection and closes the dialog
     */
    submitSelection () {
      this.show = false
    },

    /**
     * Cancels the member selection, emits null, and closes the dialog
     */
    cancelSelection () {
      this.$emit('update', null)
      this.show = false
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
          this.memberList = [member]
          this.selectedMemberId = member.id
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
    async init () {
      try {
        this.loading = true
        this.error = null
        this.memberList = await searchNfcCard()
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
    async reloadAndGoBack (action) {
      const id = this.selectedMemberId
      try {
        await action()
        await this.init()
        this.selectedMemberId = id
      } catch (e) {

      }
    },
    async changeBonusPoint () {
      this.show = false
      const newAmount = await IKUtils.showInput(this.$t('EnterNewPointAmount'), 'number',
        this.$t('ActuallyScore') + ': ' + this.totalBonus)
      if (newAmount) {
        const modify = (parseFloat(newAmount) -
            parseFloat(this.totalBonus)).toFixed(2)
        await this.reloadAndGoBack(async () => {
          await addBonusPoint(this.selectedMember.uid, modify)
          await this.init()
        })
      }
      this.show = true
    }
  },
  watch: {
    async selectedMember () {
      if (this.selectedMember) {
        this.$emit('update', this.selectedMemberId)
        try {
          this.loading = true
          this.error = null
          this.bonusList = await getBonusRecord(this.selectedMember.uid)
        } catch (error) {
          console.error('Error getting bonus record:', error)
          this.error = this.$t('ErrorLoadingBonusRecord')
        } finally {
          this.loading = false
        }
      }
    },
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
      <template v-if="!selectedMemberId">
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
          <v-card @click="selectedMemberId=member.id" elevation="0" class="my-4 pa-4 d-flex align-center" color="grey lighten-4"
                  v-for="member in filteredList" :key="member.id">
            <div class="text-body-1">{{ member.name }}</div>
            <v-spacer></v-spacer>
            <div class="text-body-2 text--secondary">{{ member.uid }}</div>
          </v-card>
        </div>
      </template>
      <template v-else>
        <v-btn @click="selectedMemberId=null" elevation="0" color="grey lighten-4" :disabled="loading">
          <v-icon left
          >mdi-arrow-left</v-icon>
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
        <template v-else>
          <div class="text-h5 mt-4">
            {{selectedMember.name}}
          </div>
          <div class="text-body-2 text--secondary mt-4">
            {{selectedMember.uid}}
          </div>
          <v-divider class="my-4"></v-divider>
          <div class="mt-2" style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr))">
            <div >
              <div class="text-body-2">{{ $t('Balance') }}</div>
              <div class="text-h5">{{ selectedMember.voucherTotal | priceDisplay }}</div>
            </div>
            <div @click="changeBonusPoint" class="d-flex align-center pr-4">
              <div>
                <div class="text-body-2">{{ $t('Integral') }}</div>
                <div class="text-h5">{{ totalBonus }}</div>
              </div>
              <v-spacer></v-spacer>
              <v-icon>mdi-swap-horizontal</v-icon>
            </div>
          </div>
          <v-divider class="my-4"></v-divider>
          <div class="d-flex mt-4">
            <v-btn @click="submitSelection" elevation="0" color="amber lighten-4 black--text">
              {{ $t('Confirm') }}
            </v-btn>
            <v-btn @click="cancelSelection"  elevation="0" class="ml-4" color="grey lighten-4 black--text">
              {{ $t('Cancel') }}
            </v-btn>
          </div>
        </template>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
