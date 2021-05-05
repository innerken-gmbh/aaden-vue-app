<template>
  <v-card>
    <template v-if="rawAddressInfo">
      <addresses-card :raw-address-info="address">
        <template v-slot:time>
          <v-card-subtitle>
            <span v-if="address.date">Erwartete Zeit: {{ address.date }}</span>
            <template v-if="address.oldTime">
              <span>{{ address.oldTime }}</span>
            </template>
            <template v-else>
              {{ address.time }}
            </template>
          </v-card-subtitle>
        </template>
        <template v-slot:action>
          <v-card-actions>
            <template v-if="address.oldTime">
              <v-btn icon @click="openAddressForm">
                <v-icon>mdi-pencil-box</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <span>Zeit nach Bestätigung: {{ address.time }}</span>
            </template>
            <template v-else-if="consumeTypeStatusId<1">
              <div>
                <template
                    v-for="(time) in [0,5,10,15,20,30,60]"
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
        </template>
      </addresses-card>
    </template>
    <address-form
        @address-submit="submit"
        :menu-show.sync="showMenu">
    </address-form>
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
