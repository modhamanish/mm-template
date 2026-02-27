import React, { FC, memo } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FullScreenContainerProps } from '@app-types/components.types';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@theme/Colors';

export const FullScreenContainer: FC<FullScreenContainerProps> = ({
  children,
  style,
  edges = ['top'],
  barStyle,
  statusBarHidden = false,
  keyboardAvoidingViewStyle,
  isKeyboardAvoidingView = false,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const appBarStyle =
    barStyle ??
    (theme.currentTheme === 'dark' ? 'light-content' : 'dark-content');

  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <StatusBar
        animated
        hidden={statusBarHidden}
        translucent
        backgroundColor={'transparent'}
        barStyle={appBarStyle}
      />
      {isKeyboardAvoidingView ? (
        <KeyboardAvoidingView
          enabled={isKeyboardAvoidingView}
          behavior={'padding'}
          style={[styles.keyboardAvoidingViewStyle, keyboardAvoidingViewStyle]}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

export default memo(FullScreenContainer);

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    keyboardAvoidingViewStyle: {
      flex: 1,
    },
  });
