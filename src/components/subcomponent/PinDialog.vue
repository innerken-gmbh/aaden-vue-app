<template>
  <v-dialog max-width="400px" v-model="realShow">
    <v-card class="pa-1">
      <template v-if="!loading">
        <div style="display: grid;grid-template-columns: repeat(3,1fr);grid-gap: 16px" class="pa-4">
          <template v-for="(s,i) in slots">
            <div :key="i" class="slot" :class="s.length>0?'':' empty'">{{ s ? s : '-' }}</div>
          </template>
        </div>
        <v-text-field
          style="width: 0;height: 0"

          autofocus
          @keydown.enter="check"
          @focus="focusEnd" ref="hiddenInput" type="search"
          autocomlete="off" dense hide-details
          v-model="hiddenInput"></v-text-field>
        <keyboard :keys="keyboardLayout" @input="numberInput"/>
      </template>
      <template v-else>
        <div style="width: 100%;" class="d-flex justify-center align-center pa-4">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import Keyboard from '@/components/Keyboard'
import { mapMutations, mapState } from 'vuex'
import { checkServant } from '@/oldjs/api'

const keyboardLayout =
  [

    '7', '8', '9', 'C',
    '4', '5', '6', '',
    '1', '2', '3', '',
    'X', '0', '', 'OK'
  ]

export default {
  name: 'PinDialog',
  components: { Keyboard },
  props: {
    id: {},
    initialUI: {
      default: () => () => {
      }
    }
  },
  data: function () {
    return {
      localPinInput: '',
      hiddenInput: '',
      localAuthType: '',
      servants: [],
      keyboardLayout,
      oldOnKeyDown: null,
      loading: false
    }
  },
  methods: {
    ...mapMutations(['HIDE_DIALOG', 'AUTHORIZE_OK']),
    async check () {
      this.loading = true
      try {
        const result = await checkServant(this.isAuthorizeTypeSuper, this.localPinInput, this.tableId)
        this.AUTHORIZE_OK(this.localPinInput)
        console.log(result)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
        this.localPinInput = ''
      }
    },
    numberInput (key) {
      if (this.localPinInput == null) {
        this.localPinInput = ''
      }
      console.log(key, 'keyInput')
      switch (key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
          if (this.localPinInput.length === 3) {
            return
          }
          this.localPinInput += key
          break
        case 'OK':
          this.check()
          break
        case 'X':
          this.HIDE_DIALOG()
          break
        case 'C':
          this.localPinInput = ''
          break
      }
    },
    initial () {
    },
    focusEnd () {
      console.log('end')
      const input = this.$refs.hiddenInput.$refs.input
      input.selectionStart = input.selectionEnd = input.value.length
    }
  },
  watch: {
    realShow: {
      immediate: true,
      handler: function (val) {
        this.localPinInput = ''
      }
    },
    hiddenInput (val) {
      if (this.localPinInput !== val.slice(0, 3)) {
        this.localPinInput = val.slice(0, 3)
      }
    },
    localPinInput (val) {
      if (val?.length === 3) {
        this.check()
      }
      this.hiddenInput = val
    }
  },
  computed: {
    ...mapState(['isAuthorizeTypeSuper', 'tableId', 'pinDialogShow']),
    slots () {
      const slots = ['', '', '']
      const pointer = this.localPinInput?.length
      if (pointer > 0) {
        slots.splice(0, pointer, ...this.localPinInput.split(''))
        const astra = Array(pointer - 1)
        astra.fill('*')
        console.log(astra)
        slots.splice(0, astra.length, ...astra)
        return slots
      } else {
        return slots
      }
    },
    realShow: {
      get: function () {
        console.log(this.pinDialogShow)
        return this.pinDialogShow
      },
      set: function (val) {
        if (!val) {
          this.HIDE_DIALOG()
        }
      }
    }
  }
}
</script>

<style scoped>
.slot {
  border-bottom: 1px solid black;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
}

.slot.empty {
  border: none;
}

</style>
