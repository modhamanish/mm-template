import React, { FC } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routes from './routes';
import { MainTabParamList } from '../types/navigation.types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useTheme } from '../context/ThemeContext';

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
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />
      <BottomTab.Screen
        name={Routes.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarLabel: t('common.profile'),
          tabBarIcon: () => <Text>👤</Text>,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainTab;
