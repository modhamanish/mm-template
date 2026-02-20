# MMTemplate - React Native TypeScript Boilerplate

Welcome to **MMTemplate**! This is a robust and modern React Native template built with TypeScript, designed to jumpstart your mobile application development. It comes pre-configured with essential libraries and best practices to save you setup time.

## 🚀 Features

This template includes the following key libraries and configurations:

*   **Core**: React Native (0.83.1), React (19.2.0)
*   **Language**: TypeScript (v5) for static type checking
*   **Navigation**: [React Navigation v7](https://reactnavigation.org/) (Native Stack)
*   **Internationalization**: [react-i18next](https://react.i18next.com/) with multi-language support (English/Hindi)
*   **Storage**: [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) for high-performance persistence
*   **Animations**: [React Native Reanimated v4](https://docs.swmansion.com/react-native-reanimated/) & Worklets
*   **UI/UX**:
    *   **Theme Support**: Light/Dark mode with persistence
    *   **Authentication**: Pre-configured login and profile flow
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
├── locales/      # Translation files (i18n)
├── mock/         # Mock data for testing and development
├── navigation/   # Navigation configuration (Stacks, Stacks, etc.)
├── screens/      # Screen components (Views)
├── services/     # Data fetching and API services (React Query)
├── theme/        # Theme configuration (Colors, Typography, Spacing)
├── types/        # Global TypeScript types and interfaces
└── utils/        # Helper functions and utilities
```

### Key Files & Directories

| Directory / File | Path | Description |
| :--- | :--- | :--- |
| **`assets/`** | `src/assets/` | Stores static assets such as images, fonts, and icons. |
| **`components/`** | `src/components/` | Contains reusable UI components used throughout the application. |
| **`context/`** | `src/context/` | Holds React Context definitions for global state management. |
| **`locales/`** | `src/locales/` | Contains translation files for internationalization. |
| **`mock/`** | `src/mock/` | Stores mock data used for development and testing. |
| **`navigation/`** | `src/navigation/` | Contains all navigation-related configuration. |
| **`screens/`** | `src/screens/` | Contains all the screen components (pages) of the application. |
| **`services/`** | `src/services/` | Data fetching layer using **React Query** and **Axios**. |
| **`theme/`** | `src/theme/` | Centralized theme configuration (e.g., Colors, Typography). |
| **`types/`** | `src/types/` | Stores TypeScript type definitions and interfaces. |
| **`utils/`** | `src/utils/` | Contains utility functions and helper classes. |

Navigation automatically switches between these stacks based on the `user` state in `AuthContext`.

---

## 🚀 Data Fetching (React Query)

MMTemplate uses **TanStack Query (React Query) v5** for server state management and **Axios** for API requests.

### 1. Services Structure
- **`axiosInstance.ts`**: Configured Axios instance with base URL and interceptors.
- **`queryKeys.ts`**: Centralized keys for consistency and easy invalidation.
- **`*.query.ts`**: Feature-specific hooks for fetching and mutating data.

### 2. Usage Example
To fetch data, use a query hook defined in `src/services`:

```tsx
import { useGetNotesQuery } from '../services/note.query';

const { data, isLoading, error } = useGetNotesQuery();
```

To update data, use a mutation hook:

```tsx
import { useAddNoteMutation } from '../services/note.query';

const { mutate, isPending } = useAddNoteMutation();
const handleSave = () => mutate({ title: 'New Note', content: '...' });
```

### 3. Global Configuration
The `QueryClient` is pre-configured in `App.tsx` with optimized defaults (e.g., `refetchOnWindowFocus: false`).

---

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
