/**
 * @fileoverview API functions for interacting with the cloud membership system.
 * This file contains functions to interact with the cloud API for member information,
 * including getting member details, claiming awards, and tracking asset usage.
 */

import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

// Cloud API base URL
const CLOUD_API_BASE_URL = 'https://cloud-v2.aaden.io'

// Global variable to store the Business Layer ID (BLID)
let cachedBLID = null

/**
 * Gets the current device ID from GlobalConfig or from the API if not set.
 *
 * @returns {Promise<number>} The device ID.
 * @throws {Error} If there is an error getting the device ID.
 */
export async function getCurrentDeviceId () {
  try {
    if (!GlobalConfig.DeviceId) {
      GlobalConfig.DeviceId = await hillo.get('AccessLog.php?op=deviceId')
    }
    return GlobalConfig.DeviceId
  } catch (error) {
    console.error('Error getting device ID:', error)
    throw error
  }
}

/**
 * Ensures a business layer exists for the given device ID.
 * Uses the /common/businessLayer/assureShop/{deviceId} endpoint.
 *
 * @param {string} deviceId - The device ID.
 * @returns {Promise<any>} The business layer information.
 * @throws {Error} If there is an error ensuring the business layer.
 */
export async function ensureBusinessLayerForDevice (deviceId) {
  try {
    const response = await hillo.get(`${CLOUD_API_BASE_URL}/common/businessLayer/assureShop/${deviceId}`)
    // Store the BLID in the global variable
    if (response && response.id) {
      cachedBLID = response.id
    }
    return response
  } catch (error) {
    console.error('Error ensuring business layer for device:', error)
    throw error
  }
}

/**
 * Gets the current Business Layer ID (BLID).
 * Returns the cached BLID if it exists, otherwise calls ensureBusinessLayerForDevice to get a new one.
 *
 * @returns {Promise<string>} The Business Layer ID.
 * @throws {Error} If there is an error getting the BLID.
 */
export async function getCurrentBLID () {
  try {
    // If we already have a cached BLID, return it
    if (cachedBLID) {
      return cachedBLID
    }

    // Otherwise, ensure a business layer exists and get its ID
    const deviceId = await getCurrentDeviceId()
    await ensureBusinessLayerForDevice(deviceId)

    // The BLID should now be cached by ensureBusinessLayerForDevice
    return cachedBLID
  } catch (error) {
    console.error('Error getting current BLID:', error)
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
    return await hillo.get(`${CLOUD_API_BASE_URL}/api/asset-records/shortcode/${shortcode}`)
  } catch (error) {
    console.error('Error getting user by short code:', error)
    throw error
  }
}

/**
 * Gets the list of members for a business layer.
 * Uses the /business-layers/{blId}/members endpoint.
 *
 * @param {string} blId - The business layer ID.
 * @returns {Promise<any>} The list of members.
 * @throws {Error} If there is an error getting the members.
 */
export async function getBusinessLayerMembers (blId) {
  try {
    return await hillo.get(`${CLOUD_API_BASE_URL}/membership/user/business-layers/${blId}/members`)
  } catch (error) {
    console.error('Error getting business layer members:', error)
    throw error
  }
}

/**
 * Gets the details of a user in a business layer.
 * Uses the /users/{userId}/business-layers/{blId}/details endpoint.
 *
 * @param {string} userId - The user ID.
 * @param {string} blId - The business layer ID.
 * @returns {Promise<any>} The user's business layer details.
 * @throws {Error} If there is an error getting the details.
 */
export async function getUserBusinessLayerDetails (userId, blId) {
  try {
    return await hillo.get(`${CLOUD_API_BASE_URL}/membership/user/users/${userId}/business-layers/${blId}/details`)
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
    return await hillo.post(`${CLOUD_API_BASE_URL}/api/asset-records/${recordId}/use`, {
      usedBy,
      orderId,
      deviceId,
      note
    })
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
    return await hillo.post(`${CLOUD_API_BASE_URL}/membership/award/claim/${userId}/${awardProgressId}`)
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
    return await hillo.get(`${CLOUD_API_BASE_URL}/cloudOrders/user-orders/${userId}?page=${page}&size=${size}`)
  } catch (error) {
    console.error('Error getting user orders:', error)
    throw error
  }
}

/**
 * Gets the display name for a member from their member info object.
 *
 * @param {Object} memberInfo - The member info object containing cloudUserInfo
 * @param {string} fallback - The fallback text to use if no name is available
 * @returns {string} The member's display name, name, email, or the fallback
 */
export function getMemberDisplayName (memberInfo, fallback = 'Member') {
  if (!memberInfo || !memberInfo.cloudUserInfo) return fallback

  return memberInfo.cloudUserInfo.displayName ||
         memberInfo.cloudUserInfo.name ||
         memberInfo.cloudUserInfo.email ||
         fallback
}
