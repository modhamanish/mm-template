import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from '@navigation/routes';
import { AuthStackParamList } from '@app-types/navigation.types';
import WelcomeScreen from '@screens/WelcomeScreen';
import LoginScreen from '@screens/LoginScreen';

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
