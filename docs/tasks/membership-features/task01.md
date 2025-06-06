# Task 1: Implement Cloud API Integration

## Description
This task involves creating new functions to interact with the cloud APIs for member information.

## Subtasks
- Create new file for cloud API calls (if not using existing VIPCloudApi.js)
- Implement functions to get member information from cloud APIs:
  - Get user by short code (`/api/asset-records/shortcode/{shortcode}`)
  - Get user list for business layer (`/membership/user/getBusinessLayerMembers/{blId}`)
  - Get user business layer details (`/membership/user/getUserBusinessLayerDetails/{userId}/{blId}`)
  - Use asset (`/api/asset-records/{recordId}/use`)
  - Claim award (`/membership/award/claim/{userId}/{awardProgressId}`)
  - Get user orders (`/cloudOrders/user-orders/{userId}`)
- Implement functions to update member information in cloud APIs
- Add proper error handling and caching for API calls

## Implementation Process

### 1. Analysis of Current Code
We need to analyze the current code in VIPCloudApi.js to understand how to integrate the new API calls. We also need to understand how the existing API calls are structured and how they handle authentication, error handling, and caching.

### 2. Deciding on API Structure
We need to decide whether to create a new file for the cloud API calls or to update the existing VIPCloudApi.js file. This decision will depend on the structure of the existing code and how well it aligns with the new API calls.

### 3. Implementing API Functions
We need to implement functions to interact with the cloud APIs for member information. This will involve creating functions for each of the API endpoints listed in the subtasks.

### 4. Adding Error Handling
We need to add error handling for the API calls. This will involve adding try-catch blocks around the API calls and providing appropriate error messages.

### 5. Adding Caching
We need to add caching for the API calls to improve performance. This will involve implementing a caching mechanism for the API responses.

## Implementation Details

### API Functions
We need to implement the following API functions using hillo with cloud-v2.aaden.io endpoint:

1. Get user by short code:
```javascript
import hillo from 'hillo'

// Create a separate hillo instance for cloud API calls
const cloudHillo = hillo.create()
cloudHillo.initial('https://cloud-v2.aaden.io')

export async function getUserByShortCode(shortcode) {
  try {
    const response = await cloudHillo.get(`/api/asset-records/shortcode/${shortcode}`)
    return response.content
  } catch (error) {
    console.error('Error getting user by short code:', error)
    throw error
  }
}
```

2. Get user list for business layer:
```javascript
export async function getBusinessLayerMembers(blId) {
  try {
    const response = await cloudHillo.get(`/membership/user/getBusinessLayerMembers/${blId}`)
    return response.content
  } catch (error) {
    console.error('Error getting business layer members:', error)
    throw error
  }
}
```

3. Get user business layer details:
```javascript
export async function getUserBusinessLayerDetails(userId, blId) {
  try {
    const response = await cloudHillo.get(`/membership/user/getUserBusinessLayerDetails/${userId}/${blId}`)
    return response.content
  } catch (error) {
    console.error('Error getting user business layer details:', error)
    throw error
  }
}
```

4. Use asset:
```javascript
export async function useAsset(recordId, usedBy, orderId, deviceId, note) {
  try {
    const response = await cloudHillo.post(`/api/asset-records/${recordId}/use`, {
      usedBy,
      orderId,
      deviceId,
      note
    })
    return response.content
  } catch (error) {
    console.error('Error using asset:', error)
    throw error
  }
}
```

5. Claim award:
```javascript
export async function claimAward(userId, awardProgressId) {
  try {
    const response = await cloudHillo.post(`/membership/award/claim/${userId}/${awardProgressId}`)
    return response.content
  } catch (error) {
    console.error('Error claiming award:', error)
    throw error
  }
}
```

6. Get user orders:
```javascript
export async function getUserOrders(userId, page = 0, size = 20) {
  try {
    const response = await cloudHillo.get(`/cloudOrders/user-orders/${userId}?page=${page}&size=${size}`)
    return response.content
  } catch (error) {
    console.error('Error getting user orders:', error)
    throw error
  }
}
```

### Caching Implementation
We can implement a simple caching mechanism using a Map to store the API responses:

```javascript
const cache = new Map()

function getCachedData(key, ttl = 60000) {
  const cachedData = cache.get(key)
  if (cachedData && Date.now() - cachedData.timestamp < ttl) {
    return cachedData.data
  }
  return null
}

function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}
```

## Status
- [x] Analysis of current code
- [x] Deciding on API structure
- [x] Implementing API functions
- [x] Adding error handling
- [x] Adding caching
- [ ] Testing and verification
