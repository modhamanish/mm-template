import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FullScreenContainer from '../components/FullScreenContainer';
import InfoCard from '../components/InfoCard';
import FeatureItem from '../components/FeatureItem';
import { Images } from '../assets/images';
import { ThemeType } from '../theme/Colors';
import { mobileScreenHeight, mobileScreenWidth } from '../utils/utilsHelper';
import { useTheme } from '../context/ThemeContext';
import AnimationView from '../components/AnimationView';
import { navigate } from '../utils/navigationUtils';
import Routes from '../navigation/routes';

const HomeScreen = () => {
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
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigate(Routes.ProfileScreen)}
            >
              <Text style={styles.profileButtonText}>
                {t('profile.profile')} →
              </Text>
            </TouchableOpacity>
            <AnimationView animType="ZoomIn" duration={1000}>
              <Image source={Images.logo} style={styles.logo} />
            </AnimationView>
            <AnimationView delay={400} animType="SlideInDown" duration={800}>
              <Text style={styles.welcomeText}>
                {t('home.welcomeToTemplate')}
              </Text>
              <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
            </AnimationView>
          </View>
        </AnimationView>

        {/* Quick Start Section */}
        <AnimationView delay={600} animType="FadeIn" duration={800}>
          <InfoCard title={`🚀 ${t('home.quickStart')}`} icon="">
            <Text style={styles.cardText}>{t('home.quickStartDesc')}</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>yarn install</Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>cd ios && pod install</Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>yarn ios / yarn android</Text>
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
              icon="🔧"
              title="utils/"
              description="Helper functions and utility methods."
            />
            <FeatureItem
              icon="📦"
              title="context/"
              description="React Context for global state management."
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
              title="Theme Support"
              description="Light/Dark mode ready with ThemeContext"
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
            <Text style={styles.cardText}>
              1. Customize the theme in{' '}
              <Text style={styles.highlight}>theme/Colors.ts</Text>
            </Text>
            <Text style={styles.cardText}>
              2. Add your screens in{' '}
              <Text style={styles.highlight}>screens/</Text>
            </Text>
            <Text style={styles.cardText}>
              3. Update navigation in{' '}
              <Text style={styles.highlight}>navigation/</Text>
            </Text>
            <Text style={styles.cardText}>
              4. Create reusable components in{' '}
              <Text style={styles.highlight}>components/</Text>
            </Text>
            <Text style={styles.cardText}>
              5. Configure your app name and bundle ID
            </Text>
          </InfoCard>
        </AnimationView>

        {/* Footer */}
        <AnimationView delay={1600} animType="FadeIn" duration={800}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('home.happyCoding')}</Text>
            <Text style={styles.footerSubtext}>{t('home.builtWith')}</Text>
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
    profileButton: {
      alignSelf: 'flex-end',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.primary,
      borderRadius: 20,
      marginBottom: 16,
    },
    profileButtonText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '600',
    },
    logo: {
      height: mobileScreenHeight * 0.15,
      width: mobileScreenWidth * 0.5,
      resizeMode: 'contain',
      marginBottom: 16,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.textColor,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textColor + 'CC',
      textAlign: 'center',
    },
    cardText: {
      fontSize: 14,
      color: colors.textColor,
      lineHeight: 20,
      marginBottom: 8,
    },
    codeBlock: {
      backgroundColor: colors.textColor + '10',
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
    },
    codeText: {
      fontFamily: 'monospace',
      fontSize: 13,
      color: colors.textColor,
    },
    highlight: {
      color: colors.primary,
      fontWeight: '600',
      fontFamily: 'monospace',
    },
    footer: {
      alignItems: 'center',
      marginTop: 24,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: colors.textColor + '20',
    },
    footerText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary,
      marginBottom: 4,
    },
    footerSubtext: {
      fontSize: 13,
      color: colors.textColor + 'CC',
    },
  });
