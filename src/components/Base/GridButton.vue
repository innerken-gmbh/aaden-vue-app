<template>
  <v-btn
    rounded
    elevation="0"
    large
    :loading="loading"
    @click="!loading ? $emit('click') : ''"
    :disabled="disabled"
    :color="color"
    class="black--text lighten-4"
  >
    <v-icon left >{{ icon }}</v-icon>
    <div class="d-block overflow-hidden">
      <div class="text-truncate">{{ text }}</div>
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

.hideMore {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
