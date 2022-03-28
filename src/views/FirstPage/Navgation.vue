<template>
  <v-app-bar flat style="border-bottom: 1px solid rgba(0,0,0,0.1)"
             app>

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
