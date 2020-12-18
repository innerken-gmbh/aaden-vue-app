<template>
    <v-app-bar bottom clipped-right dark color="primary" app>
        <slot name="left">
            <v-app-bar-nav-icon>
                <v-icon>mdi-home-analytics</v-icon>
            </v-app-bar-nav-icon>
        </slot>
        <v-spacer></v-spacer>
        <slot name="right-slot">
        </slot>
        <slot name="after-menu">
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
        </slot>
    </v-app-bar>
</template>

<script>
import { changeLanguage } from '../oldjs/LocalGlobalSettings'

export default {
  name: 'Navgation',
  data: function () {
    return {
      info: {}
    }
  },
  methods: {
    changeLanguage
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
