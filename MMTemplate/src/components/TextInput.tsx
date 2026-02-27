import React, { useState, useEffect } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import AppText from '@components/AppText';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@theme/Colors';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  prefixStyle?: StyleProp<TextStyle>;
  suffixStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  labelBackgroundColor?: string;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  touched,
  style,
  renderLeft,
  renderRight,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  prefixStyle,
  suffixStyle,
  containerStyle,
  inputContainerStyle,
  labelBackgroundColor,
  value,
  placeholder,
  onFocus,
  onBlur,
  ...props
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [isFocused, setIsFocused] = useState(false);
  const [leftWidth, setLeftWidth] = useState(0);

  const hasValue = value !== undefined && value !== '';
  const hasError = touched && error;
  const labelBg = labelBackgroundColor || theme.colors.backgroundColor;

  const labelAnimation = useSharedValue(hasValue ? 1 : 0);

  useEffect(() => {
    labelAnimation.value = withTiming(isFocused || hasValue ? 1 : 0, {
      duration: 200,
    });
  }, [isFocused, hasValue, labelAnimation]);

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            labelAnimation.value,
            [0, 1],
            [0, -28],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            labelAnimation.value,
            [0, 1],
            [leftWidth, -4],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            labelAnimation.value,
            [0, 1],
            [1, 0.85],
            Extrapolate.CLAMP,
          ),
        },
      ],
      backgroundColor: labelAnimation.value === 1 ? labelBg : 'transparent',
      paddingHorizontal: interpolate(
        labelAnimation.value,
        [0, 1],
        [0, 4],
        Extrapolate.CLAMP,
      ),
      color:
        isFocused || hasValue
          ? hasError
            ? theme.colors.primary
            : theme.colors.primary
          : theme.colors.textColor + '80',
    };
  });

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const onLeftLayout = (event: any) => {
    setLeftWidth(event.nativeEvent.layout.width);
  };

  const showPlaceholder = label ? isFocused : true;

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          hasError && styles.inputWrapperError,
          inputContainerStyle,
        ]}
      >
        {label && (
          <Animated.View
            pointerEvents="none"
            style={[styles.labelContainer, animatedLabelStyle]}
          >
            <AppText variant="medium">{label}</AppText>
          </Animated.View>
        )}

        <View style={styles.leftElements} onLayout={onLeftLayout}>
          {renderLeft ? (
            renderLeft()
          ) : typeof leftIcon === 'string' ? (
            <AppText style={styles.iconLeft}>{leftIcon}</AppText>
          ) : (
            leftIcon
          )}

          {prefix && (
            <AppText style={[styles.prefix, prefixStyle]}>{prefix}</AppText>
          )}
        </View>

        <RNTextInput
          style={[styles.input, style]}
          placeholder={showPlaceholder ? placeholder : ''}
          placeholderTextColor={theme.colors.textColor + '60'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...props}
        />

        {suffix && (
          <AppText style={[styles.suffix, suffixStyle]}>{suffix}</AppText>
        )}

        {renderRight ? (
          renderRight()
        ) : typeof rightIcon === 'string' ? (
          <AppText style={styles.iconRight}>{rightIcon}</AppText>
        ) : (
          rightIcon
        )}
      </View>

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
      marginBottom: 24,
      marginTop: 12,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundColor,
      borderWidth: 1,
      borderColor: colors.textColor + '30',
      borderRadius: 12,
      paddingHorizontal: 12,
      minHeight: 56,
    },
    inputWrapperFocused: {
      borderColor: colors.primary,
    },
    inputWrapperError: {
      borderColor: colors.primary,
    },
    labelContainer: {
      position: 'absolute',
      left: 12,
      top: 16,
      zIndex: 1,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.textColor,
      paddingVertical: 12,
      paddingHorizontal: 4,
    },
    leftElements: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconLeft: {
      marginRight: 8,
      fontSize: 20,
    },
    iconRight: {
      marginLeft: 8,
      fontSize: 20,
    },
    prefix: {
      marginRight: 4,
      color: colors.textColor + '80',
    },
    suffix: {
      marginLeft: 4,
      color: colors.textColor + '80',
    },
    errorText: {
      color: colors.primary,
      marginTop: 6,
      marginLeft: 4,
    },
  });
