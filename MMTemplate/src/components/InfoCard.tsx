import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from '@components/AppText';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@theme/Colors';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, icon }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {icon && (
          <AppText size="xlarge" style={styles.icon}>
            {icon}
          </AppText>
        )}
        <AppText variant="bold" size={18} style={styles.title}>
          {title}
        </AppText>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default InfoCard;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.backgroundColor,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.primary + '20',
      shadowColor: colors.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    icon: {
      marginRight: 8,
    },
    title: {
      color: colors.primary,
    },
    content: {
      gap: 8,
    },
  });
