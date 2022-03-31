import dayjs from 'dayjs'
import i18n from '../../i18n'

function standardFormatter (dayObj) {
  return dayObj.format('YYYY-MM-DD')
}

const now = dayjs().subtract(3, 'hour').subtract(59, 'minute')

export const today = standardFormatter(now)
export const predefinedDateRangeList = [{
  label: i18n.t('今天'),
  dateRange: function () {
    return [today, today]
  }
}, {
  label: i18n.t('昨天'),
  dateRange: function () {
    return [standardFormatter(now.subtract(1, 'day')), standardFormatter(now.subtract(1, 'day'))]
  }
}, {
  label: i18n.t('本周'),
  dateRange: function () {
    return [standardFormatter(now.startOf('week')), today]
  }
}, {
  label: i18n.t('上周'),
  dateRange: function () {
    return [standardFormatter(now.subtract(1, 'week').startOf('week')), standardFormatter(now.subtract(1, 'week').endOf('week'))]
  }
}, {
  label: i18n.t('本月'),
  dateRange: function () {
    return [standardFormatter(now.startOf('month')), today]
  }
}, {
  label: i18n.t('上月'),
  dateRange: function () {
    return [standardFormatter(now.subtract(1, 'month').startOf('month')), standardFormatter(now.subtract(1, 'month').endOf('month'))]
  }
}, {
  label: i18n.t('今年'),
  dateRange: function () {
    return [standardFormatter(now.startOf('year')), today]
  }
}]

export const yesterday = predefinedDateRangeList[1].dateRange()[0]

export const defaultDate = today

export function getNiceLabel (dateRange) {
  return predefinedDateRangeList.find(s => s.dateRange().join(',') === dateRange.join(','))?.label ?? (dateRange[0] === dateRange[1] ? dateRange[0] : dateRange.join(' ~ '))
}

const stripeDateFormat = 'ddd, DD MMM YYYY HH:mm:ss '

export function convertStripeDate (stripeDateString) {
  return standardFormatter(dayjs(stripeDateString, stripeDateFormat))
}
