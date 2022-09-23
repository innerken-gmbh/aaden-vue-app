<template>
  <v-btn large rounded elevation="0" dark :loading="loading" @click="!loading?$emit('click'):''" :disabled="disabled"
         :color="color">
    <v-icon>{{ icon }}</v-icon>
    <div class="hideMore" style="max-width: 100px">
    {{ text }}
    </div>
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
.hideMore{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
