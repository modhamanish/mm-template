import { StyleSheet, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@theme/Colors';
import { Images } from '@assets/images';
import { resetAndNavigate } from '@utils/navigationUtils';
import Routes from '@navigation/routes';
import FullScreenContainer from '@components/FullScreenContainer';
import { mobileScreenHeight, mobileScreenWidth } from '@utils/utilsHelper';
import { useAuth } from '@context/AuthContext';

const AuthCheck: FC = () => {
  const theme = useTheme();
  const { isUserLoggedIn } = useAuth();
  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate(isUserLoggedIn() ? Routes.AppStack : Routes.AuthStack);
    }, 1500);
  }, [isUserLoggedIn]);

  return (
    <FullScreenContainer
      edges={[]}
      style={styles.container}
      statusBarHidden
      barStyle="light-content"
    >
      <Image source={Images.logo} style={styles.logo} />
    </FullScreenContainer>
  );
};

export default AuthCheck;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    logo: {
      alignSelf: 'center',
      height: mobileScreenHeight,
      width: mobileScreenWidth * 0.6,
      resizeMode: 'contain',
      tintColor: colors.white,
    },
  });
