---
sidebar_position: 5
title: Localization & i18n
description: Internationalization with English and Hindi support in MMTemplate
---

# 🌐 Localization & i18n

MMTemplate provides multilingual capability with **i18next** and `react-i18next`.

---

## 📁 Translation Files

Language dictionaries are placed in `src/locales/`:
- `en.json`: English strings
- `hi.json`: Hindi strings

Example `en.json`:
```json
{
  "common": {
    "welcome": "Welcome to MMTemplate",
    "save": "Save",
    "cancel": "Cancel"
  },
  "auth": {
    "login": "Sign In",
    "logout": "Log Out"
  }
}
```

---

## 🗣️ Using Translations in Components

Use the standard `useTranslation` hook:

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppText } from '../components/AppText';

export const Greeting = () => {
  const { t, i18n } = useTranslation();

  return (
    <AppText>{t('common.welcome')}</AppText>
  );
};
```

---

## 🔄 Dynamic Language Switcher

MMTemplate includes a ready-to-use `LanguageSwitcher` component (`src/components/LanguageSwitcher.tsx`) that changes the application language at runtime without needing an app restart.
