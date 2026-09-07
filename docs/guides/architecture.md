---
sidebar_position: 1
title: Directory Structure & Architecture
description: Overview of the codebase structure and clean architecture in MMTemplate
---

# 🏗️ Architecture & Directory Structure

MMTemplate follows a **modular, feature-based and layered clean architecture**. Every folder inside `src/` has a distinct responsibility, keeping the codebase organized even as the application scales to hundreds of screens.

---

## 📂 Root Project Structure

```text
MyApp/
├── android/               # Native Android project (Gradle, Kotlin)
├── ios/                   # Native iOS project (CocoaPods, Swift/Obj-C)
├── src/                   # Main React Native TypeScript source code
│   ├── assets/            # Static assets (images, icons, fonts)
│   ├── components/        # Reusable design system UI components
│   ├── context/           # React Context providers (Auth, Theme)
│   ├── locales/           # i18n JSON translation dictionaries
│   ├── mock/              # Mock API fixtures for rapid local prototyping
│   ├── navigation/        # Stack, Tab, and Drawer navigators
│   ├── screens/           # Feature screens (Auth, Home, Profile, Notes)
│   ├── services/          # TanStack Query hooks, Axios instance, query keys
│   ├── theme/             # Color palettes, typography, theme tokens
│   ├── types/             # Centralized TypeScript definitions & navigation types
│   └── utils/             # Helper functions, validation schemas, storage
├── App.tsx                # Root component (Providers wrapper)
├── index.js               # React Native entry point
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript compiler configuration
```

---

## 🔍 Deep Dive into `src/`

### 1. `src/components/`
Contains production-grade, atomic UI components:
- `AppText.tsx`: Typography component with auto-scaling and theme-aware styling.
- `TextInput.tsx`: Reusable text field with validation error display and icons.
- `Header.tsx`: Navigation header with back button, titles, and right actions.
- `AnimationView.tsx`: Wrapper for fluid Reanimated spring/fade micro-interactions.
- `CustomToast.tsx` & `CustomAlert.tsx`: User feedback overlays.
- `ErrorBoundaryFallback.tsx`: Graceful crash handler with retry button.

### 2. `src/navigation/`
Organized into modular sub-stacks:
- `routes.ts`: Central string enum for all route names (avoids hardcoded strings!).
- `AppNavigator.tsx`: Root coordinator controlling Onboarding -> Auth -> Main Stack.
- `stack/AppStack.tsx`: Native stack containing standard application screens.
- `tab/BottomTabNavigator.tsx`: Bottom tabs configuration with badges.
- `drawer/DrawerNavigator.tsx`: Side drawer configuration.

### 3. `src/services/`
Powered by **Axios** and **TanStack Query (React Query v5)**:
- `axiosInstance.ts`: Pre-configured HTTP client with base URL, timeouts, and auth bearer token request/response interceptors.
- `queryKeys.ts`: Consistent query key factories for seamless cache invalidation.
- `note.query.ts`: Example CRUD query hooks (`useNotes`, `useAddNote`, `useDeleteNote`).

### 4. `src/theme/`
- `colors.ts`: Palettes for Light mode and Dark mode.
- `index.ts`: Unified theme export with helper functions.
- `ThemeContext.tsx`: Context provider handling system theme sync and manual toggle.
