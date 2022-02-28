import dayjs from 'dayjs'

const standardDateTemplate = 'YYYY-MM-DD'
export const todayDate = dayjs().format(standardDateTemplate)

export function onlyTimeFormat (str) {
  return dayjs(str).format('HH:mm')
}
