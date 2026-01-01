import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';

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
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.title}>{title}</Text>
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
      shadowColor: colors.black,
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
      fontSize: 24,
      marginRight: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.primary,
    },
    content: {
      gap: 8,
    },
  });
