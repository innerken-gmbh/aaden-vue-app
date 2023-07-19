<template>
  <div class="d-flex flex-column justify-center align-center"
       style="height: 100%;width: 100%;grid-column: span 2">
    <div class="d-flex flex-column justify-center text-center" style="max-width: 300px">
      <v-icon size="64">{{ icon }}</v-icon>
      <div class="text-body-1 mt-4">
        {{ title }}
      </div>
      <div class="text-body-2 text--secondary mt-1">
        {{ desc }}
      </div>
      <div>
        <slot></slot>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'NoContentDisplay',
  props: {
    icon: {},
    title: {},
    desc: {}
  }
}
</script>

<style scoped>

</style>
