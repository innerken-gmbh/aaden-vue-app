/**
 * Utility functions for UserDetailsDialog components
 */

/**
 * Format price with currency symbol
 *
 * @param {number} price - The price to format
 * @returns {string} - The formatted price
 */
export function formatPrice (price) {
  if (price === undefined || price === null) return '-'
  return '¥' + parseFloat(price).toFixed(2)
}

/**
 * Format date to localized string
 *
 * @param {string} dateString - The date string
 * @returns {string} - The formatted date
 */
export function formatDate (dateString) {
  if (!dateString) return '-'

  try {
    return new Date(dateString).toLocaleString()
  } catch (error) {
    return dateString
  }
}

/**
 * Format date to "X days ago" format
 *
 * @param {string} dateString - The date string
 * @param {Object} dayjs - The dayjs instance
 * @returns {string} - The formatted date as "X days ago"
 */
export function formatRelativeTime (dateString, dayjs) {
  if (!dateString || dateString === '-') return '-'

  try {
    const date = dayjs(dateString)
    if (!date.isValid()) return dateString

    return date.fromNow() // This will return "X days ago" format
  } catch (error) {
    console.error('Error formatting relative time:', error)
    return dateString
  }
}

/**
 * Get color for status chip
 *
 * @param {string} status - The status
 * @param {string} type - The type of status (order, asset, etc.)
 * @returns {string} - The color for the status chip
 */
export function getStatusColor (status, type = 'order') {
  if (!status) return 'grey'

  const statusColors = {
    order: {
      COMPLETED: 'success',
      PENDING: 'warning',
      CANCELLED: 'error',
      REFUNDED: 'info',
      PROCESSING: 'info',
      Finished: 'success',
      UNPAID: 'warning',
      PAID: 'success'
    },
    asset: {
      ACTIVE: 'success',
      EXPIRED: 'error',
      USED: 'info',
      PENDING: 'warning'
    },
    award: {
      COMPLETED: 'success',
      IN_PROGRESS: 'info',
      NOT_STARTED: 'grey',
      CLAIMABLE: 'info'
    }
  }

  return (statusColors[type] && statusColors[type][status]) || 'grey'
}

/**
 * Get asset status display text
 *
 * @param {Object} asset - The asset record
 * @returns {string} - The status display text
 */
export function getAssetStatusDisplay (asset) {
  if (!asset || !asset.status) return '-'

  const statusMap = {
    DISTRIBUTED: '已发放',
    USED: '已使用',
    EXPIRED: '已过期',
    CANCELLED: '已取消'
  }

  return statusMap[asset.status] || asset.status
}

/**
 * Get transaction type display text
 *
 * @param {string} type - The transaction type
 * @returns {string} - The display text
 */
export function getTransactionTypeText (type) {
  if (!type) return '-'

  const typeMap = {
    RECHARGE: '充值',
    CONSUME: '消费',
    REFUND: '退款',
    ADJUSTMENT: '调整',
    GIFT: '赠送'
  }

  return typeMap[type] || type
}

/**
 * Get progress percentage for award progress
 *
 * @param {Object} awardProgress - The award progress object
 * @returns {number} - The progress percentage
 */
export function getProgressPercentage (awardProgress) {
  if (!awardProgress) return 0

  // Get target and progress, checking both direct properties and awardInfo
  const target = awardProgress.target || awardProgress.awardInfo?.target || 0
  const progress = awardProgress.progress || awardProgress.awardInfo?.progress || 0

  if (target === 0) return 0
  return Math.min(100, Math.round((progress / target) * 100))
}
