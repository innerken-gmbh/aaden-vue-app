<template>
  <v-app-bar >

    <slot></slot>
    <v-spacer></v-spacer>
    <slot name="right"></slot>

  </v-app-bar>
</template>

<script>

export default {
  name: 'Navgation'

}
</script>

<style scoped>
</style>
