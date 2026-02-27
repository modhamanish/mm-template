import React, { FC } from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Images } from '@assets/images';
import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FeatureItem from '@components/FeatureItem';
import FullScreenContainer from '@components/FullScreenContainer';
import InfoCard from '@components/InfoCard';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@theme/Colors';
import {
  hexWithOpacity,
  mobileScreenHeight,
  mobileScreenWidth,
} from '@utils/utilsHelper';

const HomeScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <FullScreenContainer style={styles.container} barStyle="light-content">
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
            <FeatureItem
              icon="📱"
              title="screens/"
              description="All your screen components. Add new screens here."
            />
            <FeatureItem
              icon="🧩"
              title="components/"
              description="Reusable UI components used across screens."
            />
            <FeatureItem
              icon="🧭"
              title="navigation/"
              description="Navigation setup with AuthStack and AppStack."
            />
            <FeatureItem
              icon="🎨"
              title="theme/"
              description="Centralized colors and styling configuration."
            />
            <FeatureItem
              icon="🌍"
              title="locales/"
              description={t('home.localesDescription')}
            />
            <FeatureItem
              icon="🧪"
              title="mock/"
              description={t('home.mockDescription')}
            />
            <FeatureItem
              icon="🔧"
              title="utils/"
              description="Helper functions and utility methods."
            />
            <FeatureItem
              icon="📦"
              title="context/"
              description="React Context for global state management."
            />
            <FeatureItem
              icon="🖼️"
              title="assets/"
              description={t('home.assetsDescription')}
            />
            <FeatureItem
              icon="⚡"
              title="services/"
              description={t('home.servicesDescription')}
            />
            <FeatureItem
              icon="🏷️"
              title="types/"
              description={t('home.typesDescription')}
            />
          </InfoCard>
        </AnimationView>

        {/* Features Section */}
        <AnimationView delay={1000} animType="FadeIn" duration={800}>
          <InfoCard title={`✨ ${t('home.includedFeatures')}`} icon="">
            <FeatureItem
              icon="⚡"
              title="React Navigation v7"
              description="Pre-configured navigation with stack navigators"
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
                theme/Colors.ts
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
      marginBottom: 24,
      paddingTop: 20,
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
      fontFamily: 'monospace',
      color: colors.textColor,
    },
    highlight: {
      color: colors.primary,
      fontFamily: 'monospace',
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
