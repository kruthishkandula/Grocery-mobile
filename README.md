# Grocery-mobile (Customer App)

Mobile application for grocery shopping with intuitive browse-and-buy experience. Customers can search products, manage shopping carts, place orders, and track deliveries.

## 📱 Features

- **Product Browsing**: Browse products by categories with search and filter options
- **Shopping Cart**: Add, remove, and modify items with real-time price calculation
- **User Authentication**: Secure login/registration with profile management
- **Order Placement**: Easy checkout process with multiple payment options
- **Order Tracking**: Real-time order status updates and delivery tracking
- **Wishlist**: Save favorite products for future purchases
- **Push Notifications**: Order updates, promotions, and personalized offers
- **Address Management**: Multiple delivery addresses with GPS integration
- **Payment Integration**: Support for credit cards, digital wallets, and COD

## 🛠️ Tech Stack

- **Framework**: React Native Expo
- **State Management**: Zustand, Provider
- **Navigation**: React Navigation
- **HTTP Client**: Axios, @tanstack/react-query
- **Push Notifications**: Expo notifications
- **Payment**: Phonepe, COD
- **Storage**: expo-storage, expo-secure-store
- **Deeplinks**: expo-linking

## 📋 Prerequisites

- Node.js (v18 or higher) - for Expo
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Backend API running (grocery-be)

## 🏗️ Installation

1. Clone the repository
```bash
git clone https://github.com/kruthishkandula/grocery-mobile.git
cd grocery-mobile
```

2. Install dependencies
```bash
npm install
# or
yarn install

# For iOS (React Native only)
cd ios && pod install && cd ..
```

3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
```
API_URL=http://localhost:3001/api

```

4. Start the development server
```bash

# Expo
yarn start

# Start Android emulator
yarn android

# Start iOS simulator (macOS only)
yarn ios

```

## 📱 Build & Release

### Android
```bash
yarn build --p android
```

### iOS
```bash
yarn build --p ios
```

## 📁 Project Structure

```
grocery-mobile/
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/           # App screens/pages
│   ├── navigation/        # Navigation configuration
│   ├── services/          # API service calls
│   ├── store/             # State management
│   ├── utils/             # Helper functions
│   ├── hooks/             # Custom hooks
│   └── assets/            # Images, fonts, etc.
├── android/               # Android-specific files
├── ios/                   # iOS-specific files
├── package.json
└── README.md
```

## 🔧 Configuration

### API Configuration
```typescript
const API_CONFIG = {
  baseURL: process.env.API_URL || 'http://localhost:3001/api',
  timeout: 10000,
};
```

### Push Notifications Setup
1. Configure Expo push token
2. Update notification handlers in the app


## 📚 API Integration

This mobile app integrates with the following API endpoints from `grocery-be`:

- `POST /api/auth/login` - User authentication
- `GET /api/products` - Product catalog
- `POST /api/cart` - Cart management
- `POST /api/orders` - Order placement
- `GET /api/orders/:userId` - Order history
- `GET /api/categories` - Product categories

## 🧪 Testing

```bash
# Run tests
npm test

# Run E2E tests (if configured)
npm run test:e2e
```

## 📦 Dependencies

Key dependencies include:
- React Navigation - Navigation
- Zustand - State management
- Axios - HTTP client
- React Hook Form - Form handling
- Expo push notifications - Push notifications
- Expo-storage, expo-secure-store - Local storage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact: kandulakruthish@gmail.com

## 🔗 Related Projects

- [Grocery-web](https://github.com/kandulakruthish/grocery-web) - Admin portal
- [Grocery-be](https://github.com/kandulakruthish/grocery-be) - Backend API
