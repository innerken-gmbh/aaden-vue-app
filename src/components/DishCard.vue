<template>
    <div class="dishCard mx-1">
        <div class="px-1 py-1 pr-0 d-flex justify-space-between align-baseline">
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
                            {{ap.priceInfo | priceDisplay}}
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
            <v-toolbar @click.stop dense flat>
                <template v-if="showEdit">
                    <template>
                        <v-icon class="mr-2" large
                                @click.stop="editNote(dish)">
                            mdi-pencil-circle
                        </v-icon>
                    </template>
                    <template v-if="showNumber">

                        <v-icon class="mr-2" large @click.stop="dish.change(-1)">
                            mdi-minus-circle
                        </v-icon>
                        <v-icon large @click.stop="dish.change(1)">
                            mdi-plus-circle
                        </v-icon>
                        <v-spacer></v-spacer>
                        <v-icon large @click.stop="dish.change(-dish.count)">
                            mdi-trash-can
                        </v-icon>
                    </template>
                </template>
                <template v-else>
                    <v-toolbar-items class="flex-grow-1">
                        <v-btn class="flex-grow-1">
                            <span @click="callCallBack(1)" style="font-size: 18px">&times;1</span>
                        </v-btn>
                        <v-btn>
                            <span @click="callCallBack(5)" style="font-size: 18px">&times;5</span>
                        </v-btn>
                        <v-btn color="primary">
                            <span @click="callCallBack(dish.count)" style="font-size: 18px">Alle</span>
                        </v-btn>
                    </v-toolbar-items>
                </template>
            </v-toolbar>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

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
  methods: {
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
        border-bottom: 2px dashed #e2e3e5;
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
        padding: 2px 4px;
    }

    .dishMod {
        max-width: calc(100% - 24px);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 2px 4px;
        padding-right: 0;
    }

    .editRow {
    }

</style>
