<template>
  <v-card :color="color" class="gridButton elevation-1"
       @click="$emit('click')">
    <div>
      <div class="d-flex justify-center" style="width: 100%">
        <v-icon color="white">{{ icon }}</v-icon>
      </div>
      <div  class="d-flex justify-center mt-1" style="width: 100%;color: white">
        {{ text }}
      </div>
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
    text: {}
  }
}
</script>

<style scoped>
.gridButton {
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

}

</style>
