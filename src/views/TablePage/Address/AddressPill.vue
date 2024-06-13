<template>
  <v-btn rounded color="green lighten-4 black--text" elevation="0">
    {{ $t(address.deliveryMethod) }}@<span>{{ address.time }}</span>
    <v-icon right>mdi-pencil-circle</v-icon>
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: 'AddressPill',
  props: {
    address: {}
  }
}
</script>

<style scoped></style>
