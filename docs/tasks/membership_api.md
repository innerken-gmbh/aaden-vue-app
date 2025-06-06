# Membership API Documentation

This document provides information about the API endpoints available for the membership system.

## Business Layer Endpoints

### Ensure Shop Exists

Ensures that a business layer exists for a given device ID. If no business layer exists, one will be created.

**URL:** `/api/business-layers/ensure-for-device/{deviceId}`

**Method:** `GET`   

**URL Parameters:**
- `deviceId` (required): The ID of the device

**Success Response:**
- **Code:** 200 OK
- **Content:** A BusinessLayerResponseDTO object containing the business layer information

**Example Request:**
```
GET /api/business-layers/ensure-for-device/12345
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