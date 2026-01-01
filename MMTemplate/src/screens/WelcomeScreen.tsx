import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContextType, useTheme } from '../context/ThemeContext';
import { Images } from '../assets/images';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';
import { mobileScreenHeight, mobileScreenWidth } from '../utils/utilsHelper';
import FullScreenContainer from '../components/FullScreenContainer';
import { navigate } from '../utils/navigationUtils';
import Routes from '../navigation/routes';

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
  }, []);

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
        <Text style={styles.titleText}>
          <Text style={styles.titleBoldText}>{t('welcome.titleBold')}</Text>
          {t('welcome.titleText')}
        </Text>
        <Text style={styles.matchBoldText}>{t('welcome.appName')}</Text>

        <Animated.View style={[styles.infoContainer, animatedContentStyle]}>
          <Text style={styles.subtitleText}>{t('welcome.subtitle')}</Text>
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
            <Text style={styles.githubButtonText}>
              📦 {t('welcome.githubButton')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate(Routes.LoginScreen)}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{t('welcome.loginButton')}</Text>
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
      fontWeight: '700',
    },
    matchBoldText: {
      color: colors.white,
      fontWeight: '800',
      textAlign: 'center',
      fontSize: 36,
      marginTop: 4,
    },
    infoContainer: {
      marginTop: 20,
      width: '100%',
    },
    subtitleText: {
      color: colors.white + 'CC',
      fontSize: 16,
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
      fontSize: 15,
      fontWeight: '600',
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
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '700',
    },
  });
