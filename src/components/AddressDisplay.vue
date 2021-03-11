<template>
  <v-card>
    <v-card-title>
      {{ address.firstName }} {{ address.lastName }}
      <v-spacer/>
      {{ address.deliveryMethod }}
    </v-card-title>
    <v-card-subtitle>
      Erwartete Zeit: {{ address.date }}
      <template v-if="address.oldTime">
        <span>{{ address.oldTime }}</span>
      </template>
      <template v-else>
        {{ address.time }}
      </template>
    </v-card-subtitle>
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <template v-if="address.oldTime">
        <span>Zeit nach Bestätigung: {{ address.time }}</span>
      </template>
      <template v-else>
        <div>
          <template
              v-for="(time) in [0,15,30,60,90,120]"
          >
            <v-chip
                class="elevation-1"
                :key="time"
                color="success"
                @click="$emit('accept',time)"
            >
              + {{ time }}
            </v-chip>
          </template>
          <v-chip color="error" @click="$emit('reject')">{{ $t('拒绝') }}</v-chip>
        </div>
      </template>
    </v-card-actions>

  </v-card>

</template>

<script>
import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import FilterEmptyStringDisplayer from '@/components/utls/filterEmptyStringDisplayer'

export default {
  name: 'AddressDisplay',
  components: { FilterEmptyStringDisplayer },
  props: {
    rawAddressInfo: {}
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
