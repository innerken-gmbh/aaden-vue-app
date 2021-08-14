<template>
  <v-card :disabled="disabled" :color="color" class="gridButton elevation-0"
       @click="!loading?$emit('click'):''">
    <div class="mt-7">
      <template v-if="loading">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </template>
      <template v-else>
        <div class="d-flex justify-center" style="width: 100%">
          <v-icon color="white">{{ icon }}</v-icon>
        </div>
        <div  class="d-flex justify-center mt-2 caption" style="width: 100%;color: white;font-size: 16px !important;">
          {{ text }}
        </div>
      </template>

    </div>

  </v-card>
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
  height: 88px;
  justify-content: center;

}

</style>
