import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';
import StorageHelper from '../utils/storageHelper';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    StorageHelper.saveItem(StorageHelper.STORAGE_KEYS.LANGUAGE, lng);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, i18n.language === 'en' && styles.activeButton]}
        onPress={() => changeLanguage('en')}
      >
        <Text
          style={[
            styles.buttonText,
            i18n.language === 'en' && styles.activeButtonText,
          ]}
        >
          🇬🇧 English
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, i18n.language === 'hi' && styles.activeButton]}
        onPress={() => changeLanguage('hi')}
      >
        <Text
          style={[
            styles.buttonText,
            i18n.language === 'hi' && styles.activeButtonText,
          ]}
        >
          🇮🇳 हिंदी
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSwitcher;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
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
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    activeButtonText: {
      color: colors.white,
    },
  });
