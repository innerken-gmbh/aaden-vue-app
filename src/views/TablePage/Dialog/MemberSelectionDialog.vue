<script>
import { addBonusPoint, getBonusRecord, searchNfcCard } from '@/api/VIPCard/VIPApi'
import IKUtils from 'innerken-js-utils'

export default {
  name: 'MemberSelectionDialog',
  props: {
    value: {},
    currentMemberId: {}
  },
  data: function () {
    return {
      show: null,
      memberList: [],
      bonusList: [],
      selectedMemberId: null,
      searchText: null
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
    submitSelection () {
      this.show = false
    },
    cancelSelection () {
      this.$emit('update', null)
      this.show = false
    },
    async init () {
      this.memberList = await searchNfcCard()

      this.searchText = ''
      this.selectedMemberId = null
      if (this.currentMemberId) {
        this.selectedMemberId = this.currentMemberId
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
        this.$t('ActuallyScore' + ': ') + this.totalBonus)
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
        this.bonusList = await getBonusRecord(this.selectedMember.uid)
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
        />
        <div style="max-height: 40vh;overflow-y: scroll">
          <v-card @click="selectedMemberId=member.id" elevation="0" class="my-4 pa-4 d-flex align-center" color="grey lighten-4"
                  v-for="member in filteredList" :key="member.id">
            <div class="text-body-1">{{ member.name }}</div>
            <v-spacer></v-spacer>
            <div class="text-body-2 text--secondary">{{ member.uid }}</div>
          </v-card>
        </div>
      </template>
      <template v-else>
        <v-btn @click="selectedMemberId=null" elevation="0" color="grey lighten-4">
          <v-icon left
          >mdi-arrow-left</v-icon>
          {{ $t('Return') }}
        </v-btn>
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
          <v-btn @click="submitSelection" elevation="0" color="primary lighten-4 black--text">
            {{ $t('Sure') }}
          </v-btn>
          <v-btn @click="cancelSelection"  elevation="0" class="ml-4" color="grey lighten-4 black--text">
            {{ $t('Recall') }}
          </v-btn>
        </div>

      </template>
    </v-card>

  </v-dialog>

</template>

<style scoped>

</style>
