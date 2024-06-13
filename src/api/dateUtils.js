import dayjs from 'dayjs'

export const standardDateTemplate = 'YYYY-MM-DD'
export const todayDate = dayjs().format(standardDateTemplate)
export const timestampTemplate = 'YYYY-MM-DD HH:mm:ss'
const onlyTimeTemplate = 'HH:mm'

export function onlyTimeFormat (str) {
  return dayjs(str).format(onlyTimeTemplate)
}

export function timeDisplay (str) {
  return dayjs(str).format(timestampTemplate)
}

export function sliceTime (startTimeString, endTimeString, duration) {
  const [startTime, endTime] = dayjs(startTimeString, timestampTemplate)
    .isBefore(dayjs(endTimeString, timestampTemplate)) ? [dayjs(startTimeString, timestampTemplate), dayjs(endTimeString, timestampTemplate)]
    : [dayjs(endTimeString, timestampTemplate), dayjs(startTimeString, timestampTemplate)]

  const durationD = dayjs.duration(duration)
  const res = []
  let temp = startTime

  while (temp.isBefore(endTime)) {
    res.push(temp.format(onlyTimeTemplate))
    temp = temp.add(durationD)
  }
  res.push(endTime.format(onlyTimeTemplate))
  return res
}

export function timeFromNowInMinute (hour, minute) {
  return -dayjs().set('h', hour).set('m', minute).diff(dayjs(), 'm')
}
