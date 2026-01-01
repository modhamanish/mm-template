import { ReactNode } from 'react';
import { StatusBarStyle, StyleProp, ViewStyle } from 'react-native';
import { Edges } from 'react-native-safe-area-context';

export type FullScreenContainerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edges;
  barStyle?: StatusBarStyle;
  statusBarHidden?: boolean;
  keyboardAvoidingViewStyle?: StyleProp<ViewStyle>;
  isKeyboardAvoidingView?: boolean;
};
