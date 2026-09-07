# MMTemplate - React Native TypeScript Boilerplate

[![React Native](https://img.shields.io/badge/React_Native-0.87.1-61dafb.svg?style=flat&logo=react)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React Navigation](https://img.shields.io/badge/React_Navigation-v7-green.svg?style=flat)](https://reactnavigation.org/)
[![Reanimated](https://img.shields.io/badge/Reanimated-v4.6-purple.svg?style=flat)](https://docs.swmansion.com/react-native-reanimated/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-ff4154.svg?style=flat)](https://tanstack.com/query/latest)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Welcome to **MMTemplate**! A production-ready, highly modular React Native boilerplate built with **TypeScript**, designed to jumpstart your mobile application development with industry best practices, modern architecture, and an **Interactive CLI Setup**.

---

## ⚡ Quick Start & Interactive CLI Setup

Initialize a new project using `@react-native-community/cli`:

```bash
npx @react-native-community/cli@latest init MyApp --template @modhamanish/rn-mm-template
```

> Replace `MyApp` with your desired application name.

### 🎮 Interactive Setup Wizard

During project initialization, MMTemplate launches an **interactive CLI wizard** that lets you configure your app's core architecture before generating the code:

```text
                        ███╗   ███╗███╗   ███╗
                        ████╗ ████║████╗ ████║
                        ██╔████╔██║██╔████╔██║
                        ██║╚██╔╝██║██║╚██╔╝██║
                        ██║ ╚═╝ ██║██║ ╚═╝ ██║
                        ╚═╝     ╚═╝╚═╝     ╚═╝

  ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗
  ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
     ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  
     ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  
     ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗
     ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝

⚙️  Configuring your MM Template App...

📱 Step 1: Onboarding Screens:
👉 Do you need Onboarding screens? (y/n, default n): 

🔐 Step 2: Authentication Setup:
  [1] Without Auth (Direct App flow) [Default]
  [2] With Auth (Login, AuthCheck & Protected routes)
👉 Select Auth option (1 or 2, default 1): 

🧭 Step 3: Navigation Type:
  [1] Only Stack Navigation [Default]
  [2] Stack Navigation + Bottom Tab Bar
  [3] Stack Navigation + Drawer Bar
👉 Select Navigation type (1, 2, or 3, default 1): 
```

### 🤖 Non-Interactive / CI Flags

For continuous integration, automated scripts, or fast setups without prompts, pass flags directly:

| Flag | Values | Default | Description |
| :--- | :--- | :--- | :--- |
| `--onboarding` | `y`, `n` | `n` | Include 3-step animated onboarding screens |
| `--auth` | `1`, `2` | `1` | `1` = Without Auth, `2` = With Auth flow |
| `--nav` | `1`, `2`, `3` | `1` | `1` = Stack only, `2` = Stack + Bottom Tabs, `3` = Stack + Drawer |
| `--defaults` | Flag | - | Uses all defaults (`--onboarding=n --auth=1 --nav=1`) |

#### 💡 Direct Command Examples:

* **Full Feature Setup (Onboarding + Auth + Bottom Tabs)**:
  ```bash
  npx @react-native-community/cli@latest init MyApp --template @modhamanish/rn-mm-template --onboarding=y --auth=2 --nav=2
  ```

* **Protected App with Side Drawer (Auth + Drawer Navigation)**:
  ```bash
  npx @react-native-community/cli@latest init MyApp --template @modhamanish/rn-mm-template --onboarding=n --auth=2 --nav=3
  ```

* **Direct App with Bottom Tabs (Without Auth)**:
  ```bash
  npx @react-native-community/cli@latest init MyApp --template @modhamanish/rn-mm-template --onboarding=n --auth=1 --nav=2
  ```

* **Minimal Clean Stack (Fastest / Default setup)**:
  ```bash
  npx @react-native-community/cli@latest init MyApp --template @modhamanish/rn-mm-template --defaults
  ```

### 📦 Automatic Git Initialization
Once configured, MMTemplate **automatically initializes a clean Git repository** and creates an initial commit (`Initial commit from MM Template`). Your project is instantly ready for version control!

---

## 🏗️ Configuration Options & Architecture

MMTemplate adapts its file tree and dependencies to your exact choices:

### 1. 📱 Onboarding Screens
* **Enabled (`y`)**: Includes a 3-step animated onboarding carousel powered by **Reanimated v4** (`OnboardingScreen1`, `OnboardingScreen2`, `OnboardingScreen3`) with dot pagination, "Skip", and "Get Started" buttons. Automatically navigates to Login (if Auth is enabled) or directly into the main app.
* **Disabled (`n`)**: Completely prunes `navigation/onboarding` and `screens/onboarding` for zero unused code.

### 2. 🔐 Authentication Flow
* **With Auth (`2`)**:
  * **`AuthCheck` Splash Screen**: Checks for saved user session in `react-native-mmkv` on app launch.
  * **`LoginScreen`**: Formik + Yup validated login with smooth animations.
  * **`AuthContext`**: Global authentication state (`user`, `isUserLoggedIn`, `updateUser`, `handleLogout`).
  * **Axios Interceptor**: Automatically attaches auth tokens to outgoing HTTP requests.
* **Without Auth (`1`)**:
  * Boots directly into the main application.
  * Strips auth navigators, login screens, and auth check guards.
  * Cleans up `axiosInstance.ts` and `AuthContext.tsx` without leaving dead imports.

### 3. 🧭 Navigation Architecture (React Navigation v7)
* **Only Stack Navigation (`1`)**:
  * Lightweight, fast Native Stack navigation (`HomeScreen`, `NoteScreen`, `ProfileScreen`, `SettingsScreen`, `AddNoteScreen`).
  * Universal `Header` with back navigation on child screens.
  * Automatically removes unused tab/drawer dependencies (`@react-navigation/bottom-tabs`, `@react-navigation/drawer`, `react-native-gesture-handler`).
* **Stack Navigation + Bottom Tab Bar (`2`)**:
  * Bottom tab bar with custom SVG/vector icons for `Home`, `Notes`, `Profile`, and `Settings`.
  * Preserves full native stack navigation for detail screens like `AddNoteScreen`.
* **Stack Navigation + Drawer Bar (`3`)**:
  * Side drawer menu with custom profile header and animated menu items using `react-native-gesture-handler`.
  * Top navigation bar displays a burger icon button to open/toggle the drawer.
  * Automatically configures `react-native-gesture-handler` in `index.js`.

---

## 📂 Project Folder Structure

MMTemplate follows a clean, feature-driven, and modular architecture under `src/`:

```
src/
├── assets/                     # Static media and assets
│   └── images/                 # App icons, logos, light/dark brand assets
├── components/                 # Reusable Design System components
│   ├── AnimationView.tsx       # Reanimated v4 entrance animation wrapper
│   ├── AppText.tsx             # Typography component with dynamic font weights
│   ├── CustomAlert.tsx         # Modal alert dialog
│   ├── CustomToast.tsx         # In-app toast notification config
│   ├── ErrorBoundaryFallback.tsx # App crash fallback UI
│   ├── FeatureItem.tsx         # Showcase list item component
│   ├── FullScreenContainer.tsx # Safe area & keyboard-aware screen wrapper
│   ├── Header.tsx              # Universal header (Back button, Drawer button, Title)
│   ├── InfoCard.tsx            # Info & analytics card component
│   ├── LanguageSwitcher.tsx    # Multi-language selector (EN / HI)
│   ├── TextInput.tsx           # Formik-compatible input with error state
│   └── ThemeSwitcher.tsx       # Dark / Light theme toggle
├── context/                    # Global React Context providers
│   ├── AuthContext.tsx         # Authentication state & MMKV session persistence
│   └── ThemeContext.tsx        # Dynamic theme state & dark mode persistence
├── locales/                    # Internationalization (i18n) dictionaries
│   ├── en.json                 # English translations
│   └── hi.json                 # Hindi translations
├── mock/                       # Mock data for local testing
│   └── index.ts                # Mock login credentials & sample notes
├── navigation/                 # Modular Navigation System (React Navigation v7)
│   ├── auth/                   # [Configurable] AuthCheck & AuthStack (Login)
│   ├── drawer/                 # [Configurable] DrawerNavigator & CustomDrawerContent
│   ├── onboarding/             # [Configurable] 3-step OnboardingStack
│   ├── stack/                  # Main AppStack (Native Stack)
│   ├── tab/                    # [Configurable] BottomTabNavigator
│   ├── AppNavigator.tsx        # Root Navigation Container
│   ├── index.ts                # Navigation barrel exports
│   └── routes.ts               # Strongly-typed Route Enum
├── screens/                    # Modular Screen Views
│   ├── auth/                   # [Configurable] LoginScreen
│   ├── home/                   # HomeScreen (Dashboard & Quick Actions)
│   ├── note/                   # NoteScreen & AddNoteScreen (TanStack Query CRUD)
│   ├── onboarding/             # [Configurable] OnboardingScreen1, 2, 3
│   ├── profile/                # ProfileScreen (User details & navigation links)
│   ├── settings/               # SettingsScreen (Language, Theme, App Info)
│   └── index.ts                # Screens barrel exports
├── services/                   # Networking & Data Layer
│   ├── axiosInstance.ts        # Configured Axios instance with interceptors
│   ├── note.query.ts           # TanStack Query v5 hooks (queries & mutations)
│   └── queryKeys.ts            # Centralized query keys
├── theme/                      # Centralized Theme & Design Tokens
│   ├── colors.ts               # Semantic Light & Dark color palettes
│   └── index.ts                # Typography, spacing, and layout tokens
├── types/                      # Global TypeScript Definitions
│   ├── components.types.ts     # Component props & animation types
│   ├── navigation.types.ts     # Navigation param lists & screen route props
│   └── services.types.ts       # API request & response types
└── utils/                      # Helper Utilities
    ├── i18n.ts                 # i18next configuration
    ├── navigationUtils.ts      # Navigation reference helpers
    ├── storageHelper.ts        # react-native-mmkv type-safe storage wrapper
    ├── utilsHelper.ts          # General helper functions
    └── validationSchemas.ts    # Yup validation schemas (Login, Note)
```

---

## 🛠️ Prerequisites

Ensure your development environment meets the following requirements:

- **Node.js**: `>= 20`
- **Yarn**: `>= 1.22` (or npm)
- **Watchman**: `brew install watchman` (macOS)
- **Android Studio**: Android SDK, Platform-Tools, Emulator
- **Xcode**: `>= 16` (for iOS development, macOS only)
- **Ruby & CocoaPods**: For iOS pod management (`bundle install` / `pod install`)

> For environment setup details, see the [React Native Environment Setup Guide](https://reactnative.dev/docs/set-up-your-environment).

---

## 📦 Installation & Setup

1. **Initialize the template**:
   ```bash
   npx @react-native-community/cli@latest init MyAwesomeApp --template @modhamanish/rn-mm-template
   ```

2. **Navigate into the project**:
   ```bash
   cd MyAwesomeApp
   ```

3. **Install Dependencies**:
   ```bash
   yarn install
   ```

4. **Install iOS Pods** *(macOS only)*:
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

5. **Start Metro Bundler**:
   ```bash
   yarn start
   ```

6. **Run on Device / Emulator**:
   ```bash
   # For Android
   yarn android

   # For iOS (macOS only)
   yarn ios
   ```

---

## 🚀 Key Features & Technologies

### 1. ⚡ TanStack Query (React Query) v5 & Axios
MMTemplate comes pre-configured with **TanStack Query v5** for server-state caching, automatic background refetching, and optimistic updates:
```tsx
import { useGetNotesQuery, useAddNoteMutation } from '@services/note.query';

const { data: notes, isLoading, refetch } = useGetNotesQuery();
const { mutate: addNote, isPending } = useAddNoteMutation();

// Add note
addNote({ title: 'My Note', description: 'Content here' });
```

### 2. 💾 Ultra-Fast MMKV Storage
Local key-value persistence is powered by **`react-native-mmkv`** (v4), providing instant synchronous reads and writes:
```tsx
import { storageHelper } from '@utils/storageHelper';

// Save and retrieve values
storageHelper.set('user_token', 'xyz123');
const token = storageHelper.getString('user_token');
```

### 3. 🌐 Multi-Language Support (i18n)
Built-in internationalization using **`react-i18next`** with English and Hindi pre-configured. Language preferences persist across app restarts using MMKV:
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<AppText>{t('common.welcome')}</AppText>
```

### 4. 🎨 Theme System (Dark & Light Mode)
Centralized semantic color palette with automatic device theme synchronization or manual toggle:
```tsx
import { useTheme } from '@context/ThemeContext';

const { isDark, theme, toggleTheme } = useTheme();
```

### 5. 🔐 Authentication Flow & Mock Credentials
If authentication is enabled during CLI setup:
- **Email**: `user@gmail.com`
- **Password**: `123456`

State is accessible anywhere via the `useAuth` hook:
```tsx
import { useAuth } from '@context/AuthContext';

const { user, isUserLoggedIn, handleLogout } = useAuth();
```

### 6. 🛡️ Error Boundary & Crash Fallback
Wrapped with **`react-native-error-boundary`** to gracefully handle unexpected runtime errors without closing the application.

---

## 📝 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Start Metro** | `yarn start` | Launches Metro bundler with cache reset |
| **Android** | `yarn android` | Builds and runs the app on Android |
| **iOS** | `yarn ios` | Builds and runs the app on iOS |
| **Lint** | `yarn lint` | Runs ESLint static analysis |
| **Lint Fix** | `yarn lint:fix` | Automatically fixes ESLint warnings and errors |
| **Format** | `yarn format` | Formats codebase using Prettier |
| **Test** | `yarn test` | Runs Jest unit and snapshot tests |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [Issues page](https://github.com/modhamanish/mm-template/issues).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ by [Manish Modha](https://github.com/modhamanish)
