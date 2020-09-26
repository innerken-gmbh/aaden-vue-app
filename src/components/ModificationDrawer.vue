<template>
    <v-dialog content-class="noFullScreen" v-model="realShow">
        <dish-modification
                ref="modification"
                :old-mod="oldMod"
                @modification-submit="submit(...$event,dish)"
                @modification-cancel="realShow=false"
                :options="dish.modInfo">
            <template v-slot:before>
                <span class="font-weight-black"> {{ dish.name }}</span>
            </template>
        </dish-modification>
    </v-dialog>
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
    submit: function (mod, count, saveInfo, dish) {
      this.mod(mod, dish, count, saveInfo)
      this.realShow = false
    }
  }
}
</script>

<style scoped>
</style>
