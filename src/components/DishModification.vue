<template>
    <v-card elevation="0"
            style="min-height: 100%;min-width: 100%;
            margin: 0 !important;padding: 0!important;">
        <v-toolbar dark>
            <v-app-bar-nav-icon @click="cancel">
                <v-icon>mdi-close</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title>
                <slot name="before"></slot>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon @click="count>0?count--:null">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn style="font-size: 24px" x-large light>{{count}}</v-btn>
                <v-btn icon @click="count++">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                        color="primary"
                        ref="submit"
                        x-large
                        @click="submitModification"
                >
                    <v-icon left>mdi-check</v-icon>
                    {{$t('confirm') }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="display: grid;
        grid-gap: 4px;
        grid-template-rows: repeat(2,minmax(min-content,auto));
        grid-auto-flow: column dense;
        grid-auto-rows: 200px;
        grid-auto-columns: max-content;
        justify-content: center;
        align-items: start;
        min-width: 300px;
        max-width: 100vw;
        overflow-y: scroll;
        ">
            <template v-for="item in computedOption">
                <div :key="'mod2'+item.id" class="pa-1" style="max-width: 420px">
                    <h4 :key="'mod2head'+item.id">
                        {{
                        `${item.name}${item.required === '1' ?
                        `:${item.select[0].text}` : ``}`
                        }}
                    </h4>
                    <v-chip-group
                            column
                            style="width: fit-content;"
                            v-model="mod[item.id]"
                            :mandatory="item.required==='1'"
                            :multiple="item.multiSelect==='1'"
                            active-class="primary--text"
                    >
                        <v-chip large :ripple="false" label :key="'mod111'+index"
                                v-for="(s,index) in item.select">
                            {{ s.text }}{{ s.priceInfo }}
                        </v-chip>
                    </v-chip-group>
                </div>
            </template>
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
      count: 1,
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
        item.selectName.forEach((name, index) => {
          item.select.push({
            text: `${name}`,
            value: item.selectValue[index],
            priceInfo: parseFloat(item.priceInfo[index]) === 0 ? '' : `(€${parseFloat(item.priceInfo[index]).toFixed(2)})`
          })
        })
        realModInfo.push(item)
      })
      return realModInfo
    }
  },
  methods: {
    cancel () {
      this.count = 1
      this.$emit('modification-cancel')
    },
    submitModification () {
      this.$emit('modification-submit', [this.mod, this.count])
      this.count = 1
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

    .v-chip-group--column .v-slide-group__content {
        display: grid;
        grid-template-columns: repeat(3, 100px);
    }

</style>
