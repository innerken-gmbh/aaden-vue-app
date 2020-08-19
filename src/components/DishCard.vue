<template>
    <div @click="checkIfOpen" class="dishCard">
        <div  class="px-2 py-1 pr-0 d-flex justify-space-between align-baseline">
            <div v-code-hide class='codeRow'>
                {{ dish.code }}
            </div>
            <div class="flex-grow-1 d-flex justify-space-between">
                <div class='dishName'>
                    {{ dish.name }}
                </div>
                <span v-if="dish.isFree==='1'">
                        {{ $t('Free') }}
                </span>
                <span v-else>
                     <span v-if="(dish.tempDiscountMod)&&(Math.abs(parseFloat(dish.tempDiscountMod))>0)">
                         <s style="font-size: xx-small">{{ dish.originPrice | priceDisplay }}</s>
                         {{ dish.realPrice | priceDisplay }}
                     </span>
                     <span v-else>
                           {{ dish.realPrice | priceDisplay }}
                     </span>
                </span>
            </div>
            <span class="dishCount">&times;{{ dish.count }}
            </span>
        </div>
        <div>
            <div v-show="dish.displayApply.length>0" class="dishMod">
                <div class="d-flex subtitle-2 justify-space-between grey--text text--darken-2"
                     v-bind:key="'mod_order-i'+i+'value'+ap.value" v-for="(ap,i) in dish.displayApply">
                    <div>{{ ap.groupName }}:{{ ap.value }}</div>
                    <div>
                        <template v-if="ap.priceInfo&&ap.priceInfo>0">
                            (<price-text :price="ap.priceInfo"/>)
                        </template>
                    </div>
                </div>
            </div>
            <div v-show="dish.note" class="dishNote">
                <v-icon color="primary" small class="mr-1">mdi-pencil</v-icon>
                {{ dish.note }}
            </div>
        </div>
        <div v-show="expand" class="editRow elevation-3">
            <div v-if="showEdit" class="py-2">
                <template>
                    <v-icon @click.stop="editNote(dish)">mdi-pencil-circle</v-icon>
                </template>
                <template v-if="showNumber">
                    <v-icon @click.stop="dish.change(-1)">
                        mdi-minus-circle
                    </v-icon>
                    <v-icon @click.stop="dish.change(1)">
                        mdi-plus-circle
                    </v-icon>
                    <v-icon @click.stop="dish.change(-dish.count)">
                        mdi-trash-can
                    </v-icon>
                </template>
            </div>
            <template v-if="!showEdit">
                <div @click.stop class="d-flex align-center" style="width: 100%">
                    <v-slider
                            dense
                            hide-details
                            v-model="clickNumber"
                            thumb-label
                            min="1"
                            :max="dish.count"
                    >
                        <template v-slot:prepend>
                            <v-icon
                                    @click.stop="decrement"
                            >
                                mdi-minus
                            </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-icon
                                    @click.stop="increment"
                            >
                                mdi-plus
                            </v-icon>
                        </template>
                    </v-slider>
                    <span class="ml-4">&times;{{ clickNumber }}</span>
                    <v-btn class="ml-3" @click="click" icon>
                        <v-icon>mdi-clipboard-edit</v-icon>
                    </v-btn>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import PriceText from './PriceText'
import Swal from 'sweetalert2'

export default {
  name: 'DishCard',
  components: { PriceText },
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
    }
  },
  data: function () {
    return Object.assign({
      modInfos: {},
      hasMod: 0,
      apply: [],
      noteShow: false,
      noteEdit: true,
      note: '',
      sumCount: null,
      count: null,
      clickNumber: this.dish.count,
      expand: false
    }, { ...this.dish })
  },
  methods: {
    callCallBack () {
      if (this.dish.code !== '-1') {
        this.clickCallback()
      }
    },
    checkIfOpen () {
      if (this.dish.count > 1 || this.showEdit) {
        this.expand = !this.expand
      } else {
        this.callCallBack()
      }
    },
    decrement () {
      if (this.clickNumber > 0) {
        this.clickNumber--
      }
    },
    increment () {
      if (this.clickNumber < this.dish.count) {
        this.clickNumber++
      }
    },
    click () {
      for (let i = 0; i < this.clickNumber; i++) {
        if (this.code !== '-1') {
          this.callCallBack()
        }
      }
    },
    async editNote () {
      const note = await Swal.fire({
        title: 'Note',
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
        background: white;
        border-bottom: 1px solid #e2e3e5;
    }

    .dishCount {
        color: #367aeb;
        width: 36px;
        font-weight: 900;
        text-align: center;
    }

    .basicInfo {
        width: 100%;
        justify-content: space-between;
    }

    .dishName {
        max-width: 140px;
        word-wrap: break-word;
        text-overflow: ellipsis;
    }

    .codeRow {
        font-weight: 900;
        width: 27px;
        flex-shrink: 0;
    }

    .dishNote {
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        border-bottom: 1px solid #6b6b6b;
        margin-bottom: 4px;
        white-space: nowrap;
        padding: 2px 8px;
    }

    .dishMod {
        max-width: calc(100% - 24px);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 2px 8px;
        padding-right: 0;
    }

    .editRow {
        padding-left: 24px;
        padding-right: 8px;
    }

</style>
