import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import AppText from '@components/AppText';
import { useTheme } from '@context/ThemeContext';
import { ThemeType } from '@src/theme/colors';
import { hexWithOpacity } from '@utils/utilsHelper';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showDrawer?: boolean;
  onBackPress?: () => void;
  onDrawerPress?: () => void;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Header: FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showDrawer = false,
  onBackPress,
  onDrawerPress,
  rightIcon,
  onRightPress,
  style,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleDrawer = () => {
    if (onDrawerPress) {
      onDrawerPress();
    } else {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {showDrawer ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleDrawer}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AppText variant="bold" size={22} style={styles.iconText}>
              ☰
            </AppText>
          </TouchableOpacity>
        ) : showBack ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AppText variant="bold" size={20} style={styles.iconText}>
              ←
            </AppText>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.titleContainer}>
        <AppText
          variant="bold"
          size={18}
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </AppText>
        {subtitle ? (
          <AppText size="small" style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>

      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.backgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: hexWithOpacity(colors.textColor, 8),
    },
    leftContainer: {
      width: 44,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightContainer: {
      width: 44,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: hexWithOpacity(colors.textColor, 6),
    },
    iconText: {
      color: colors.textColor,
    },
    title: {
      color: colors.textColor,
      textAlign: 'center',
    },
    subtitle: {
      color: hexWithOpacity(colors.textColor, 60),
      marginTop: 2,
    },
  });
