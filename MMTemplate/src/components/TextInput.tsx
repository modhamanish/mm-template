import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  StyleSheet,
} from 'react-native';
import AppText from './AppText';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  touched,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const hasError = touched && error;

  return (
    <View style={styles.container}>
      {label && (
        <AppText variant="semiBold" style={styles.label}>
          {label}
        </AppText>
      )}
      <RNTextInput
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor={theme.colors.textColor + '60'}
        {...props}
      />
      {hasError && (
        <AppText size="small" style={styles.errorText}>
          {error}
        </AppText>
      )}
    </View>
  );
};

export default TextInput;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      color: colors.textColor,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.backgroundColor,
      borderWidth: 1,
      borderColor: colors.textColor + '30',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.textColor,
    },
    inputError: {
      borderColor: colors.primary,
    },
    errorText: {
      color: colors.primary,
      marginTop: 4,
      marginLeft: 4,
    },
  });
