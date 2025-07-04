# Starter Template with React Navigation

This is a minimal starter template for React Native apps using Expo and React Navigation.

## Why Expo?

This project uses Expo because it's the recommended approach for modern React Native development. Expo provides a superior developer experience with:

- Streamlined setup and configuration
- Built-in tooling and services
- Better cross-platform compatibility
- Simplified deployment process
- Native support via development builds for full React Native capabilities
- Active community support and regular updates

## Features

It includes the following:

- Example [Native Stack](https://reactnavigation.org/docs/native-stack-navigator) with a nested [Bottom Tab](https://reactnavigation.org/docs/bottom-tab-navigator)
- Web support with [React Native for Web](https://necolas.github.io/react-native-web/)
- TypeScript support and configured for React Navigation
- Automatic [deep link](https://reactnavigation.org/docs/deep-linking) and [URL handling configuration](https://reactnavigation.org/docs/configuring-links)
- Theme support [based on system appearance](https://reactnavigation.org/docs/themes/#using-the-operating-system-preferences)
- Expo [Development Build](https://docs.expo.dev/develop/development-builds/introduction/) with [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)
- Edge-to-edge configured on Android with [`react-native-edge-to-edge`](https://www.npmjs.com/package/react-native-edge-to-edge)

## Getting Started

1. Create a new project using this template:

   ```sh
   npx create-expo-app@latest --template react-navigation/template
   ```

2. Edit the `app.json` file to configure the `name`, `slug`, `scheme` and bundle identifiers (`ios.bundleIdentifier` and `android.bundleIdentifier`) for your app.

3. Edit the `src/App.tsx` file to start working on your app.

## Running the app

- Install the dependencies:

  ```sh
  npm install
  ```

- Start the development server:

  ```sh
  npm start
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

- In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

## Notes

This project uses a [development build](https://docs.expo.dev/develop/development-builds/introduction/) and cannot be run with [Expo Go](https://expo.dev/go). To run the app with Expo Go, edit the `package.json` file, remove the `expo-dev-client` package and `--dev-client` flag from the `start` script.

We highly recommend using the development builds for normal development and testing.

The `ios` and `android` folder are gitignored in the project by default as they are automatically generated during the build process ([Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)). This means that you should not edit these folders directly and use [config plugins](https://docs.expo.dev/config-plugins/) instead. However, if you need to edit these folders, you can remove them from the `.gitignore` file so that they are tracked by git.

## Architecture Choices

This project follows a component-based architecture using React Native with Expo and React Navigation. Key architectural decisions include:

- **Navigation Structure**: Utilizes React Navigation's Native Stack Navigator with nested Bottom Tab Navigator for intuitive user flow
- **TypeScript Integration**: Full TypeScript support for type safety and better developer experience
- **Component Organization**: Modular component structure for maintainability and reusability
- **Cross-Platform Support**: Built with React Native for Web compatibility, enabling deployment across iOS, Android, and web platforms
- **Theme System**: Implements system-aware theming that adapts to device appearance preferences

## State Management Strategy

The current implementation uses a combination of modern state management patterns:

- **Zustand**: Lightweight state management library for global application state with a simple, unopinionated API
- **MMKV**: High-performance key-value storage for persisting application state and user preferences
- **Local State**: Component-level state using React hooks (`useState`, `useEffect`) for component-specific data
- **Navigation State**: Managed by React Navigation for routing and screen transitions

## Trade-offs and Known Limitations

- **No API Integration**: The application currently operates with mock data instead of real API endpoints, limiting dynamic data functionality
- **FlatList Usage**: Using React Native's standard `FlatList` component instead of more performant alternatives like Shopify's FlashList
- **Limited Network Layer**: No established patterns for API calls, error handling, or data caching

## Areas for Improvement with More Time

Given additional development time, the following enhancements would significantly improve the application:

- **MockAPI.io Integration**: Complete integration with MockAPI.io for realistic data fetching and CRUD operations
- **Shopify FlashList**: Replace FlatList with FlashList for optimized performance, especially with large datasets
- **Enhanced Keyboard Handling**: Implement `react-native-keyboard-controller` for better keyboard management and user experience
- **Transaction Screens**: Complete development of transaction-related screens and functionality
- **Advanced Theming System**: Implement a comprehensive theming solution with custom theme creation, and dynamic theme switching capabilities
- **Error Boundaries**: Add comprehensive error handling and recovery mechanisms
- **Performance Optimization**: Implement code splitting, lazy loading, and other performance best practices
- **Testing Suite**: Add unit tests, integration tests, and E2E testing with Jest and Detox or Maestro

## Resources

- [React Navigation documentation](https://reactnavigation.org/)
- [Expo documentation](https://docs.expo.dev/)

---

Demo assets are from [lucide.dev](https://lucide.dev/)
