import React, { FC, useMemo } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { Images } from '@assets/images';
import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FeatureItem from '@components/FeatureItem';
import FullScreenContainer from '@components/FullScreenContainer';
import Header from '@components/Header';
import InfoCard from '@components/InfoCard';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { ThemeType } from '@src/theme/colors';
import { navigate } from '@utils/navigationUtils';
import {
  hexWithOpacity,
  mobileScreenHeight,
  mobileScreenWidth,
} from '@utils/utilsHelper';

const HomeScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <FullScreenContainer style={styles.container}>
      {/* Universal Header */}
      <Header title={t('common.home', 'Home')} showDrawer />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <AnimationView animType="FadeIn" duration={800}>
          <View style={styles.header}>
            <AnimationView animType="ZoomIn" duration={1000}>
              <Image
                source={
                  theme.currentTheme === 'dark' ? Images.logoDark : Images.logo
                }
                style={styles.logo}
              />
            </AnimationView>
            <AnimationView delay={400} animType="SlideInDown" duration={800}>
              <AppText variant="h2" style={styles.welcomeText}>
                {t('home.welcomeToTemplate')}
              </AppText>
              <AppText style={styles.subtitle}>{t('home.subtitle')}</AppText>
            </AnimationView>
          </View>
        </AnimationView>

        {/* Quick Navigation Cards (especially useful for Stack Mode) */}
        <AnimationView delay={500} animType="FadeIn" duration={800}>
          <View style={styles.quickNavRow}>
            <TouchableOpacity
              style={styles.navCard}
              onPress={() => navigate(Routes.NoteScreen)}
              activeOpacity={0.7}
            >
              <AppText size={24}>📝</AppText>
              <AppText variant="bold" size={14} style={styles.navCardTitle}>
                {t('common.note', 'Notes')}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navCard}
              onPress={() => navigate(Routes.ProfileScreen)}
              activeOpacity={0.7}
            >
              <AppText size={24}>👤</AppText>
              <AppText variant="bold" size={14} style={styles.navCardTitle}>
                {t('common.profile', 'Profile')}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navCard}
              onPress={() => navigate(Routes.SettingsScreen)}
              activeOpacity={0.7}
            >
              <AppText size={24}>⚙️</AppText>
              <AppText variant="bold" size={14} style={styles.navCardTitle}>
                {t('common.settings', 'Settings')}
              </AppText>
            </TouchableOpacity>
          </View>
        </AnimationView>

        {/* Quick Start Section */}
        <AnimationView delay={600} animType="FadeIn" duration={800}>
          <InfoCard title={`🚀 ${t('home.quickStart')}`} icon="">
            <AppText style={styles.cardText}>
              {t('home.quickStartDesc')}
            </AppText>
            <View style={styles.codeBlock}>
              <AppText size={13} style={styles.codeText}>
                yarn install
              </AppText>
            </View>
            <View style={styles.codeBlock}>
              <AppText size={13} style={styles.codeText}>
                cd ios && pod install
              </AppText>
            </View>
            <View style={styles.codeBlock}>
              <AppText size={13} style={styles.codeText}>
                yarn ios / yarn android
              </AppText>
            </View>
          </InfoCard>
        </AnimationView>

        {/* Project Structure Section */}
        <AnimationView delay={800} animType="FadeIn" duration={800}>
          <InfoCard title={`📁 ${t('home.projectStructure')}`} icon="">
            <View style={styles.treeBlock}>
              <AppText style={styles.treeText}>
                {`src/
├── assets/        # Images, logos, brand assets
├── components/    # Reusable UI component library
├── context/       # AuthContext & ThemeContext
├── locales/       # i18n translations (en, hi)
├── mock/          # Mock credentials & sample data
├── navigation/    # Modular Navigators (v7)
│   ├── auth/      # AuthCheck, AuthStack
│   ├── drawer/    # DrawerNavigator
│   ├── onboarding/# OnboardingStack
│   ├── stack/     # AppStack
│   └── tab/       # BottomTabNavigator
├── screens/       # Modular Screen Views
│   ├── auth/      # LoginScreen
│   ├── home/      # HomeScreen
│   ├── note/      # NoteScreen, AddNoteScreen
│   ├── onboarding/# OnboardingScreen1, 2, 3
│   ├── profile/   # ProfileScreen
│   └── settings/  # SettingsScreen
├── services/      # Axios & TanStack Query v5
├── theme/         # Colors, typography, spacing
├── types/         # TypeScript definitions
└── utils/         # MMKV storage, i18n, schemas`}
              </AppText>
            </View>

            <FeatureItem
              icon="🧭"
              title="navigation/"
              description="Modular navigators: stack/, tab/, drawer/, auth/, and onboarding/."
            />
            <FeatureItem
              icon="📱"
              title="screens/"
              description="Modular screens grouped by domain (home, note, profile, auth, onboarding)."
            />
            <FeatureItem
              icon="🧩"
              title="components/"
              description="Reusable UI library (Header, AppText, AnimationView, Alert, etc.)."
            />
            <FeatureItem
              icon="⚡"
              title="services/"
              description="TanStack Query v5 hooks, Axios client & centralized query keys."
            />
            <FeatureItem
              icon="📦"
              title="context/"
              description="React Context for global state (AuthContext & ThemeContext)."
            />
            <FeatureItem
              icon="🎨"
              title="theme/"
              description="Centralized colors, typography, and spacing tokens."
            />
            <FeatureItem
              icon="🌍"
              title="locales/"
              description="Multi-language translation files (en.json, hi.json)."
            />
            <FeatureItem
              icon="🔧"
              title="utils/"
              description="MMKV storageHelper, i18n configuration, and Yup validation schemas."
            />
            <FeatureItem
              icon="🏷️"
              title="types/"
              description="Strict TypeScript types for navigation params, components, and APIs."
            />
            <FeatureItem
              icon="🧪"
              title="mock/"
              description="Mock user credentials (user@gmail.com) and note data."
            />
            <FeatureItem
              icon="🖼️"
              title="assets/"
              description="Static media assets, light/dark logos, and brand assets."
            />
          </InfoCard>
        </AnimationView>

        {/* Features Section */}
        <AnimationView delay={1000} animType="FadeIn" duration={800}>
          <InfoCard title={`✨ ${t('home.includedFeatures')}`} icon="">
            <FeatureItem
              icon="⚡"
              title="React Navigation v7"
              description="Pre-configured stack, tab, and drawer navigators"
            />
            <FeatureItem
              icon="🎬"
              title="Reanimated v4"
              description="Smooth animations with worklets support"
            />
            <FeatureItem
              icon="🔷"
              title="TypeScript"
              description="Full type safety and better developer experience"
            />
            <FeatureItem
              icon="🌓"
              title={t('settings.theme')}
              description={t('home.themeDescription')}
            />
            <FeatureItem
              icon="🌐"
              title={t('home.i18nSupport')}
              description={t('home.i18nDescription')}
            />
            <FeatureItem
              icon="🔐"
              title={t('home.authSupport')}
              description={t('home.authDescription')}
            />
            <FeatureItem
              icon="💾"
              title={t('home.storageSupport')}
              description={t('home.storageDescription')}
            />
            <FeatureItem
              icon="⌨️"
              title="Keyboard Controller"
              description="Advanced keyboard handling for better UX"
            />
            <FeatureItem
              icon="🔔"
              title="Toast Messages"
              description="Beautiful in-app notifications"
            />
          </InfoCard>
        </AnimationView>

        {/* Best Practices Section */}
        <AnimationView delay={1200} animType="FadeIn" duration={800}>
          <InfoCard title={`💡 ${t('home.bestPractices')}`} icon="">
            <FeatureItem
              icon="📝"
              title="Naming Conventions"
              description="Use PascalCase for components, camelCase for functions"
            />
            <FeatureItem
              icon="🗂️"
              title="File Organization"
              description="Keep related files together, one component per file"
            />
            <FeatureItem
              icon="🎯"
              title="Component Design"
              description="Create small, reusable components with single responsibility"
            />
            <FeatureItem
              icon="🔐"
              title="Type Safety"
              description="Always define TypeScript types for props and state"
            />
          </InfoCard>
        </AnimationView>

        {/* Next Steps Section */}
        <AnimationView delay={1400} animType="FadeIn" duration={800}>
          <InfoCard title={`🎯 ${t('home.nextSteps')}`} icon="">
            <AppText style={styles.cardText}>
              1. Customize the theme in{' '}
              <AppText variant="semiBold" style={styles.highlight}>
                theme/colors.ts
              </AppText>
            </AppText>
            <AppText style={styles.cardText}>
              2. Add your screens in{' '}
              <AppText variant="semiBold" style={styles.highlight}>
                screens/
              </AppText>
            </AppText>
            <AppText style={styles.cardText}>
              3. Update navigation in{' '}
              <AppText variant="semiBold" style={styles.highlight}>
                navigation/
              </AppText>
            </AppText>
            <AppText style={styles.cardText}>
              4. Create reusable components in{' '}
              <AppText variant="semiBold" style={styles.highlight}>
                components/
              </AppText>
            </AppText>
            <AppText style={styles.cardText}>
              5. Configure your app name and bundle ID
            </AppText>
          </InfoCard>
        </AnimationView>

        {/* Footer */}
        <AnimationView delay={1600} animType="FadeIn" duration={800}>
          <View style={styles.footer}>
            <AppText variant="semiBold" size={18} style={styles.footerText}>
              {t('home.happyCoding')}
            </AppText>
            <AppText size={13} style={styles.footerSubtext}>
              {t('home.builtWith')}
            </AppText>
          </View>
        </AnimationView>
      </ScrollView>
    </FullScreenContainer>
  );
};

export default HomeScreen;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    header: {
      alignItems: 'center',
      marginBottom: 20,
      paddingTop: 10,
    },
    logo: {
      height: mobileScreenHeight * 0.15,
      width: mobileScreenWidth * 0.5,
      resizeMode: 'contain',
      marginBottom: 16,
    },
    welcomeText: {
      color: colors.textColor,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      color: hexWithOpacity(colors.textColor, 80),
      textAlign: 'center',
    },
    quickNavRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      gap: 12,
    },
    navCard: {
      flex: 1,
      backgroundColor: hexWithOpacity(colors.primary, 8),
      borderRadius: 14,
      padding: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: hexWithOpacity(colors.primary, 15),
    },
    navCardTitle: {
      color: colors.textColor,
      marginTop: 6,
    },
    cardText: {
      color: colors.textColor,
      lineHeight: 20,
      marginBottom: 8,
    },
    codeBlock: {
      backgroundColor: hexWithOpacity(colors.textColor, 6),
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
    },
    codeText: {
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      color: colors.textColor,
    },
    treeBlock: {
      backgroundColor: hexWithOpacity(colors.textColor, 5),
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
    },
    treeText: {
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      fontSize: 11,
      lineHeight: 16,
      color: colors.textColor,
    },
    highlight: {
      color: colors.primary,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    footer: {
      alignItems: 'center',
      marginTop: 24,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: hexWithOpacity(colors.textColor, 12),
    },
    footerText: {
      color: colors.primary,
      marginBottom: 4,
    },
    footerSubtext: {
      color: hexWithOpacity(colors.textColor, 80),
    },
  });
