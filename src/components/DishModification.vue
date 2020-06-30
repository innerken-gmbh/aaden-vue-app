<template>
        <v-container>
            <slot name="before"></slot>
            <v-row>
                <v-col cols="12">
                    <template v-for="item in computedOption">
                        <h4 :key="'mod2head'+item.id">{{`${item.name}${item.required==='1'?`:${item.select[0].text}`:``}`}}</h4>
                        <v-sheet class="my-2" style="background: transparent" :key="'mod2'+item.id" >
                            <v-chip-group
                                    v-model="mod[item.id]"
                                    :mandatory="item.required==='1'" column
                                    :multiple="item.multiSelect==='1'"
                                    active-class="primary--text">
                                <v-chip x-large :ripple="false" label :key="'mod111'+index"
                                        v-for="(s,index) in item.select">
                                    {{s.text}}{{s.priceInfo}}
                                </v-chip>
                            </v-chip-group>
                        </v-sheet>
                    </template>
                </v-col>
            </v-row>
            <v-spacer class="mx-4"/>
            <v-row>
                <v-col cols="6">
                    <v-btn outlined block @click="cancel" color="error" text>取消</v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn block @click="submitModification" color="primary">确认</v-btn>
                </v-col>
            </v-row>
        </v-container>
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
