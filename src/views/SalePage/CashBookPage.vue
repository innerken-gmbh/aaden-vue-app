<template>
  <div>
    <div class="d-flex justify-center align-center  px-4 py-2">
      <div class="text-h5">{{ $t('CashBook') }}</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn :loading="btnLoading" class="amber lighten-4 black--text" elevation="0" large
               @click="newCashBookDialog = true">
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('New') }}
        </v-btn>
      </div>
    </div>
    <template v-if="!loading">
      <v-simple-table class="transparent" fixed-header height="calc(100vh - 124px)">
        <template v-slot:default>
          <thead class="transparent">
          <tr>
            <th class="text-left">{{ $t('Date') }}</th>
            <th>{{ $t('sum') }}</th>
            <th class="text-left">{{ $t('purpose') }}</th>
            <th class="text-left">{{ $t('Details') }}</th>
            <th class="text-left" style="width: max-content">{{ $t('note') }}</th>
            <th class="text-left" style="width: max-content">{{ $t('file') }}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="item in cashBookInfo">
            <tr v-bind:key="item.id">
              <td>
                <span class="font-weight-bold">{{ item.updateTimestamp }}</span>
              </td>
              <td>{{ item.payLogAmount | priceDisplay }}</td>
              <td>
                {{ item.usageName }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.cashAccountNote }}
              </td>
              <td>
                <v-btn @click="downloadFiles(item)" outlined class="elevation-0" v-if="item.noteFile">
                  {{ $t('file') }}
                </v-btn>
              </td>
            </tr>
          </template>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <template v-else>
      <div
        class="d-flex align-center justify-center"
        style="height: 70vh"
      >
        <v-progress-circular
          indeterminate
          size="64"
        />
      </div>
    </template>
    <v-dialog v-model="newCashBookDialog" max-width="600px">
      <v-card
        class="px-8 py-6 d-flex flex-column"
        color="white"
        elevation="0"
      >
        <div class="d-flex align-center justify-center">
          <div class="text-h5 font-weight-bold">{{ $t('AddCashOperation') }}</div>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="newCashBookDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="mt-8">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <div class="text-overline">
              {{ $t('inOrOut') }}
            </div>
            <v-select
                v-model="cashbookType"
                :items="lrType"
                :rules="rules"
                dense
                hide-details
                item-text="label"
                item-value="value"
                outlined
            />
            <div class="text-overline">
              {{ $t('purpose') }}
            </div>
            <v-select
                v-model="editItem.cashAccountUsageId"
                :items="currentAccountList"
                :rules="rules"
                dense
                hide-details
                item-text="usageName"
                item-value="id"
                outlined
            />
            <div class="text-overline">
              {{ $t('TaxRate') }}
            </div>
            <v-select
                v-model="taxRate"
                :items="taxArray"
                dense
                hide-details
                item-text="displayName"
                item-value="rateValue"
                outlined
            />
            <div
                v-for="(item,index) in currentAmountList"
                :key="index"
            >
              <div class="text-overline">
                {{ item.displayName }}
              </div>
              <v-text-field
                  v-model="item.amount"
                  :rules="rules"
                  dense
                  hide-details
                  outlined
              />
            </div>
            <div
                v-if="showCashBoxInfo"
                class="text-overline"
            >
              {{ $t('CashBox') }}
            </div>
            <v-select
                v-if="showCashBoxInfo"
                v-model="editItem.cashBoxId"
                :items="cashBoxList"
                :rules="rules"
                dense
                hide-details
                item-text="name"
                item-value="id"
                outlined
            />
            <div class="text-overline">
              {{ $t('note') }}
            </div>
            <v-text-field
                v-model="editItem.note"
                dense
                hide-details
                outlined
            />
            <div class="text-overline">
              {{ $t('file') }}
            </div>
            <v-file-input
                v-model="editItem.file"
                dense
                hide-details
                outlined
            />
          </v-form>
        </div>
        <v-btn :loading="btnLoading" class="amber lighten-4 black--text mt-8" elevation="0" width="100%" x-large
               @click="save">
          {{ $t('Save') }}
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  addNewCshBook,
  forceGetSystemSetting,
  getAllCashAccount,
  getCashAccount,
  getCashBookList,
  getCashBoxList, getLatestTaxRateNames
} from '@/api/api'
import { getBaseAndUrlForDeviceId } from '@/api/restaurantInfoService'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import i18n from '@/i18n'

export default {
  name: 'CashBookPage',
  props: {
    date: {},
    tabIndex: {}
  },
  data: function () {
    return {
      cashbookType: '',
      lrType: [{ label: i18n.t('deposit'), value: '1' },
        { label: i18n.t('withdraw'), value: '2' }],
      accountUsageList: [],
      taxRate: '',
      taxArray: [{ id: -1, name: 'Mix', displayName: 'Mix', rateValue: '' }],
      showCashBoxInfo: false,
      cashBoxList: [],
      editItem: {},
      defaultItem: {
        amount: '',
        note: '',
        cashBoxId: '',
        cashAccountUsageId: '',
        amountA: '0',
        amountB: '0',
        amountC: '0',
        file: null
      },

      btnLoading: false,
      loading: false,
      price: '',
      operateType: null,
      note: '',
      rules: [
        v => !!v || 'This is required'
      ],
      valid: true,
      operateTypeList: [],
      newCashBookDialog: false,
      cashBookInfo: []
    }
  },
  watch: {
    async date () {
      await this.reload()
    },
    newCashBookDialog (val) {
      if (!val) {
        this.note = ''
        this.operateType = null
        this.price = ''
      }
    }
  },
  mounted () {
    this.reload()
  },
  computed: {
    currentAccountList () {
      return this.accountUsageList.filter(it => it.lrMark === this.cashbookType)
    },
    currentAmountList () {
      const res = this.taxArray
      if (this.taxRate) {
        return res.filter(it => it.rateValue === this.taxRate)
      } else {
        return res.filter(it => it.id !== -1)
      }
    }
  },
  methods: {
    async downloadFiles (item) {
      console.log(item, 'item')
      const { url } = await getBaseAndUrlForDeviceId(GlobalConfig.DeviceId)
      window.open(url + '/Resource/' + item.noteFile)
    },
    async save () {
      this.btnLoading = true
      const currentAccount = this.accountUsageList.find(it => it.id === this.editItem.cashAccountUsageId)
      this.editItem.amountA = this.currentAmountList.find(it => it.name === 'A')?.amount ?? 0
      this.editItem.amountB = this.currentAmountList.find(it => it.name === 'B')?.amount ?? 0
      this.editItem.amountC = this.currentAmountList.find(it => it.name === 'C')?.amount ?? 0
      if (currentAccount.lrMark === '2') {
        this.editItem.amount = parseFloat(this.editItem.amount) * -1
        this.editItem.amountA = parseFloat(this.editItem.amountA) * -1
        this.editItem.amountB = parseFloat(this.editItem.amountB) * -1
        this.editItem.amountC = parseFloat(this.editItem.amountC) * -1
      }
      this.editItem.amount = parseFloat(this.editItem.amountA) + parseFloat(this.editItem.amountB) + parseFloat(this.editItem.amountC)
      await addNewCshBook(this.editItem)
      this.btnLoading = false
      this.newCashBookDialog = false
      await this.reload()
    },
    async reload () {
      this.loading = true
      this.operateTypeList = await getAllCashAccount()
      this.cashBookInfo = await getCashBookList(this.date)
      console.log(this.cashBookInfo, 'info')
      this.accountUsageList = await getCashAccount()
      this.latestTaxRateNames = await getLatestTaxRateNames()
      this.taxArray = this.taxArray.concat(this.latestTaxRateNames).map(it => {
        if (it.rateValue) {
          it.displayName = (parseFloat(it.rateValue) * 100).toFixed(0) + '%'
        }
        return it
      })
      const res = await forceGetSystemSetting({
        section: 'CashBox',
        sKey: 'enabled',
        sValue: '0',
        defaultValue: '0',
        sType: 'boolean',
        minimumVersion: '1.7.825',
        sOptions: '',
        tagList: 'basic,cash,box'
      })
      if (res === '1') {
        this.showCashBoxInfo = true
        this.cashBoxList = await getCashBoxList()
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
