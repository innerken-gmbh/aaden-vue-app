<template>
  <v-dialog max-width="600px" v-model="realShow">
    <v-card>
      <v-toolbar dense tile color="primary" dark elevation="0">
        <v-toolbar-title> {{ $t('Buffet') }}</v-toolbar-title>
      </v-toolbar>
      <div class="pa-2" style="display: grid;grid-template-columns: repeat(2,1fr)">
        <v-sheet style="display: grid;grid-template-columns: repeat(3,1fr);grid-gap: 4px;">
          <template v-for="dish in selectableBuffetDishList">
            <v-card :key="dish.dishesId" @click="addToCart(dish)"
                    class="buffetCard d-flex flex-column justify-space-between">
              <div class="d-flex align-baseline pa-1">
                <div>{{ dish.name }}</div>
                <v-icon small>{{ parseInt(dish.isForAdult) ? 'mdi-human-male-female' : 'mdi-human-child' }}</v-icon>
              </div>
              <v-btn @click.stop="removeDish(dish.dishesId)" color="error" v-if="selectedBuffetDishesMap[dish.dishesId]"
              >
                <v-icon left>mdi-delete</v-icon>&times;{{ selectedBuffetDishesMap[dish.dishesId] }}
              </v-btn>
            </v-card>
          </template>
        </v-sheet>
        <v-sheet class="pa-2">
          {{ findConsumeTypeById(activeConsumeTypeId).name }}
          <div class="editForm ">
            <div class="formRow">
              <div class="formLabel caption">{{ $t('最大用餐时间') }}</div>
              <v-slider hide-details max="960" min="0" step="5" thumb-label="always"
                        v-model="buffetSetting.maxDineTimeMin"></v-slider>
            </div>
            <div class="formRow">
              <div class="formLabel caption">{{ $t('每轮时间') }}</div>
              <v-slider hide-details max="60" min="0" step="2" thumb-label="always"
                        v-model="buffetSetting.roundTimeMin"></v-slider>
            </div>
            <div class="formRow">
              <div class="formLabel caption">{{ $t('总轮数') }}</div>
              <v-text-field dense hide-details type="number"
                            v-model="buffetSetting.totalRound"></v-text-field>
            </div>
            <div class="formRow">
              <div class="formLabel caption">{{ $t('大人每轮可点') }}</div>

              <v-text-field dense hide-details type="number"
                            v-model="buffetSetting.roundDishCount"></v-text-field>

            </div>
            <div class="formRow">
              <div class="formLabel caption">{{ $t('小孩每轮可点') }}</div>

              <v-text-field dense hide-details type="number"
                            v-model="buffetSetting.childRoundDishCount"></v-text-field>

            </div>
            <div class="formRow mt-4">
              <v-btn block color="primary" @click="submit">{{ $t('bestellen') }}</v-btn>

            </div>
          </div>
        </v-sheet>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { changeOrderToBuffet, loadAllBuffetDish } from '@/api/api'
import { DefaultBuffetSetting } from '@/oldjs/StaticModel'
import { findConsumeTypeById } from '@/oldjs/common'

export default {
  name: 'BuffetStartDialog',
  props: {
    buffetDialogShow: {
      default: false
    },
    initialUI: {
      default: () => () => {
      }
    },
    id: {}
  },
  data: function () {
    return {
      buffetDishes: [],
      selectedBuffetDishesMap: {},
      buffetSetting: Object.assign({}, DefaultBuffetSetting)
    }
  },
  methods: {
    addToCart (dish) {
      if (this.selectedBuffetDishesMap[dish.dishesId]) {
        this.$set(this.selectedBuffetDishesMap, dish.dishesId, this.selectedBuffetDishesMap[dish.dishesId] + 1)
      } else {
        this.$set(this.selectedBuffetDishesMap, dish.dishesId, 1)
      }
    },
    removeDish (id) {
      this.$delete(this.selectedBuffetDishesMap, id)
    },
    async initial () {
      this.buffetDishes = await loadAllBuffetDish()
      this.selectedBuffetDishesMap = {}
      this.buffetSetting = Object.assign({}, DefaultBuffetSetting)
    },
    async submit () {
      const setting = Object.assign({}, DefaultBuffetSetting, this.buffetSetting)
      setting.maxDineTime = setting.maxDineTimeMin * 60
      setting.roundTime = setting.roundTimeMin * 60
      console.log(Object.entries(this.selectedBuffetDishesMap))
      await changeOrderToBuffet(this.id, Object.entries(this.selectedBuffetDishesMap).map(e => {
        return {
          dishesId: e[0],
          count: e[1]
        }
      }), setting)
      this.realShow = false
      this.initialUI()
    },
    findConsumeTypeById
  },
  watch: {
    realShow (val) {
      if (val) {
        this.initial()
      }
    },
    activeBuffetSetting (val) {
      console.log(val)
      this.buffetSetting = Object.assign({}, DefaultBuffetSetting, val)
      this.buffetSetting.roundTimeMin = this.buffetSetting.roundTime / 60
      this.buffetSetting.maxDineTimeMin = this.buffetSetting.maxDineTime / 60
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
    firstActiveDish () {
      const firstId = Object.keys(this.selectedBuffetDishesMap)?.[0] ?? null
      return this.buffetDishes.find(d => d.dishesId === firstId) ?? null
    },
    activeBuffetSetting () {
      return this.firstActiveDish ?? Object.assign({}, DefaultBuffetSetting)
    },
    activeConsumeTypeId () {
      return this.firstActiveDish?.consumeTypeId ?? null
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

.formRow {
  display: flex;
  align-items: center;
}

.formLabel {
  padding-top: 4px;
  width: 100px;
}
</style>
