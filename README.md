# MMTemplate - React Native TypeScript Boilerplate

Welcome to **MMTemplate**! This is a robust and modern React Native template built with TypeScript, designed to jumpstart your mobile application development.

## 🚀 Usage

To initialize a new project using this template, run the following command:

```bash
npx @react-native-community/cli@latest init AwesomeProject --template @modhamanish/rn-mm-template
```

Replace `AwesomeProject` with your desired project name.

## 🚀 Features

This template includes the following key libraries and configurations:

*   **Core**: React Native (0.83.1), React (19.2.0)
*   **Language**: TypeScript (v5) for static type checking
*   **Navigation**: [React Navigation v7](https://reactnavigation.org/) (Native Stack & Bottom Tabs)
*   **Internationalization**: [react-i18next](https://react.i18next.com/) with multi-language support (English/Hindi)
*   **Storage**: [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) for high-performance persistence
*   **Forms**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for form state management and validation
*   **Animations**: [React Native Reanimated v4](https://docs.swmansion.com/react-native-reanimated/) & Worklets
*   **UI/UX**:
    *   **Theme Support**: Light/Dark mode with persistence
    *   **Authentication**: Pre-configured login and profile flow
    *   [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) for handling safe areas
    *   [React Native Keyboard Controller](https://github.com/kirillzyusko/react-native-keyboard-controller) for advanced keyboard handling
    *   [React Native Toast Message](https://github.com/calintamas/react-native-toast-message) for in-app notifications
*   **Error Handling**: [react-native-error-boundary](https://github.com/cawfree/react-native-error-boundary) for robust error catching
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
| **`components/`** | `src/components/` | Contains reusable UI components used throughout the application (e.g., buttons, input fields). |
| **`context/`** | `src/context/` | Holds React Context definitions for global state management (e.g., ThemeContext, AuthContext). |
| **`locales/`** | `src/locales/` | Contains translation files for internationalization (e.g., `en.json`, `hi.json`). |
| **`mock/`** | `src/mock/` | Stores mock data used for development and testing. |
| **`navigation/`** | `src/navigation/` | Contains all navigation-related configuration. |
| &nbsp;&nbsp; └ `AppNavigator.tsx` | `src/navigation/AppNavigator.tsx` | The root navigation container. Handles switching between `AuthCheck`, `AuthStack`, and `AppStack`. |
| &nbsp;&nbsp; └ `AppStack.tsx` | `src/navigation/AppStack.tsx` | Main application stack (post-login). Defines screens accessible to authenticated users. |
| &nbsp;&nbsp; └ `AuthCheck.tsx` | `src/navigation/AuthCheck.tsx` | Entry splash screen logic. Determines authentication state and routes accordingly. |
| &nbsp;&nbsp; └ `AuthStack.tsx` | `src/navigation/AuthStack.tsx` | Authentication flow stack. Defines screens like Login and Registration. |
| **`screens/`** | `src/screens/` | Contains all the screen components (pages) of the application. |
| **`services/`** | `src/services/` | Data fetching layer using **React Query** and **Axios**. Contains API hooks and instances. |
| **`theme/`** | `src/theme/` | Centralized theme configuration (e.g., Colors, Typography). |
| **`types/`** | `src/types/` |  Stores TypeScript type definitions and interfaces for the application. |
| **`utils/`** | `src/utils/` | Contains utility functions and helper classes. |

## 🔐 Authentication Flow

MMTemplate comes with a pre-configured authentication flow managed via React Context.

### 1. State Management
Authentication state is managed globally using `AuthContext` (`src/context/AuthContext.tsx`). You can access user data and authentication methods anywhere in the app:

```tsx
const { user, updateUser, handleLogout, isUserLoggedIn } = useAuth();
```

### 2. Navigation Logic
- **`AuthCheck`**: The entry point component that checks if a user is already logged in (via `react-native-mmkv` persistence).
- **`AuthStack`**: contains screens for non-authenticated users (Welcome, Login).
- **`AppStack`**: contains the main application screens (Home, Profile, Settings).

Navigation automatically switches between these stacks based on the `user` state in `AuthContext`.

### 3. Mock Credentials
For testing purposes, you can use the following credentials (defined in `src/mock/index.ts`):
- **Email**: `user@gmail.com`
- **Password**: `123456`

### 4. Storage Persistence
User sessions are persisted locally using `react-native-mmkv`, ensuring users stay logged in even after closing the app.

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

## 📝 Scripts

*   `yarn start`: Starts the Metro Bundler.
*   `yarn android`: Builds and runs the Android app.
*   `yarn ios`: Builds and runs the iOS app.
*   `yarn lint`: Lints the project files.
*   `yarn test`: Runs Jest tests.

---

Made with ❤️ using **MMTemplate**.
