import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useFormik } from 'formik';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';
import FullScreenContainer from '../components/FullScreenContainer';
import TextInput from '../components/TextInput';
import AnimationView from '../components/AnimationView';
import { resetAndNavigate } from '../utils/navigationUtils';
import Routes from '../navigation/routes';
import { LoginSchema } from '../utils/validationSchemas';
import { userMockData } from '../mock';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
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
          text1: 'Login successful',
        });
        updateUser(userMockData);
        resetAndNavigate(Routes.AppStack);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid credentials',
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
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>
        </AnimationView>

        <AnimationView delay={200} animType="FadeIn" duration={800}>
          <View style={styles.formContainer}>
            {/* Email Input */}
            <TextInput
              label="Email"
              placeholder="Enter your email"
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
              label="Password"
              placeholder="Enter your password"
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
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => formik.handleSubmit()}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
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
      fontSize: 32,
      fontWeight: '700',
      color: colors.textColor,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textColor + 'CC',
    },
    formContainer: {
      width: '100%',
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
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
      fontSize: 16,
      fontWeight: '700',
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupText: {
      color: colors.textColor + 'CC',
      fontSize: 14,
    },
    signupLink: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
  });
