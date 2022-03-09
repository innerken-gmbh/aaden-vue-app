<template>
  <v-btn large rounded elevation="0" dark :loading="loading" @click="!loading?$emit('click'):''" :disabled="disabled"
         :color="color">
    <div class="d-flex justify-center" style="width: 100%">
      <v-icon>{{ icon }}</v-icon>
    </div>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'GridButton',
  props: {
    icon: {},
    color: {
      default: 'primary'
    },
    text: {},
    loading: {
      default: false
    },
    disabled: {
      default: false
    }
  }
}
</script>

<style scoped>
.gridButton {
  display: flex;
  width: 100%;
  justify-content: center;

}

</style>
