<template>
  <v-navigation-drawer width="fit-content" temporary left fixed v-model="realShow">
    <v-card class="fill-height">
      <dish-modification
          ref="modification"
          @modification-submit="submit($event,dish)"
          @modification-cancel="realShow=false"
          :options="dish.modInfo">
        <template v-slot:before>
         <span class="font-weight-black"> {{ dish.name }}</span>
        </template>
      </dish-modification>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import DishModification from '@/components/DishModification'

export default {
  name: 'ModificationDrawer',
  components: {
    DishModification
  },
  props: {
    dish: {
      type: Object,
      default: () => {
      }
    },
    mod: {
      type: Function,
      default: () => {
      }
    },
    modificationShow: {
      type: Boolean,
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
    submit: function (mod, dish) {
      this.mod(mod, dish)
      this.realShow = false
    }
  }
}
</script>

<style scoped>

</style>
