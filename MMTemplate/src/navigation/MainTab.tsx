import React, { FC } from 'react';
import AppText from '@components/AppText';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routes from '@navigation/routes';
import { MainTabParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';

// Screens
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import NoteScreen from '@screens/NoteScreen';

const BottomTab = createBottomTabNavigator<MainTabParamList>();

const MainTab: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundColor,
          borderTopColor: theme.colors.textColor + '20',
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textColor + '80',
      }}
    >
      <BottomTab.Screen
        name={Routes.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: t('common.home'),
          tabBarIcon: () => <AppText>🏠</AppText>,
        }}
      />
      <BottomTab.Screen
        name={Routes.NoteScreen}
        component={NoteScreen}
        options={{
          tabBarLabel: t('common.note'),
          tabBarIcon: () => <AppText>📝</AppText>,
        }}
      />
      <BottomTab.Screen
        name={Routes.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarLabel: t('common.profile'),
          tabBarIcon: () => <AppText>👤</AppText>,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainTab;
