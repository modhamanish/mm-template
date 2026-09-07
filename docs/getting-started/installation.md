---
sidebar_position: 1
title: Installation & Setup
description: Step-by-step instructions to install and run an MMTemplate React Native app
---

# 📦 Installation & Setup

Learn how to initialize and run a new React Native project using MMTemplate.

---

## 🛠️ Prerequisites

Before getting started, make sure your development environment is properly configured according to the official [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide:

- **Node.js**: >= 18 (Recommended: v20 LTS or v22 LTS)
- **Package Manager**: npm, yarn, or bun
- **Android Development**:
  - Android Studio with Android SDK (API 34 or 35)
  - JDK 17 (Azul Zulu or OpenJDK 17)
  - `ANDROID_HOME` configured in your shell (`~/.zshrc` or `~/.bashrc`)
- **iOS Development** (macOS only):
  - Xcode >= 15
  - CocoaPods: `sudo gem install cocoapods`

---

## 🚀 Initialize Project

Run the official React Native CLI initialization command specifying the MMTemplate template:

```bash
npx @react-native-community/cli@latest init MyApp --template @modhamanish/rn-mm-template
```

During initialization, the **Interactive CLI Wizard** will guide you through configuring Onboarding, Auth, and Navigation flavors. See the [Interactive Setup Wizard](./interactive-wizard) guide for detailed options.

---

## 📱 Running the Project

Navigate into your freshly created project directory:

```bash
cd MyApp
```

### 🤖 For Android

```bash
# Start the Metro bundler
npm start

# In a separate terminal, launch Android
npm run android
```

### 🍎 For iOS (macOS only)

Ensure CocoaPods dependencies are installed:

```bash
cd ios && pod install && cd ..
```

Then run:

```bash
# Start the Metro bundler
npm start

# In a separate terminal, launch iOS simulator
npm run ios
```

---

## 🧹 Quick Troubleshooting Commands

If you ever encounter caching issues or clean builds are needed:

```bash
# Clear Metro Cache
npm start -- --reset-cache

# Clean Android Build
cd android && ./gradlew clean && cd ..

# Clean iOS Build
cd ios && rm -rf build Pods Podfile.lock && pod install && cd ..
```
