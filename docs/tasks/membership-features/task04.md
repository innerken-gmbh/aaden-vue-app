# Task 4: Implement Member Selected State API Integration

## Description
This task involves implementing API calls to save the selected member state to the local PHP API.

## Subtasks
- Create function to call Complex.php?op=setOrderAutoClaimCustomerId
- Update TablePage.vue to call this function when a member is selected
- Implement asset usage tracking using `/api/asset-records/{recordId}/use` endpoint
- Add error handling for failed API calls
- Add success feedback for successful API calls

## Implementation Process

### 1. Analysis of Current Code
We need to analyze the current code in OrderInfo.js to understand how to integrate the new API calls. We also need to understand how the member selection is currently handled in TablePage.vue.

### 2. Creating API Function
We need to create a function to call Complex.php?op=setOrderAutoClaimCustomerId. This function will be responsible for saving the selected member state to the local PHP API.

### 3. Updating TablePage.vue
We need to update TablePage.vue to call the new API function when a member is selected. This will involve modifying the member selection dialog to call the function when a member is selected.

### 4. Implementing Asset Usage Tracking
We need to implement asset usage tracking using the `/api/asset-records/{recordId}/use` endpoint. This will involve creating a new function to call this endpoint and updating TablePage.vue to call this function when appropriate.

### 5. Adding Error Handling
We need to add error handling for failed API calls. This will involve adding try-catch blocks around the API calls and displaying appropriate error messages to the user.

### 6. Adding Success Feedback
We need to add success feedback for successful API calls. This will involve displaying a success message to the user when an API call is successful.

## Implementation Details

### API Function for Member Selected State
```javascript
export async function setOrderAutoClaimCustomerId(orderId, customerId) {
  try {
    const response = await hillo.post('Complex.php?op=setOrderAutoClaimCustomerId', {
      orderId,
      customerId
    });
    return response.content;
  } catch (error) {
    console.error('Error setting order auto claim customer ID:', error);
    throw error;
  }
}
```

### API Function for Asset Usage Tracking
We should use the `useAsset` function from Task 1 for asset usage tracking:

```javascript
// Import the useAsset function from Task 1
import { useAsset } from '../api/MemberCloud/MemberCloudApi'

// Example usage in OrderInfo.js
export async function trackAssetUsage(recordId, orderId) {
  try {
    const deviceId = await getCurrentDeviceId() // Function to get current device ID
    return await useAsset(recordId, 'user', orderId, deviceId, 'Used for order')
  } catch (error) {
    console.error('Error tracking asset usage:', error)
    throw error
  }
}
```

### Updates to TablePage.vue
We need to update the `currentMemberId` watcher in TablePage.vue to call the new API functions when a member is selected.

## Status
- [x] Analysis of current code
- [x] Creating API function for member selected state
- [x] Updating TablePage.vue
- [x] Implementing asset usage tracking
- [x] Adding error handling
- [x] Adding success feedback
- [ ] Testing and verification
