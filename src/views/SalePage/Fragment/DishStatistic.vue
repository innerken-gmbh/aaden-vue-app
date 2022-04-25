<template>
  <v-card elevation="0" style="width: 100%;">
    <div class="d-flex flex-grow-1">
      <v-data-table
        style="min-width: calc(100% - 272px)"
        height="calc(100vh - 200px)"
        :sort-by="orderBySales ? ['totalPrice']: ['totalCount']"
        :sort-desc="[true]"
        :items="displayItems"
        :headers="headers">
        <template v-slot:top>
          <v-subheader style="margin-left: -28px">
            <v-select
              :label="'Category'"
              :items="dishCategory"
              v-model="appliedFilter.category"
              item-text="langs[0].name"
              solo
              class="ml-3"
              style="max-width: 240px"
            >
            </v-select>
            <v-select
              :label="'Category Type'"
              :items="dishCategoryTypeList"
              v-model="appliedFilter.categoryType"
              item-text="name"
              solo
              class="ml-3"
              style="max-width: 160px"
            >
            </v-select>
            <v-btn v-if="showClear" text class="mb-6" @click="clearFilter">
              <v-icon>mdi-close-circle</v-icon>
              {{ $t('清除') }}
            </v-btn>
          </v-subheader>
        </template>
        <template #item.name="{item}">
          <span class="font-weight-bold">
            {{ item.name }}
          </span>
        </template>
        <template #item.category="{item}">
          <v-chip
            :color="item.color?item.color:'white'">
            {{ item.cateName }}
          </v-chip>
        </template>
        <template #item.cateTypeName="{item}">
        <span class="font-weight-bold">
          {{ item.cateTypeName }}
        </span>
        </template>
        <template #item.totalPrice="{item}">
          {{ item.totalPrice | priceDisplay }}
        </template>
      </v-data-table>
      <v-navigation-drawer permanent right width="272">
        <v-card elevation="0" class="pa-2" width="272">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-switch
              v-model="orderBySales"
              flat
              :label="orderBySales ? '按销售额排序' : '按销量排序'"
            ></v-switch>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-btn x-large dark block class="orange mx-2 mb-6" @click="printSaleBon">{{ $t('按销量打印') }}</v-btn>
          <v-btn x-large dark block class="orange mx-2 mb-6" @click="printSaleBonByCode">{{ $t('按菜号打印') }}</v-btn>
        </v-card>
      </v-navigation-drawer>
    </div>
  </v-card>
</template>

<script>
import { loadCategory, loadCategoryType, loadDishStatistic, printSaleBon, printSaleBonByCode } from '@/api/api'
import IKUtils from 'innerken-js-utils'

const defaultRealFilter = {
  category: null,
  categoryType: null
}

export default {
  name: 'DishStatistic',
  props: {
    singleZBonDate: {}
  },
  data: () => {
    return {
      orderBySales: true,
      appliedFilter: defaultRealFilter,
      filteredItem: [],
      startDate: '',
      dishCategory: [],
      dishCategoryTypeList: []
    }
  },
  computed: {
    showClear () {
      return this.appliedFilter.category || this.appliedFilter.categoryType
    },
    headers () {
      return [
        {
          text: this.$t('code'),
          sortable: false,
          value: 'code'
        },
        {
          text: this.$t('name'),
          sortable: false,
          value: 'name'
        },
        {
          text: this.$t('category'),
          sortable: false,
          value: 'category'
        },
        {
          text: this.$t('category Type'),
          sortable: false,
          value: 'cateTypeName'
        },
        {
          text: this.$t('totalCount'),
          value: 'totalCount'
        },
        {
          text: this.$t('totalPrice'),
          value: 'totalPrice'
        }
      ]
    },
    displayItems () {
      return this.filteredItem.filter(i => {
        return (this.appliedFilter.category === null && this.appliedFilter.categoryType === null) || (this.appliedFilter.category === null && i.categoryTypeId === this.appliedFilter.categoryType) ||
          (this.appliedFilter.categoryType === null && i.categoryId === this.appliedFilter.category) || (i.categoryTypeId === this.appliedFilter.categoryType && i.categoryId === this.appliedFilter.category)
      })
    }
  },
  watch: {
    async singleZBonDate () {
      await this.reloadDishes()
    }
  },
  methods: {
    async clearFilter () {
      this.appliedFilter.category = null
      this.appliedFilter.categoryType = null
      await this.reloadDishes()
    },
    async reloadDishes () {
      this.filteredItem = await loadDishStatistic(...this.singleZBonDate)
      console.log(this.dishCategory)
      this.filteredItem.forEach(i => {
        this.dishCategory.forEach(c => {
          if (c.id === i.categoryId) {
            i.cateName = c.langs[0].name
            i.color = c.color
            i.totalPrice = i.totalCount * i.price
            i.cateTypeName = c.catTypeStrings[0].name
          }
        })
      })
    },
    async printSaleBon () {
      IKUtils.showConfirm(this.$t('Bist du sicher?'), this.$t('Möchten Sie Umsatz Bon drucken?'), () => {
        printSaleBon(this.singleZBonDate[0], this.singleZBonDate[1]).then(() => {
          IKUtils.toast(this.$t('Erfolgreich drucken!'))
        })
      })
    },
    async printSaleBonByCode () {
      IKUtils.showConfirm(this.$t('Bist du sicher?'), this.$t('Möchten Sie Umsatz Bon drucken?'), () => {
        printSaleBonByCode(this.singleZBonDate[0], this.singleZBonDate[1]).then(() => {
          IKUtils.toast(this.$t('Erfolgreich drucken!'))
        })
      })
    }
  },
  async mounted () {
    this.dishCategory = await loadCategory()
    this.dishCategory.forEach(d => {
      d.value = d.id
    })
    this.dishCategoryTypeList = await loadCategoryType()
    this.dishCategoryTypeList.forEach(d => {
      d.value = d.id
    })
    await this.clearFilter()
  }
}
</script>

<style scoped>

</style>
