# Geolocation Image Gallery App

## Overview

This mobile application is an image gallery that allows users to capture, store, and explore images with geolocation tracking. Built with React Native and Expo, the app provides a seamless experience for documenting and organizing visual memories with precise location information.

## Key Features

- **Secure User Authentication**: User accounts with secure storage
- **Camera Integration**: Direct photo capture or gallery selection
- **Geolocation Tracking**: Automatic location tagging for every image
- **Advanced Search**: Filter images by location
- **Responsive Design**: Optimized for various mobile device sizes

## Tech Stack

- **Frontend**: React Native
- **Backend**: SQLite (expo-sqlite)
- **Camera**: expo-camera
- **Location Services**: expo-location
- **Image Handling**: expo-image-picker

## Prerequisites

- Node.js (v16 or later)
- npm or Yarn
- Expo CLI
- A mobile device or emulator (iOS/Android)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Xoli-Nxiweni/GalleryApp.git
   cd PhotosApp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install Expo CLI (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

## Configuration

1. Create a `.env` file in the project root for any environment-specific variables.
2. Ensure all required permissions are configured in `app.json`.

## Running the App

### Development Mode
```bash
npx expo start
```

### Running on a Physical Device
1. Install Expo Go app on your mobile device.
2. Scan the QR code generated by `expo start`.

### Running on Emulator
- For iOS: `npx expo start --ios`
- For Android: `npx expo start --android`

## Permissions

The app requires the following permissions:
- Camera access
- Location services
- Photo library access

## Project Structure

```
gallery-app/
│
├── assets/           # Static assets
├── components/       # Reusable React components
├── screens/          # Individual screen components
├── theme/            # Styling and design system
├── utils/            # Utility functions
│   ├── database.js   # SQLite database operations
│   └── permissions.js # Location and camera permissions
└── navigation/       # App navigation configuration
```

## Testing

### Running Tests
```bash
npm test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## TODO

- Implement image editing features
- Add cloud backup functionality
- Enhance search capabilities
- Implement image sharing

## Known Issues

- Location services might be slow on some devices
- Performance optimization needed for large image collections

## Contact

Xoli Nxiweni - xoli-nxiweni@gmail.com

