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
        :key-name="key.name"
        v-for="(key, index) in realKeys"
        :key="key + index"
        :color="key.color"
        @click="$emit('input', key.name)"
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
  },
  computed: {
    realKeys () {
      return this.keys.map(it => {
        if (typeof it === 'string') {
          return {
            name: it,
            color: 'grey lighten-4'
          }
        } else {
          return it
        }
      })
    }
  }
}
</script>

<style scoped></style>
