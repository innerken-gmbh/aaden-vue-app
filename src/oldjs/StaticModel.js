import hillo from 'innerken-utils/Utlis/request'

import i18n from '../i18n'

let dishesList = []

export async function getAllDishesWithCache (force = false) {
  if (force || dishesList.length === 0) {
    const res = await hillo.get('Dishes.php', { lang: i18n.locale.toUpperCase() })
    dishesList.length = 0
    if (res.content.length > 0) {
      dishesList = res.content
    }
  }
  return dishesList
}
