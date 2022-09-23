<template>
  <div @click="openAddressForm">
    <template v-if="rawAddressInfo">
      <address-pill :address="address"/>
    </template>
    <address-form
        :current-address="address"
        @address-submit="submit"
        :menu-show.sync="showMenu"
    >
      <v-btn @click="deleteAddress" v-if="rawAddressInfo">
        <v-icon left>mdi-trash-can</v-icon>
        {{ $t('delete_address') }}
      </v-btn>
    </address-form>
  </div>

</template>

<script>
import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import AddressPill from '@/views/TablePage/Address/AddressPill'
import AddressForm from '@/views/TablePage/Address/AddressForm'

export default {
  name: 'AddressDisplay',
  components: {
    AddressPill,
    AddressForm
  },
  props: {
    rawAddressInfo: {},
    consumeTypeStatusId: {},
    shouldOpenMenu: {
      default: false
    }
  },
  data: function () {
    return {
      showMenu: null
    }
  },
  methods: {
    openAddressForm () {
      this.showMenu = !this.showMenu
    },
    submit (event) {
      this.$emit('address-change', event)
    },
    deleteAddress () {
      this.$emit('address-change', {})
    }
  },
  watch: {
    showMenu: function (val) {
      this.$emit('update:shouldOpenMenu', val)
    },
    shouldOpenMenu: async function (val) {
      this.showMenu = val
    }
  },
  computed: {
    address () {
      return Object.assign({}, DefaultAddressInfo, this.rawAddressInfo)
    }
  }
}
</script>

<style scoped>

</style>
