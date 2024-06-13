<template>
    <v-card color="transparent" flat class="dishCard pa-1 px-2 mb-4" style="position: relative">
        <div class="px-1 py-1 pr-0">
            <div class="flex-grow-1 d-flex align-start">
                <v-card
                        color="primary white--text"
                        style="border-radius: 24px"
                        elevation="0"
                        class="px-2 mr-2 text-body-1 font-weight-bold flex-shrink-0"
                >
                    {{ dish.count }}<span class="text-caption font-weight-bold">x</span>
                </v-card>
                <div class="text-body-1 font-weight-bold flex-grow-1 mr-4">
                    <span class="codeRow">{{ dish.code }}.</span><span>{{ dish.name }}</span>
                </div>
                <v-spacer/>
                <div class="flex-shrink-0 text-body-1">
                    <template>
                        <v-chip small label v-if="dish.overrideConsumeTypeId" class="mr-1" color="primary">
                            {{ findConsumeTypeById(dish.overrideConsumeTypeId) }}
                        </v-chip>
                        <span v-if="dish.isFree === '1'">{{ $t("Free") }}</span>
                        <template v-else>
              <span
                      class="text-truncate text-no-wrap"
                      v-if="dish.tempDiscountMod && Math.abs(parseFloat(dish.tempDiscountMod)) > 0"
              >
                <s style="font-size: xx-small">{{ dish.originPrice | priceDisplay }}</s
                >{{ dish.realPrice | priceDisplay }}</span
              >
                            <span class="text-truncate text-no-wrap" v-else>
                {{ dish.realPrice | priceDisplay }}
              </span>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <div>
            <div v-show="dish.displayApply.length > 0" class="dishMod text-body-2 mt-2 px-1">
                {{ dishModString }}
            </div>
            <v-chip label v-if="dish.note">
                <v-icon left small class="mr-1">mdi-pencil</v-icon>
                {{ dish.note }}
            </v-chip>
        </div>
        <div v-show="expand">
            <div @click.stop class="d-flex py-1">
                <template v-if="showEdit">
                    <template>
                        <v-icon class="mr-2" large @click.stop="editNote(dish)"> mdi-pencil-circle</v-icon>
                    </template>
                    <template v-if="showNumber">
                        <v-icon class="mr-2" large @click.stop="dish.change(-1)"> mdi-minus-circle</v-icon>
                        <v-icon large @click.stop="dish.change(1)"> mdi-plus-circle</v-icon>
                        <v-spacer></v-spacer>
                        <v-icon class="mr-2" large v-if="dish.haveMod > 0" @click.stop="editCallBack">
                            mdi-cog-counterclockwise
                        </v-icon>
                        <v-icon large @click.stop="dish.change(-dish.count)"> mdi-delete-circle</v-icon>
                    </template>
                </template>
                <template v-else>
                    <div class="flex-grow-1 d-flex">
                        <v-btn elevation="0" @click="callCallBack(1)" class="flex-grow-1 mr-1">
                            <span style="font-size: 18px">&times;1</span>
                        </v-btn>
                        <v-btn class="mr-1" elevation="0" @click="callCallBack(5)">
                            <span style="font-size: 18px">&times;5</span>
                        </v-btn>
                        <v-btn elevation="" @click="callCallBack(dish.count)" color="primary">
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

export default {
  name: 'DishCard',
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
    }
  },
  methods: {
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    editCallBack () {
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
