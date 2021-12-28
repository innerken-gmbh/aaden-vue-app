<template>
  <div class="d-flex flex-grow-0 align-center justify-center"
       :style="{
    backgroundColor:backgroundColor,
    borderRadius:borderRadius,
    ...border,
    margin:margin,
  }" :elevation="elevation">
    <span style="height: 12px"
          :style="{
      color:getColorLightness(backgroundColor)<128?'#fff':'#000',
      fontSize:fontSize
          }">
          {{ decorText }}{{ label }}
    </span>
  </div>
</template>

<script>
/*
* Showing state: active,call,idle,nodata
* Editing state: occupied,selectable,selected,idle
*
* */

import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { getColorLightness } from '@/oldjs/api'

export default {
  name: 'TableBlock',
  props: {
    currentState: String,
    tableInfo: Object,
    label: String,
    isEditing: Boolean,
    cell: Object
  },
  methods: {
    getColorLightness,
    dragStart (event) {
      console.log(event)
    }
  },
  computed: {
    elevation () {
      if (this.cell.tableId) {
        return 2
      } else {
        return 0
      }
    },
    border () {
      if (this.isEditing) {
        if (this.currentState === 'selectable') {
          return { border: '1px dotted #9e9e9e' }
        }
      } else {
        // const borderP = '1px dotted #9e9e9e'
        // const border = {
        //   borderTop: borderP,
        //   borderLeft: borderP,
        //   borderRight: borderP,
        //   borderBottom: borderP
        // }
        // const edges = ['t', 'l', 'b', 'r']
        // edges.forEach(edge => {
        //   if (this.cell[edge]) {
        //     Object.keys(border).forEach(e => {
        //       if (e[6].toLowerCase() === edge) {
        //         border[e] = 0
        //       }
        //     })
        //   }
        // })
        // return border
      }
      return {}
    },
    decorText () {
      if (this.isEditing) {
        if (this.currentState === 'selectable') {
          return '+'
        }
      }
      return ''
    },
    backgroundColor () {
      if (this.isEditing) {
        switch (this.currentState) {
          case 'selected':
            return '#ff6f00'
          case 'selectable':
            return '#ffffff'
          case 'occupied':
            return '#9e9e9e'
          default:
            return '#ffffff'
        }
      } else {
        switch (this.currentState) {
          case 'active':
            return GlobalConfig.activeCardBackground
          case 'call':
            return '#ff6f00'
          case 'idle':
            return '#efefef'
          default:
            return 'transparent'
        }
      }
    },
    margin () {
      if (!this.tableInfo) {
        return '2px'
      } else {
        const margin = {
          t: 2,
          r: 2,
          b: 2,
          l: 2
        }
        const edges = ['t', 'l', 'b', 'r']
        edges.forEach(edge => {
          if (this.cell[edge]) {
            Object.keys(margin).forEach(vertex => {
              if (vertex.includes(edge)) {
                margin[vertex] = -1
              }
            })
          }
        })
        return `${margin.t}px ${margin.r}px ${margin.b}px ${margin.l}px`
      }
    },
    borderRadius () {
      if (!this.tableInfo) {
        return 4 + 'px'
      }
      if (this.tableInfo.radius === 0) {
        return 0
      } else {
        const radius = {
          tl: this.tableInfo.radius,
          tr: this.tableInfo.radius,
          br: this.tableInfo.radius,
          bl: this.tableInfo.radius
        }
        const edges = ['t', 'l', 'b', 'r']
        edges.forEach(edge => {
          if (this.cell[edge]) {
            Object.keys(radius).forEach(vertex => {
              if (vertex.includes(edge)) {
                radius[vertex] = 0
              }
            })
          }
        })
        return `${radius.tl}px ${radius.tr}px ${radius.br}px ${radius.bl}px`
      }
    },
    fontSize () {
      return GlobalConfig.tableCardFontSize
    }
  }
}
</script>

<style scoped>

</style>
