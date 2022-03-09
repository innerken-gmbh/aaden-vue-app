<template>
  <v-card color="warning" dark elevation="0" class="d-flex align-center px-2 py-1">
    <v-icon size="20" left>mdi-truck-fast</v-icon>
    <h3 class="ml-2 font-weight-regular ">
      {{ $t(address.deliveryMethod) }} @
      <span>{{ address.time }}</span>
    </h3>
    <slot>

    </slot>

  </v-card>
</template>

<script>
export default {
  name: 'AddressPill',
  props: {
    address: {}
  }
}
</script>

<style scoped>

</style>
