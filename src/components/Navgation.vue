<template>
  <v-app-bar dense dark app>
    <slot name="left">
      <v-app-bar-nav-icon>
        <v-icon>mdi-home-analytics</v-icon>
      </v-app-bar-nav-icon>
    </slot>
    <v-btn v-hide-quick-buy @click="toggleDebug()" icon>
      <v-icon>
        mdi-android-debug-bridge
      </v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <slot name="right-slot">
    </slot>
    <v-menu
        left
        bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
        >
          <v-list-item-title @click="changeLanguage('ZH')">{{ $t('langZH') }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title @click="changeLanguage('EN')">{{ $t('langEN') }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title @click="changeLanguage('DE')">{{ $t('langDE') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
import { version } from '../../package.json'
import { changeLanguage, toggleDebug } from '../oldjs/LocalGlobalSettings'

export default {
  name: 'Navgation',
  data: function () {
    return {
      time: '',
      version: version,
      info: {}
    }
  },
  methods: {
    changeLanguage,
    toggleDebug
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
