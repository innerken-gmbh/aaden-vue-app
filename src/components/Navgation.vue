<template>
    <nav class="noShadow">
        <div class="white elevation-3 avesNav d-flex justify-space-between">
            <div class=" flex-Container">

                <div class="languageSwitch">
                    <div @click="changeLanguage('ZH')" >{{$t('langZH')}}</div>
                    <div @click="changeLanguage('EN')" >{{$t('langEN')}}</div>
                    <div @click="changeLanguage('DE')">{{$t('langDE')}}</div>
                </div>

                <div  class="splitter"></div>

                <div class="timeDisplay">
                    <div class="timeFont">
                        <span id="time" v-cloak>{{time}}</span>
                    </div>
                </div>
                <div class="splitter"></div>
                <div class="appName">
                    {{$t('appName')}}
                </div>
                <div class="splitter"></div>
                <v-sheet class="appName">
                    <span v-show-quick-buy>FMC-</span>
                    {{version}}
                </v-sheet>

                <div v-hide-quick-buy class="splitter"></div>
                <div v-hide-quick-buy @click="toggleDebug()" class="adbIcon">
                    <i class="material-icons littleIcon">adb</i>
                </div>

            </div>
            <div class="">
                <slot name="right-slot">
                </slot>
            </div>
        </div>
    </nav>
</template>

<script>
import { version } from '../../package.json'
import { showTime } from '../oldjs/common'
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
  },
  created () {
    setInterval(() => {
      this.time = showTime()
    }, 1000)
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
