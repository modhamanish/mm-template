import React, { FC, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import TextInput from '@components/TextInput';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import { userMockData } from '@mock';
import Routes from '@navigation/routes';
import { ThemeType } from '@src/theme/colors';
import { resetAndNavigate } from '@utils/navigationUtils';
import { hexWithOpacity } from '@utils/utilsHelper';
import { LoginSchema } from '@utils/validationSchemas';

const LoginScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { updateUser } = useAuth();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      if (
        values.email === userMockData.email &&
        values.password === userMockData.password
      ) {
        Toast.show({
          type: 'success',
          text1: t('auth.loginSuccessful'),
        });
        updateUser(userMockData);
        resetAndNavigate(Routes.AppStack);
      } else {
        Toast.show({
          type: 'error',
          text1: t('auth.invalidCredentials'),
        });
      }
    },
  });

  const handleForgotPassword = () => {
    Toast.show({
      type: 'info',
      text1: t('auth.forgotPassword'),
      text2: `Use mock password: ${userMockData.password}`,
    });
  };

  return (
    <FullScreenContainer isKeyboardAvoidingView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AnimationView animType="FadeIn" duration={800}>
          <View style={styles.header}>
            <AppText variant="h1" style={styles.title}>
              {t('auth.welcomeBack')}
            </AppText>
            <AppText size="body" style={styles.subtitle}>
              {t('auth.signInToContinue')}
            </AppText>
          </View>
        </AnimationView>

        <AnimationView delay={200} animType="FadeIn" duration={800}>
          <View style={styles.formContainer}>
            {/* Hint Banner */}
            <View style={styles.hintBanner}>
              <AppText variant="bold" style={styles.hintTitle}>
                {t('auth.mockCredentialsHint')}
              </AppText>
              <View style={styles.hintContent}>
                <AppText variant="semiBold" size={13} style={styles.hintLabel}>
                  {t('auth.email')}:{' '}
                </AppText>
                <AppText size={13} style={styles.hintValue}>
                  {userMockData.email}
                </AppText>
              </View>
              <View style={styles.hintContent}>
                <AppText variant="semiBold" size={13} style={styles.hintLabel}>
                  {t('auth.password')}:{' '}
                </AppText>
                <AppText size={13} style={styles.hintValue}>
                  {userMockData.password}
                </AppText>
              </View>
            </View>

            {/* Email Input */}
            <TextInput
              label={t('auth.email')}
              placeholder={t('auth.enterEmail')}
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              error={formik.errors.email}
              touched={formik.touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Password Input */}
            <TextInput
              label={t('auth.password')}
              placeholder={t('auth.enterPassword')}
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              error={formik.errors.password}
              touched={formik.touched.password}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
              activeOpacity={0.7}
            >
              <AppText variant="semiBold" style={styles.forgotPasswordText}>
                {t('auth.forgotPassword')}
              </AppText>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => formik.handleSubmit()}
              activeOpacity={0.8}
            >
              <AppText variant="bold" size={16} style={styles.loginButtonText}>
                {t('auth.login')}
              </AppText>
            </TouchableOpacity>
          </View>
        </AnimationView>
      </ScrollView>
    </FullScreenContainer>
  );
};

export default LoginScreen;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
      paddingBottom: 24,
      justifyContent: 'center',
    },
    header: {
      marginBottom: 32,
    },
    title: {
      color: colors.textColor,
      marginBottom: 8,
    },
    subtitle: {
      color: hexWithOpacity(colors.textColor, 70),
    },
    formContainer: {
      width: '100%',
    },
    hintBanner: {
      backgroundColor: hexWithOpacity(colors.primary, 10),
      borderRadius: 12,
      padding: 14,
      marginBottom: 20,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    hintTitle: {
      color: colors.primary,
      fontSize: 13,
      marginBottom: 6,
    },
    hintContent: {
      flexDirection: 'row',
      marginTop: 2,
    },
    hintLabel: {
      color: hexWithOpacity(colors.textColor, 80),
    },
    hintValue: {
      color: hexWithOpacity(colors.textColor, 90),
      fontWeight: '600',
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 8,
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: colors.primary,
      fontSize: 14,
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    loginButtonText: {
      color: colors.white,
    },
  });
