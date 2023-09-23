<template>
  <v-app>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <pin-dialog></pin-dialog>
    <table-selector></table-selector>
    <v-dialog
        v-model="showErrorDialog"
        max-width="600"
    >
      <v-card class="pa-6 d-flex align-center justify-center flex-column">
        <v-icon
            color="error lighten-2"
            size="64"
        >
          mdi-alert-box
        </v-icon>
        <div class="text-h4 mt-6">
          {{ errorDialogTitle }}
        </div>
        <div class="text-body-2 mt-2">
          {{ errorDialogMessage }}
        </div>
        <v-btn
            class="primary lighten-4 black--text mt-4"
            elevation="0"
            @click="showErrorDialog=false"
        >
          {{ $t('confirm') }}
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showOrderDetail"
      max-width="600px"
      persistent
    >
      <v-card
        v-if="showOrderDetail"
        color="#f6f6f6"
        tile
      >
      <bill-detail-page
        :checkout-type="selectedCheckoutType"
        :order-id="billDetailOrderId"
      />
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { tryToReport } from './oldjs/common'
import TableSelector from '@/components/GlobalDialog/TableSelector'
import PinDialog from '@/components/GlobalDialog/PinDialog'
import { mapState } from 'vuex'
import BillDetailPage from '@/components/GlobalDialog/BillDetailPage'

export default {
  name: 'App',
  components: {
    BillDetailPage,
    TableSelector,
    PinDialog
  },
  props: {},
  data: () => ({}),
  computed: {
    ...mapState(
      ['errorDialogTitle', 'errorDialogMessage', 'billDetailOrderId', 'selectedCheckoutType']),
    showErrorDialog: {
      get () {
        return this.$store.state.showErrorDialog
      },
      set (val) {
        if (!val) {
          this.closeErrorDialog()
        }
      }
    },
    showOrderDetail: {
      get () {
        return this.$store.state.showOrderDetail
      },
      set (val) {
        if (!val) {
          this.closeOrderDetail()
        }
      }
    }
  },
  mounted () {
    tryToReport()
  }
}
</script>

<style lang="sass">

.theme--light.v-application
  background: transparent
  color: rgba(0, 0, 0, .87)

::-webkit-scrollbar
  display: none

body
  font-family: Arial, Lantinghei SC, sans-serif, serif
  user-select: none
  overflow: hidden

[v-cloak]
  display: none

nav
  position: fixed
  top: 0
  z-index: 1001

.languageSwitch div
  cursor: pointer
  margin-left: 4px

.languageSwitch .active
  color: var(--v-primary-base)

.v-data-table td
  padding: 0 16px !important

</style>
