<template>
    <div class="pa-2 fill-height d-flex flex-wrap flex-column">
        <div style="width: 100%">
            <slot name="before"></slot>
        </div>

        <div style="display: grid;
    flex-grow: 1;
    max-height: calc( 100vh - 150px);
    grid-gap: 4px;
    grid-template-rows: repeat(2,minmax(min-content,auto));
    grid-auto-flow: column;
    grid-auto-rows: min-content;
    grid-auto-columns: 350px;
    justify-content: center;
    align-items: start;
  min-width: 300px;
">
            <template v-for="item in computedOption">
                <v-sheet style="background: transparent"
                         :key="'mod2'+item.id" class="pa-1">
                    <h4 :key="'mod2head'+item.id">
                        {{`${item.name}${item.required==='1'?
                        `:${item.select[0].text}`:``}`}}
                    </h4>
                    <v-chip-group
                            v-model="mod[item.id]"
                            :mandatory="item.required==='1'" column
                            :multiple="item.multiSelect==='1'"
                            active-class="primary--text">
                        <v-chip large :ripple="false" label :key="'mod111'+index"
                                v-for="(s,index) in item.select">
                            {{s.text}}{{s.priceInfo}}
                        </v-chip>
                    </v-chip-group>
                </v-sheet>
            </template>
        </div>
        <v-toolbar style="width: 100%;margin-left: -8px;flex-grow: 0" color="white">
            <div style="display: grid;grid-template-columns: 1fr 1fr;width: 100%">
                <v-btn x-large
                       block
                       @click="cancel" dark color="#fd4e4e"
                >{{$t('cancel')}}
                </v-btn>
                <v-btn x-large
                       block
                       @click="submitModification"
                       color="primary">
                    {{$t('tableCheckOutConfirm')}}
                </v-btn>
            </div>

        </v-toolbar>
    </div>

</template>

<script>
export default {
  name: 'DishModification',
  props: {
    options: {
      type: Array,
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
