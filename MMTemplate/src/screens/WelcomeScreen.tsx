import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Linking } from 'react-native';

import { useTranslation } from 'react-i18next';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';

import { Images } from '@assets/images';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import { ThemeContextType, useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { navigate } from '@utils/navigationUtils';
import { mobileScreenHeight, mobileScreenWidth } from '@utils/utilsHelper';

const WelcomeScreen: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const height = useSharedValue(mobileScreenHeight);
  const width = useSharedValue(mobileScreenWidth * 0.6);
  const opacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    height.value = withDelay(
      500,
      withTiming(mobileScreenHeight * 0.25, { duration: 1000 }),
    );
    width.value = withDelay(
      500,
      withTiming(mobileScreenWidth * 0.45, {
        duration: 1000,
        easing: Easing.quad,
        reduceMotion: ReduceMotion.System,
      }),
    );
    opacity.value = withDelay(1000, withTiming(1, { duration: 1000 }));
    contentOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));
  }, [height, width, opacity, contentOpacity]);

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
    };
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [
        {
          translateY: withTiming(contentOpacity.value === 1 ? 0 : 20, {
            duration: 800,
          }),
        },
      ],
    };
  });

  const openGitHub = () => {
    Linking.openURL('https://github.com/modhamanish/mm-template');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={Images.logo}
          style={[animatedLogoStyle, styles.logo]}
        />
      </View>

      <Animated.View style={[styles.contentContainer, { opacity }]}>
        <AppText style={styles.titleText}>
          <AppText variant="bold" size="xxlarge" style={styles.titleBoldText}>
            {t('welcome.titleBold')}
          </AppText>
          {t('welcome.titleText')}
        </AppText>
        <AppText variant="h1" size={36} style={styles.matchBoldText}>
          {t('welcome.appName')}
        </AppText>

        <Animated.View style={[styles.infoContainer, animatedContentStyle]}>
          <AppText variant="body1" style={styles.subtitleText}>
            {t('welcome.subtitle')}
          </AppText>
        </Animated.View>

        <FullScreenContainer
          barStyle="light-content"
          edges={['bottom']}
          style={styles.fullScreenContainer}
        >
          <TouchableOpacity
            onPress={openGitHub}
            style={styles.githubButton}
            activeOpacity={0.8}
          >
            <AppText
              variant="semiBold"
              size={15}
              style={styles.githubButtonText}
            >
              📦 {t('welcome.githubButton')}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate(Routes.LoginScreen)}
            style={styles.button}
            activeOpacity={0.8}
          >
            <AppText variant="bold" size={18} style={styles.buttonText}>
              {t('welcome.loginButton')}
            </AppText>
          </TouchableOpacity>
        </FullScreenContainer>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;

const getStyles = ({ colors }: ThemeContextType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    imageContainer: {
      alignSelf: 'center',
      marginTop: mobileScreenHeight * 0.05,
    },
    logo: {
      resizeMode: 'contain',
      tintColor: colors.white,
      alignSelf: 'center',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    titleText: {
      color: colors.white,
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 32,
    },
    titleBoldText: {
      color: colors.white,
    },
    matchBoldText: {
      color: colors.white,
      textAlign: 'center',
      marginTop: 4,
    },
    infoContainer: {
      marginTop: 20,
      width: '100%',
    },
    subtitleText: {
      color: colors.white + 'CC',
      textAlign: 'center',
      lineHeight: 24,
    },
    fullScreenContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
      paddingBottom: 40,
    },
    githubButton: {
      alignSelf: 'center',
      paddingVertical: 12,
      paddingHorizontal: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      width: '100%',
      alignItems: 'center',
    },
    githubButtonText: {
      color: colors.white,
    },
    button: {
      alignSelf: 'center',
      paddingVertical: 16,
      paddingHorizontal: 35,
      backgroundColor: colors.backgroundColor,
      borderRadius: 16,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    buttonText: {
      color: colors.textColor,
      textAlign: 'center',
    },
  });
