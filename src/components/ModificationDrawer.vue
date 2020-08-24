<template>
    <v-dialog content-class="noFullScreen"
              v-model="realShow">
        <v-card style="min-height: 100%;min-width: 100%;margin: 0 !important;padding: 0!important;">
            <dish-modification
                    ref="modification"
                    @modification-submit="submit(...$event,dish)"
                    @modification-cancel="realShow=false"
                    :options="dish.modInfo">
                <template v-slot:before>
                    <span class="font-weight-black"> {{ dish.name }}</span>
                </template>
            </dish-modification>
        </v-card>
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
    submit: function (mod, count, dish) {
      this.mod(mod, dish, count)
      this.realShow = false
    }
  }
}
</script>

<style scoped>
</style>
