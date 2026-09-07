import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Images } from '@assets/images';
import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { ThemeType } from '@src/theme/colors';
import { navigate, resetAndNavigate } from '@utils/navigationUtils';
import { hexWithOpacity, mobileScreenWidth } from '@utils/utilsHelper';

const OnboardingScreen1: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleNext = () => {
    navigate(Routes.OnboardingScreen2);
  };

  const handleSkip = () => {
    // Navigate to AuthStack if auth enabled, or AppStack
    resetAndNavigate(Routes.AuthStack);
  };

  return (
    <FullScreenContainer style={styles.container}>
      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View style={styles.stepBadge}>
          <AppText variant="bold" size="xsmall" style={styles.stepBadgeText}>
            Step 1 of 3
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

      {/* Hero Illustration */}
      <View style={styles.heroSection}>
        <AnimationView animType="ZoomIn" duration={800}>
          <View style={styles.illustrationWrapper}>
            <Image
              source={
                theme.currentTheme === 'dark' ? Images.logoDark : Images.logo
              }
              style={styles.heroLogo}
              resizeMode="contain"
            />
          </View>
        </AnimationView>
      </View>

      {/* Text Info */}
      <View style={styles.contentSection}>
        <AnimationView delay={200} animType="SlideInUp" duration={600}>
          <AppText variant="h1" style={styles.title}>
            Welcome to MM Template
          </AppText>
          <AppText style={styles.subtitle}>
            A production-ready, high performance React Native boilerplate
            tailored for scale, speed, and great developer experience.
          </AppText>
        </AnimationView>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomSection}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
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

export default OnboardingScreen1;

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
      alignItems: 'center',
      justifyContent: 'center',
    },
    illustrationWrapper: {
      width: mobileScreenWidth * 0.55,
      height: mobileScreenWidth * 0.55,
      borderRadius: (mobileScreenWidth * 0.55) / 2,
      backgroundColor: hexWithOpacity(colors.primary, 10),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: hexWithOpacity(colors.primary, 20),
    },
    heroLogo: {
      width: '60%',
      height: '60%',
    },
    contentSection: {
      paddingVertical: 20,
    },
    title: {
      color: colors.textColor,
      textAlign: 'center',
      marginBottom: 12,
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
      paddingHorizontal: 32,
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
