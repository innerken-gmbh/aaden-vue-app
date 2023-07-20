<!--
  - Copyright (c) 2023. Haodong JU
  -->

<template>
  <div>
    <v-btn
        class="align-center"
        elevation="0"
        icon
        @click="dialog=true"
    >
      <v-icon>
        mdi-web
      </v-icon>
    </v-btn>
    <v-dialog
        v-model="dialog"
        max-width="300px"
    >
      <div v-dragscroll>
        <v-card

            :dark="isDarkMode"
            :light="!isDarkMode"
            class="py-2"
        >
          <v-list>
            <v-list-item
                v-for="item in allLocales"
                :key="item.langCode"
                @click="setLocale(item.langCode)"
            >
              <v-list-item-avatar>
                <flag-icon
                    :flag="item.flag"
                    class="mt-2"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="text-body-2">{{ $t(item.langLabel) }}</span>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <div
                    v-if="currentLocale === item"
                >
                  <v-icon>
                    mdi-bookmark-check
                  </v-icon>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </div>

    </v-dialog>
  </div>
</template>

<script>
import FlagIcon from '@/views/Widget/FlagIcon'
import { dragscroll } from 'vue-dragscroll'

export default {
  name: 'LanguageSwitcher',
  components: {
    FlagIcon
  },
  props: {
    screenSize: {},
    locales: {},
    currentLocaleCode: {},
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    dragscroll
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    currentLocale () {
      return Object.values(this.locales).find(it => it.langCode === this.currentLocaleCode)
    },
    allLocales () {
      return Object.values(this.locales).filter(el => el.langCode !== this.currentLocale)
    }
  },
  methods: {
    setLocale (locale) {
      this.$emit('language-change', locale)
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
