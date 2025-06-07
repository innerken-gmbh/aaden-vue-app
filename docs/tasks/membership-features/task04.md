# Task 4: Update TablePage.vue with Member Login Status and Entry Point

## Description
This task involves adding member login status display and entry point for member selection in TablePage.vue.

## Subtasks
- Add member status indicator in the table header area
- Add button/icon for member selection (scanning NFC label which outputs aaden:member:shortCode)
- Update UI to show currently selected member information
- Handle NFC scanning input for member selection
- Ensure business layer exists using `/api/business-layers/ensure-for-device/{deviceId}` endpoint

## Implementation Process

### 1. Analysis of Current Code
We need to analyze the current code in TablePage.vue to understand how to integrate the member login status display and entry point for member selection. We also need to understand how the member selection dialog is currently implemented.

### 2. Adding Member Status Indicator
We need to add a member status indicator in the table header area. This will involve adding a new UI element that shows whether a member is currently selected or not.

### 3. Adding Member Selection Button
We need to add a button/icon for member selection. This will involve adding a new button that opens the member selection dialog when clicked.

### 4. Updating UI for Selected Member
We need to update the UI to show the currently selected member information. This will involve modifying the UI to display the member's name or ID when a member is selected.

### 5. Handling NFC Scanning Input
We need to handle NFC scanning input for member selection. This will involve adding code to parse the NFC input format (aaden:member:shortCode) and use it to select a member.

### 6. Ensuring Business Layer Exists
We need to ensure that a business layer exists for the device. This will involve calling the `/api/business-layers/ensure-for-device/{deviceId}` endpoint when the component is mounted.

## Implementation Details

### Member Status Indicator and Selection Button
We need to add a member status indicator and selection button to the table header area in TablePage.vue:

```vue
<!-- Member status indicator and selection button -->
<v-icon class="mr-2 ml-6">mdi-account-card</v-icon>
<div
    class="d-flex align-center"
    @click="showMemberSelectionDialog = true"
>
  <span v-if="currentMemberId">{{ $t('MemberSelected') }}</span>
  <span v-else>{{ $t('SelectMember') }}</span>
  <v-btn
      class="ml-2"
      icon
      small
      @click.stop="showMemberSelectionDialog = true"
  >
    <v-icon>{{ currentMemberId ? 'mdi-account-edit' : 'mdi-account-plus' }}</v-icon>
  </v-btn>
</div>
```

### Ensuring Business Layer Exists
We need to ensure that a business layer exists for the device by calling the ensureBusinessLayerForDevice function in the mounted lifecycle hook:

```javascript
// Import the necessary functions
import { ensureBusinessLayerForDevice, getCurrentDeviceId } from '@/api/MemberCloud/MemberCloudApi'

// In the mounted hook
async mounted () {
  this.globalLoading = true
  try {
    await getConsumeTypeList()
    this.consumeTypeList = consumeTypeList

    // Ensure business layer exists for the device (required for member functionality)
    try {
      const deviceId = await getCurrentDeviceId()
      await ensureBusinessLayerForDevice(deviceId)
    } catch (error) {
      console.error('Error ensuring business layer:', error)
      // Non-blocking error - continue with initialization
    }

    await this.initialUI()
    if (GlobalConfig.escBackToHome === '1') {
      window.addEventListener('keydown', this.handleKeydown)
    }
  } catch (e) {
    IKUtils.showError(e.message)
    console.log(e)
  }

  this.globalLoading = false
}
```

## Status
- [x] Analysis of current code
- [x] Adding member status indicator
- [x] Adding member selection button
- [x] Updating UI for selected member
- [x] Handling NFC scanning input
- [x] Ensuring business layer exists
- [x] Testing and verification
