<template>
  <v-card>
    <v-toolbar @click="expand=!expand" tile dark dense color="warning">
      <v-app-bar-nav-icon>
        <v-icon>mdi-truck-fast</v-icon>
      </v-app-bar-nav-icon>
      <div class="mr-2">{{ address.deliveryMethod }}</div>
      <v-spacer></v-spacer>
      <div>
        <slot name="title"></slot>
      </div>
      <v-btn icon>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-toolbar>
    <template v-if="expand">
      <slot name="time"></slot>
      <v-card-text>
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
    </template>
    <template v-if="expand">
      <slot name="action"></slot>
    </template>

  </v-card>
</template>

<script>
import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import FilterEmptyStringDisplayer from '@/components/utls/filterEmptyStringDisplayer'

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
