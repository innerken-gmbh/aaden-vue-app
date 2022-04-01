<template>
  <v-card elevation="0" class="pa-2">
    <span>{{title}}</span>
    <div class="d-flex align-baseline mt-1">
      <v-spacer></v-spacer>
      <h2>{{ mainInfo }}</h2>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'infoBlock',
  props: {
    title: {},
    mainInfo: {}
  }
}
</script>

<style scoped>

</style>
