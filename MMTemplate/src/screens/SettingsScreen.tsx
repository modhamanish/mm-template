import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';
import FullScreenContainer from '../components/FullScreenContainer';
import AnimationView from '../components/AnimationView';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeSwitcher from '../components/ThemeSwitcher';

const SettingsScreen = () => {
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
            <Text style={styles.title}>{t('settings.settings')}</Text>
            <Text style={styles.subtitle}>
              {t('settings.customizeYourExperience')}
            </Text>
          </View>
        </AnimationView>

        {/* Language Section */}
        <AnimationView delay={200} animType="FadeIn" duration={800}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
            <Text style={styles.sectionDescription}>
              {t('settings.chooseYourPreferredLanguage')}
            </Text>
            <LanguageSwitcher />
          </View>
        </AnimationView>

        {/* Theme Section */}
        <AnimationView delay={400} animType="FadeIn" duration={800}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('settings.theme')}</Text>
            <Text style={styles.sectionDescription}>
              {t('settings.switchBetweenLightAndDark')}
            </Text>
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
      fontSize: 32,
      fontWeight: '700',
      color: colors.textColor,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textColor + 'CC',
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textColor,
      marginBottom: 8,
    },
    sectionDescription: {
      fontSize: 14,
      color: colors.textColor + 'CC',
      marginBottom: 16,
    },
  });
