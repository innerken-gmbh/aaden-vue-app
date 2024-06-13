<template>
  <v-card
      @click="$emit('click')"
      elevation="0"
      class="pa-4"
      :color="active?'primary':'white'"
  >
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    active: {},
    clickable: { default: true }

  }
}
</script>

<style scoped>

</style>
