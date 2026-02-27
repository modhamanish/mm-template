import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { ToastConfigParams } from 'react-native-toast-message';

import { CustomToast } from '@components/CustomToast';
import ErrorBoundaryFallback from '@components/ErrorBoundaryFallback';
import { AuthProvider } from '@context/AuthContext';
import { ThemeProvider } from '@context/ThemeContext';
import AppNavigator from '@navigation/AppNavigator';
import CustomAlert from '@src/components/CustomAlert';
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
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <AppNavigator />
                <CustomAlert />
                <Toast config={toastConfig} />
              </QueryClientProvider>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </ErrorBoundary>
  );
};

export default App;
