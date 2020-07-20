<template>
    <nav class="noShadow">
        <div class="white elevation-3 avesNav d-flex justify-space-between">
            <div class=" flex-Container">
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
                <v-sheet class="appName">
                    OV-{{version}}
                </v-sheet>
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
