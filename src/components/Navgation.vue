<template>
  <v-app-bar flat style="border-bottom: 1px solid rgba(0,0,0,0.1)" app dense>

    <slot></slot>
    <v-spacer></v-spacer>
    <v-card dark color="grey" class="d-flex  flex-shrink-0 align-center pa-2 ml-1" elevation="0">
      <div style="width: 70px">
        <v-img width="100%" :src="require('@/assets/aadenLogo.png')"></v-img>
      </div>

      <span class="text-no-wrap ml-2">
          v {{ version }}
    </span>
    </v-card>

  </v-app-bar>
</template>

<script>
const version = require('../../package.json').version

export default {
  name: 'Navgation',
  data: function () {
    return {
      version
    }
  }

}
</script>

<style scoped>
</style>
