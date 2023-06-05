<template>
  <div
    class="d-flex flex-column align-center"
  >
    <v-card
      :color="active?'primary lighten-4':'grey lighten-4'"
      :disabled="disabled"
      elevation="0"
      width="100%"
      @click="$emit('click')"
    >
      <v-responsive :aspect-ratio="1">
        <div
          class="d-flex align-center justify-center"
          style="height: 100%"
        >
          <div
            class="d-flex align-center justify-center flex-wrap"
          >
            <v-icon
              style="width: 100%;"
            >
              {{ icon }}
            </v-icon>
          </div>
        </div>
      </v-responsive>
    </v-card>
    <div
      class="mt-1 text-caption text-truncate"
      style="max-width: 50px;"
    >
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabButton',
  props: {
    name: {},
    icon: {},
    color: {},
    active: {},
    disabled: {}
  }
}
</script>

<style scoped>

</style>
