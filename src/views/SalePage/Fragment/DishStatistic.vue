<template>
  <v-card elevation="0" style="width: 100%;">
    <v-subheader>
      <v-btn class="primary mx-2" @click="printSaleBon">按销量打印</v-btn>
      <v-btn class="primary mx-2" @click="printSaleBonByCode">按菜号打印</v-btn>
    </v-subheader>
    <v-simple-table
      height="calc(100vh - 108px)"
      fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Code/名称</th>
          <th class="text-left">category</th>
          <th class="text-left">销售数量</th>
          <th class="text-left">单价</th>
          <th class="text-left">总价</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="record in displayItems">
          <tr v-bind:key="record.dishId">
            <td>
              {{ record.code }} / {{ record.name }}
            </td>
            <td>
              <v-chip
              :color="record.color">
                {{ record.cateName }}
              </v-chip>
            </td>
            <td>
              {{ record.totalCount }}
            </td>
            <td>
              {{ record.price | priceDisplay }}
            </td>
            <td>
              {{ record.price * record.totalCount | priceDisplay }}
            </td>
          </tr>
        </template>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { loadCategory, loadDishStatistic, printSaleBon, printSaleBonByCode } from '@/api/api'
import IKUtils from 'innerken-js-utils'

export default {
  name: 'DishStatistic',
  props: {
    singleZBonDate: {}
  },
  data: () => {
    return {
      filteredItem: [],
      startDate: '',
      displayItems: [],
      dishCategory: []
    }
  },
  watch: {
    async singleZBonDate () {
      await this.reloadDishes()
    },
    filteredItem (val) {
      this.displayItems = val
    }
  },
  methods: {
    async reloadDishes () {
      this.filteredItem = await loadDishStatistic(...this.singleZBonDate)
      this.filteredItem.forEach(i => {
        this.dishCategory.forEach(c => {
          if (c.id === i.categoryId) {
            i.cateName = c.langs[0].name
            i.color = c.color
          }
        })
      })
      this.filteredItem.sort((a, b) => {
        return b.price * b.totalCount - a.price * a.totalCount
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
    console.log(this.dishCategory)
    await this.reloadDishes()
  }
}
</script>

<style scoped>

</style>
