# Membership API Documentation

This document provides information about the API endpoints available for the membership system.

## Business Layer Endpoints

### Ensure Shop Exists

Ensures that a business layer exists for a given device ID. If no business layer exists, one will be created.

**URL:** `/common/businessLayer/assureShop/{deviceId}`

**Method:** `GET`

**URL Parameters:**
- `deviceId` (required): The ID of the device

**Success Response:**
- **Code:** 200 OK
- **Content:** A BusinessLayerResponseDTO object containing the business layer information

**Example Request:**
```
GET /common/businessLayer/assureShop/12345
```

**Example Response:**
```json
{
  "id": 1,
  "displayInfo": {
    "name": "Shop Name",
    "description": "Shop Description",
    "imageUrl": "https://example.com/image.jpg",
    "color": ""
  },
  "type": "Shop",
  "deviceId": 12345,
  "public": true,
  "contactInfo": {
    "phone": "123-456-7890",
    "email": "shop@example.com",
    "address": "123 Main St"
  }
}
```

### Get Business Layer by ID

Retrieves a business layer by its ID.

**URL:** `/common/businessLayer/{id}`

**Method:** `GET`

**URL Parameters:**
- `id` (required): The ID of the business layer

**Success Response:**
- **Code:** 200 OK
- **Content:** A BusinessLayerResponseDTO object containing the business layer information

**Error Response:**
- **Code:** 404 Not Found
- **Content:** No content

### Get Business Layer by Device ID

Retrieves a business layer by device ID.

**URL:** `/common/businessLayer/byDeviceId/{deviceId}`

**Method:** `GET`

**URL Parameters:**
- `deviceId` (required): The ID of the device

**Success Response:**
- **Code:** 200 OK
- **Content:** A BusinessLayerResponseDTO object containing the business layer information

**Error Response:**
- **Code:** 404 Not Found
- **Content:** No content

### Get All Business Layers

Retrieves all business layers.

**URL:** `/common/businessLayer/all`

**Method:** `GET`

**Success Response:**
- **Code:** 200 OK
- **Content:** A list of BusinessLayerResponseDTO objects

### Create Business Layer

Creates a new business layer.

**URL:** `/common/businessLayer/create`

**Method:** `POST`

**Request Body:**
```json
{
  "type": "Shop",
  "deviceId": 12345,
  "public": true,
  "displayInfo": {
    "name": "Shop Name",
    "description": "Shop Description",
    "imageUrl": "https://example.com/image.jpg",
    "color": ""
  },
  "contactInfo": {
    "phone": "123-456-7890",
    "email": "shop@example.com",
    "address": "123 Main St"
  },
  "parentId": null
}
```

**Success Response:**
- **Code:** 200 OK
- **Content:** The created BusinessLayerResponseDTO

### Update Business Layer Display Info

Updates the display information of a business layer.

**URL:** `/common/businessLayer/updateDisplayInfo`

**Method:** `POST`

**Request Body:**
```json
{
  "id": 1,
  "displayInfo": {
    "name": "Updated Shop Name",
    "description": "Updated Shop Description",
    "imageUrl": "https://example.com/updated-image.jpg",
    "color": "#FF0000"
  },
  "public": true,
  "contactInfo": {
    "phone": "987-654-3210",
    "email": "updated@example.com",
    "address": "456 New St"
  }
}
```

**Success Response:**
- **Code:** 200 OK
- **Content:** The updated BusinessLayerResponseDTO

### Update Business Layer Parent

Updates the parent of a business layer.

**URL:** `/common/businessLayer/updateParent`

**Method:** `POST`

**Request Body:**
```json
{
  "id": 1,
  "parentId": 2
}
```

**Success Response:**
- **Code:** 200 OK
- **Content:** The updated BusinessLayerResponseDTO

### Delete Business Layer

Deletes a business layer.

**URL:** `/common/businessLayer/delete/{id}`

**Method:** `POST`

**URL Parameters:**
- `id` (required): The ID of the business layer to delete

**Query Parameters:**
- `deleteMode` (required): The deletion mode (MOVE_CHILDREN or DELETE_ALL)

**Success Response:**
- **Code:** 200 OK
- **Content:** No content

### Get Top Level Business Layer by Device ID

Retrieves the top level business layer for a device ID.

**URL:** `/common/businessLayer/byDeviceId/{deviceId}`

**Method:** `GET`

**URL Parameters:**
- `deviceId` (required): The ID of the device

**Success Response:**
- **Code:** 200 OK
- **Content:** A BusinessLayerResponseDTO object containing the top level business layer information

**Error Response:**
- **Code:** 404 Not Found
- **Content:** No content

### Get Related Business Layers by Device ID

Retrieves all business layers related to a device ID.

**URL:** `/common/businessLayer/relatedByDeviceId/{deviceId}`

**Method:** `GET`

**URL Parameters:**
- `deviceId` (required): The ID of the device

**Success Response:**
- **Code:** 200 OK
- **Content:** A list of BusinessLayerResponseDTO objects containing related business layers

## User Membership Endpoints

### Get User by Short Code

Finds a user by their membership short code.

**URL:** `/api/asset-records/shortcode/{shortcode}`

**Method:** `GET`

**URL Parameters:**
- `shortcode` (required): The short code to search for

**Success Response:**
- **Code:** 200 OK
- **Content:** An AssetRecordDTO object containing the asset record information

**Error Response:**
- **Code:** 404 Not Found
- **Content:** No content

### Get User List for Business Layer

Gets a list of users for a specific business layer.

**URL:** `/membership/user/getBusinessLayerMembers/{blId}`

**Method:** `GET`

**URL Parameters:**
- `blId` (required): The business layer ID

**Success Response:**
- **Code:** 200 OK
- **Content:** A list of UserMembershipDTO objects

### Get User Business Layer Details

Gets detailed information about a user's membership in a business layer.

**URL:** `/membership/user/getUserBusinessLayerDetails/{userId}/{blId}`

**Method:** `GET`

**URL Parameters:**
- `userId` (required): The user ID
- `blId` (required): The business layer ID

**Success Response:**
- **Code:** 200 OK
- **Content:** A UserBLDetailDTO object containing detailed information about the user's membership

### Use Asset

Uses an asset.

**URL:** `/api/asset-records/{recordId}/use`

**Method:** `POST`

**URL Parameters:**
- `recordId` (required): The asset record ID

**Request Body:**
```json
{
  "usedBy": "user",
  "orderId": 12345,
  "deviceId": 67890,
  "note": "Used for order"
}
```

**Success Response:**
- **Code:** 200 OK
- **Content:** The updated AssetRecordDTO

### Claim Award

Claims an award for a user.

**URL:** `/membership/award/claim/{userId}/{awardProgressId}`

**Method:** `POST`

**URL Parameters:**
- `userId` (required): The user ID
- `awardProgressId` (required): The award progress ID

**Success Response:**
- **Code:** 200 OK
- **Content:** An AssetRecordDTO representing the claimed award

### Get User Orders

Gets a list of orders for a user.

**URL:** `/cloudOrders/user-orders/{userId}`

**Method:** `GET`

**URL Parameters:**
- `userId` (required): The user ID

**Query Parameters:**
- `page` (optional): The page number (default: 0)
- `size` (optional): The page size (default: 20)

**Success Response:**
- **Code:** 200 OK
- **Content:** An OrderResponseDTO containing a paginated list of orders with details and a separate list of all related business layers


