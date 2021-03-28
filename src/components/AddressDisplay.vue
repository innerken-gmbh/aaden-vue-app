<template>
  <v-card>
    <template v-if="rawAddressInfo">
      <addresses-card :raw-address-info="address">
        <template v-slot:time>
          Erwartete Zeit: {{ address.date }}
          <template v-if="address.oldTime">
            <span>{{ address.oldTime }}</span>
          </template>
          <template v-else>
            {{ address.time }}
          </template>
        </template>
        <v-card-actions v-slot:action>
          <v-spacer></v-spacer>
          <template v-if="address.oldTime">
            <span>Zeit nach Bestätigung: {{ address.time }}</span>
          </template>
          <template v-else-if="consumeTypeStatusId<1">
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
      </addresses-card>
    </template>
    <template v-else>
      <v-btn block @click="openAddressForm" large>
        <v-icon left>mdi-pencil-box</v-icon>
        Addresses Hinzufügen
      </v-btn>
    </template>
    <address-form :menu-show.sync="showMenu"></address-form>
  </v-card>

</template>

<script>
import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import AddressForm from '@/components/AddressForm'
import AddressesCard from '@/components/AddressesCard'

export default {
  name: 'AddressDisplay',
  components: { AddressesCard, AddressForm },
  props: {
    rawAddressInfo: {},
    consumeTypeStatusId: {}
  },
  data: function () {
    return {
      showMenu: null
    }
  },
  methods: {
    openAddressForm () {
      this.showMenu = !this.showMenu
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
