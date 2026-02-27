import React, { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AppStackParamList } from '@app-types/navigation.types';
// Screens
import MainTab from '@navigation/MainTab';
import Routes from '@navigation/routes';
import AddNoteScreen from '@screens/AddNoteScreen';
import SettingsScreen from '@screens/SettingsScreen';

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
      <Stack.Screen name={Routes.AddNoteScreen} component={AddNoteScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
