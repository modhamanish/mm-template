---
sidebar_position: 2
title: Interactive Setup Wizard
description: Complete breakdown of the 3-step interactive setup wizard in MMTemplate
---

# 🪄 Interactive Setup Wizard

One of MMTemplate's marquee features is its **Interactive Post-Init Wizard** (`script.js`). 

Instead of forcing you to manually delete unused screens, edit navigation stacks, and prune unused dependencies, MMTemplate automatically customizes your application structure right in your terminal during initialization!

---

## 🖥️ Terminal Wizard Preview

When you run `npx @react-native-community/cli@latest init MyApp --template @modhamanish/rn-mm-template`, the CLI wizard greets you with:

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
```

---

## 📋 The 3 Wizard Steps

### 📱 Step 1: Onboarding Screens
```text
👉 Do you need Onboarding screens? (y/n, default n): 
```
- **`y` (Yes)**: Includes 3 swipeable onboarding screens (`OnboardingScreen1.tsx`, `OnboardingScreen2.tsx`, `OnboardingScreen3.tsx`) with paging indicators, animated skip/next actions, and persistent storage flag.
- **`n` (No - Default)**: Skips onboarding flow entirely, saving code complexity for direct utilities.

---

### 🔐 Step 2: Authentication Setup
```text
  [1] Without Auth (Direct App flow) [Default]
  [2] With Auth (Login, AuthCheck & Protected routes)
👉 Select Auth option (1 or 2, default 1): 
```
- **Option 1 (Without Auth - Default)**: App directly boots into your main screens (Home, Profile, Notes, Settings). Best for offline tools, calculators, calculators, portfolio apps.
- **Option 2 (With Auth)**: Sets up `AuthContext`, `AuthStack`, `LoginScreen`, token persistence in `MMKV / AsyncStorage`, and an intelligent `AuthCheck` screen that checks session validity on launch.

---

### 🧭 Step 3: Navigation Type
```text
  [1] Only Stack Navigation [Default]
  [2] Stack Navigation + Bottom Tab Bar
  [3] Stack Navigation + Drawer Bar
👉 Select Navigation type (1, 2, or 3, default 1): 
```
- **Option 1 (Only Stack Navigation - Default)**: Native Stack navigator with simple, performant push/pop transitions.
- **Option 2 (Stack + Bottom Tab Bar)**: Modern Bottom Tab Navigator with custom vector icons, badge support, and tab bar styling.
- **Option 3 (Stack + Drawer Bar)**: Fluid side-drawer navigation powered by `react-native-gesture-handler` and `react-native-reanimated`.

---

## ⚡ Automated Cleanup Under the Hood

Once you submit your selections, `script.js` automatically:
1. Rewrites `AppNavigator.tsx` to link only the chosen flow.
2. Adjusts `package.json` to keep bundle size minimal.
3. Cleans up unselected navigation folders and screens.
4. Prepares a ready-to-code project!
