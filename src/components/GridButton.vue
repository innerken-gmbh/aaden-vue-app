<template>
  <div class="gridButton elevation-1" @click="$emit('click')">

    <div>
      <div class="d-flex justify-center" style="width: 100%">
        <v-icon>{{ icon }}</v-icon>
      </div>
      <div class="d-flex justify-center" style="width: 100%">
        {{ text }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GridButton',
  props: {
    icon: {},
    text: {}
  }
}
</script>

<style scoped>
.gridButton {
  display: flex;
  width: 100%;
  height: 72px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

}

</style>
