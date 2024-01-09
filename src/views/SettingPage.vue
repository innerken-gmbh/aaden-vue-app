<template>
  <div
      style="height: 100vh;overflow-y: scroll;background: #f0f0f0"
      v-dragscroll
  >
    <div class="d-flex align-center justify-center pt-16">
      <v-card
          elevation="0"
          color="white"
          class="mb-16 pa-4"
          width="500"
      >
        <v-list
            dense
            subheader
        >
          <v-subheader>
            {{ $t('Config') }}
          </v-subheader>
          <template v-for="key in NeededKeys">
            <v-list-item
                dense
                :key="'config'+key"
            >
              <v-list-item-title>{{ $t(key) }}</v-list-item-title>
              <template v-if="typeof Config[key]==='boolean'">
                <v-list-item-action>
                  <v-switch
                      dense
                      v-model="Config[key]"
                      color="primary"
                  ></v-switch>
                </v-list-item-action>
              </template>
              <template v-else>
                <v-list-item-action>
                  <v-text-field
                      dense
                      hide-details
                      outlined
                      v-model="Config[key]"
                      color="primary"
                  ></v-text-field>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </v-list>
        <v-btn
            style="position: fixed;right: 32px;bottom: 32px;"
            color="amber lighten-4 black--text "
            elevation="0"
            x-large
            rounded
            @click="useCurrentConfig"
        >
          <v-icon left>mdi-content-save-check</v-icon>
          {{ $t('Save') }}
        </v-btn>
      </v-card>
    </div>

  </div>
</template>

<script>
import GlobalConfig, { NeededKeys, useCurrentConfig } from '@/oldjs/LocalGlobalSettings'
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
    useCurrentConfig
  }
}
</script>

<style scoped>

</style>
