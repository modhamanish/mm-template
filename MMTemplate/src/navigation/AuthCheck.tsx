import React, { FC, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';

import { Images } from '@assets/images';
import FullScreenContainer from '@components/FullScreenContainer';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { ThemeType } from '@src/theme/colors';
import { resetAndNavigate } from '@utils/navigationUtils';
import { mobileScreenHeight, mobileScreenWidth } from '@utils/utilsHelper';

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
