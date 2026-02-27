import { ReactNode } from 'react';
import {
  StatusBarStyle,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Edges } from 'react-native-safe-area-context';

export type AppTextSize =
  | 'xxsmall' // 8
  | 'xsmall' // 10
  | 'small' // 12
  | 'normal' // 14
  | 'body' // 16
  | 'large' // 20
  | 'xlarge' // 24
  | 'xxlarge' // 32
  | number;

export type AppTextVariant =
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

export type AppTextTransform =
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'none';

export type AppTextProps = TextProps & {
  children?: ReactNode;
  size?: AppTextSize;
  variant?: AppTextVariant;
  color?: string;
  fontFamily?: string;
  transform?: AppTextTransform;
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

export interface AlertOptionsProps {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmText?: string;
  cancelText?: string;
  boxStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  confirmButtonStyle?: ViewStyle;
  cancelButtonStyle?: ViewStyle;
  confirmTextStyle?: TextStyle;
  cancelTextStyle?: TextStyle;
  isCancellable?: boolean;
  isError?: boolean;
}

export type ShowAlert = (opts: AlertOptionsProps) => void;
