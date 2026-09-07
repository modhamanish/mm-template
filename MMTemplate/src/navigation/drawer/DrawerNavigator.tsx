import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';

import { MainDrawerParamList } from '@app-types/navigation.types';
import { Images } from '@assets/images';
import AppText from '@components/AppText';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { HomeScreen } from '@screens/home';
import { NoteScreen } from '@screens/note';
import { ProfileScreen } from '@screens/profile';
import { ThemeType } from '@src/theme/colors';
import { navigate } from '@utils/navigationUtils';
import { hexWithOpacity } from '@utils/utilsHelper';

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { user, handleLogout } = useAuth();
  const activeRouteName = props.state.routes[props.state.index]?.name;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header Section */}
      <View style={styles.headerSection}>
        {/* Brand & Theme Switcher Bar */}
        <View style={styles.brandRow}>
          <View style={styles.brandContainer}>
            <Image
              source={
                theme.currentTheme === 'dark' ? Images.logoDark : Images.logo
              }
              style={styles.drawerLogo}
              resizeMode="contain"
            />
            <View style={styles.versionPill}>
              <AppText
                variant="bold"
                size="xsmall"
                style={styles.versionPillText}
              >
                v1.0
              </AppText>
            </View>
          </View>

          {/* Quick Theme Switcher */}
          <TouchableOpacity
            style={styles.themeButton}
            onPress={theme.toggleTheme}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <AppText size={16}>
              {theme.currentTheme === 'dark' ? '☀️' : '🌙'}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <AppText variant="bold" size={18} style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </AppText>
            </View>
            <View style={styles.onlineBadge} />
          </View>

          <View style={styles.profileTextContainer}>
            <AppText
              variant="bold"
              size={15}
              style={styles.userName}
              numberOfLines={1}
            >
              {user?.name || 'MM Developer'}
            </AppText>
            <AppText size="xsmall" style={styles.userEmail} numberOfLines={1}>
              {user?.email || 'dev@modhamanish.com'}
            </AppText>
          </View>
        </View>
      </View>

      {/* Navigation Links */}
      <View style={styles.navSection}>
        <AppText variant="bold" size="xsmall" style={styles.sectionLabel}>
          MAIN MENU
        </AppText>

        {/* Home Item */}
        <TouchableOpacity
          style={[
            styles.navItem,
            activeRouteName === Routes.HomeScreen && styles.activeNavItem,
          ]}
          onPress={() => props.navigation.navigate(Routes.HomeScreen)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconBadge,
              activeRouteName === Routes.HomeScreen && styles.activeIconBadge,
            ]}
          >
            <AppText size={18}>🏠</AppText>
          </View>
          <AppText
            variant={
              activeRouteName === Routes.HomeScreen ? 'bold' : 'semiBold'
            }
            size={15}
            style={[
              styles.navText,
              activeRouteName === Routes.HomeScreen && styles.activeNavText,
            ]}
          >
            {t('common.home', 'Home')}
          </AppText>
          {activeRouteName === Routes.HomeScreen && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>

        {/* Notes Item */}
        <TouchableOpacity
          style={[
            styles.navItem,
            activeRouteName === Routes.NoteScreen && styles.activeNavItem,
          ]}
          onPress={() => props.navigation.navigate(Routes.NoteScreen)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconBadge,
              activeRouteName === Routes.NoteScreen && styles.activeIconBadge,
            ]}
          >
            <AppText size={18}>📝</AppText>
          </View>
          <AppText
            variant={
              activeRouteName === Routes.NoteScreen ? 'bold' : 'semiBold'
            }
            size={15}
            style={[
              styles.navText,
              activeRouteName === Routes.NoteScreen && styles.activeNavText,
            ]}
          >
            {t('common.notes', 'Notes')}
          </AppText>
          {activeRouteName === Routes.NoteScreen && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>

        {/* Profile Item */}
        <TouchableOpacity
          style={[
            styles.navItem,
            activeRouteName === Routes.ProfileScreen && styles.activeNavItem,
          ]}
          onPress={() => props.navigation.navigate(Routes.ProfileScreen)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconBadge,
              activeRouteName === Routes.ProfileScreen &&
                styles.activeIconBadge,
            ]}
          >
            <AppText size={18}>👤</AppText>
          </View>
          <AppText
            variant={
              activeRouteName === Routes.ProfileScreen ? 'bold' : 'semiBold'
            }
            size={15}
            style={[
              styles.navText,
              activeRouteName === Routes.ProfileScreen && styles.activeNavText,
            ]}
          >
            {t('common.profile', 'Profile')}
          </AppText>
          {activeRouteName === Routes.ProfileScreen && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.menuDivider} />

        <AppText variant="bold" size="xsmall" style={styles.sectionLabel}>
          PREFERENCES
        </AppText>

        {/* Settings Item */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            props.navigation.closeDrawer();
            navigate(Routes.SettingsScreen);
          }}
          activeOpacity={0.7}
        >
          <View style={styles.iconBadge}>
            <AppText size={18}>⚙️</AppText>
          </View>
          <AppText variant="semiBold" size={15} style={styles.navText}>
            {t('settings.settings', 'Settings')}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footerSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <AppText size={18} style={styles.logoutIcon}>
            🚪
          </AppText>
          <AppText variant="bold" size={14} style={styles.logoutText}>
            {t('common.logout', 'Log out')}
          </AppText>
        </TouchableOpacity>

        <AppText size="xsmall" style={styles.versionText}>
          MM Template • Built with React Native
        </AppText>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator: FC = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.backgroundColor,
          width: 300,
        },
        drawerType: 'front',
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen name={Routes.HomeScreen} component={HomeScreen} />
      <Drawer.Screen name={Routes.NoteScreen} component={NoteScreen} />
      <Drawer.Screen name={Routes.ProfileScreen} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    drawerContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 18,
    },
    headerSection: {
      paddingBottom: 16,
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: 4,
    },
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    drawerLogo: {
      width: 100,
      height: 34,
    },
    versionPill: {
      backgroundColor: hexWithOpacity(colors.primary, 12),
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
    },
    versionPillText: {
      color: colors.primary,
      fontSize: 10,
    },
    themeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: hexWithOpacity(colors.textColor, 6),
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: hexWithOpacity(colors.textColor, 4),
      borderRadius: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: hexWithOpacity(colors.textColor, 8),
    },
    avatarWrapper: {
      position: 'relative',
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: colors.white,
    },
    onlineBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#22C55E',
      borderWidth: 2,
      borderColor: colors.backgroundColor,
    },
    profileTextContainer: {
      marginLeft: 12,
      flex: 1,
    },
    userName: {
      color: colors.textColor,
      marginBottom: 2,
    },
    userEmail: {
      color: hexWithOpacity(colors.textColor, 60),
    },
    navSection: {
      flex: 1,
      paddingTop: 12,
      gap: 4,
    },
    sectionLabel: {
      color: hexWithOpacity(colors.textColor, 40),
      fontSize: 11,
      letterSpacing: 0.8,
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 6,
    },
    menuDivider: {
      height: 1,
      backgroundColor: hexWithOpacity(colors.textColor, 6),
      marginVertical: 10,
      marginHorizontal: 8,
    },
    navItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 14,
    },
    activeNavItem: {
      backgroundColor: hexWithOpacity(colors.primary, 10),
    },
    iconBadge: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: hexWithOpacity(colors.textColor, 4),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    activeIconBadge: {
      backgroundColor: hexWithOpacity(colors.primary, 16),
    },
    navText: {
      flex: 1,
      color: hexWithOpacity(colors.textColor, 80),
    },
    activeNavText: {
      color: colors.primary,
    },
    activeIndicator: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.primary,
      marginRight: 4,
    },
    footerSection: {
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: hexWithOpacity(colors.textColor, 6),
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: hexWithOpacity(colors.error, 8),
      borderWidth: 1,
      borderColor: hexWithOpacity(colors.error, 15),
    },
    logoutIcon: {
      marginRight: 8,
    },
    logoutText: {
      color: colors.error,
    },
    versionText: {
      color: hexWithOpacity(colors.textColor, 35),
      textAlign: 'center',
      marginTop: 12,
      fontSize: 11,
    },
  });
