import React, { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from '@app-types/navigation.types';
import Routes from '@navigation/routes';
import { LoginScreen } from '@screens/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LoginScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
