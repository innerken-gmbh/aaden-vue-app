<template>
  <v-dialog fullscreen v-model="realShow">
    <dish-modification
        ref="modification"
        :showing="realShow"
        :old-mod="oldMod"
        @modification-submit="submit(...$event,dish)"
        @modification-cancel="realShow=false"
        :options="dish.modInfo">
      <template #name>
        {{ dish.name }}
      </template>
      <template v-slot:before="{price}">
        <span>€{{ parseFloat(dish.price) + price | priceDisplay }}</span>
      </template>
    </dish-modification>
  </v-dialog>
</template>

<script>

import DishModification from '@/views/TablePage/Dialog/DishModification'

export default {
  name: 'ModificationDrawer',
  components: {
    DishModification
  },
  props: {
    dish: {
      default: () => {
      }
    },
    mod: {
      default: () => {
      }
    },
    oldMod: {
      default: () => {
      }
    },
    modificationShow: {
      default: false
    }
  },
  computed: {
    realShow: {
      get: function () {
        return this.modificationShow
      },
      set: function (val) {
        this.$refs.modification.mod = {}
        this.$emit('visibility-changed', val)
      }
    }
  },
  methods: {
    forceSubmit () {
      this.$refs.modification.submitModification()
    },
    submit: function (mod, count, saveInfo, dish) {
      this.mod(mod, dish, count, saveInfo)
      this.realShow = false
    }
  }
}
</script>

<style scoped>
</style>
