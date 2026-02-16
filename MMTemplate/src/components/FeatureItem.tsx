import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <AppText size="large" style={styles.icon}>
        {icon}
      </AppText>
      <View style={styles.textContainer}>
        <AppText variant="semiBold" size={15} style={styles.title}>
          {title}
        </AppText>
        <AppText size={13} style={styles.description}>
          {description}
        </AppText>
      </View>
    </View>
  );
};

export default FeatureItem;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    icon: {
      marginRight: 12,
      marginTop: 2,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      color: colors.textColor,
      marginBottom: 2,
    },
    description: {
      color: colors.textColor + 'CC',
      lineHeight: 18,
    },
  });
