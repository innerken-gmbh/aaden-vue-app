<template>
  <v-card
      flat
      :color="color"
      @click="$emit('click',keyName)"
      :style="{fontSize:keyNameText.length<3?'22px':'14px'}"
      style="height: 72px;font-size: 24px;
       font-weight: 600;
       ;border-radius: 8px"
      class="d-flex justify-center align-center font-weight-black text-center"
  >
    <template v-if="keyName.startsWith('mdi')">
      <v-icon large>{{ keyName }}</v-icon>
    </template>
    <template v-else>
      {{ keyNameText }}
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'Key',
  props: {
    keyName: { default: '' },
    color: { default: 'grey lighten-4' }
  },
  computed: {
    keyNameText () {
      return !isNaN(this.keyName) ? this.keyName : this.$t(this.keyName)
    }
  }
}
</script>

<style scoped>

</style>
