import { ReactNode } from 'react';
import {
  StatusBarStyle,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Edges } from 'react-native-safe-area-context';

export type CustomTextSize =
  | 'xxsmall' // 8
  | 'xsmall' // 10
  | 'small' // 12
  | 'normal' // 14
  | 'body' // 16
  | 'large' // 20
  | 'xlarge' // 24
  | 'xxlarge' // 32
  | number;

export type CustomTextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'bold'
  | 'semiBold'
  | 'medium'
  | 'regular'
  | 'light';

export type CustomTextTransform =
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'none';

export type CustomTextProps = TextProps & {
  children?: ReactNode;
  size?: CustomTextSize;
  variant?: CustomTextVariant;
  color?: string;
  fontFamily?: string;
  transform?: CustomTextTransform;
  style?: StyleProp<TextStyle>;
};

export type FullScreenContainerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edges;
  barStyle?: StatusBarStyle;
  statusBarHidden?: boolean;
  keyboardAvoidingViewStyle?: StyleProp<ViewStyle>;
  isKeyboardAvoidingView?: boolean;
};
