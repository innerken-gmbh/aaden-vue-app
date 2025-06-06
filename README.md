# Aaden Vue App
全新构建的Aaden Vue版本，重新启航，更加牢靠！
[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/aaden-vue-app)


Proudly Developed By [Innerken](https://innerken.com)

## Features

### Membership Features
The Aaden Desktop application now includes membership features that allow you to:
- Display member login status
- Select members via UI or NFC scanning
- View detailed member information
- Track member orders
- Claim awards for members

#### Configuration
To use the membership features, you need to configure the following:
- Cloud API endpoint: Set the `CLOUD_API_ENDPOINT` environment variable to the URL of the cloud API (default: cloud-v2.aaden.io).
- Device ID: Set the `DEVICE_ID` environment variable to the ID of your device.

#### Usage
To use the membership features:
1. Open a table page
2. Click the member selection button in the header
3. Select a member from the list or scan an NFC card
4. View the member's details and orders
5. Perform actions such as adding points or claiming awards
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
