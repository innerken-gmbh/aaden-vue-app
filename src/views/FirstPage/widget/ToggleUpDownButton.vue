<template>
  <v-btn icon>
    <template v-if="expand">
      <v-icon>mdi-chevron-up</v-icon>
    </template>
    <template v-else>
      <v-icon>mdi-chevron-down</v-icon>
    </template>
  </v-btn>
</template>

<script>
export default {
  name: 'ToggleUpDownButton',
  props: {
    expand: {}
  }
}
</script>

<style scoped>

</style>
