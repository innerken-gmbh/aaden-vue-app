<template>
    <v-card class="dishCard pa-1 px-2 mb-4" color="transparent" flat style="position: relative">
        <div class="px-1 py-1 pr-0">
            <div class="flex-grow-1 d-flex align-start">
                <v-card
                        class="px-2 mr-2 text-body-1 font-weight-bold flex-shrink-0"
                        color="primary white--text"
                        elevation="0"
                        style="border-radius: 24px"
                >
                    {{ dish.count }}<span class="text-caption font-weight-bold">x</span>
                </v-card>
                <div class="text-body-1 font-weight-bold flex-grow-1 mr-4">
                    <span class="codeRow">{{ dish.code }}.</span><span>{{ dish.name }}</span>
                </div>
                <v-spacer/>
                <div class="flex-shrink-0 text-body-1">
                    <template>
                        <v-chip v-if="dish.overrideConsumeTypeId" class="mr-1" color="primary" label small>
                            {{ findConsumeTypeById(dish.overrideConsumeTypeId) }}
                        </v-chip>
                        <span v-if="dish.isFree === '1'">{{ $t("Free") }}</span>
                        <template v-else>
                          <template v-if="showPriceTe === '0'">
                            <span
                              v-if="dish.tempDiscountMod && Math.abs(parseFloat(dish.tempDiscountMod)) > 0"
                              class="text-truncate text-no-wrap"
                            >
                                <s style="font-size: xx-small">{{ dish.originPrice | priceDisplay }}</s>
                                {{ dish.realPrice | priceDisplay }}</span>
                                            <span v-else class="text-truncate text-no-wrap">
                                {{ dish.realPrice | priceDisplay }}
                             </span>
                          </template>
                          <template v-else>
                            <span
                              v-if="dish.tempDiscountMod && Math.abs(parseFloat(dish.tempDiscountMod)) > 0"
                              class="text-truncate text-no-wrap"
                            >
                                <s style="font-size: xx-small">{{ dish.originPriceTe | priceDisplay }}</s>
                                {{ dish.realPriceTe | priceDisplay }}</span>
                                            <span v-else class="text-truncate text-no-wrap">
                                {{ dish.realPriceTe | priceDisplay }}</span>
                          </template>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <div>
            <div v-show="dish.displayApply.length > 0" class="dishMod text-body-2 mt-2 px-1">
                {{ showPriceTe === '1' ? dishModeTeString : dishModString }}
            </div>
            <v-chip v-if="dish.note" label>
                <v-icon class="mr-1" left small>mdi-pencil</v-icon>
                {{ dish.note }}
            </v-chip>
        </div>
        <div v-show="expand">
            <div class="d-flex py-1" @click.stop>
                <template v-if="showEdit">
                    <template>
                        <v-icon class="mr-2" large @click.stop="editNote(dish)"> mdi-pencil-circle</v-icon>
                    </template>
                    <template v-if="showNumber">
                        <v-icon class="mr-2" large @click.stop="dish.change(-1)"> mdi-minus-circle</v-icon>
                        <v-icon large @click.stop="dish.change(1)"> mdi-plus-circle</v-icon>
                        <v-spacer></v-spacer>
                        <v-icon v-if="dish.haveMod > 0" class="mr-2" large @click.stop="editCallBack">
                            mdi-cog-counterclockwise
                        </v-icon>
                        <v-icon large @click.stop="dish.change(-dish.count)"> mdi-delete-circle</v-icon>
                    </template>
                </template>
                <template v-else>
                    <div class="flex-grow-1 d-flex">
                        <v-btn class="flex-grow-1 mr-1" elevation="0" @click="callCallBack(1)">
                            <span style="font-size: 18px">&times;1</span>
                        </v-btn>
                        <v-btn class="mr-1" elevation="0" @click="callCallBack(5)">
                            <span style="font-size: 18px">&times;5</span>
                        </v-btn>
                        <v-btn color="primary" elevation="" @click="callCallBack(dish.count)">
                            <span style="font-size: 18px">{{ $t("All") }}</span>
                        </v-btn>
                    </div>
                </template>
            </div>
        </div>
    </v-card>
</template>

<script>
import Swal from 'sweetalert2'
import { findConsumeTypeById } from '@/oldjs/common'
import { getNiceRestaurantInfo } from '@/oldjs/zbonPrint'

export default {
  name: 'DishCard',
  data: function () {
    return {
      showPriceTe: ''
    }
  },
  props: {
    dish: {
      default: () => {
      }
    },
    clickCallback: {
      default: () => {
      }
    },
    showEdit: {
      default: false
    },
    showNumber: {
      default: false
    },
    expand: { default: false }
  },
  computed: {
    dishModString () {
      return this.dish.displayApply
        .map((it) => {
          const price = it.priceInfo > 0 ? ' (' + it.priceInfo + ')' : ''
          return it.value + price
        })
        .join(', ')
    },
    dishModeTeString () {
      return this.dish.displayApply
        .map((it) => {
          const price = it.priceInfoTe > 0 ? ' (' + it.priceInfoTe + ')' : ''
          return it.value + price
        })
        .join(', ')
    }
  },
  async mounted () {
    this.showPriceTe = (await getNiceRestaurantInfo()).taxExclusiveMode ?? '0'
    console.log((await getNiceRestaurantInfo()), '123')
    console.log(this.showPriceTe, 'show')
  },
  methods: {
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    editCallBack () {
      console.log(this.dish)
      this.dish.edit()
      this.dish.change(-1)
    },
    callCallBack (count = 1) {
      if (count > this.dish.count) {
        count = this.dish.count
      }
      if (this.dish.code !== '-1') {
        for (let i = 0; i < count; i++) {
          this.clickCallback()
        }
      }
    },
    async editNote () {
      const note = await Swal.fire({
        title: this.$t('note'),
        input: 'text',
        inputValue: this.dish.note
      })
      this.$set(this.dish, 'note', note.value)
      // dish.note = note.value
    }
  }
}
</script>

<style scoped>
.dishCard {
    margin-top: 4px;
}

.dishCount {
    color: var(--v-primary-base);
    width: 36px;
    text-align: left;
}

.basicInfo {
    width: 100%;
    justify-content: space-between;
}

.dishName {
    word-wrap: break-word;
    text-overflow: ellipsis;
}

.codeRow {
    font-weight: 700;
    flex-shrink: 0;
    white-space: nowrap;
}

.dishNote {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 4px;
    white-space: nowrap;
    padding: 2px 4px;
}
</style>
