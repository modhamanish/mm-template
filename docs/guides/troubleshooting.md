---
sidebar_position: 7
title: Troubleshooting & FAQ
description: Common solutions to React Native, Android, and iOS setup issues
---

# 🛠️ Troubleshooting & FAQ

Quick solutions for common developer environment issues.

---

## 🛑 Common Issues & Fixes

### 1. Metro Bundler Cache Issues
**Symptom**: Syntax errors or stale modules after updating files.
```bash
npm start -- --reset-cache
```

### 2. Android Build Failures (`Execution failed for task ':app:mergeDexDebug'`)
**Solution**:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### 3. iOS CocoaPods Issues (`Pods not found` or `Command PhaseScriptExecution failed`)
**Solution**:
```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install --repo-update
cd ..
npm run ios
```

### 4. Watchman Crawl / Socket Errors on macOS
**Solution**:
```bash
watchman watch-del-all
```

---

## 💬 Getting Help

Have a bug or feature request?
- Open an Issue on [GitHub Repository](https://github.com/modhamanish/mm-template/issues)
- Reach out to the maintainer [@modhamanish](https://github.com/modhamanish)
