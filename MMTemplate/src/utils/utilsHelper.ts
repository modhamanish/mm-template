import { Dimensions, Platform } from 'react-native';

const { width: mobileWidth, height: mobileHeight } = Dimensions.get('window');
const { width: mobileScreenWidth, height: mobileScreenHeight } =
  Dimensions.get('screen');

const isIos = Platform.OS === 'ios';

export {
  mobileHeight,
  mobileWidth,
  mobileScreenWidth,
  mobileScreenHeight,
  isIos,
};

export const hexWithOpacity = (hex: string, opacityPercent: number) => {
  hex = hex.replace('#', '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(ch => ch + ch)
      .join('');
  }
  if (hex.length !== 6) {
    return `#${hex}`;
  }

  const alpha = Math.round((opacityPercent / 100) * 255);
  const alphaHex = alpha.toString(16).padStart(2, '0').toUpperCase();

  return `#${hex}${alphaHex}`;
};
