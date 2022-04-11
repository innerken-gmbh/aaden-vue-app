<template>
  <v-card elevation="0" style="width: 100%;">
    <v-subheader>
      <v-select
        chips
        deletable-chips
        :label="'Category'"
        :items="dishCategory"
        v-model="appliedFilter.category"
        @change="updateFilter(true)"
        :item-text="item => item.langs[0].name"
        solo
        class="mx-3"
        style="max-width: 320px"
      >
      </v-select>
      <v-select
        chips
        deletable-chips
        :label="'Category Type'"
        :items="dishCategoryTypeList"
        v-model="appliedFilter.categoryType"
        @change="updateFilter(false)"
        :item-text="item => item.name"
        solo
        class="mx-3"
        style="max-width: 320px"
      >
      </v-select>
      <v-btn icon class="mb-6" @click="clearFilter"><v-icon>mdi-close-circle</v-icon></v-btn>
      <v-btn class="primary mx-2 mb-6" @click="printSaleBon">按销量打印</v-btn>
      <v-btn class="primary mx-2 mb-6" @click="printSaleBonByCode">按菜号打印</v-btn>
    </v-subheader>
    <v-data-table
      :sort-by="['totalPrice']"
      :sort-desc="[true]"
      :items="displayItems"
      :headers="headers">
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
      appliedFilter: defaultRealFilter,
      filteredItem: [],
      startDate: '',
      dishCategory: [],
      dishCategoryTypeList: []
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'code',
          sortable: false,
          value: 'code'
        },
        {
          text: 'name',
          sortable: false,
          value: 'name'
        },
        {
          text: 'category',
          sortable: false,
          value: 'category'
        },
        {
          text: 'category Type',
          sortable: false,
          value: 'cateTypeName'
        },
        {
          text: 'totalCount',
          value: 'totalCount'
        },
        {
          text: 'totalPrice',
          value: 'totalPrice'
        }
      ]
    },
    displayItems () {
      return this.filteredItem
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
    async updateFilter (isFilteredByCate) {
      await this.reloadDishes()
      isFilteredByCate ? this.appliedFilter.categoryType = null : this.appliedFilter.category = null
      if (this.appliedFilter.category !== null && this.appliedFilter.categoryType === null) {
        this.filteredItem = this.filteredItem.filter(b => b.categoryId === this.appliedFilter.category)
      } else if (this.appliedFilter.category === null && this.appliedFilter.categoryType !== null) {
        this.filteredItem = this.filteredItem.filter(b => b.categoryTypeId === this.appliedFilter.categoryType)
      }
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
      IKUtils.showConfirm('Bist du sicher?', 'Möchten Sie Umsatz Bon drucken?', () => {
        printSaleBon(this.singleZBonDate[0], this.singleZBonDate[1]).then(() => {
          IKUtils.toast('Erfolgreich drucken!')
        })
      })
    },
    async printSaleBonByCode () {
      IKUtils.showConfirm('Bist du sicher?', 'Möchten Sie Umsatz Bon drucken?', () => {
        printSaleBonByCode(this.singleZBonDate[0], this.singleZBonDate[1]).then(() => {
          IKUtils.toast('Erfolgreich drucken!')
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
