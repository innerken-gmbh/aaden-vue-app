<template>
    <v-sheet @click="clickCallback(false)" class="dishCard container--fluid">
        <div class="d-flex justify-space-between">
            <div class="dishInfo">
                <div class="basicInfo d-flex">
                    <div class="d-flex">
                        <div class='codeRow'>
                            {{dish.code}}
                        </div>
                        <div class='dishName'>
                            {{dish.name}}
                        </div>
                        <div v-if="showEdit" class="edit">
                            <v-btn small @click.stop="editNote(dish)" icon>
                                <v-icon>mdi-pencil-circle</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div class='d-flex'>
                    <span v-if="dish.isFree==='1'">
                        {{$t('Free')}}
                    </span>
                        <span v-else>
                        {{dish.isFree}}
                        {{realPrice | priceDisplay}}
                    </span>
                    </div>

                </div>
                <div v-if="dish.note" class="dishNote">
                    <v-icon small class="mr-2">mdi-pencil</v-icon>{{dish.note}}
                </div>
                <div v-if="dish.displayApply.length>0" class="dishMod">
                    <div class="d-flex subtitle-2 justify-space-between grey--text text--darken-2"
                         v-bind:key="'mod_order-i'+i+'value'+ap.value" v-for="(ap,i) in dish.displayApply">
                        <div>{{ap.groupName}}:{{ap.value}}</div>
                        <div>
                            <template v-if="ap.priceInfo&&ap.priceInfo>0">(
                                <price-text :price="ap.priceInfo"/>
                                )
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dishCount">&times;{{dish.count}}
            </div>
        </div>
        <div class="editRow">

        </div>
    </v-sheet>
</template>

<script>
import PriceText from './PriceText'
import Swal from 'sweetalert2'

export default {
  name: 'DishCard',
  components: { PriceText },
  props: {
    dish: {
      type: Object,
      default: () => {
      }
    },
    clickCallback: {
      type: Function,
      default: () => {
      }
    },
    showEdit: {
      type: Boolean,
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
      count: null
    }, { ...this.dish })
  },
  computed: {
    clickCallBack () {
      return (force) => {
        if (force || !this.showEdit) {
          return this.clickCallBack
        } else {
          return () => {
          }
        }
      }
    }
  },
  methods: {
    async editNote () {
      const note = await Swal.fire({
        title: 'Note',
        input: 'text'
      })
      console.log(note)
      this.$set(this.dish, 'note', note.value)
      // dish.note = note.value
    }
  }
}
</script>

<style scoped>
    .dishCard {
        margin-top: 8px;
        background: white;
        border-radius: 5px;
        box-shadow: 0 3px 4px 0 rgba(220, 224, 239, 0.59);
    }

    .dishInfo {
        max-width: calc(100% - 45px);
        font-size: 18px;
    }

    .basicInfo {
        padding: 8px 24px;
        width: 100%;
        justify-content: space-between;
    }

    .dishName {
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .codeRow {
        font-weight: 900;
        width: 48px;
    }

    .dishCount {
        color: #367aeb;
        padding: 8px 0;
        width: 45px;
        display: flex;
        font-size: 18px;
        font-weight: bold;
        justify-content: center;
    }

    .dishNote {
        max-width: calc(100% - 45px);
        margin-left: 48px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 8px 24px;
    }

    .dishMod {
        max-width: calc(100% - 45px);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-left: 48px;
        padding: 2px 30px;
    }

</style>
