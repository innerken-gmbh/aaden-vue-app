<template>
  <v-app-bar flat style="border-bottom: 1px solid rgba(0,0,0,0.1)"
             app>
    <v-card dark color="grey"
            class="d-flex  flex-shrink-0 align-center pa-2"
            elevation="0">
      <div style="width: 70px">
        <v-img width="100%"
               :src="require('@/assets/aadenLogo.png')"/>
      </div>

      <span class="text-no-wrap ml-2">
          v {{ version }}
    </span>
    </v-card>
    <slot></slot>
    <v-spacer></v-spacer>
    <slot name="right"></slot>

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
