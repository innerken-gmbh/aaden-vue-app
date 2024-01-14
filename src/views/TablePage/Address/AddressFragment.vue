<template>
  <div>
    <address-form
        :current-address="address"
        @address-submit="submit"
    >
      <v-btn
          @click="deleteAddress"
          v-if="rawAddressInfo"
      >
        <v-icon left>mdi-trash-can</v-icon>
        {{ $t('DeleteAddress') }}
      </v-btn>
    </address-form>
  </div>
</template>

<script>
import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import AddressForm from '@/views/TablePage/Address/AddressForm'

export default {
  name: 'AddressPage',
  components: {
    AddressForm
  },
  props: {
    rawAddressInfo: {},
    consumeTypeStatusId: {}
  },
  methods: {
    submit (event) {
      this.$emit('address-change', event)
    },
    deleteAddress () {
      this.$emit('address-change', {})
    }
  },
  computed: {
    address () {
      return Object.assign({}, DefaultAddressInfo, this.rawAddressInfo)
    }
  }
}
</script>

<style scoped></style>
