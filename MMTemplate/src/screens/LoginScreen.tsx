import React, { FC } from 'react';
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
  const styles = getStyles(theme);

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

  return (
    <FullScreenContainer
      isKeyboardAvoidingView
      style={styles.container}
      barStyle="light-content"
    >
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
            <TouchableOpacity style={styles.forgotPassword}>
              <AppText variant="semiBold" style={styles.forgotPasswordText}>
                {t('auth.forgotPassword')}
              </AppText>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => formik.handleSubmit()}
            >
              <AppText
                variant="bold"
                size="body"
                style={styles.loginButtonText}
              >
                {t('auth.login')}
              </AppText>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <AppText style={styles.signupText}>
                {t('auth.dontHaveAccount')}{' '}
              </AppText>
              <TouchableOpacity>
                <AppText variant="semiBold" style={styles.signupLink}>
                  {t('auth.signUp')}
                </AppText>
              </TouchableOpacity>
            </View>
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
      padding: 20,
      justifyContent: 'center',
    },
    header: {
      marginBottom: 40,
      alignItems: 'center',
    },
    title: {
      color: colors.textColor,
      marginBottom: 8,
    },
    subtitle: {
      color: hexWithOpacity(colors.textColor, 80),
    },
    formContainer: {
      width: '100%',
    },
    hintBanner: {
      backgroundColor: hexWithOpacity(colors.primary, 6),
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: hexWithOpacity(colors.primary, 18),
      marginBottom: 24,
    },
    hintTitle: {
      color: colors.primary,
      marginBottom: 8,
    },
    hintContent: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    hintLabel: {
      color: colors.textColor,
    },
    hintValue: {
      color: hexWithOpacity(colors.textColor, 80),
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: colors.primary,
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    loginButtonText: {
      color: colors.white,
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupText: {
      color: hexWithOpacity(colors.textColor, 80),
    },
    signupLink: {
      color: colors.primary,
    },
  });
