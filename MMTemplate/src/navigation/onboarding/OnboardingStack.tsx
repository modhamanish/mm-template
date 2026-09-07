import React, { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardingStackParamList } from '@app-types/navigation.types';
import Routes from '@navigation/routes';
import {
  OnboardingScreen1,
  OnboardingScreen2,
  OnboardingScreen3,
} from '@screens/onboarding';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.OnboardingScreen1}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={Routes.OnboardingScreen1}
        component={OnboardingScreen1}
      />
      <Stack.Screen
        name={Routes.OnboardingScreen2}
        component={OnboardingScreen2}
      />
      <Stack.Screen
        name={Routes.OnboardingScreen3}
        component={OnboardingScreen3}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
