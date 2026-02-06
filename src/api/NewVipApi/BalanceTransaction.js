import { hillo } from 'hillo'
import { cloudUrl } from '@/api/SuperVipApi/SuperVip'

class BalanceTransaction {
  static name () {
    return 'BalanceTransaction'
  }

  /**
   * Get user balance transactions with pagination
   * @param {string} userId - User ID
   * @param {number} blId - Business layer ID
   * @param {number} page - Page number (0-based)
   * @param {number} size - Page size
   * @returns {Promise<Object>} - Paginated transaction records
   */
  static async getUserTransactions (userId, blId, page = 0, size = 20) {
    try {
      const params = {
        userId,
        blId,
        page,
        size
      }
      return await hillo.get(cloudUrl + 'membership/balance/user-transactions', params)
    } catch (error) {
      console.error('Error fetching user balance transactions:', error)
      throw error
    }
  }

  /**
   * Get all user balance transactions without pagination
   * @param {string} userId - User ID
   * @param {number} blId - Business layer ID
   * @returns {Promise<Array>} - All transaction records
   */
  static async getAllUserTransactions (userId, blId) {
    try {
      const params = {
        userId,
        blId
      }
      return await hillo.get(cloudUrl + 'membership/balance/transactions/all', params)
    } catch (error) {
      console.error('Error fetching all user balance transactions:', error)
      throw error
    }
  }

  /**
   * Get transactions related to an order
   * @param {number} orderId - Order ID
   * @returns {Promise<Array>} - Transaction records
   */
  static async getOrderTransactions (orderId) {
    try {
      return await hillo.get(cloudUrl + `membership/balance/transactions/order/${orderId}`)
    } catch (error) {
      console.error(`Error fetching transactions for order ${orderId}:`, error)
      throw error
    }
  }

  /**
   * Get transaction related to a payment intent
   * @param {string} paymentIntentId - Payment intent ID
   * @returns {Promise<Object>} - Transaction record
   */
  static async getPaymentTransaction (paymentIntentId) {
    try {
      return await hillo.get(cloudUrl + `membership/balance/transactions/payment/${paymentIntentId}`)
    } catch (error) {
      console.error(`Error fetching transaction for payment intent ${paymentIntentId}:`, error)
      throw error
    }
  }

  /**
   * Get transactions related to a recharge package
   * @param {number} rechargePackageId - Recharge package ID
   * @returns {Promise<Array>} - Transaction records
   */
  static async getRechargePackageTransactions (rechargePackageId) {
    try {
      return await hillo.get(cloudUrl + `membership/balance/transactions/recharge-package/${rechargePackageId}`)
    } catch (error) {
      console.error(`Error fetching transactions for recharge package ${rechargePackageId}:`, error)
      throw error
    }
  }

  /**
   * Calculate total transaction amount by type
   * @param {string} userId - User ID
   * @param {number} blId - Business layer ID
   * @param {string} transactionType - Transaction type (RECHARGE, CONSUME, REFUND)
   * @returns {Promise<Object>} - Total amount
   */
  static async calculateTotalAmount (userId, blId, transactionType) {
    try {
      const params = {
        userId,
        blId,
        transactionType
      }
      return await hillo.get(cloudUrl + 'membership/balance/transactions/total', params)
    } catch (error) {
      console.error('Error calculating total transaction amount:', error)
      throw error
    }
  }

  /**
   * Get all balance transactions for a business layer
   * @param {number} blId - Business layer ID
   * @returns {Promise<Array>} - All transaction records
   */
  static async getAllTransactionsByBlId (blId) {
    try {
      const params = {
        blId
      }
      return await hillo.get(cloudUrl + 'membership/balance/transactions/bl', params)
    } catch (error) {
      console.error('Error fetching business layer balance transactions:', error)
      throw error
    }
  }

  /**
   * Get consumption and refund transactions for a business layer
   * @param {number} blId - Business layer ID
   * @param {number} deviceId - Optional device ID for filtering consumption records only
   * @returns {Promise<Array>} - Consumption and refund transaction records
   */
  static async getConsumptionTransactions (blId, deviceId = null) {
    try {
      const params = {
        blId
      }
      if (deviceId) {
        params.deviceId = deviceId
      }
      return await hillo.get(cloudUrl + 'membership/balance/transactions/bl/consumption-refund', params)
    } catch (error) {
      console.error('Error fetching consumption and refund transactions:', error)
      throw error
    }
  }

  /**
   * Get recharge transactions for a business layer
   * @param {number} blId - Business layer ID
   * @returns {Promise<Array>} - Recharge transaction records
   */
  static async getRechargeTransactions (blId) {
    try {
      const params = {
        blId
      }
      return await hillo.get(cloudUrl + 'membership/balance/transactions/bl/recharge', params)
    } catch (error) {
      console.error('Error fetching recharge transactions:', error)
      throw error
    }
  }

  /**
   * @deprecated Use getRechargeTransactions for recharge transactions and getConsumptionTransactions for refund transactions
   * Get recharge and refund transactions for a business layer
   * @param {number} blId - Business layer ID
   * @returns {Promise<Array>} - Recharge and refund transaction records
   */
  static async getRechargeRefundTransactions (blId) {
    console.warn('getRechargeRefundTransactions is deprecated. Use getRechargeTransactions for recharge transactions and getConsumptionTransactions for refund transactions.')
    // For backward compatibility, we'll filter the results from getConsumptionTransactions to only include REFUND transactions
    // and combine them with results from getRechargeTransactions
    try {
      const [consumptionRefundTransactions, rechargeTransactions] = await Promise.all([
        this.getConsumptionTransactions(blId),
        this.getRechargeTransactions(blId)
      ])

      // Filter to get only REFUND transactions from consumptionRefundTransactions
      const refundTransactions = consumptionRefundTransactions.filter(
        transaction => transaction.transactionType === 'REFUND'
      )

      // Combine recharge and refund transactions
      return [...rechargeTransactions, ...refundTransactions]
    } catch (error) {
      console.error('Error fetching recharge and refund transactions:', error)
      throw error
    }
  }
}

export default BalanceTransaction
