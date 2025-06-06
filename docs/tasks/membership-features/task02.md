# Task 2: Update Member Selection Dialog

## Description
This task involves enhancing the existing MemberSelectionDialog.vue to support NFC scanning and improve user experience.

## Subtasks
- Update dialog to handle NFC input format (aaden:member:shortCode)
- Improve search functionality to find members by shortCode using `/api/asset-records/shortcode/{shortcode}` endpoint
- Add loading indicators for API calls
- Ensure proper error handling for failed API calls

## Implementation Process

### 1. Analysis of Current Code
The MemberSelectionDialog.vue file already exists and provides basic member selection functionality. It currently uses the `searchNfcCard()` function from VIPApi.js to get a list of members, and allows searching by name, birthday, uid, and email.

### 2. Updating Dialog to Handle NFC Input
We need to update the dialog to handle NFC input in the format "aaden:member:shortCode". This will involve adding a method to parse this format and extract the shortCode.

### 3. Improving Search Functionality
We need to improve the search functionality to find members by shortCode using the `/api/asset-records/shortcode/{shortcode}` endpoint. This will involve updating the search method to check if the input is in the NFC format, and if so, use the shortCode endpoint instead of the regular search.

### 4. Adding Loading Indicators
We need to add loading indicators for API calls to provide feedback to the user during potentially slow operations.

### 5. Ensuring Proper Error Handling
We need to ensure proper error handling for failed API calls, providing clear error messages to the user.

## Implementation Details

### Changes to MemberSelectionDialog.vue
1. Add method to parse NFC input format
2. Update search method to use shortCode endpoint when appropriate
3. Add loading indicators for API calls
4. Add error handling for failed API calls

### API Integration
1. Use the cloudHillo instance from Task 1 to call the `/api/asset-records/shortcode/{shortcode}` endpoint to find members by shortCode
2. Update error handling to provide clear error messages

Example code:
```javascript
// Import the function from Task 1
import { getUserByShortCode } from '../api/MemberCloud/MemberCloudApi'

// In the component
export default {
  // ... other component options
  methods: {
    async searchByShortCode(shortCode) {
      try {
        this.loading = true
        const member = await getUserByShortCode(shortCode)
        if (member) {
          this.memberList = [member]
          this.selectedMemberId = member.id
        }
      } catch (error) {
        console.error('Error searching by short code:', error)
        // Show error message to user
      } finally {
        this.loading = false
      }
    }
  }
}
```

## Status
- [x] Analysis of current code
- [x] Updating dialog to handle NFC input
- [x] Improving search functionality
- [x] Adding loading indicators
- [x] Ensuring proper error handling
- [ ] Testing and verification
