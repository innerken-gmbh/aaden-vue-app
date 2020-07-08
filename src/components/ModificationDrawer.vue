<template>
    <v-navigation-drawer color="#f5f6fa" width="480px" right fixed
                         temporary v-model="realShow">
        <div style="margin-top: 64px">
                <DishModification
                        @modification-submit="submit($event,dish)"
                        @modification-cancel="realShow=false"
                        :options="dish.modInfo">
                    <template v-slot:before>
                        <v-row>
                            <v-col cols="12">
                                <h2>
                                    {{dish.name}}
                                </h2>
                            </v-col>
                        </v-row>
                    </template>
                </DishModification>
        </div>
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
