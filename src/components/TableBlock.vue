<template>
  <div @click="$emit('click')" class="d-flex flex-grow-0 align-center justify-center"
       :style="{
    backgroundColor:backgroundColor,
    borderRadius:borderRadius,
    border:border,
    margin:margin,
  }">
    <span style="height: 0">
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

export default {
  name: 'TableBlock',
  props: {
    currentState: String,
    tableInfo: Object,
    label: String,
    isEditing: Boolean,
    cell: Object
  },
  computed: {
    border () {
      if (this.isEditing) {
        if (this.currentState === 'selectable') {
          return '1px dotted #9e9e9e'
        }
      } else {
        return '1px dotted #9e9e9e'
      }
      return ''
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
            return '#367aeb'
          case 'call':
            return '#ff6f00'
          case 'idle':
            return '#9e9e9e'
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
                margin[vertex] = 0
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
    }
  }
}
</script>

<style scoped>

</style>
