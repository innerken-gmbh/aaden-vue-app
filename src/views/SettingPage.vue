<template>
    <div>
        <v-card color="white">
            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('setting') }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-icon>mdi-heart</v-icon>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
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
            <div class="pt-16"></div>
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

export default {
  name: 'SettingPage',
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
