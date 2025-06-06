/**
 * @fileoverview API functions for interacting with the cloud membership system.
 * This file contains functions to interact with the cloud API for member information,
 * including getting member details, claiming awards, and tracking asset usage.
 */

import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

// Cloud API base URL
const CLOUD_API_BASE_URL = 'https://cloud-v2.aaden.io'

// Simple caching mechanism
const cache = new Map()
const DEFAULT_TTL = 60000 // 1 minute

/**
 * Gets cached data for a given key if it exists and is not expired.
 *
 * @param {string} key - The cache key.
 * @param {number} ttl - Time to live in milliseconds. Default is DEFAULT_TTL.
 * @returns {any|null} The cached data or null if not found or expired.
 */
function getCachedData (key, ttl = DEFAULT_TTL) {
  const cachedData = cache.get(key)
  if (cachedData && Date.now() - cachedData.timestamp < ttl) {
    return cachedData.data
  }
  return null
}

/**
 * Sets data in the cache with the current timestamp.
 *
 * @param {string} key - The cache key.
 * @param {any} data - The data to cache.
 */
function setCachedData (key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

/**
 * Gets the current device ID from GlobalConfig or from the API if not set.
 *
 * @returns {Promise<string>} The device ID.
 * @throws {Error} If there is an error getting the device ID.
 */
export async function getCurrentDeviceId () {
  try {
    if (!GlobalConfig.DeviceId) {
      GlobalConfig.DeviceId = (await hillo.get('AccessLog.php?op=deviceId')).content
    }
    return GlobalConfig.DeviceId
  } catch (error) {
    console.error('Error getting device ID:', error)
    throw error
  }
}

/**
 * Ensures a business layer exists for the given device ID.
 *
 * @param {string} deviceId - The device ID.
 * @returns {Promise<any>} The business layer information.
 * @throws {Error} If there is an error ensuring the business layer.
 */
export async function ensureBusinessLayerForDevice (deviceId) {
  try {
    const cacheKey = `businessLayer_${deviceId}`
    const cachedData = getCachedData(cacheKey)
    if (cachedData) return cachedData

    const response = await hillo.get(`${CLOUD_API_BASE_URL}/api/business-layers/ensure-for-device/${deviceId}`)
    setCachedData(cacheKey, response.content)
    return response.content
  } catch (error) {
    console.error('Error ensuring business layer for device:', error)
    throw error
  }
}

/**
 * Gets a user by their short code.
 *
 * @param {string} shortcode - The user's short code.
 * @returns {Promise<any>} The user information.
 * @throws {Error} If there is an error getting the user.
 */
export async function getUserByShortCode (shortcode) {
  try {
    const cacheKey = `user_shortcode_${shortcode}`
    const cachedData = getCachedData(cacheKey)
    if (cachedData) return cachedData

    const response = await hillo.get(`${CLOUD_API_BASE_URL}/api/asset-records/shortcode/${shortcode}`)
    setCachedData(cacheKey, response.content)
    return response.content
  } catch (error) {
    console.error('Error getting user by short code:', error)
    throw error
  }
}

/**
 * Gets the list of members for a business layer.
 *
 * @param {string} blId - The business layer ID.
 * @returns {Promise<any>} The list of members.
 * @throws {Error} If there is an error getting the members.
 */
export async function getBusinessLayerMembers (blId) {
  try {
    const cacheKey = `bl_members_${blId}`
    const cachedData = getCachedData(cacheKey)
    if (cachedData) return cachedData

    const response = await hillo.get(`${CLOUD_API_BASE_URL}/membership/user/getBusinessLayerMembers/${blId}`)
    setCachedData(cacheKey, response.content)
    return response.content
  } catch (error) {
    console.error('Error getting business layer members:', error)
    throw error
  }
}

/**
 * Gets the details of a user in a business layer.
 *
 * @param {string} userId - The user ID.
 * @param {string} blId - The business layer ID.
 * @returns {Promise<any>} The user's business layer details.
 * @throws {Error} If there is an error getting the details.
 */
export async function getUserBusinessLayerDetails (userId, blId) {
  try {
    const cacheKey = `user_bl_details_${userId}_${blId}`
    const cachedData = getCachedData(cacheKey)
    if (cachedData) return cachedData

    const response = await hillo.get(`${CLOUD_API_BASE_URL}/membership/user/getUserBusinessLayerDetails/${userId}/${blId}`)
    setCachedData(cacheKey, response.content)
    return response.content
  } catch (error) {
    console.error('Error getting user business layer details:', error)
    throw error
  }
}

/**
 * Records the usage of an asset.
 *
 * @param {string} recordId - The asset record ID.
 * @param {string} usedBy - Who used the asset.
 * @param {string} orderId - The order ID.
 * @param {string} deviceId - The device ID.
 * @param {string} note - A note about the usage.
 * @returns {Promise<any>} The response content.
 * @throws {Error} If there is an error using the asset.
 */
export async function useAsset (recordId, usedBy, orderId, deviceId, note) {
  try {
    const response = await hillo.post(`${CLOUD_API_BASE_URL}/api/asset-records/${recordId}/use`, {
      usedBy,
      orderId,
      deviceId,
      note
    })

    // Invalidate related caches
    cache.forEach((value, key) => {
      if (key.includes(recordId) || key.includes('user_') || key.includes('bl_members_')) {
        cache.delete(key)
      }
    })

    return response.content
  } catch (error) {
    console.error('Error using asset:', error)
    throw error
  }
}

/**
 * Claims an award for a user.
 *
 * @param {string} userId - The user ID.
 * @param {string} awardProgressId - The award progress ID.
 * @returns {Promise<any>} The response content.
 * @throws {Error} If there is an error claiming the award.
 */
export async function claimAward (userId, awardProgressId) {
  try {
    const response = await hillo.post(`${CLOUD_API_BASE_URL}/membership/award/claim/${userId}/${awardProgressId}`)

    // Invalidate related caches
    cache.forEach((value, key) => {
      if (key.includes(userId) || key.includes('user_') || key.includes('bl_members_')) {
        cache.delete(key)
      }
    })

    return response.content
  } catch (error) {
    console.error('Error claiming award:', error)
    throw error
  }
}

/**
 * Gets the orders for a user.
 *
 * @param {string} userId - The user ID.
 * @param {number} page - The page number. Default is 0.
 * @param {number} size - The page size. Default is 20.
 * @returns {Promise<any>} The user's orders.
 * @throws {Error} If there is an error getting the orders.
 */
export async function getUserOrders (userId, page = 0, size = 20) {
  try {
    const cacheKey = `user_orders_${userId}_${page}_${size}`
    const cachedData = getCachedData(cacheKey, 30000) // shorter TTL for orders
    if (cachedData) return cachedData

    const response = await hillo.get(`${CLOUD_API_BASE_URL}/cloudOrders/user-orders/${userId}?page=${page}&size=${size}`)
    setCachedData(cacheKey, response.content)
    return response.content
  } catch (error) {
    console.error('Error getting user orders:', error)
    throw error
  }
}

/**
 * Clears the cache for a specific user.
 *
 * @param {string} userId - The user ID.
 */
export function clearUserCache (userId) {
  cache.forEach((value, key) => {
    if (key.includes(userId) || key.includes('user_') || key.includes('bl_members_')) {
      cache.delete(key)
    }
  })
}

/**
 * Clears all cache.
 */
export function clearAllCache () {
  cache.clear()
}
