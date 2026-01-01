import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Routes from './routes';
import { AppStackParamList } from '../types/navigation.types';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={Routes.ProfileScreen} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
