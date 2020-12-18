<template>
  <v-card style="
  grid-auto-rows: 60px;
"
          class="keyboard">
    <template v-for="i in keys">
      <v-btn :key="'key'+i" @click="input(i)"
             class="key"
             style="height: 100%"
      >
        <v-icon v-if="!isNaN(i)" x-large>mdi-numeric-{{ i }}</v-icon>
        <v-icon x-large v-else-if="i.startsWith('mdi')">{{i}}</v-icon>
        <template v-else><span style="font-size: 30px">{{ i }}</span></template>
      </v-btn>
    </template>
  </v-card>

</template>

<script>
export default {
  name: 'Keyboard',
  props: {
    keys: {
      type: Array
    }
  },
  methods: {
    input (key) {
      this.$emit('input', key)
    }
  }
}
</script>

<style scoped>
.keyboard {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  grid-gap: 4px;
}

.key {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  height: auto;
  border-radius: 5px;
}
</style>
