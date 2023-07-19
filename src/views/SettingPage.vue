<template>
  <div style="height: 100vh;overflow-y: scroll" v-dragscroll>
    <v-card color="white" class="mt-16">
      <v-list dense>
        <template v-for="key in NeededKeys">
          <v-list-item dense :key="'config'+key">
            <v-list-item-title>{{ $t(key) }}</v-list-item-title>
            <template v-if="typeof Config[key]==='boolean'">
              <v-list-item-action>
                <v-switch v-model="Config[key]" color="purple"></v-switch>
              </v-list-item-action>
            </template>
            <template v-else>
              <v-list-item-action>
                <v-text-field v-model="Config[key]" color="purple"></v-text-field>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list>
      <v-app-bar bottom fixed>
        <v-spacer></v-spacer>
        <v-btn
            large
            color="primary lighten-4 black--text "
            elevation="0"
            @click="useCurrentConfig">
          <v-icon left>mdi-content-save-check</v-icon>
          {{ $t('Save') }}
        </v-btn>
      </v-app-bar>
    </v-card>
  </div>
</template>

<script>
import GlobalConfig, { hardReload, NeededKeys, useCurrentConfig } from '@/oldjs/LocalGlobalSettings'
import { dragscroll } from 'vue-dragscroll'

export default {
  name: 'SettingPage',
  directives: {
    dragscroll
  },
  data: function () {
    return {
      NeededKeys,
      Config: GlobalConfig
    }
  },
  methods: {
    useCurrentConfig,
    hardReload
  }
}
</script>

<style scoped>

</style>
