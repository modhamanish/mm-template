import React, { FC } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { MainTabParamList } from '@app-types/navigation.types';
import AppText from '@components/AppText';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { HomeScreen } from '@screens/home';
import { NoteScreen } from '@screens/note';
import { ProfileScreen } from '@screens/profile';
import { hexWithOpacity } from '@src/utils/utilsHelper';

const BottomTab = createBottomTabNavigator<MainTabParamList>();

const HomeIcon = () => <AppText>🏠</AppText>;
const NoteIcon = () => <AppText>📝</AppText>;
const ProfileIcon = () => <AppText>👤</AppText>;

const BottomTabNavigator: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundColor,
          borderTopColor: hexWithOpacity(theme.colors.textColor, 12),
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: hexWithOpacity(theme.colors.textColor, 50),
      }}
    >
      <BottomTab.Screen
        name={Routes.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: t('common.home', 'Home'),
          tabBarIcon: HomeIcon,
        }}
      />
      <BottomTab.Screen
        name={Routes.NoteScreen}
        component={NoteScreen}
        options={{
          tabBarLabel: t('common.notes', 'Notes'),
          tabBarIcon: NoteIcon,
        }}
      />
      <BottomTab.Screen
        name={Routes.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarLabel: t('common.profile', 'Profile'),
          tabBarIcon: ProfileIcon,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
