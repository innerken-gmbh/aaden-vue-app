<template>
  <v-card elevation="0" style="width: 100%;">
    <v-simple-table
      height="calc(100vh - 108px)"
      fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Code/名称</th>
          <th class="text-left">{{ $t('备注') }}</th>
          <th class="text-left">{{ $t('Summe') }}</th>
          <th class="text-left">价格</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="record in displayItems">
          <tr v-bind:key="record.dishId">
            <td>
              {{ record.code }} / {{ record.name }}
            </td>
            <td>
              {{ record.code }}
            </td>
            <td>
              {{ record.totalCount }}
            </td>
            <td>
              {{ record.price }}
            </td>
          </tr>
        </template>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { loadDishStatistic } from '@/api/api'

const HeadersArr = [
  {
    text: 'code',
    align: 'start',
    value: 'code',
    sortable: false
  },
  {
    text: 'dishName',
    align: 'start',
    value: 'name',
    sortable: false
  },
  {
    text: 'categoryName',
    value: 'categoryId',
    sortable: false
  },
  {
    text: 'num',
    value: 'totalCount',
    align: 'start'
  }
]

export default {
  name: 'DishStatistic',
  props: {
    singleZBonDate: {}
  },
  data: () => {
    return {
      headers: HeadersArr,
      filteredItem: [],
      startDate: '',
      displayItems: []
    }
  },
  watch: {
    async singleZBonDate () {
      console.log('change')
      await this.reloadDishes()
    },
    filteredItem (val) {
      console.log(val)
      this.displayItems = val
      console.log(this.displayItems)
      this.$forceUpdate()
    }
  },
  methods: {
    async reloadDishes () {
      console.log(this.singleZBonDate)
      this.filteredItem = await loadDishStatistic(...this.singleZBonDate)
      this.filteredItem.sort((a, b) => {
        return b.totalCount - a.totalCount
      })
    }
  },
  async mounted () {
    await this.reloadDishes()
  }
}
</script>

<style scoped>

</style>
