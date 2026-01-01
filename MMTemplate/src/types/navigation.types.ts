import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Routes from '../navigation/routes';

export type VerifyNumberScreenProps =
  NativeStackScreenProps<RootStackParamList>;

export type RootStackParamList = {
  [Routes.AuthCheck]: undefined;
  [Routes.AuthStack]: undefined;
  [Routes.AppStack]: undefined;
};

export type AuthStackParamList = {
  [Routes.WelcomeScreen]: undefined;
};

export type AppStackParamList = {
  [Routes.HomeScreen]: undefined;
};

export type ParamsType = RootStackParamList &
  AuthStackParamList &
  AppStackParamList;

export type NavigationProps<RouteName extends keyof ParamsType> =
  NativeStackScreenProps<ParamsType, RouteName>;
