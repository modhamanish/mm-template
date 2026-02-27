import React, { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from '@app-types/navigation.types';
import Routes from '@navigation/routes';
import LoginScreen from '@screens/LoginScreen';
import WelcomeScreen from '@screens/WelcomeScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.WelcomeScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
