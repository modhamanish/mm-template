import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@context/ThemeContext';
import AppNavigator from '@navigation/AppNavigator';

import Toast, { ToastConfigParams } from 'react-native-toast-message';
import { CustomToast } from '@components/CustomToast';
import { AuthProvider } from '@context/AuthContext';
import '@utils/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <AppNavigator />
            </QueryClientProvider>
          </AuthProvider>
        </ThemeProvider>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </KeyboardProvider>
  );
};

export default App;
