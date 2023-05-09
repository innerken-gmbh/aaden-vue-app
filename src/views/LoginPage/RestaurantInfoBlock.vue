<template>
  <v-card
    color="grey lighten-2"
    elevation="0"
    style="position: relative;flex-shrink: 0;"
    width="190"
    @click="$emit('click')"
  >
    <v-responsive :aspect-ratio="3/4">
      <div
        class="d-flex flex-column justify-center pa-2 align-center text-center"
        style="height: 100%"
      >
        <div class="text-h4 mt-2 font-weight-bold">
          {{ info.name }}
        </div>
        <div class="text-body-1 mt-2">
          <template v-if="info.adress2">
            {{ info.adress2 }}<br>
          </template>
          {{ info.adress1 }}<br>
        </div>
        <div class="text-body-2 mt-1">
          {{ info.city }}
        </div>
      </div>
    </v-responsive>
  </v-card>
</template>

<script>

export default {
  name: 'RestaurantInfoBlock',
  props: {
    info: {}
  }
}
</script>

<style scoped>

</style>
