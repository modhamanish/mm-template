---
sidebar_position: 4
title: Theme & Dark Mode
description: Unified light/dark theme system in MMTemplate
---

# 🎨 Theme & Dark Mode

MMTemplate includes an extensible **Theme Context** supporting both system preference synchronization and manual Light/Dark overrides.

---

## 🌓 Using Theme in Components

Access the current theme colors and toggle functions through the custom hook:

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { AppText } from '../components/AppText';

export const ThemedCard = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
      <AppText style={{ color: colors.textPrimary }}>
        Current Theme: {isDark ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
  },
});
```

---

## 🎨 Color Palette Tokens

Theme tokens are defined in `src/theme/colors.ts`:

- `primary`: Main brand accent color.
- `background`: Canvas background.
- `cardBackground`: Elevated card and surface elements.
- `textPrimary`: High-emphasis body and heading text.
- `textSecondary`: Medium-emphasis labels and subtext.
- `border`: Separators and outline strokes.
- `error`: Error and destructive actions.
- `success`: Success toasts and indicators.

Easily tweak token values to match your company's branding!
