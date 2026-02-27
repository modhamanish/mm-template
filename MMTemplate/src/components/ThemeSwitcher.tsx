import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '@components/AppText';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@theme/Colors';

const ThemeSwitcher = () => {
  const { colors, currentTheme, toggleTheme } = useTheme();
  const styles = getStyles({ colors });

  const isDark = currentTheme === 'dark';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !isDark && styles.activeButton]}
        onPress={() => !isDark || toggleTheme()}
      >
        <AppText
          variant="semiBold"
          style={[styles.buttonText, !isDark && styles.activeButtonText]}
        >
          ☀️ Light
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, isDark && styles.activeButton]}
        onPress={() => isDark || toggleTheme()}
      >
        <AppText
          variant="semiBold"
          style={[styles.buttonText, isDark && styles.activeButtonText]}
        >
          🌙 Dark
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeSwitcher;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
    activeButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: colors.primary,
    },
    activeButtonText: {
      color: colors.white,
    },
  });
