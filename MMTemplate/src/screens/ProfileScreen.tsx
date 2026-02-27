import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { useTranslation } from 'react-i18next';

import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import InfoCard from '@components/InfoCard';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { ThemeType } from '@theme/Colors';
import { navigate } from '@utils/navigationUtils';

const ProfileScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { user, handleLogout } = useAuth();

  const confirmLogout = () => {
    Alert.alert(
      t('profile.logoutConfirmTitle'),
      t('profile.logoutConfirmMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.logout'),
          onPress: handleLogout,
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <FullScreenContainer style={styles.container} barStyle="light-content">
      <View style={styles.content}>
        <AnimationView animType="FadeIn" duration={800}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <AppText variant="bold" size={40} style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </AppText>
            </View>
            <AppText variant="bold" style={styles.name}>
              {user?.name || 'User'}
            </AppText>
            <AppText style={styles.email}>
              {user?.email || 'user@example.com'}
            </AppText>
          </View>
        </AnimationView>

        <AnimationView delay={300} animType="FadeIn" duration={800}>
          <InfoCard title={t('profile.accountInformation')} icon="👤">
            <View style={styles.infoRow}>
              <AppText variant="semiBold" style={styles.infoLabel}>
                {t('profile.name')}:
              </AppText>
              <AppText style={styles.infoValue}>{user?.name || 'N/A'}</AppText>
            </View>
            <View style={styles.infoRow}>
              <AppText variant="semiBold" style={styles.infoLabel}>
                {t('profile.email')}:
              </AppText>
              <AppText style={styles.infoValue}>{user?.email || 'N/A'}</AppText>
            </View>
          </InfoCard>
        </AnimationView>

        <AnimationView delay={450} animType="FadeIn" duration={800}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigate(Routes.SettingsScreen)}
          >
            <AppText
              variant="bold"
              size="body"
              style={styles.settingsButtonText}
            >
              ⚙️ {t('settings.settings')}
            </AppText>
          </TouchableOpacity>
        </AnimationView>

        <AnimationView delay={600} animType="FadeIn" duration={800}>
          <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
            <AppText variant="bold" size="body" style={styles.logoutButtonText}>
              {t('common.logout')}
            </AppText>
          </TouchableOpacity>
        </AnimationView>
      </View>
    </FullScreenContainer>
  );
};

export default ProfileScreen;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
      marginTop: 40,
    },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    avatarText: {
      color: colors.white,
    },
    name: {
      color: colors.textColor,
      marginBottom: 4,
    },
    email: {
      color: colors.textColor + 'CC',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    infoLabel: {
      color: colors.textColor,
    },
    infoValue: {
      color: colors.textColor + 'CC',
    },
    logoutButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 24,
    },
    logoutButtonText: {
      color: colors.white,
    },
    settingsButton: {
      backgroundColor: colors.backgroundColor,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 32,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    settingsButtonText: {
      color: colors.primary,
    },
  });
