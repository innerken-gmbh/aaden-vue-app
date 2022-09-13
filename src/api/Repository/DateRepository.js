import dayjs from 'dayjs'
import i18n from '@/i18n'

function standardFormatter (dayObj) {
  return dayObj.format('YYYY-MM-DD')
}

const now = dayjs().subtract(3, 'hour').subtract(59, 'minute')

export const today = standardFormatter(now)
export const predefinedDateRangeList = [{
  label: 'today',
  dateRange: function () {
    return [today, today]
  }
}, {
  label: 'yesterday',
  dateRange: function () {
    return [standardFormatter(now.subtract(1, 'day')), standardFormatter(now.subtract(1, 'day'))]
  }
}, {
  label: 'this_week',
  dateRange: function () {
    return [standardFormatter(now.startOf('week')), today]
  }
}, {
  label: 'last_week',
  dateRange: function () {
    return [standardFormatter(now.subtract(1, 'week').startOf('week')), standardFormatter(now.subtract(1, 'week').endOf('week'))]
  }
}, {
  label: 'this_month',
  dateRange: function () {
    return [standardFormatter(now.startOf('month')), today]
  }
}, {
  label: 'last_month',
  dateRange: function () {
    return [standardFormatter(now.subtract(1, 'month').startOf('month')), standardFormatter(now.subtract(1, 'month').endOf('month'))]
  }
}, {
  label: 'this_year',
  dateRange: function () {
    return [standardFormatter(now.startOf('year')), today]
  }
}]

export function getNiceLabel (dateRange) {
  return i18n.t(predefinedDateRangeList.find(s => s.dateRange().join(',') === dateRange.join(','))?.label) ?? (dateRange[0] === dateRange[1] ? dateRange[0] : dateRange.join(' ~ '))
}

const stripeDateFormat = 'ddd, DD MMM YYYY HH:mm:ss '

export function convertStripeDate (stripeDateString) {
  return standardFormatter(dayjs(stripeDateString, stripeDateFormat))
}
