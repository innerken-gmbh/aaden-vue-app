import dayjs from 'dayjs'
import i18n from '@/i18n'

function standardFormatter (dayObj) {
  return dayObj.format('YYYY-MM-DD')
}

export function today () {
  const now = dayjs().subtract(3, 'hour')
    .subtract(59, 'minute')
  return standardFormatter(now)
}

export function predefinedDateRangeList () {
  const now = dayjs().subtract(3, 'hour')
    .subtract(59, 'minute')
  const to = today()
  return [{
    label: 'today',
    dateRange: function () {
      return [to, to]
    }
  }, {
    label: 'yesterday',
    dateRange: function () {
      return [standardFormatter(now.subtract(1, 'day')), standardFormatter(now.subtract(1, 'day'))]
    }
  }, {
    label: 'this_week',
    dateRange: function () {
      return [standardFormatter(now.startOf('week')), to]
    }
  }, {
    label: 'last_week',
    dateRange: function () {
      return [standardFormatter(now.subtract(1, 'week').startOf('week')), standardFormatter(now.subtract(1, 'week').endOf('week'))]
    }
  }, {
    label: 'this_month',
    dateRange: function () {
      return [standardFormatter(now.startOf('month')), to]
    }
  }, {
    label: 'last_month',
    dateRange: function () {
      return [standardFormatter(now.subtract(1, 'month').startOf('month')), standardFormatter(now.subtract(1, 'month').endOf('month'))]
    }
  }, {
    label: 'this_year',
    dateRange: function () {
      return [standardFormatter(now.startOf('year')), to]
    }
  }]
}

export function getNiceLabel (dateRange) {
  return i18n.t(predefinedDateRangeList()
    .find(s =>
      s.dateRange().join(',') === dateRange.join(','))?.label) ??
    (dateRange[0] === dateRange[1] ? dateRange[0] : dateRange.join(' ~ '))
}

export function getToday () {
  return standardFormatter(dayjs().subtract(3, 'hour').subtract(59, 'minute'))
}
