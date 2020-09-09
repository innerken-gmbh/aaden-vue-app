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
        <div
                class="pa-2"
                ref="containerCard"
                style="
        height: calc(100vh - 64px);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        min-width: 300px;
        max-width: 100vw;
        overflow-x: scroll;
        ">
            <template v-for="item in computedOption">
                <div :key="'mod2'+item.id" style="max-width: 450px">
                    <h4 :key="'mod2head'+item.id">
                        {{
                        `${item.name}${item.required === '1' ?
                        `:${item.select[0].text}` : ``}`
                        }}
                    </h4>
                    <v-item-group
                            v-model="mod[item.id]"
                            :mandatory="item.required==='1'"
                            :multiple="item.multiSelect==='1'"
                            active-class="active"
                    >
                        <div style="display: flex;flex-wrap: wrap">
                            <template v-for="(s,index) in item.select">
                                <v-item :key="'mod111'+index" #default="{active,toggle}">
                                    <v-card :ripple="false"
                                            tile
                                            class="d-flex flex-column"
                                            max-width="144px"
                                            :height="item.multiSelect==='1'?'120px':'auto'"
                                            :color="active?'primary':''"
                                            @click="activeCallback(toggle,item,index)">
                                        <div class="ma-2 flex-grow-1" style="font-size: 18px">{{ s.text }}{{ s.priceInfo }}</div>
                                        <template v-if="active&&item.required!=='1'">
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="error" @click.stop="addCount(item.id,index)" right>
                                                    <span style="font-size: 18px" class="font-weight-bold">&times;{{selectCount[item.id][index]}}</span>
                                                </v-btn>
                                            </v-card-actions>
                                        </template>
                                    </v-card>

                                </v-item>
                            </template>
                        </div>
                    </v-item-group>
                </div>
            </template>
        </div>
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
      selectCount: {},
      count: 1,
      mod: {},
      containerHeight: 0
    }
  },
  computed: {
    computedOption: function () {
      const realModInfo = []
      const height = this.containerHeight
      console.log(height)
      this.options.forEach(item => {
        item.select = []
        if (item.selectName) {
          if (!Array.isArray(item.selectName)) {
            item.selectName = (item.selectName?.split(',')) ?? []
            item.selectValue = (item.selectValue?.split(',')) ?? []
            item.priceInfo = (item.priceInfo?.split(',')) ?? []
          }
          item.selectName.forEach((name, index) => {
            const select = {
              text: `${name}`,
              value: item.selectValue[index],
              priceInfo: parseFloat(item.priceInfo[index]) === 0 ? '' : `(€${parseFloat(item.priceInfo[index]).toFixed(2)})`,
              count: 0
            }
            item.select.push(select)
          })
          realModInfo.push(item)
        }
      })
      realModInfo.sort((a, b) => {
        if (a.required === '1') {
          return -1
        } else if (a.select.length === 1) {
          return -1
        } else {
          return 1
        }
      })
      return realModInfo
    }
  },
  methods: {
    addCount (groupId, index) {
      this.selectCount[groupId][index]++
    },
    activeCallback (callback, group, index) {
      const groupId = group.id
      if (!this.selectCount[groupId]) {
        this.$set(this.selectCount, groupId, {})
      }
      if (group.required === '1') {
        for (const k in this.selectCount[groupId]) {
          this.selectCount[groupId][k] = 0
        }
      }
      this.$set(this.selectCount[groupId], index, 1)
      callback()
    },
    cancel () {
      this.count = 1
      this.$emit('modification-cancel')
    },
    submitModification () {
      let realMod = []
      for (const groupId in this.selectCount) {
        for (const selectIndex in this.selectCount[groupId]) {
          for (let i = 0; i < this.selectCount[groupId][selectIndex]; i++) {
            realMod.push({
              groupId,
              selectIndex
            })
          }
        }
      }
      this.mod = {}

      this.$nextTick(() => {
        this.selectCount = {}
      })
      this.$emit('modification-submit', [realMod, this.count])
      realMod = []
      this.count = 1
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.submit.$el.focus()
      this.containerHeight = document.body.clientHeight - 64 - 8
      console.log(this.containerHeight)
    })
  }
}
</script>

<style scoped>
    .hideWhenNoteActiveChip {
        display: none;
    }

    .active {
        background: #367aeb;
        color: white;
    }

    .v-chip-group--column .v-slide-group__content {
        display: grid;
        grid-template-columns: repeat(3, 100px);
    }

</style>
