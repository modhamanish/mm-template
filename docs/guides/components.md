---
sidebar_position: 6
title: Design System Components
description: Pre-built production UI components in MMTemplate
---

# 🧩 Design System Components

MMTemplate includes a curated suite of atomic and molecular UI components designed for high responsiveness, accessibility, and clean aesthetics.

---

## 🗂️ Component Catalog

### 1. `AppText`
Theme-aware typography supporting multiple weights, scaling, and international font fallback.

```tsx
<AppText variant="heading" weight="bold">Dashboard</AppText>
<AppText variant="body" color="secondary">Welcome back!</AppText>
```

### 2. `TextInput`
Custom input with focus states, clear button, eye toggle for passwords, and error caption rendering.

```tsx
<TextInput
  label="Email Address"
  placeholder="john@example.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
/>
```

### 3. `AnimationView`
Built on **Reanimated v4** for high-performance layout transitions and entrance springs.

```tsx
<AnimationView animation="fadeInUp" delay={200}>
  <ThemedCard />
</AnimationView>
```

### 4. `Header`
Responsive screen header supporting back button, center title, and right action buttons (e.g. notifications, settings icon).

### 5. Feedback Overlays: `CustomToast` & `CustomAlert`
Modal overlays for success, info, and warning states that look identical on both iOS and Android.

### 6. `ErrorBoundaryFallback`
Protects the app from white screens of death by catching unexpected runtime errors and offering a user-friendly "Try Again" recovery action.
