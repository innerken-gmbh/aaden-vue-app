# Membership Features Implementation Tasks

## Meta Information for Code Agents
This section contains information for code agents to understand how to execute the tasks in this document.

### Execution Rules
- Tasks should be executed in the order specified in the "Dependencies and Order of Implementation" section
- Each task has a corresponding markdown file in the `docs/tasks/membership-features/` directory
- Task files are named `task01.md`, `task02.md`, etc., corresponding to the task numbers in this document
- Each task file contains detailed implementation instructions and code examples
- Before starting a task, ensure all prerequisite tasks are completed
- After completing a task, update its status in the corresponding task file
- Use the API endpoints specified in the "API Endpoints" section
- For cloud API calls, use hillo with the cloud-v2.aaden.io endpoint
- For local API calls, use the standard hillo instance
- Error handling should be implemented for all API calls
- Follow the Vue.js component structure and naming conventions used in the project

### Task Execution Process
1. **Task Selection**: Select the next task based on the "Dependencies and Order of Implementation" section
2. **Prerequisite Check**: Verify all prerequisite tasks are completed by checking their status files
3. **Task Analysis**: Read the task file to understand the requirements and implementation details
4. **Implementation**: Follow the implementation steps in the task file
5. **Testing**: Test the implementation to ensure it meets the requirements
6. **Status Update**: Update the status in the task file to mark subtasks as completed
7. **Reporting**: Report the task completion status

### Dependency Handling
- Task 1 (Cloud API Integration) must be completed before Tasks 2, 3, 4, 5, and 6
- Tasks 2 (Member Selection Dialog) and 3 (Member Detail Dialog) can be executed in parallel
- Task 4 (TablePage.vue Update) depends on Tasks 2 and 3
- Task 5 (Member Selected State API) depends on Task 4
- Task 6 (Member Selection State Loading) depends on Task 5
- Task 7 (Documentation) should be done last

### Success Criteria
- All tasks are completed according to their specifications
- Code follows the project's coding standards and patterns
- API integration works correctly with both local and cloud endpoints
- UI components display member information correctly
- Error handling is implemented for all API calls
- Documentation is updated to reflect the new features

### Task Status Tracking
- Each task file contains a "Status" section at the end
- Use checkmarks [x] to indicate completed subtasks
- Use empty brackets [ ] to indicate pending subtasks
- Update the status as subtasks are completed

### Error Handling
- If an API call fails, log the error and provide a user-friendly error message
- If a task cannot be completed due to missing prerequisites, report the dependency issue
- If a task fails, report the failure reason and stop execution

### Progress Reporting
- Report the start of each task
- Report the completion of each subtask
- Report the completion of each task
- Report any errors or issues encountered
- Report the overall progress of the implementation

## Overview
This document outlines the tasks required to implement the membership features in the Aaden Desktop application. The features include member login status display, member selection, member details, and integration with both local and cloud APIs.

## API Endpoints
### Cloud APIs (hosted on cloud-v2.aaden.io)
- **Business Layer Endpoints**:
  - `/api/business-layers/ensure-for-device/{deviceId}` - Ensures a business layer exists for a device
- **User Membership Endpoints**:
  - `/api/asset-records/shortcode/{shortcode}` - Get user by membership short code
  - `/membership/user/getBusinessLayerMembers/{blId}` - Get user list for business layer
  - `/membership/user/getUserBusinessLayerDetails/{userId}/{blId}` - Get user business layer details
  - `/api/asset-records/{recordId}/use` - Use an asset
  - `/membership/award/claim/{userId}/{awardProgressId}` - Claim an award
  - `/cloudOrders/user-orders/{userId}` - Get user orders

### Local PHP API
- **Complex.php?op=setOrderAutoClaimCustomerId** - Used for member selected state

## Tasks

### 1. Implement Cloud API Integration
- **Description**: Create new functions to interact with the cloud APIs for member information
- **Subtasks**:
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
- **Files to Create/Modify**:
  - src/api/MemberCloud/MemberCloudApi.js or update existing VIPCloudApi.js

### 2. Update Member Selection Dialog
- **Description**: Enhance the existing MemberSelectionDialog.vue to support NFC scanning and improve user experience
- **Subtasks**:
  - Update dialog to handle NFC input format (aaden:member:shortCode)
  - Improve search functionality to find members by shortCode using `/api/asset-records/shortcode/{shortcode}` endpoint
  - Add loading indicators for API calls
  - Ensure proper error handling for failed API calls
- **Files to Modify**:
  - src/views/TablePage/Dialog/MemberSelectionDialog.vue

### 3. Create Member Detail Dialog
- **Description**: Create a new dialog to display detailed member information
- **Subtasks**:
  - Create new MemberDetailDialog.vue component
  - Display member information (name, ID, balance, points, etc.) using `/membership/user/getUserBusinessLayerDetails/{userId}/{blId}` endpoint
  - Add actions for member management (edit, add points, claim awards, etc.)
  - Implement award claiming using `/membership/award/claim/{userId}/{awardProgressId}` endpoint
  - Display user orders using `/cloudOrders/user-orders/{userId}` endpoint
  - Implement proper navigation between selection and detail dialogs
- **Files to Create**:
  - src/views/TablePage/Dialog/MemberDetailDialog.vue

### 4. Update TablePage.vue with Member Login Status and Entry Point
- **Description**: Add member login status display and entry point for member selection in TablePage.vue
- **Subtasks**:
  - Add member status indicator in the table header area
  - Add button/icon for member selection (scanning NFC label which outputs aaden:member:shortCode)
  - Update UI to show currently selected member information
  - Handle NFC scanning input for member selection
  - Ensure business layer exists using `/api/business-layers/ensure-for-device/{deviceId}` endpoint
- **Files to Modify**:
  - src/views/TablePage/TablePage.vue

### 5. Implement Member Selected State API Integration
- **Description**: Implement API calls to save the selected member state to the local PHP API
- **Subtasks**:
  - Create function to call Complex.php?op=setOrderAutoClaimCustomerId
  - Update TablePage.vue to call this function when a member is selected
  - Implement asset usage tracking using `/api/asset-records/{recordId}/use` endpoint
  - Add error handling for failed API calls
  - Add success feedback for successful API calls
- **Files to Modify**:
  - src/api/Repository/OrderInfo.js or create a new file for member-related API calls

### 6. Implement Member Selection State Loading
- **Description**: Update the code to load member selection state from tableDetail or orderDetail API
- **Subtasks**:
  - Update getCurrentOrderInfo in OrderInfo.js to include member information
  - Update TablePage.vue to display loaded member information
  - Ensure proper handling of tables without selected members
- **Files to Modify**:
  - src/api/Repository/OrderInfo.js
  - src/views/TablePage/TablePage.vue


### 7. Documentation
- **Description**: Update documentation to reflect the new features
- **Subtasks**:
  - Update code comments
  - Update README or other documentation files
  - Create user guide for the new features



## Dependencies and Order of Implementation
1. Cloud API Integration (Task 1) should be implemented first to ensure member data can be retrieved
2. Member Selection Dialog Update (Task 2) and Member Detail Dialog (Task 3) can be implemented in parallel
3. TablePage.vue Update (Task 4) depends on Tasks 2 and 3
4. Member Selected State API Integration (Task 5) depends on Task 4
5. Member Selection State Loading (Task 6) depends on Task 5
6. Documentation (Task 7) should be done last

## Estimated Effort
- Task 1: Large (3-4 days)
- Task 2: Medium (1-2 days)
- Task 3: Medium (2-3 days)
- Task 4: Medium (2-3 days)
- Task 5: Small (1 day)
- Task 6: Small (1 day)
- Task 7: Small (1 day)

Total estimated effort: 10-15 days
