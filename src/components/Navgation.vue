<template>
  <v-app-bar dense dark app flat>
    <slot name="left">
    </slot>
    <v-spacer></v-spacer>
    <slot name="right">
    </slot>

  </v-app-bar>
</template>

<script>

export default {
  name: 'Navgation',
  data: function () {
    return {}
  }

}
</script>

<style scoped>
</style>
