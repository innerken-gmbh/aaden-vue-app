# Task 6: Implement Member Selection State Loading

## Description
This task involves updating the code to load member selection state from tableDetail or orderDetail API.

## Subtasks
- Update getCurrentOrderInfo in OrderInfo.js to include member information
- Update TablePage.vue to display loaded member information
- Ensure proper handling of tables without selected members

## Implementation Process

### 1. Analysis of Current Code
We need to analyze the current code in OrderInfo.js to understand how to modify the getCurrentOrderInfo function to include member information. We also need to understand how TablePage.vue currently displays table information.

### 2. Updating getCurrentOrderInfo
We need to update the getCurrentOrderInfo function in OrderInfo.js to include member information in the returned data. This will involve modifying the API call or adding a new API call to get the member information.

### 3. Updating TablePage.vue
We need to update TablePage.vue to display the loaded member information. This will involve modifying the UI to show the member information and updating the data binding.

### 4. Handling Tables Without Selected Members
We need to ensure proper handling of tables without selected members. This will involve adding conditional rendering to only show member information when a member is selected.

## Implementation Details

### Updates to getCurrentOrderInfo
We need to modify the getCurrentOrderInfo function in OrderInfo.js to include member information:

```javascript
export async function getCurrentOrderInfo(tableId) {
  const tableInfo = (await hillo.silentGet('Tables.php')).content.find(it => it.id === tableId)
  const result = {
    tableName: tableInfo?.name,
    tableId: tableInfo?.id,
    isActive: parseInt(tableInfo?.usageStatus),
    order: null,
    member: null // Add member property
  }
  if (result.isActive) {
    const info = (await hillo.silentGet(
      'Tables.php',
      {
        op: 'currentInfo',
        id: tableId
      },
      { noDebug: true }
    )).content
    result.order = {
      ...info.order,
      ...info
    }

    // Add member information if available
    if (info.customerId) {
      result.member = {
        id: info.customerId,
        // Other member properties will be loaded separately if needed
      }
    }
  }
  return result
}
```

### Updates to TablePage.vue
We need to update the initialUI method in TablePage.vue to set the currentMemberId based on the loaded member information:

```javascript
// In the component
export default {
  // ... other component options
  methods: {
    async initialUI() {
      // Existing code...

      // Set currentMemberId if available in tableDetailInfo
      if (this.tableDetailInfo?.member?.id) {
        this.currentMemberId = this.tableDetailInfo.member.id
      }

      // Existing code...
    }
  }
}
```

## Status
- [x] Analysis of current code
- [x] Updating getCurrentOrderInfo
- [x] Updating TablePage.vue
- [x] Handling tables without selected members
- [ ] Testing and verification
