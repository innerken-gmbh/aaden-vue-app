<!--
  - Copyright (c) 2023. Haodong JU
  -->

<template>
  <div>
    <template v-if="!$vuetify.breakpoint.mobile">
      <navigation-item
        :title="$t('ChangeLanguage')"
        icon="mdi-translate"
        @click="dialog=true"
      />
    </template>
    <template v-else>
      <v-btn
        class="align-center"
        absolute
        bottom
        elevation="0"
        color="transparent"
        @click="dialog=true"
      >
        <v-icon color="black">
          mdi-translate
        </v-icon>
        <div
          style="font-variant: unset; font-size: 11px"
          class="ml-1 black--text"
        >
          {{ $t('ChangeLanguage') }}
        </div>
      </v-btn>
    </template>
    <v-dialog
      v-model="dialog"
      max-width="300px"
      scrollable
    >
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
                <span class="text-body-2">{{ item.label }}</span>
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
    </v-dialog>
  </div>
</template>

<script>
import FlagIcon from '@/views/Widget/FlagIcon'
import NavigationItem from '@/views/Widget/NavigationItem'

export default {
  name: 'LanguageSwitcher',
  components: {
    NavigationItem,
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
