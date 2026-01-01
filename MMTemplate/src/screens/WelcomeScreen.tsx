import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect } from 'react';
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

  const height = useSharedValue(mobileScreenHeight);
  const width = useSharedValue(mobileScreenWidth * 0.6);
  const opacity = useSharedValue(0);
  const faviconOpacity = useSharedValue(0);

  useEffect(() => {
    height.value = withDelay(
      500,
      withTiming(mobileScreenHeight * 0.3, { duration: 1000 }),
    );
    width.value = withDelay(
      500,
      withTiming(mobileScreenWidth * 0.5, {
        duration: 1000,
        easing: Easing.quad,
        reduceMotion: ReduceMotion.System,
      }),
    );
    opacity.value = withDelay(1000, withTiming(1, { duration: 1000 }));
    faviconOpacity.value = withDelay(
      1000,
      withTiming(0.05, { duration: 1000 }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={Images.logo}
          style={[animatedStyle, styles.logo]}
        />
      </View>

      <Animated.View style={[{ flex: 1, opacity }]}>
        <Text style={styles.titleText}>
          <Text style={styles.titleBoldText}>Welcome</Text> to
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.matchText}>
            <Text style={styles.matchBoldText}>MM Template</Text>
          </Text>
        </View>

        <FullScreenContainer
          barStyle="light-content"
          edges={['bottom']}
          style={styles.fullScreenContainer}
        >
          <TouchableOpacity
            onPress={() => navigate(Routes.LoginScreen)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
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
    },
    logo: {
      resizeMode: 'contain',
      tintColor: colors.white,
      alignSelf: 'center',
    },
    titleText: {
      color: colors.white,
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 30,
    },
    titleBoldText: {
      fontWeight: '700',
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    matchText: {
      color: colors.white,
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 30,
    },
    matchBoldText: {
      fontWeight: '700',
    },
    tmText: {
      color: colors.white,
      fontWeight: '500',
      textAlign: 'center',
      fontSize: 10,
      marginTop: 3,
    },
    fullScreenContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
    },
    termsText: {
      textAlign: 'center',
      color: colors.white,
      fontWeight: '500',
      marginBottom: 25,
    },
    underlineText: {
      textDecorationLine: 'underline',
    },
    button: {
      alignSelf: 'center',
      paddingVertical: 12,
      paddingHorizontal: 35,
      backgroundColor: colors.white,
      borderRadius: 100,
      marginBottom: 15,
    },
    buttonText: {
      color: colors.textColor,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '600',
    },
  });
