<template>
  <div>
    <div class="d-flex justify-center align-center  px-4 py-2">
      <div class="text-h5">{{ $t('CashBook') }}</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn :loading="btnLoading" class="primary lighten-4 black--text" elevation="0" large
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
            <th class="text-left">{{ $t('OrderNumber') }}</th>
            <th>{{ $t('TypeOfIncome') }}</th>
            <th class="text-left">{{ $t('Details') }}</th>
            <th class="text-left">{{ $t('note') }}</th>
            <th class="text-left" style="width: max-content">{{ $t('MoneyAmount') }}</th>
            <th class="text-left">{{ $t('Timestamp') }}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="item in cashBookInfo">
            <tr v-bind:key="item.id">
              <td>
                <span class="font-weight-bold">{{ item.orderId }}</span>
              </td>
              <td>{{ item.cashInCome }}</td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.cashAccountNote }}
              </td>
              <td>
                {{ item.payLogAmount | priceDisplay }}
              </td>
              <td>
                {{ item.updateTimestamp }}
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
            <div
              class="d-flex align-center justify-center my-4"
            >
              <div
                class="text-h5"
              >
                {{ $t('note') }}
              </div>
              <v-spacer/>
              <v-text-field
                v-model="note"
                :rules="rules"
                dense
                hide-details
                outlined
                style="max-width: 300px"
              />
            </div>
            <div
              class="d-flex align-center justify-center my-4"
            >
              <div
                class="text-h5"
              >
                {{ $t('MoneyAmount') }}
              </div>
              <v-spacer/>
              <v-text-field
                v-model="price"
                :rules="rules"
                dense
                hide-details
                outlined
                style="max-width: 300px"
              />
            </div>
            <div
              class="d-flex align-center justify-center my-4"
            >
              <div
                class="text-h5"
              >
                {{ $t('OperationType') }}
              </div>
              <v-spacer/>
              <v-select
                v-model="operateType"
                :items="operateTypeList"
                dense
                hide-details
                item-text="name"
                item-value="id"
                outlined
                style="max-width: 300px"
              />
            </div>
          </v-form>
        </div>
        <v-btn :loading="btnLoading" class="primary lighten-4 black--text mt-8" elevation="0" width="100%" x-large
               @click="save">
          {{ $t('Save') }}
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { addNewCashBookInfo, getAllCashAccount, getCashBookInfo } from '@/api/api'

export default {
  name: 'CashBookPage',
  props: {
    date: {},
    tabIndex: {}
  },
  data: function () {
    return {
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
  methods: {
    async save () {
      this.btnLoading = true
      const cashUseType = this.operateTypeList.find(it => it.id === this.operateType)
      const res = { cashAccountNote: this.note, cashType: this.operateType, payLogAmount: this.price, cashUseType: cashUseType.lrMark }
      await addNewCashBookInfo(res)
      this.btnLoading = false
      this.newCashBookDialog = false
      await this.reload()
    },
    async reload () {
      this.loading = true
      this.operateTypeList = await getAllCashAccount()
      this.cashBookInfo = await getCashBookInfo(this.date)
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
