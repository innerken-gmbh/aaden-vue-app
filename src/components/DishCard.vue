<template>
    <div class="d-flex dishCard container--fluid justify-space-between">
        <div class="dishInfo">
            <div class="basicInfo d-flex">
                <div class="d-flex">
                    <div class='codeRow'>
                        {{dish.code}}
                    </div>
                    <div class='dishName'>
                        {{dish.name}}
                    </div>
                </div>
                <div class='priceRow'>
                    <span v-if="hideFreeDish&&parseInt(dish.categoryTypeId)===11">
                        {{$t('Free')}}
                    </span>
                    <span v-else>
                        {{realPrice | priceDisplay}}
                        <span v-if="addPrice!==0">
                               (<price-text :price="addPrice"></price-text>)
                        </span>
                    </span>
                </div>
            </div>
            <div v-if="dish.note" class="note">
                <div class="d-flex">
                    <v-icon>edit</v-icon>
                    <div>{{dish.note}}</div>
                </div>
            </div>
            <div v-if="dish.displayApply.length>0" class="dishMod">
                <div v-bind:key="'mod_order-i'+i+'value'+ap.value" v-for="(ap,i) in dish.displayApply">
                    {{ap.groupName}}:{{ap.value}}<span v-if="ap.priceInfo">(<price-text :price="ap.priceInfo" />)</span>
                </div>
            </div>
        </div>
        <div class="dishCount">&times;{{dish.count}}</div>
    </div>
</template>

<script>
import PriceText from './PriceText'
export default {
  name: 'DishCard',
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
    }
  },
  data: function () {
    return Object.assign({ modInfos: {}, hasMod: 0, apply: [], note: '', sumCount: null, count: null }, { ...this.dish })
  },
  methods: {
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
        padding: 8px 30px;
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
        padding: 8px 0;
        width: 45px;
        display: flex;
        background: #f2f2f2;
        font-size: 18px;
        font-weight: bold;
        justify-content: center;
    }

    .dishMod {
        max-width: calc(100% - 45px);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-left: 48px;
        padding: 8px 30px;
    }

    .dishListTitle {
        background: #e3e6ea;
        font-weight: bold;
        padding: 12px 30px;
    }

</style>
