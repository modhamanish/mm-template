# MMTemplate - React Native TypeScript Boilerplate

Welcome to **MMTemplate**! This is a robust and modern React Native template built with TypeScript, designed to jumpstart your mobile application development.

## 🚀 Usage

To initialize a new project using this template, run the following command:

```bash
npx @react-native-community/cli@latest init AwesomeProject --template https://github.com/modhamanish/mm-template
```

Replace `AwesomeProject` with your desired project name.

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

### Key Files & Directories

| Directory / File | Path | Description |
| :--- | :--- | :--- |
| **`assets/`** | `src/assets/` | Stores static assets such as images, fonts, and icons. |
| **`components/`** | `src/components/` | Contains reusable UI components used throughout the application (e.g., buttons, input fields). |
| **`context/`** | `src/context/` | Holds React Context definitions for global state management (e.g., ThemeContext, AuthContext). |
| **`navigation/`** | `src/navigation/` | Contains all navigation-related configuration. |
| &nbsp;&nbsp; └ `AppNavigator.tsx` | `src/navigation/AppNavigator.tsx` | The root navigation container. Handles switching between `AuthCheck`, `AuthStack`, and `AppStack`. |
| &nbsp;&nbsp; └ `AppStack.tsx` | `src/navigation/AppStack.tsx` | Main application stack (post-login). Defines screens accessible to authenticated users. |
| &nbsp;&nbsp; └ `AuthCheck.tsx` | `src/navigation/AuthCheck.tsx` | Entry splash screen logic. Determines authentication state and routes accordingly. |
| &nbsp;&nbsp; └ `AuthStack.tsx` | `src/navigation/AuthStack.tsx` | Authentication flow stack. Defines screens like Login and Registration. |
| **`screens/`** | `src/screens/` | Contains all the screen components (pages) of the application. |
| **`theme/`** | `src/theme/` | Centralized theme configuration (e.g., Colors, Typography). |
| **`types/`** | `src/types/` |  Stores TypeScript type definitions and interfaces for the application. |
| **`utils/`** | `src/utils/` | Contains utility functions and helper classes. |

## 📝 Scripts

*   `yarn start`: Starts the Metro Bundler.
*   `yarn android`: Builds and runs the Android app.
*   `yarn ios`: Builds and runs the iOS app.
*   `yarn lint`: Lints the project files.
*   `yarn test`: Runs Jest tests.

---

Made with ❤️ using **MMTemplate**.
