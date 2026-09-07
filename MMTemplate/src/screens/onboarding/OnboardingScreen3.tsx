import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { ThemeType } from '@src/theme/colors';
import { navigate, resetAndNavigate } from '@utils/navigationUtils';
import { hexWithOpacity, mobileScreenWidth } from '@utils/utilsHelper';

const OnboardingScreen3: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleBack = () => {
    navigate(Routes.OnboardingScreen2);
  };

  const handleGetStarted = () => {
    // When finished, go to AuthStack or direct AppStack
    resetAndNavigate(Routes.AuthStack);
  };

  return (
    <FullScreenContainer style={styles.container} barStyle="light-content">
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.stepBadge}>
          <AppText variant="bold" size="xsmall" style={styles.stepBadgeText}>
            Step 3 of 3
          </AppText>
        </View>
      </View>

      {/* Hero Rocket Illustration */}
      <View style={styles.heroSection}>
        <AnimationView animType="ZoomIn" duration={800}>
          <View style={styles.rocketCircle}>
            <AppText size={72}>🚀</AppText>
          </View>
        </AnimationView>
      </View>

      {/* Text Info */}
      <View style={styles.contentSection}>
        <AnimationView delay={200} animType="SlideInUp" duration={600}>
          <AppText variant="h1" style={styles.title}>
            You're All Set!
          </AppText>
          <AppText style={styles.subtitle}>
            Everything is configured and ready. Jump right in and start building
            your next awesome mobile app!
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
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <AppText variant="bold" size={16} style={styles.getStartedText}>
            Get Started 🚀
          </AppText>
        </TouchableOpacity>
      </View>
    </FullScreenContainer>
  );
};

export default OnboardingScreen3;

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
    heroSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rocketCircle: {
      width: mobileScreenWidth * 0.55,
      height: mobileScreenWidth * 0.55,
      borderRadius: (mobileScreenWidth * 0.55) / 2,
      backgroundColor: hexWithOpacity(colors.primary, 12),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: hexWithOpacity(colors.primary, 25),
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
    getStartedButton: {
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
    getStartedText: {
      color: colors.white,
    },
  });
