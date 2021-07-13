<template>
  <v-dialog max-width="600px" v-model="realShow">
    <v-card>
      <v-toolbar dense tile color="primary" dark elevation="0">
        <v-toolbar-title> {{ $t('Buffet') }}</v-toolbar-title>
      </v-toolbar>
      <div class="pa-2" style="display: grid;grid-template-columns: repeat(2,1fr)">
        <v-sheet style="display: grid;grid-template-columns: repeat(3,1fr);grid-gap: 4px">
          <template v-for="dish in buffetDishes">
            <v-card :key="dish.dishesId" class="buffetCard pa-2">
              <div class="d-flex align-baseline">
                <div>{{ dish.name }}</div>
                <v-icon small>{{ parseInt(dish.isForAdult) ? 'mdi-human-male-female' : 'mdi-human-child' }}</v-icon>
              </div>

            </v-card>
          </template>
        </v-sheet>
        <v-sheet></v-sheet>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { loadAllBuffetDish } from '@/api/api'

export default {
  name: 'BuffetStartDialog',
  props: {
    buffetDialogShow: {
      default: false
    },
    id: {}
  },
  data: function () {
    return {
      buffetDishes: [],
      selectedBuffetDishes: []
    }
  },
  methods: {
    async initial () {
      this.buffetDishes = await loadAllBuffetDish()
    }
  },
  watch: {
    realShow (val) {
      if (val) {
        this.initial()
      }
    }
  },
  computed: {
    realShow: {
      get: function () {
        return this.buffetDialogShow
      },
      set: function (val) {
        this.$emit('visibility-changed', val)
      }
    },
    selectableBuffetDishList () {
      return this.activeConsumeTypeId ? this.buffetDishes.filter(d => d.consumeTypeId === this.activeConsumeTypeId) : this.buffetDishes
    },
    activeConsumeTypeId () {
      return this.selectedBuffetDishes?.[0].consumeTypeId ?? null
    }
  }
}
</script>

<style scoped>
.buffetCard {
  height: 100px;
  width: 100%;
  word-break: break-all;
}

</style>
