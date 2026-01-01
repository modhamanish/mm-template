import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';
import FullScreenContainer from '../components/FullScreenContainer';
import AnimationView from '../components/AnimationView';
import { useAuth } from '../context/AuthContext';
import InfoCard from '../components/InfoCard';
import LanguageSwitcher from '../components/LanguageSwitcher';

const ProfileScreen = () => {
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
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <Text style={styles.name}>{user?.name || 'User'}</Text>
            <Text style={styles.email}>
              {user?.email || 'user@example.com'}
            </Text>
          </View>
        </AnimationView>

        <AnimationView delay={200} animType="FadeIn" duration={800}>
          <LanguageSwitcher />
        </AnimationView>

        <AnimationView delay={300} animType="FadeIn" duration={800}>
          <InfoCard title={t('profile.accountInformation')} icon="👤">
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('profile.name')}:</Text>
              <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('profile.email')}:</Text>
              <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
            </View>
          </InfoCard>
        </AnimationView>

        <AnimationView delay={500} animType="FadeIn" duration={800}>
          <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
            <Text style={styles.logoutButtonText}>{t('common.logout')}</Text>
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
      fontSize: 40,
      fontWeight: '700',
      color: colors.white,
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.textColor,
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: colors.textColor + 'CC',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    infoLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textColor,
    },
    infoValue: {
      fontSize: 14,
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
      fontSize: 16,
      fontWeight: '700',
    },
  });
