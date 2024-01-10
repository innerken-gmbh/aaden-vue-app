<template>
  <v-card
      class="d-flex pa-4 flex-column justify-center align-start"
      color="transparent"
      elevation="0"
  >
    <div class="text-h4 font-weight-black">{{ $t('CurrentAddress') }}</div>
    <div class="text-body-1 mt-2">
      <div class="font-weight-bold text-capitalize">
        {{ address.firstName }} {{ address.lastName }}
      </div>
      <filter-empty-string-displayer :data="address.addressLine1">
        <b>{{ address.addressLine1 }}</b>
      </filter-empty-string-displayer>
      <filter-empty-string-displayer :data="address.addressLine2">
        {{ address.addressLine2 }}
      </filter-empty-string-displayer>
      <filter-empty-string-displayer :data="address.city+address.plz">
        {{ address.city }} {{ address.plz }}
      </filter-empty-string-displayer>
      <filter-empty-string-displayer :data="address.email">
        {{ address.email }}<br>
      </filter-empty-string-displayer>
      <filter-empty-string-displayer :data="address.tel">
        {{ address.tel }}
      </filter-empty-string-displayer>
      <div class="text-body-1 ">
        {{ address.date }}
      </div>
    </div>
    <v-btn
        @click="$emit('change')"
        color="grey lighten-2"
        elevation="0"
        class="mt-4"
    >
      <v-icon left>mdi-swap-horizontal</v-icon>
      {{ $t('ChangeAdress') }}
    </v-btn>

  </v-card>
</template>

<script>
import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import FilterEmptyStringDisplayer from '@/views/TablePage/Address/filterEmptyStringDisplayer'

export default {
  name: 'AddressesCard',
  components: { FilterEmptyStringDisplayer },
  props: {
    rawAddressInfo: {}
  },
  data: function () {
    return {
      expand: false
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
