import { StyleSheet, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';
import { Images } from '../assets/images';
import { resetAndNavigate } from '../utils/NavigationUtils';
import Routes from './routes';
import FullScreenContainer from '../components/FullScreenContainer';
import { mobileScreenHeight, mobileScreenWidth } from '../utils/utilsHelper';

const AuthCheck: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate(Routes.AuthStack);
    }, 1500);
  }, []);

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
