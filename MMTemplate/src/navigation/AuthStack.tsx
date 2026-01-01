import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './routes';
import { AuthStackParamList } from '../types/navigation.types';
import WelcomeScreen from '../screens/WelcomeScreen';

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
    </Stack.Navigator>
  );
};

export default AuthStack;
