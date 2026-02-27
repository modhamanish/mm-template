import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@app-types/navigation.types';
import AppStack from '@navigation/AppStack';
import AuthCheck from '@navigation/AuthCheck';
import AuthStack from '@navigation/AuthStack';
import Routes from '@navigation/routes';
import { navigationRef } from '@utils/navigationUtils';

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
