<template>
  <v-dialog v-model="realShow">
    <v-card> 123456</v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'KeyboardDialog',
  props: {
    menuShow: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      realShow: true,
      oldKeyboardListener: null
    }
  },
  methods: {
    onkeydown (event) {
      console.log(event)
    },
    enter () {
      console.log('enter dialog')
    },
    exit () {
      console.log('exit dialog')
    }
  },
  mounted () {
    console.log('dialog created')
  },
  watch: {
    realShow: function (val) {
      console.log(val, 'realShow')
      if (val) {
        this.enter()
      } else {
        this.exit()
      }
      this.$emit('update:menuShow', val)
    },
    menuShow: async function (val) {
      console.log(val, 'menuShow')
      this.realShow = val
    }
  }
}
</script>

<style scoped>

</style>
