# MMTemplate - React Native TypeScript Boilerplate

Welcome to **MMTemplate**! This is a robust and modern React Native template built with TypeScript, designed to jumpstart your mobile application development. It comes pre-configured with essential libraries and best practices to save you setup time.

## 🚀 Features

This template includes the following key libraries and configurations:

*   **Core**: React Native (0.83.1), React (19.2.0)
*   **Language**: TypeScript (v5) for static type checking
*   **Navigation**: [React Navigation v7](https://reactnavigation.org/) (Native Stack)
*   **Animations**: [React Native Reanimated v4](https://docs.swmansion.com/react-native-reanimated/) & Worklets
*   **UI/UX**:
    *   [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) for handling safe areas
    *   [React Native Keyboard Controller](https://github.com/kirillzyusko/react-native-keyboard-controller) for advanced keyboard handling
    *   [React Native Toast Message](https://github.com/calintamas/react-native-toast-message) for in-app notifications
*   **Testing**: Jest & React Test Renderer

## 📂 Project Structure

The project is organized in the `src` directory to keep clean separation of concerns:

```
src/
├── assets/       # Images, fonts, and other static assets
├── components/   # Reusable UI components
├── context/      # React Context definitions (Global State)
├── navigation/   # Navigation configuration (Stacks, Tabs, etc.)
├── screens/      # Screen components (Views)
├── theme/        # Theme configuration (Colors, Typography, Spacing)
├── types/        # Global TypeScript types and interfaces
└── utils/        # Helper functions and utilities
```

## 🛠 Prerequisites

Before you begin, ensure you have the following installed on your machine:

*   [Node.js](https://nodejs.org/) (>= 20)
*   [Watchman](https://facebook.github.io/watchman/)
*   [Ruby](https://www.ruby-lang.org/en/) (for iOS CocoaPods)
*   **Android Studio** (for Android development)
*   **Xcode** (for iOS development, macOS only)

> **Note**: For a detailed environment setup guide, refer to the [official React Native documentation](https://reactnative.dev/docs/set-up-your-environment).

## 📦 Installation

1.  **Install Dependencies**:
    ```bash
    yarn install
    # OR
    npm install
    ```

2.  **Install iOS Pods** (macOS only):
    ```bash
    cd ios
    bundle install # First time only, to install Cocoapods
    bundle exec pod install
    cd ..
    ```

## 🏃‍♂️ Running the App

### Start Metro Bundler
First, start the Metro bundler in a dedicated terminal:
```bash
yarn start
```

### Run on Android
```bash
yarn android
```

### Run on iOS
```bash
yarn ios
```

## 🔧 Customization

### Renaming the App
To rename the application from "MMTemplate" to your own project name, you can use `react-native-rename` or manually rename the files.

**Using `react-native-rename`:**
1.  `npx react-native-rename "YourAppName" -b com.yourcompany.yourappname`
2.  Edit `package.json` to update the name.
3.  Delete `ios/Pods` and `node_modules`.
4.  Re-run installation steps.

## 📝 Scripts

*   `yarn start`: Starts the Metro Bundler.
*   `yarn android`: Builds and runs the Android app.
*   `yarn ios`: Builds and runs the iOS app.
*   `yarn lint`: Lints the project files.
*   `yarn test`: Runs Jest tests.

---

Made with ❤️ using **MMTemplate**.
