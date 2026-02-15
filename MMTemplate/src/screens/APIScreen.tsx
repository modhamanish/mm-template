import { StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import FullScreenContainer from '../components/FullScreenContainer';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ThemeType } from '../theme/Colors';

const APIScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <FullScreenContainer style={styles.container} barStyle="light-content">
      <Text>APIScreen</Text>
    </FullScreenContainer>
  );
};

export default APIScreen;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
  });
