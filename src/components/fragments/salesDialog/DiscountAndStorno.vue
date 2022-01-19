<template>
  <v-card>
    <v-card-title>{{ $t('单菜品折扣') }}
      <v-spacer></v-spacer>
      {{ totalDiscountValue }}
    </v-card-title>
    <v-simple-table height="calc(100vh - 108px)" fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
          <th class="text-left">{{ $t('time') }}/{{ $t('Kellner') }}</th>
          <th class="text-left">{{ $t('discount') }}</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(dish,index) in discountedDishes">
          <tr v-bind:key="dish.dishesId+index">
            <td>
              <span class="font-weight-bold">{{ dish.tableName }}</span> / {{ dish.dishesOrdersId }}
            </td>
            <td>
              {{ dish.time }}/{{ dish.servantName }}
            </td>
            <td>
              {{ dish.code }}.{{ dish.dishName }} /
              {{ '-' + dish.tempDiscountStr.replace('p', '%') }}({{ dish.tempDiscountMod }})
            </td>
          </tr>
        </template>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: 'DiscountAndStorno',
  props: { discountedDishes: {} },
  computed: {
    totalDiscountValue () {
      return this.discountedDishes.reduce((sum, a) => {
        sum += parseFloat(a.tempDiscountMod) * a.sumCount
        return sum
      }, 0)
    }
  }
}
</script>

<style scoped>

</style>
