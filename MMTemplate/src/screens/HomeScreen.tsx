import { Image, StyleSheet } from 'react-native';
import React from 'react';
import FullScreenContainer from '../components/FullScreenContainer';
import { Images } from '../assets/images';
import { ThemeType } from '../theme/Colors';
import { mobileScreenHeight, mobileScreenWidth } from '../utils/utilsHelper';
import { useTheme } from '../context/ThemeContext';
import AnimationView from '../components/AnimationView';

const HomeScreen = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <FullScreenContainer
      edges={[]}
      style={styles.container}
      statusBarHidden
      barStyle="light-content"
    >
      <AnimationView animType="FadeIn" duration={1000}>
        <AnimationView animType="ZoomIn" duration={1000}>
          <Image source={Images.logo} style={styles.logo} />
        </AnimationView>
      </AnimationView>
    </FullScreenContainer>
  );
};

export default HomeScreen;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    logo: {
      alignSelf: 'center',
      height: mobileScreenHeight,
      width: mobileScreenWidth * 0.6,
      resizeMode: 'contain',
    },
  });
