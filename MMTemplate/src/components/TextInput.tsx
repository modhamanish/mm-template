import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
} from 'react-native';
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
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor={theme.colors.textColor + '60'}
        {...props}
      />
      {hasError && <Text style={styles.errorText}>{error}</Text>}
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
      fontSize: 14,
      fontWeight: '600',
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
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
  });
