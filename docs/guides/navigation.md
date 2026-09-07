---
sidebar_position: 2
title: Navigation Architecture
description: Typesafe navigation setup with React Navigation 7 in MMTemplate
---

# 🧭 Navigation Architecture

MMTemplate leverages **React Navigation v7** with full **TypeScript support**, enabling zero-runtime-crash route navigation and autocompletion for screen names and route parameters.

---

## 🗺️ Central Route Definitions

All routes are declared in `src/navigation/routes.ts`:

```typescript
export const ROUTES = {
  // Auth
  LOGIN: 'LOGIN',
  AUTH_CHECK: 'AUTH_CHECK',

  // Onboarding
  ONBOARDING_1: 'ONBOARDING_1',
  ONBOARDING_2: 'ONBOARDING_2',
  ONBOARDING_3: 'ONBOARDING_3',

  // Main
  HOME: 'HOME',
  PROFILE: 'PROFILE',
  SETTINGS: 'SETTINGS',
  NOTE: 'NOTE',
  ADD_NOTE: 'ADD_NOTE',

  // Tab & Drawer
  BOTTOM_TAB: 'BOTTOM_TAB',
  DRAWER: 'DRAWER',
} as const;
```

---

## 🔒 Typesafe Navigation Hook

In `src/types/navigation.types.ts`, parameter lists are mapped to route names:

```typescript
export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.NOTE]: { noteId: string };
  [ROUTES.ADD_NOTE]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
};
```

In any screen or component, navigate safely:

```tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ROUTES } from '@navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyComponent = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Button
      title="View Note"
      onPress={() => navigation.navigate(ROUTES.NOTE, { noteId: '123' })}
    />
  );
};
```

---

## 📱 Supported Navigation Flavors

Depending on what you select in the [Interactive Setup Wizard](../getting-started/interactive-wizard), your project comes pre-configured with:

1. **Native Stack Navigator (`src/navigation/stack/AppStack.tsx`)**: Fluid native transitions for iOS and Android.
2. **Bottom Tab Navigator (`src/navigation/tab/BottomTabNavigator.tsx`)**: Bottom bar with icons, notification badges, and active tab highlights.
3. **Drawer Navigator (`src/navigation/drawer/DrawerNavigator.tsx`)**: Gesture-driven side drawer.
