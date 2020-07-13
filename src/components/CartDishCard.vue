<template>
    <div class="dishCard">
        <div class="dishInfo d-flex flex-grow-1 justify-start">
            <div class="flex-grow-1">
                <div class="basicInfo">
                    <span class="dishCount">
                        {{realCount}}&times;
                    </span>
                    <span class='dishName text-body-2'>
                        {{realDishName}}
                    </span>
                    <div class="d-inline" v-if="showEdit">
                        <v-btn small icon @click="dish.change(-1)">
                            <v-icon>mdi-minus-box-outline</v-icon>
                        </v-btn>
                        <v-btn small icon @click="dish.change(1)">
                            <v-icon>mdi-plus-box-outline</v-icon>
                        </v-btn>
                        <v-btn x-small color="blue" v-if="!noteShow" icon @click="noteShow=!noteShow">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </div>
                    <div class='priceRow'>
                        €{{dish.realPrice*realCount | priceDisplay}}
                    </div>
                    <v-btn @click="dish.change(-realCount)" v-if="showEdit" color="blue" x-small icon>
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <div v-if="noteShow" class="dishMod">
            <v-text-field v-model="dish.note" :append-icon="noteEdit?'mdi-check':'mdi-pencil'"
                          @click:append="noteEdit=!noteEdit"  :readonly="!noteEdit" :clearable="noteEdit"/>
        </div>
        <div v-if="dish.displayApply.length>0" class="dishMod text--darken-2 grey--text text-caption">
            <div v-bind:key="'mod_order-i'+i+'value'+ap.value" v-for="(ap,i) in dish.displayApply">
                {{ap.groupName}}:{{ap.value}}<span v-if="ap.priceInfo">(<price-text
                    with-sign :price="ap.priceInfo"/>)</span>
            </div>
        </div>
    </div>
</template>

<script>
import PriceText from './PriceText'
import { mapGetters } from 'vuex'

export default {
  name: 'CartDishCard',
  components: { PriceText },
  props: {
    dish: {
      type: Object,
      default: () => {
      }
    },
    hideFreeDish: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      modInfos: {},
      hasMod: 0,
      apply: [],
      noteShow: false,
      noteEdit: true,
      note: '',
      sumCount: null,
      count: null
    }
  },
  computed: {
    ...mapGetters(['imgRoot']),
    realCount: function () {
      return this.dish.count
    },
    realDishName: function () {
      return this.dish.name || this.dish.dishName
    }
  },
  methods: {
  }
}
</script>

<style scoped>

    .dishCount {
        width: 20px;
        box-sizing: border-box;
        white-space: nowrap;
        padding-right: 32px;
    }

    .dishCard {
        padding: .5rem .7rem;
        background: white;
        border-radius: 5px;
    }

    .dishInfo {
        font-size: 16px;
    }

    .basicInfo {
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -ms-flex-line-pack: center;
        align-content: center;
        transform: translateZ(0);
        align-items: center;
        width: 100%;
    }

    .dishName {
        width: 100%;
        padding: 4px 0;
        word-break: break-all;
        word-break: break-word;
        flex: 1 1;
        font-size: 13px;
    }

    .dishMod {
        font-size: 13px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 32px;
    }

    .priceRow {
        font-weight: bold;
        text-align: right;
        min-width: 3rem;
        white-space: nowrap;
        font-size: 15px;
    }

    .dishListTitle {
        background: #e3e6ea;
        font-weight: bold;
        padding: 12px 30px;
    }

</style>
