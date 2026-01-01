import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import Toast, { ToastConfigParams } from 'react-native-toast-message';
import { CustomToast } from './src/components/CustomToast';

const toastConfig = {
  error: ({
    text1,
    props,
  }: ToastConfigParams<{
    onPress?: () => void;
  }>) => <CustomToast text1={text1} onPress={props?.onPress} type="error" />,
  success: ({
    text1,
    props,
  }: ToastConfigParams<{
    onPress?: () => void;
  }>) => <CustomToast text1={text1} onPress={props?.onPress} type="success" />,
};
const App = () => {
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </KeyboardProvider>
  );
};

export default App;
