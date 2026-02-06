<!--
  - Copyright (c) 2023. Haodong JU
  -->

<template>
  <div>
    <slot
        v-if="!loading"
    />
    <template v-else>
      <div
          class="d-flex align-center justify-center  flex-column"
          style="min-height: 400px;height: 100%"
      >
        <v-progress-circular indeterminate/>
        <div class="mt-12">
          <slot name="loadingText"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'LoadingProvider',
  props: {
    loading: {}
  }
}
</script>

<style scoped>

</style>
