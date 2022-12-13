<template>
  <div>
    <v-subheader>{{ $t('CurrentAddress') }}</v-subheader>
    <v-card-subtitle>
      <h2>
        {{ address.deliveryMethod }}
      </h2>
      <span v-if="address.date">{{ $t('ExpectedTime') }}:</span>
      <template v-if="address.oldTime">
        <span>{{ address.oldTime }}</span>
      </template>
      <template v-else>
        {{ address.time }}
      </template>
    </v-card-subtitle>
    <v-card-text>
      <b>{{ address.firstName }}</b> <b>{{ address.lastName }}</b>
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
    </v-card-text>
    <v-card-actions>
      <slot></slot>
    </v-card-actions>

  </div>
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
