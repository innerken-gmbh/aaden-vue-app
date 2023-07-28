<template>
  <v-card elevation="0"
          tile
          color="#f8f8f8"
          style="min-height: 100%;min-width: 100%;
            margin: 0 !important;padding: 0!important;">
    <div style="display: grid;grid-template-columns: minmax(0,1fr) 300px">
      <div
          class="pa-4"
          style="
        height: calc(100vh);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        min-width: 300px;
        max-width: calc(100vw - 300px);
        overflow-x: scroll;
        ">
        <template v-for="item in computedOption">
          <div :key="'mod2'+item.id" :style="{maxWidth:item.select.length>10?'400px':'270px'}">
            <h4 :key="'mod2head'+item.id">
              {{ `${item.name}${item.required === '1' ? `:${item.select[0].text}` : ``}` }}
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
                            elevation="0"
                            class="d-flex flex-column ma-1"
                            width="124px"
                            min-height="96"
                            :color="active?'primary lighten-4 black--text':''"
                            @click="activeCallback(active,toggle,item,index)">
                      <div class="ma-2 flex-grow-1" style="font-size: 18px">
                        {{ s.text }} {{ s.priceInfo }}
                      </div>
                      <template v-if="active&&item.required!=='1'">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click.stop="addCount(item.id,index)" right>
                           <span style="font-size: 18px" class="font-weight-bold">
                             &times;{{ selectCount[item.id][index] }}
                           </span>
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
      <v-card height="100vh" class="d-flex flex-column align-start pa-4" elevation="0">

        <div class="text-h5">
          <slot name="name">
          </slot>
        </div>

        <div class="d-flex  mt-2 align-center" style="width: 100%">
          <v-btn x-large icon @click="count>0?count--:null">
            <v-icon>mdi-minus-circle</v-icon>
          </v-btn>
          <div class="mx-2 text-center text-h6">
            {{ count }}
          </div>
          <v-btn x-large icon @click="count++">
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <div class="text-body-1 font-weight-bold">
            <slot v-bind:price="addPrice" name="before"></slot>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex" style="width: 100%">
          <v-btn @click="cancel" fab elevation="0" color="grey lighten-4 black--text">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
              elevation="0"
              color="primary lighten-4 black--text"
              ref="submit"
              x-large
              class="flex-grow-1 ml-2"
              rounded
              @click="submitModification"
          >
            <v-icon left>mdi-check</v-icon>
            {{ $t('Confirm') }}
          </v-btn>
        </div>

      </v-card>
    </div>
  </v-card>
</template>

<script>
import { setDefaultValueForApply } from '@/oldjs/StaticModel'

export default {
  name: 'DishModification',
  props: {
    options: {
      default: () => []
    },
    oldMod: {
      default: () => {
      }
    },
    showing: {}
  },
  watch: {
    showing (val) {
      if (val) {
        if (this.oldMod) {
          const decodeVal = JSON.parse(this.oldMod)
          this.mod = decodeVal.mod
          this.selectCount = decodeVal.selectCount
        }
      } else {
        this.clear()
      }
    }
  },
  data: function () {
    return {
      selectCount: {},
      count: 1,
      mod: {}
    }
  },
  computed: {
    computedOption: function () {
      const realModInfo = []
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
              priceInfo: parseFloat(item.priceInfo[index]) === 0 ? '' : `${parseFloat(item.priceInfo[index]).toFixed(2)} €`,
              count: 0,
              price: parseFloat(item.priceInfo[index] ?? 0)
            }
            item.select.push(select)
          })
          realModInfo.push(item)
        }
      })

      return realModInfo
    },
    realMod: function () {
      const realMod = []
      for (const groupId in this.selectCount) {
        for (const selectIndex in this.selectCount[groupId]) {
          const groupInfo = this.selectCount[groupId][selectIndex]
          for (let i = 0; i < groupInfo; i++) {
            realMod.push({
              groupId,
              selectIndex
            })
          }
        }
      }
      return realMod
    },
    addPrice: function () {
      return this.realMod.reduce((total, i) => {
        total += this.findModItemUseGroupIdAndIndex(i.groupId, i.selectIndex)?.price ?? 0
        return total
      }, 0) ?? 0
    }
  },
  methods: {
    addCount (groupId, index) {
      this.selectCount[groupId][index]++
    },
    activeCallback (active, callback, group, index) {
      const groupId = group.id
      if (!this.selectCount[groupId]) {
        this.$set(this.selectCount, groupId, {})
      }
      const nextState = !active

      if (nextState) {
        if (group.multiSelect === '0') {
          for (const k in this.selectCount[groupId]) {
            this.selectCount[groupId][k] = 0
          }
        }
        this.$set(this.selectCount[groupId], index, 1)
      } else {
        this.$set(this.selectCount[groupId], index, 0)
      }
      callback()
    },
    cancel () {
      this.count = 1
      this.clear()
      this.$emit('modification-cancel')
    },
    findModItemUseGroupIdAndIndex (groupId, index) {
      return this.computedOption.find(g => parseInt(g.id) === parseInt(groupId)).select[index]
    },
    clear () {
      for (const key in this.mod) {
        this.mod[key] = null
      }
      this.$nextTick(() => {
        this.selectCount = {}
      })
    },
    submitModification () {
      const saveInfo = JSON.stringify({ selectCount: this.selectCount, mod: this.mod })

      const mod = setDefaultValueForApply(this.computedOption, this.realMod)

      this.clear()

      this.$emit('modification-submit', [mod, this.count, saveInfo])
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

.active {
  background: #367aeb;
  color: white;
}

.v-chip-group--column .v-slide-group__content {
  display: grid;
  grid-template-columns: repeat(3, 100px);
}

</style>
