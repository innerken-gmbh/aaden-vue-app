<template>
  <v-app>
    <transition>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <pin-dialog></pin-dialog>
  </v-app>

</template>

<script>
import { tryToReport } from './oldjs/common'
import PinDialog from '@/components/subcomponent/PinDialog'

export default {
  name: 'App',
  components: { PinDialog },
  props: {},
  data: () => ({}),
  mounted () {
    tryToReport()
  }
}
</script>

<style>

.theme--light.v-application {
  background: transparent;
  color: rgba(0, 0, 0, .87);
}

::-webkit-scrollbar {
  display: none;
}

body {
  font-family: Arial, Lantinghei SC, sans-serif, serif;
  user-select: none;
  overflow: hidden;
}

[v-cloak] {
  display: none;
}

nav {
  position: fixed;
  top: 0;
  z-index: 1001;
}

.languageSwitch div {
  cursor: pointer;
  margin-left: 4px;

}

.languageSwitch .active {
  color: #367aeb;
}

.v-data-table td {
  padding: 0 16px !important;
}

</style>
