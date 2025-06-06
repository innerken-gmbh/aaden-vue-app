# Aaden Desktop Application Development Guidelines

## Project Overview
Aaden Desktop is a restaurant management system built with Vue.js and Electron. It provides comprehensive features for restaurant operations including table management, order processing, reservations, member management, and sales reporting.

## Build and Configuration Instructions

### Prerequisites
- Node.js (compatible with legacy OpenSSL provider)
- Yarn or npm

### Development Setup
1. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

2. Run development server:
   ```
   npm run electron:serve
   ```
   or
   ```
   yarn electron:serve
   ```

### Build Instructions
#### For Windows:
```
npm run win:build
```
or
```
yarn win:build
```

#### For Linux (Snap):
```
npm run electron:build
```
or
```
yarn electron:build
```

### Release Process
The project uses `release-it` for versioning and publishing:
```
npm run update
```

### Internationalization
The project uses Vue i18n for internationalization with Localazy for translation management:
- Upload translations: `npm run upload-i18n`
- Download translations: `npm run update-i18n`

Default locale is Chinese ('zh') with German ('de') as fallback.

## Project Structure

### Key Directories
- `src/api`: API services and backend communication
- `src/assets`: Static assets
- `src/components`: Reusable Vue components
- `src/locales`: Internationalization files
- `src/oldjs`: Legacy JavaScript code
- `src/plugins`: Vue plugins
- `src/router`: Vue Router configuration
- `src/store`: Vuex store for state management
- `src/styles`: CSS/SCSS styles
- `src/views`: Vue components that represent pages/routes

### Main Files
- `src/App.vue`: Main application component
- `src/background.js`: Electron background process
- `src/firebase.js`: Firebase configuration
- `src/i18n.js`: Internationalization setup
- `src/main.js`: Application entry point

## Architecture and Patterns

### Frontend Framework
- Vue.js 2.6.x with Vuetify 2.6.x for UI components
- Vue Router for navigation
- Vuex for state management (flat structure without modules)

### Backend Communication
- Uses 'hillo' library for HTTP requests to PHP backend
- API endpoints are organized by functionality (Orders.php, ZBon.php, etc.)
- Firebase integration for cloud features
- Long-running operations use extended timeouts (e.g., card terminal operations)

### Component Structure
- Views represent pages and are organized by functionality
- Reusable components are in the components directory
- Table management uses draggable/resizable components
- Components emit events with 'need-' prefix for state updates (e.g., 'need-refresh')

### State Management
- Vuex store manages UI state for dialogs and authorization
- Uses promises and resolvers for asynchronous operations
- Implements a pattern of showing dialogs and returning promises that resolve when the dialog is closed
- Uses Remember utility for persistent user preferences

### Authentication and Authorization
- PIN-based authorization with different levels (regular and "super"/boss)
- Password-protected routes for sensitive areas (boss, sales)
- Authorization dialogs are managed through Vuex actions and mutations

## Key Features and Implementation Details

### Table Management
- Interactive table blueprint with drag-and-drop functionality using vue-draggable-resizable-gorkys
- Tables can be organized by sections (areas of the restaurant)
- Table positions are persisted to the backend and can be edited in a special mode
- Tables can be displayed in list view or blueprint view
- Table sizes can be adjusted with small, medium, and large view options
- Table status is visually indicated with colors

### Order Processing
- Two interfaces for order entry: menu-based and keyboard-based
- Menu-based ordering shows dish categories organized by category types
- Keyboard input supports quick dish lookup by code or name
- Supports quantity specification using "*" syntax (e.g., "101*2" for 2 of item 101)
- Implements sophisticated search algorithm prioritizing exact matches, then prefix matches, then substring matches
- Supports dish modifications and special requests
- Debouncing is used for search input to optimize performance

### Reservation System
- Tables can have reservations associated with them
- Reservations can be confirmed, checked in, moved, or canceled
- Reservation details include customer information and time slots

### Payment Processing
- Supports multiple payment methods loaded dynamically from the backend
- Card terminal integration via IP-based communication
- Card terminal IP and port can be configured in the application
- Payment logs track all payment transactions
- Digital receipts can be generated and emailed to customers
- VIP card system for loyalty customers with deposit functionality

### Reporting System
- ZBon reports (Z reports) for daily and period financial summaries
- X reports for interim financial status
- Sales analysis by product category
- Time-based sales reporting
- Servant (staff) performance reports
- Reports can be printed or emailed
- Reminder system for ZBon reports that haven't been printed in 36 hours

### Member Management
- VIP/membership card system for customer loyalty
- Customer tracking with personal information
- Points accumulation and redemption
- Member card operations including deposits and balance checks

## Advanced Implementation Details

### Performance Optimizations
- Debouncing for search inputs and UI updates
- Lazy loading of components and data
- Efficient rendering with v-if/v-show for conditional display
- Grid layouts for responsive UI that scales well

### Error Handling
- Global error dialog for displaying errors to users
- Try/catch blocks for API calls with appropriate error messages
- Timeout handling for network requests
- Fallback mechanisms for failed operations

### Custom Utilities
- Remember utility for persistent user preferences
- IKUtils for common operations like showing loading indicators and toasts
- Debounce utility for performance optimization
- Date formatting utilities with dayjs

### Printing System
- Direct printing to receipt printers
- Support for different print formats (bills, reports, etc.)
- Print preview functionality
- Email integration for digital receipts and reports

## External Dependencies and Integrations

### Key Libraries
- dayjs: Date and time handling with extensive plugin usage
- lodash: Utility functions for data manipulation
- vue-draggable-resizable-gorkys: For table layout management
- vuetify-google-autocomplete-extend: For address input
- electron-updater: For automatic updates
- vue-dragscroll: For scrollable containers with drag functionality
- sweetalert2: For enhanced alert dialogs

### External Services
- Google Maps API for address autocomplete
- Firebase for cloud features and reporting
- Snap Store for Linux distribution
- GitHub for Windows distribution and version control
- Email services for sending digital receipts and reports

## Development Conventions

### Code Style
- Uses ESLint with Vue Standard configuration
- Component props use camelCase
- Events use kebab-case with 'need-' prefix for state updates
- Consistent naming conventions for API functions (e.g., load* for GET operations, print* for print operations)

### Async Patterns
- Async/await is used throughout the codebase
- API calls are wrapped in try/catch blocks
- Loading indicators are shown during async operations
- Promises are used for dialog results and asynchronous user interactions

### Internationalization
- All user-facing strings should use i18n
- Translations are managed through Localazy
- Supports multiple languages with fallback mechanisms
- Date and currency formatting respects locale settings

### Electron-specific
- Node integration is enabled
- Uses electron-builder for packaging
- Auto-updates are configured for both Windows and Linux
- Custom protocol handlers for deep linking

## Debugging and Testing

### Debugging
- Console logging is used throughout the codebase
- Vue DevTools can be used in development mode
- Error messages include detailed information for troubleshooting
- Global error dialog for displaying errors to users

### Error Handling
- Global error dialog for displaying errors to users
- Try/catch blocks for API calls with appropriate error messages
- Fallback mechanisms for failed operations
- User-friendly error messages with internationalization

## Deployment

### Windows
- Built as NSIS installer
- Published to GitHub releases
- Auto-updates from GitHub

### Linux
- Built as Snap package
- Published to Snap Store
- Auto-updates through Snap Store
