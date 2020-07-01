<template>
    <nav class="noShadow">
        <div class="white elevation-3 avesNav">
            <div class="left flex-Container">
                <div class="languageSwitch">
                    <div @click="changeLanguage('ZH')" class="S_langZH">中</div>
                    <div @click="changeLanguage('EN')" class="S_langEN">英</div>
                    <div @click="changeLanguage('DE')" class="S_langDE">德</div>
                </div>
                <div class="splitter"></div>
                <div class="timeDisplay">
                    <div class="timeFont">
                        <span id="time" v-cloak>{{time}}</span>
                    </div>
                </div>
                <div class="splitter"></div>
                <div class="appName S_appName">
                    Aaden Kasse
                </div>
                <div class="splitter"></div>
                <v-tooltip bottom absolute>
                    <template v-slot:activator="{on,attrs}">
                        <div  v-bind="attrs"
                              v-on="on" class="appName">
                            {{version}}
                        </div>
                    </template>
                    <span>Tooltip</span>
                </v-tooltip>
                <div class="splitter"></div>
                <div @click="toggleDebug()" class="adbIcon">
                    <i class="material-icons littleIcon">adb</i>
                </div>
            </div>
            <div class="right">
                <slot name="right-slot">
                </slot>
            </div>
        </div>
    </nav>
</template>

<script>
import { version } from '../../package.json'
import { changeLanguage, showTime, toggleDebug } from '../oldjs/common'

export default {
  name: 'Navgation',
  data: function () {
    return {
      time: '',
      version: version
    }
  },
  methods: {
    changeLanguage: function (l) {
      changeLanguage(l)
    },
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
