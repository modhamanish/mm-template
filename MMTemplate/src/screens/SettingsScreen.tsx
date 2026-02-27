import React, { FC } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AppText from '@components/AppText';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@theme/Colors';
import FullScreenContainer from '@components/FullScreenContainer';
import AnimationView from '@components/AnimationView';
import LanguageSwitcher from '@components/LanguageSwitcher';
import ThemeSwitcher from '@components/ThemeSwitcher';

const SettingsScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <FullScreenContainer style={styles.container} barStyle="light-content">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AnimationView animType="FadeIn" duration={800}>
          <View style={styles.header}>
            <AppText variant="h1" style={styles.title}>
              {t('settings.settings')}
            </AppText>
            <AppText size="body" style={styles.subtitle}>
              {t('settings.customizeYourExperience')}
            </AppText>
          </View>
        </AnimationView>

        {/* Language Section */}
        <AnimationView delay={200} animType="FadeIn" duration={800}>
          <View style={styles.section}>
            <AppText variant="semiBold" size={18} style={styles.sectionTitle}>
              {t('settings.language')}
            </AppText>
            <AppText style={styles.sectionDescription}>
              {t('settings.chooseYourPreferredLanguage')}
            </AppText>
            <LanguageSwitcher />
          </View>
        </AnimationView>

        {/* Theme Section */}
        <AnimationView delay={400} animType="FadeIn" duration={800}>
          <View style={styles.section}>
            <AppText variant="semiBold" size={18} style={styles.sectionTitle}>
              {t('settings.theme')}
            </AppText>
            <AppText style={styles.sectionDescription}>
              {t('settings.switchBetweenLightAndDark')}
            </AppText>
            <ThemeSwitcher />
          </View>
        </AnimationView>
      </ScrollView>
    </FullScreenContainer>
  );
};

export default SettingsScreen;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 60,
    },
    header: {
      marginBottom: 32,
    },
    title: {
      color: colors.textColor,
      marginBottom: 8,
    },
    subtitle: {
      color: colors.textColor + 'CC',
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      color: colors.textColor,
      marginBottom: 8,
    },
    sectionDescription: {
      color: colors.textColor + 'CC',
      marginBottom: 16,
    },
  });
