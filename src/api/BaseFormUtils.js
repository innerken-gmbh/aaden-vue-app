/*
 * Copyright (c) 2024. Haodong JU
 */

import { VTextField } from 'vuetify/lib/components'
import IKUtils from 'innerken-js-utils'
import i18n from '@/i18n'

export const formField = {
  name: '',
  key: '',
  component: VTextField,
  required: true,
  default: '',
  hint: '',
  componentProps: {
    rules: [],
    outlined: true,
    hideDetails: false,
    dense: true
  }

}
const ruleNoEmpty = (v) => {
  return v === false || v === 0 || !!v || i18n.t('cantBeEmpty')
}

/**
 * @param {name:string,key:string,component:object,required:boolean?} schema
 * @return {name:string,key:string,component:object}
 */
export function mapSchemaToField (schema) {
  const tmp = Object.assign({}, formField, IKUtils.deepCopy(schema))
  if (!tmp.name) {
    tmp.name = tmp.key
  }
  tmp.componentProps = Object.assign({},
    formField.componentProps,
    tmp.componentProps,
    { placeholder: i18n.t('PleaseInputTheX', { configItem: i18n.t(tmp.name) }) })
  tmp.required = tmp.required ?? true
  if (tmp.required) {
    tmp.componentProps.rules.push(ruleNoEmpty)
  } else {
    tmp.componentProps.rules = []
  }
  console.log(tmp, 'tmp')
  return tmp
}
