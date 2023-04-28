<template>
  <div
    style="
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 4px;
    "
  >
    <key
      :key-name="key"
      v-for="(key, index) in keys"
      :key="key + index"
      @click="$emit('input', key)"
    >
    </key>
  </div>
</template>

<script>
import Key from './Key'

export default {
  name: 'KeyboardLayout',
  components: { Key },
  props: {
    keys: {}
  }
}
</script>

<style scoped></style>
