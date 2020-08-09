<template>
  <v-app-bar dense dark app>
    <slot name="left">
      <v-app-bar-nav-icon>
        <v-icon>mdi-home-analytics</v-icon>
      </v-app-bar-nav-icon>
    </slot>

    <div class="languageSwitch">
      <div @click="changeLanguage('ZH')">{{ $t('langZH') }}</div>
      <div @click="changeLanguage('EN')">{{ $t('langEN') }}</div>
      <div @click="changeLanguage('DE')">{{ $t('langDE') }}</div>
    </div>

    <v-btn  v-hide-quick-buy @click="toggleDebug()" icon><v-icon>
      mdi-android-debug-bridge
    </v-icon></v-btn>
    <v-spacer></v-spacer>
    <slot name="right-slot">
    </slot>

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
