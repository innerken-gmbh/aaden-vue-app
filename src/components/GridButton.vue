<template>
  <v-card :disabled="disabled" :color="color" class="gridButton elevation-0"
          @click="!loading?$emit('click'):''">
    <v-responsive :aspect-ratio="1">
      <div class="mt-4">
        <template v-if="loading">
          <v-progress-circular indeterminate color="white"></v-progress-circular>
        </template>
        <template v-else>
          <div class="d-flex justify-center" style="width: 100%">
            <v-icon color="white">{{ icon }}</v-icon>
          </div>
          <div class="mt-2  text-center text-no-wrap text-truncate text-body-2" style="color: white;">
            {{ text }}
          </div>
        </template>

      </div>
    </v-responsive>
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
  justify-content: center;

}

</style>
