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
      v-model="showBillDetailQRDialog"
      max-width="600"
    >
      <v-card class="pa-4">
        <div class="d-flex">
          <div class="text-h5">
            {{ $t('ElectronicBill') }}
          </div>
          <v-spacer/>
          <div>
            <v-btn
              icon
              @click="showBillDetailQRDialog = false"
            >
              <v-icon large>
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="d-flex justify-center align-center flex-column py-6">
          <div class="d-flex">
            <div class="pa-4 white">
              <v-img
                :aspect-ratio="1"
                :src="'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data='+ billDetailUrlHead + billDetailQr"
                width="196"
              />
            </div>
          </div>
          <div>
            {{billDetailQr}}
          </div>
        </div>
        <div class="text-body-2 mt-1">{{ $t('ElectronicBillHint') }}</div>
        <div class="mt-4">
          <v-text-field v-model="email" hide-details outlined :placeholder="$t('ElectronicBillReceiver')"/>
        </div>
        <div v-if="email" class="mt-4 d-flex justify-center">
          <v-btn class="mr-2" color="primary" elevation="0" width="100%" @click="sendToEmail">
            <v-icon left>mdi-arrow-right</v-icon>
            {{ $t('SentOutMail') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { tryToReport } from './oldjs/common'
import TableSelector from '@/components/GlobalDialog/TableSelector'
import PinDialog from '@/components/GlobalDialog/PinDialog'
import { mapMutations, mapState } from 'vuex'
import { sendMailTo } from '@/api/api'

export default {
  name: 'App',
  components: {
    TableSelector,
    PinDialog
  },
  props: {},
  data: function () {
    return {
      email: ''
    }
  },
  computed: {
    ...mapState(
      ['errorDialogTitle', 'errorDialogMessage', 'billDetailQr', 'billDetailUrlHead']),

    showBillDetailQRDialog: {
      get () {
        return this.$store.state.showBillDetailQRDialog
      },
      set (val) {
        if (!val) {
          this.closeBillDetailQRDialog()
        }
      }
    },
    showErrorDialog: {
      get () {
        return this.$store.state.showErrorDialog
      },
      set (val) {
        if (!val) {
          this.closeErrorDialog()
        }
      }
    }
  },
  mounted () {
    tryToReport()
  },
  methods: {
    ...mapMutations(['closeBillDetailQRDialog', 'closeErrorDialog']),

    async sendToEmail () {
      await sendMailTo(this.email, this.billDetailQr)
      this.email = ''
      this.closeBillDetailQRDialog()
    }
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
