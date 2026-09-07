import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { useTranslation } from 'react-i18next';

import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { ThemeType } from '@src/theme/colors';
import { navigate, resetAndNavigate } from '@utils/navigationUtils';
import { hexWithOpacity } from '@utils/utilsHelper';

const OnboardingScreen2: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleNext = () => {
    navigate(Routes.OnboardingScreen3);
  };

  const handleBack = () => {
    navigate(Routes.OnboardingScreen1);
  };

  const handleSkip = () => {
    resetAndNavigate(Routes.AuthStack);
  };

  return (
    <FullScreenContainer style={styles.container} barStyle="light-content">
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.stepBadge}>
          <AppText variant="bold" size="xsmall" style={styles.stepBadgeText}>
            Step 2 of 3
          </AppText>
        </View>
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.7}
          style={styles.skipButton}
        >
          <AppText variant="semiBold" size="small" style={styles.skipText}>
            {t('common.skip', 'Skip')}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Feature Grid / Cards */}
      <View style={styles.heroSection}>
        <AnimationView animType="FadeIn" duration={700}>
          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <AppText size={32}>⚡</AppText>
              <AppText variant="bold" size={15} style={styles.cardTitle}>
                MMKV Storage
              </AppText>
              <AppText size="xsmall" style={styles.cardDesc}>
                Ultra-fast synchronous key-value storage.
              </AppText>
            </View>

            <View style={styles.featureCard}>
              <AppText size={32}>🌐</AppText>
              <AppText variant="bold" size={15} style={styles.cardTitle}>
                i18n Ready
              </AppText>
              <AppText size="xsmall" style={styles.cardDesc}>
                Multi-language support built-in with react-i18next.
              </AppText>
            </View>

            <View style={styles.featureCard}>
              <AppText size={32}>🎨</AppText>
              <AppText variant="bold" size={15} style={styles.cardTitle}>
                Dynamic Theme
              </AppText>
              <AppText size="xsmall" style={styles.cardDesc}>
                Dark & Light modes with instant switcher.
              </AppText>
            </View>

            <View style={styles.featureCard}>
              <AppText size={32}>🔄</AppText>
              <AppText variant="bold" size={15} style={styles.cardTitle}>
                React Query
              </AppText>
              <AppText size="xsmall" style={styles.cardDesc}>
                Server state caching & auto re-fetching.
              </AppText>
            </View>
          </View>
        </AnimationView>
      </View>

      {/* Text Info */}
      <View style={styles.contentSection}>
        <AnimationView delay={200} animType="SlideInUp" duration={600}>
          <AppText variant="h1" style={styles.title}>
            Production-Ready Stack
          </AppText>
          <AppText style={styles.subtitle}>
            Battle-tested libraries pre-wired so you don't spend days setting up
            boilerplate configurations.
          </AppText>
        </AnimationView>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <AppText variant="semiBold" size={15} style={styles.backButtonText}>
            ← Back
          </AppText>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <AppText variant="bold" size={16} style={styles.nextButtonText}>
            Next →
          </AppText>
        </TouchableOpacity>
      </View>
    </FullScreenContainer>
  );
};

export default OnboardingScreen2;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
    },
    stepBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: hexWithOpacity(colors.primary, 15),
    },
    stepBadgeText: {
      color: colors.primary,
    },
    skipButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    skipText: {
      color: hexWithOpacity(colors.textColor, 60),
    },
    heroSection: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 12,
    },
    featureGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 12,
    },
    featureCard: {
      width: '48%',
      padding: 16,
      borderRadius: 16,
      backgroundColor: hexWithOpacity(colors.textColor, 4),
      borderWidth: 1,
      borderColor: hexWithOpacity(colors.textColor, 8),
    },
    cardTitle: {
      color: colors.textColor,
      marginTop: 8,
      marginBottom: 4,
    },
    cardDesc: {
      color: hexWithOpacity(colors.textColor, 60),
      lineHeight: 16,
    },
    contentSection: {
      paddingVertical: 16,
    },
    title: {
      color: colors.textColor,
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      color: hexWithOpacity(colors.textColor, 70),
      textAlign: 'center',
      lineHeight: 22,
      paddingHorizontal: 8,
    },
    bottomSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 12,
    },
    backButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    backButtonText: {
      color: hexWithOpacity(colors.textColor, 70),
    },
    dotsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: hexWithOpacity(colors.textColor, 20),
      marginRight: 6,
    },
    activeDot: {
      width: 24,
      backgroundColor: colors.primary,
    },
    nextButton: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 14,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    nextButtonText: {
      color: colors.white,
    },
  });
