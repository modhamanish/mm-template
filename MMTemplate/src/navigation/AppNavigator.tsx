import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation.types';
import { navigationRef } from '../utils/navigationUtils';

import Routes from './routes';

import AuthCheck from './AuthCheck';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Routes.AuthCheck}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={{ animation: 'fade' }}
          name={Routes.AuthCheck}
          component={AuthCheck}
        />
        <Stack.Screen
          options={{ animation: 'fade' }}
          name={Routes.AuthStack}
          component={AuthStack}
        />
        <Stack.Screen
          options={{ animation: 'fade' }}
          name={Routes.AppStack}
          component={AppStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
