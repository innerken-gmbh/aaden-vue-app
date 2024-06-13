<template>
  <div v-ripple @click="$emit('click',keyName)"
       style="height: 72px;font-size: 24px;font-weight: 600;background: #f6f6f6;border-radius: 8px"
       class="d-flex justify-center align-center">
    <template v-if="keyName.startsWith('mdi')">
      <v-icon large>{{ keyName }}</v-icon>
    </template>
    <template v-else>{{ !isNaN(keyName) ? keyName : $t(keyName) }}</template>
  </div>
</template>

<script>
export default {
  name: 'Key',
  props: { keyName: { default: '' } }
}
</script>

<style scoped>

</style>
