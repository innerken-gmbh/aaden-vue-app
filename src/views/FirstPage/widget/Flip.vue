<template>
  <div ref="tick" class="tick">
    <div data-layout="horizontal fit">
      <span class="mr-2" data-key="hour" data-repeat="true" data-transform="pad(00) -> split -> delay">
        <span data-view="flip"></span>
      </span>

      <span data-key="minute" data-repeat="true" data-transform="pad(00) -> split -> delay">
        <span data-view="flip"></span>
      </span>
    </div>
  </div>
</template>

<script>
import Tick from '@pqina/flip'
import '@pqina/flip/dist/flip.min.css'

export default {
  name: 'Flip',
  props: ['value'],
  watch: {
    value (newValue) {
      const [hour, minute, second] = newValue.split(':')

      this._tick.value = {
        hour,
        minute,
        second
      }
    }
  },
  mounted () {
    const [hour, minute, second] = this.$options.propsData.value

    this._tick = Tick.DOM.create(this.$refs.tick, {
      value: {
        hour,
        minute,
        second
      }
    })
  },
  destroyed () {
    Tick.DOM.destroy(this.$refs.tick)
  }
}
</script>

<style scoped>
.tick {
  font-size: 0.6rem;
  white-space: nowrap;
  font-family: arial, sans-serif;
}

.tick-flip, .tick-text-inline {
  font-size: 2.5em;
}

.tick-label {
  margin-top: 1em;
  font-size: 1em;
}

.tick-char {
  width: 1.5em;
}

.tick-text-inline {
  display: inline-block;
  text-align: center;
  min-width: 1em;
}

.tick-text-inline + .tick-text-inline {
  margin-left: -.325em;
}

.tick-group {
  margin: 0 .5em;
  text-align: center;
}
</style>
