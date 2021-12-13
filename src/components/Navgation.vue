<template>
  <v-app-bar dense dark app>
    <v-menu
      left
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn tile
               icon
               v-bind="attrs"
               v-on="on"
        >
          <v-icon>mdi-web</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeLanguage('ZH')"
        >
          <v-list-item-title>{{ $t('langZH') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLanguage('EN')">
          <v-list-item-title>{{ $t('langEN') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLanguage('DE')">
          <v-list-item-title>{{ $t('langDE') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <slot name="left">
      <v-app-bar-nav-icon>
        <v-icon>mdi-home-analytics</v-icon>
      </v-app-bar-nav-icon>
    </slot>
    <v-spacer></v-spacer>
    <slot name="right-slot">
    </slot>
    <slot name="after-menu">

    </slot>
  </v-app-bar>
</template>

<script>

import { forceChangeLanguage } from '@/oldjs/LocalGlobalSettings'

export default {
  name: 'Navgation',
  data: function () {
    return {
      info: {}
    }
  },
  methods: {
    changeLanguage: forceChangeLanguage
  }
}
</script>

<style scoped>
.adbIcon {
  display: flex;
  align-items: center;
}

.adbIcon .material-icons {
  height: auto;
  line-height: unset;
}
</style>
