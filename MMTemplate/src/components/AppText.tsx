import React, { FC, memo } from 'react';
import { Text, TextStyle } from 'react-native';

import { AppTextProps, AppTextSize } from '@app-types/components.types';
import { useTheme } from '@context/ThemeContext';

const FONTS: Record<string, string> | undefined = {
  // Define custom font families here. If empty or undefined, the component will use default system fonts with font weights.
  // extraBold: 'Poppins-ExtraBold',
  // bold: 'Poppins-Bold',
  // semiBold: 'Poppins-SemiBold',
  // medium: 'Poppins-Medium',
  // light: 'Poppins-Light',
  // regular: 'Poppins-Regular',
};

const SIZES: Record<string, number> = {
  xxsmall: 8,
  xsmall: 10,
  small: 12,
  normal: 14,
  body: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
};

const AppText: FC<AppTextProps> = ({
  children,
  size = 'normal',
  variant = 'regular',
  color,
  fontFamily,
  transform,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const getFontSize = (s: AppTextSize): number => {
    if (typeof s === 'number') return s;
    return SIZES[s as string] || SIZES.normal;
  };

  const getTransform = (
    t?: string,
  ): 'uppercase' | 'lowercase' | 'capitalize' | undefined => {
    if (!t) return undefined;
    switch (t) {
      case 'capital':
      case 'uppercase':
        return 'uppercase';
      case 'small':
      case 'lowercase':
        return 'lowercase';
      case 'first char capital':
      case 'capitalize':
        return 'capitalize';
      default:
        return undefined;
    }
  };

  const getVariantStyle = (v: string): TextStyle => {
    const hasFonts = !!FONTS && Object.keys(FONTS).length > 0;
    switch (v) {
      case 'h1':
        return hasFonts
          ? { fontSize: 32, fontFamily: FONTS.extraBold }
          : { fontSize: 32, fontWeight: '800' };
      case 'h2':
        return hasFonts
          ? { fontSize: 24, fontFamily: FONTS.bold }
          : { fontSize: 24, fontWeight: '700' };
      case 'h3':
        return hasFonts
          ? { fontSize: 20, fontFamily: FONTS.bold }
          : { fontSize: 20, fontWeight: '700' };
      case 'body1':
        return hasFonts
          ? { fontSize: 16, fontFamily: FONTS.regular }
          : { fontSize: 16, fontWeight: '400' };
      case 'body2':
        return hasFonts
          ? { fontSize: 14, fontFamily: FONTS.regular }
          : { fontSize: 14, fontWeight: '400' };
      case 'bold':
        return hasFonts ? { fontFamily: FONTS.bold } : { fontWeight: '700' };
      case 'semiBold':
        return hasFonts
          ? { fontFamily: FONTS.semiBold }
          : { fontWeight: '600' };
      case 'medium':
        return hasFonts ? { fontFamily: FONTS.medium } : { fontWeight: '500' };
      case 'light':
        return hasFonts ? { fontFamily: FONTS.light } : { fontWeight: '300' };
      case 'regular':
        return hasFonts ? { fontFamily: FONTS.regular } : { fontWeight: '400' };
      default:
        return {};
    }
  };

  const variantStyle = getVariantStyle(variant);

  // If prop fontFamily is provided, it should override variant's fontFamily
  // And we should still prevent variant's fontWeight (if any) from conflicting with it.
  if (fontFamily && variantStyle.fontWeight) {
    delete variantStyle.fontWeight;
  }

  const combinedStyles: TextStyle = {
    fontSize: getFontSize(size),
    color: color || colors.textColor,
    textTransform: getTransform(transform),
    ...variantStyle,
    ...(fontFamily ? { fontFamily } : {}),
    ...(style as object),
  };

  return (
    <Text style={combinedStyles} allowFontScaling={false} {...props}>
      {children}
    </Text>
  );
};

export default memo(AppText);
