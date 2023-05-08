<!--
  - Copyright (c) 2023. Haodong JU
  -->

<template>
  <v-app>
    <div
      class="d-flex"
      style="height: 100vh"
    >
      <div
        class="hidden-sm-and-down"
        style="width: 50%;height:100%;background-color: #f9f9f1"
      >
        <div
          class="d-flex flex-column align-center justify-center pa-8"
          style="height: 100%"
        >
          <primary-logo-display/>
        </div>
      </div>
      <div
        :style="{width:$vuetify.breakpoint.smAndDown?'100%':'50%'}"
        class="grey lighten-4"
      >
        <router-view/>
      </div>
    </div>
  </v-app>
</template>

<script>

import PrimaryLogoDisplay from '@/views/LoginPage/PrimaryLogoDisplay'

export default {
  name: 'Index',
  components: {
    PrimaryLogoDisplay
  },
  data: function () {
    return {}
  },
  computed: {},
  async mounted () {
  },
  methods: {}
}
</script>

<style scoped>

</style>
