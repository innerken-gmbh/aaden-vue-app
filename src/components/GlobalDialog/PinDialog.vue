<template>
  <v-dialog max-width="400px" v-model="realShow">
    <v-card>
      <v-toolbar tile :color="error?'error':'primary'" dark elevation="0">
        <v-toolbar-title>{{ $t('Bitte Passwort Eingeben') }}</v-toolbar-title>
      </v-toolbar>
      <span class="caption"></span>
      <div class="pa-1">
        <template v-if="!loading">
          <div style="display: grid;grid-gap: 16px" class="pa-4"
               :style="{gridTemplateColumns:'repeat('+(slots.length>3?slots.length:3)+',1fr)'}"
          >
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
              v-model="hiddenInput"
          />
          <keyboard-layout :keys="keyboardLayout" @input="numberInput"/>
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
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { checkServant } from '@/oldjs/api'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import hillo from 'hillo'

const keyboardLayout =
    [
      '7', '8', '9', 'C',
      '4', '5', '6', '',
      '1', '2', '3', '',
      'X', '0', '', 'OK'
    ]

export default {
  name: 'PinDialog',
  components: { KeyboardLayout },
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
      loading: false,
      error: false
    }
  },
  methods: {
    ...mapMutations(['HIDE_AUTHORIZE_DIALOG', 'AUTHORIZE_OK']),
    async check () {
      if (this.isAuthorizeTypeSuper) {
        try {
          const res = await hillo.silentGet('Servant.php?op=bossStartWith', { pw: this.localPinInput })
          console.log(res)
          return
        } catch (e) {

        }
      }
      this.loading = true
      try {
        await checkServant(this.isAuthorizeTypeSuper, this.localPinInput, this.tableId)
        this.AUTHORIZE_OK(this.localPinInput)
      } catch (e) {
        console.log(e)
        this.error = true
        this.loading = false
      } finally {
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
          if (this.localPinInput.length === 6) {
            return
          }
          this.localPinInput += key
          break
        case 'OK':
          this.check()
          break
        case 'X':
          this.HIDE_AUTHORIZE_DIALOG()
          break
        case 'C':
          this.localPinInput = ''
          break
      }
    },
    initial () {
      this.localPinInput = ''
      this.loading = false
      this.error = false
    },
    focusEnd () {
      const input = this.$refs.hiddenInput.$refs.input
      input.selectionStart = input.selectionEnd = input.value.length
    }
  },
  watch: {
    realShow: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.initial()
        }
      }
    },
    hiddenInput (val) {
      console.log(val)
      if (this.localPinInput !== val.slice(0, 6)) {
        this.localPinInput = val.slice(0, 6)
      }
    },
    localPinInput (val) {
      if (val?.length >= 3) {
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
        const astra = Array(pointer)
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
        return this.pinDialogShow
      },
      set: function (val) {
        if (!val) {
          this.HIDE_AUTHORIZE_DIALOG()
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
