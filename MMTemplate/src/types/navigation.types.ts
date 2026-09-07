import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Routes from '@navigation/routes';

export type RootStackParamList = {
  [Routes.AuthCheck]: undefined;
  [Routes.AuthStack]: undefined;
  [Routes.OnboardingStack]: undefined;
  [Routes.AppStack]: undefined;
};

export type OnboardingStackParamList = {
  [Routes.OnboardingScreen1]: undefined;
  [Routes.OnboardingScreen2]: undefined;
  [Routes.OnboardingScreen3]: undefined;
};

export type AuthStackParamList = {
  [Routes.WelcomeScreen]?: undefined;
  [Routes.LoginScreen]: undefined;
};

export type MainTabParamList = {
  [Routes.HomeScreen]: undefined;
  [Routes.NoteScreen]: undefined;
  [Routes.ProfileScreen]: undefined;
};

export type MainDrawerParamList = {
  [Routes.HomeScreen]: undefined;
  [Routes.NoteScreen]: undefined;
  [Routes.ProfileScreen]: undefined;
};

export type AppStackParamList = {
  [Routes.MainTab]?: undefined;
  [Routes.MainDrawer]?: undefined;
  [Routes.HomeScreen]?: undefined;
  [Routes.NoteScreen]?: undefined;
  [Routes.ProfileScreen]?: undefined;
  [Routes.SettingsScreen]: undefined;
  [Routes.AddNoteScreen]: undefined;
};

export type ParamsType = RootStackParamList &
  OnboardingStackParamList &
  AuthStackParamList &
  AppStackParamList &
  MainTabParamList &
  MainDrawerParamList;

export type NavigationProps<RouteName extends keyof ParamsType> =
  NativeStackScreenProps<ParamsType, RouteName>;
