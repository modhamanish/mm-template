import React, { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AppStackParamList } from '@app-types/navigation.types';
import { DrawerNavigator } from '@navigation/drawer';
import Routes from '@navigation/routes';
import { BottomTabNavigator } from '@navigation/tab';
import { HomeScreen } from '@screens/home';
import { NoteScreen, AddNoteScreen } from '@screens/note';
import { ProfileScreen } from '@screens/profile';
import { SettingsScreen } from '@screens/settings';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.MainTab}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Bottom Tabs Mode */}
      <Stack.Screen name={Routes.MainTab} component={BottomTabNavigator} />

      {/* Drawer Mode */}
      <Stack.Screen name={Routes.MainDrawer} component={DrawerNavigator} />

      {/* Direct Stack Mode Screens */}
      <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={Routes.NoteScreen} component={NoteScreen} />
      <Stack.Screen name={Routes.ProfileScreen} component={ProfileScreen} />

      {/* Shared Detail / Modal Screens */}
      <Stack.Screen name={Routes.SettingsScreen} component={SettingsScreen} />
      <Stack.Screen name={Routes.AddNoteScreen} component={AddNoteScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
