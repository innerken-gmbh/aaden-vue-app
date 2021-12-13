<template>
  <v-dialog v-model="realShow" max-width="960px">
    <v-card width="460px">
      <div v-if="title" class="pa-2" style="font-size: 24px;">
        {{ title }}
      </div>
      <div class="pa-2">
        <v-text-field type="number" style="font-size: 24px;" v-model="buffer" hide-details></v-text-field>
      </div>
      <div class="pa-2">
        <slot></slot>
      </div>
      <keyboard-layout @input="input" :keys="keys"></keyboard-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import KeyboardLayout from './component/Keyboard/KeyboardLayout'

const functionKey = ['mdi-backspace', 'OK', 'C']
export default {
  name: 'DialogWithKeyboard',
  components: { KeyboardLayout },
  props: { show: {}, keys: {}, title: {} },
  computed: {
    realShow: {
      get: function () {
        return this.show
      },
      set: function (val) {
        if (!val) {
          this.$emit('close', val)
        }
      }
    }
  },
  methods: {
    input (key) {
      console.log(key)
      if (functionKey.includes(key)) {
        switch (key) {
          case 'mdi-backspace':
            this.buffer = this.buffer.slice(0, -1)
            break
          case 'C':
            this.buffer = ''
            break
          case 'OK':
            this.$emit('submit', this.buffer)
            this.realShow = false
            this.buffer = ''
        }
      } else {
        this.buffer += key
      }
    }
  },
  data: function () {
    return {
      buffer: ''
    }
  }
}
</script>

<style scoped>

</style>
