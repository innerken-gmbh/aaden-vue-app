<template>
    <v-card elevation="0">
        <v-toolbar dense  dark>
            <v-app-bar-nav-icon @click="cancel">
                <v-icon>mdi-close</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title>
                <slot name="before"></slot>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn
                        color="primary"
                        ref="submit"
                        large
                        @click="submitModification"
                >
                    <v-icon left>mdi-check</v-icon>
                    {{$t('confirm') }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
            <div style="display: grid;
    grid-gap: 4px;
    grid-template-rows: repeat(2,minmax(min-content,auto));
    grid-auto-flow: column dense;
    grid-auto-rows: min-content;
    grid-auto-columns: max-content;
    justify-content: center;
    align-items: start;
  min-width: 300px;
">
                <template v-for="item in computedOption">
                    <v-sheet style="background: transparent;max-width: 340px"
                             :key="'mod2'+item.id" class="pa-1">
                        <h4 :key="'mod2head'+item.id">
                            {{
                            `${item.name}${item.required === '1' ?
                            `:${item.select[0].text}` : ``}`
                            }}
                        </h4>
                        <v-chip-group
                                v-model="mod[item.id]"
                                :mandatory="item.required==='1'" column
                                :multiple="item.multiSelect==='1'"
                                active-class="primary--text">
                            <v-chip large :ripple="false" label :key="'mod111'+index"
                                    v-for="(s,index) in item.select">
                                {{ s.text }}{{ s.priceInfo }}
                            </v-chip>
                        </v-chip-group>
                    </v-sheet>
                </template>
            </div>
        </v-card-text>
    </v-card>

</template>

<script>
export default {
  name: 'DishModification',
  props: {
    options: {
      default: () => []
    }
  },
  data: function () {
    return {
      mod: {}
    }
  },
  computed: {
    computedOption: function () {
      const realModInfo = []
      this.options.forEach(item => {
        item.select = []
        if (!Array.isArray(item.selectName)) {
          item.selectName = item.selectName.split(',')
          item.selectValue = item.selectValue.split(',')
          item.priceInfo = item.priceInfo.split(',')
        }
        console.log(item.priceInfo)

        item.selectName.forEach((name, index) => {
          item.select.push({
            text: `${name}`,
            value: item.selectValue[index],
            priceInfo: parseFloat(item.priceInfo[index]) === 0 ? '' : `(€${parseFloat(item.priceInfo[index]).toFixed(2)})`
          })
        })
        realModInfo.push(item)
      })
      console.log(this.options)
      console.log(realModInfo)
      return realModInfo
    }
  },
  methods: {
    cancel () {
      this.$emit('modification-cancel')
    },
    submitModification () {
      this.$emit('modification-submit', this.mod)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.submit.$el.focus()
    })
  }
}
</script>

<style scoped>
    .hideWhenNoteActiveChip {
        display: none;
    }

    .v-chip--active .hideWhenNoteActiveChip {
        display: unset;
    }

</style>
