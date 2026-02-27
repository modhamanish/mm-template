import React, { useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import { useTranslation } from 'react-i18next';

import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@src/theme/colors';
import { hexWithOpacity } from '@utils/utilsHelper';

interface Props {
  error: Error;
  resetError: () => void;
}

const ErrorBoundaryFallback = (props: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <FullScreenContainer style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <AppText style={styles.icon}>⚠️</AppText>
        </View>

        <AppText variant="h1" style={styles.title}>
          {t('common.errorOccurred')}
        </AppText>

        <AppText variant="regular" style={styles.subtitle}>
          {t('common.errorDescription')}
        </AppText>

        <View style={styles.errorBox}>
          <ScrollView bounces={false}>
            <AppText
              size="small"
              color={colors.primary}
              style={styles.errorText}
            >
              {props.error.toString()}
            </AppText>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={props.resetError}
          activeOpacity={0.8}
        >
          <AppText variant="semiBold" color={colors.white}>
            {t('common.tryAgain')}
          </AppText>
        </TouchableOpacity>
      </View>
    </FullScreenContainer>
  );
};

export const getStyles = (theme: ThemeType) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    content: {
      alignItems: 'center',
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
      backgroundColor: hexWithOpacity(colors.primary, 15),
    },
    icon: {
      fontSize: 40,
    },
    title: {
      textAlign: 'center',
      marginBottom: 12,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 22,
      color: hexWithOpacity(colors.textColor, 80),
    },
    errorBox: {
      width: '100%',
      maxHeight: 200,
      borderRadius: 12,
      borderWidth: 1,
      padding: 16,
      marginBottom: 32,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
    },
    errorText: {
      lineHeight: 18,
      fontFamily: 'monospace',
    },
    button: {
      width: '100%',
      height: 56,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      backgroundColor: colors.primary,
    },
  });
};

export default ErrorBoundaryFallback;
