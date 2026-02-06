<!--
  - Copyright (c) 2022-2024. Haodong JU
  -->

<template>
  <div class="d-flex align-center">
    <div
      :class="$vuetify.breakpoint.mdAndDown ? 'py-2' : 'py-4'"
    >
      <span class="text-h4 font-weight-bold"><slot /></span>
      <div class="text-body-2">
        <slot name="subtitle" />
      </div>
    </div>
    <v-spacer />
    <slot name="action" />
  </div>
</template>

<script>
export default {
  name: 'PageSubHeader'
}
</script>

<style scoped>

</style>
