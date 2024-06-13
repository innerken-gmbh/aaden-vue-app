<template>
  <v-card
    v-if="show"
    class="pa-4"
    elevation="0"
  >
    <page-sub-header class="mb-6">
      <slot />
      <template #subtitle>
        <slot name="subtitle" />
      </template>
      <template #action>
        <v-btn
          v-if="isDialog"
          class="mr-2"
          elevation="0"
          @click="$emit('close')"
        >
          <v-icon left>
            mdi-close
          </v-icon>
          {{ $t('closed') }}
        </v-btn>
        <v-btn
          :disabled="!formValid"
          color="amber lighten-4 black--text"
          elevation="0"
          @click="submit"
        >
          <v-icon left>
            mdi-content-save
          </v-icon>
          {{ $t('save') }}
        </v-btn>
      </template>
    </page-sub-header>

    <v-form
      ref="form"
      v-model="formValid"
      lazy-validation
    >
      <div>
        <div
          v-for="(f) in fields"
          :key="f.key"
        >
          <div class="d-flex">
            <div class="text-body-1 mr-2">
              <div class="font-weight-bold">
                {{ $t(f.name) }}<span v-if="f.required">*</span>
              </div>
              <div class="text-body-2">
                {{ f.hint }}
              </div>
            </div>
            <v-spacer />
            <div
              class="d-flex justify-end"
              style="width: 50%;"
            >
              <component
                :is="f.component"
                v-model="holderObject[f.key]"
                dense
                v-bind="f.componentProps"
              />
            </div>
          </div>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>

import PageSubHeader from '@/components/CommonDialog/PageSubHeader'
import { mapSchemaToField } from '@/api/baseFormUtils'

export default {
  name: 'BaseForm',
  components: { PageSubHeader },
  props: {
    isDialog: {
      type: Boolean,
      default: true
    },
    schema: {
      type: Array,
      default: () => []
    },
    editingObject: {
      type: Object,
      required: false,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      formValid: null,
      holderObject: {}
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$emit('submit', this.holderObject)
      }
    },
    reset () {
      if (this.editingObject) {
        this.holderObject = Object.assign({}, this.editingObject)
      } else {
        this.holderObject = Object.fromEntries(this.schema.map(it => [it.key, it.default]))
      }
    }
  },
  watch: {
    schema: {
      immediate: true,
      handler () {
        this.reset()
      }
    },
    show (val) {
      if (val) {
        this.reset()
      }
    },
    editingObject: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          this.reset()
        })
      }
    }
  },
  computed: {
    fields () {
      return this.schema.map(mapSchemaToField)
    }
  }
}
</script>

<style scoped>

</style>
