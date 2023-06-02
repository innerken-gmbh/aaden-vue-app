<template>
  <div
    v-cloak
    class="d-flex  align-center justify-center flex-column"
    style="height: 100%;position: relative"
  >
    <div class="text-h5">{{ $t('CurrentlyNotTiedToAnyShop') }}！</div>
    <div class="text-body-2 text--secondary mt-4">{{ $t('VisitAadenShopForPlatformBindings') }}</div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>

<style scoped>

</style>
