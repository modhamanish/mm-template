import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Routes from './routes';
import { AppStackParamList } from '../types/navigation.types';

// Screens
import MainTab from './MainTab';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.MainTab}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.MainTab} component={MainTab} />
      <Stack.Screen name={Routes.SettingsScreen} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
