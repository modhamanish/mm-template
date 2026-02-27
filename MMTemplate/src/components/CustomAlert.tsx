import React, { FC, memo, useState, useMemo } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import AppText from '@components/AppText';
import { useTheme } from '@src/context/ThemeContext';
import { ThemeType } from '@src/theme/Colors';
import { AlertOptionsProps } from '@src/types/components.types';
import { hexWithOpacity } from '@src/utils/utilsHelper';

let externalShow: ((opts: AlertOptionsProps) => void) | null = null;

const CustomAlert: FC = () => {
  const [stack, setStack] = useState<AlertOptionsProps[]>([]);
  const { t } = useTranslation();
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => getStyles(theme), [theme]);

  const show = (opts: AlertOptionsProps) => {
    const item: AlertOptionsProps = {
      title: opts.title || '',
      message: opts.message || '',
      onConfirm: opts.onConfirm,
      onCancel: opts.onCancel,
      onClose: opts.onClose,
      confirmText: opts.confirmText || t('common.ok'),
      cancelText: opts.cancelText || t('common.cancel'),
      boxStyle: opts.boxStyle,
      titleStyle: opts.titleStyle,
      messageStyle: opts.messageStyle,
      confirmButtonStyle: opts.confirmButtonStyle,
      cancelButtonStyle: opts.cancelButtonStyle,
      confirmTextStyle: opts.confirmTextStyle,
      cancelTextStyle: opts.cancelTextStyle,
      isCancellable: opts.isCancellable || false,
      isError: opts.isError || false,
    };

    setStack(prev => [...prev, item]);
  };

  const hideTop = () => {
    setStack(prev => prev.slice(0, -1));
  };

  externalShow = show;

  if (stack.length === 0) {
    return null;
  }

  const item = stack[stack.length - 1];

  return (
    <Modal visible transparent animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => {
          if (item.isCancellable || (!item.onCancel && !item.onConfirm)) {
            hideTop();
            item.onClose && item.onClose();
          }
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={[styles.box, item.boxStyle]}
        >
          {!!item.title && (
            <AppText
              variant="semiBold"
              size="xlarge"
              style={[
                styles.title,
                { color: item.isError ? colors.error : colors.primary },
                item.titleStyle,
              ]}
            >
              {item.title}
            </AppText>
          )}
          {!!item.message && (
            <AppText
              variant="regular"
              size="normal"
              color={colors.textColor}
              style={[styles.message, item.messageStyle]}
            >
              {item.message}
            </AppText>
          )}

          {item.onCancel || item.onConfirm ? (
            <View style={styles.btnRow}>
              {Boolean(item.onCancel || item.isCancellable) && (
                <TouchableOpacity
                  style={[
                    styles.btn,
                    { backgroundColor: colors.backgroundColor },
                    item.cancelButtonStyle,
                  ]}
                  onPress={() => {
                    hideTop();
                    item.onCancel && item.onCancel();
                  }}
                >
                  <AppText
                    variant="medium"
                    color={colors.textColor}
                    style={item.cancelTextStyle}
                  >
                    {item.cancelText}
                  </AppText>
                </TouchableOpacity>
              )}

              {item.onConfirm && (
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor: item.isError
                        ? colors.error
                        : colors.primary,
                    },
                    item.confirmButtonStyle,
                  ]}
                  onPress={() => {
                    hideTop();
                    item.onConfirm && item.onConfirm();
                  }}
                >
                  <AppText
                    variant="medium"
                    color={colors.white}
                    style={item.confirmTextStyle}
                  >
                    {item.confirmText}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const MemoAlert = memo(CustomAlert);

(
  MemoAlert as typeof MemoAlert & { show: (opts: AlertOptionsProps) => void }
).show = (opts: AlertOptionsProps) => externalShow && externalShow(opts);

export default MemoAlert as typeof MemoAlert & {
  show: (opts: AlertOptionsProps) => void;
};

export const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: hexWithOpacity(colors.black, 50),
      justifyContent: 'center',
    },
    box: {
      margin: 24,
      padding: 24,
      borderRadius: 16,
      borderWidth: 1,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      shadowColor: colors.textColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    title: {
      marginBottom: 12,
    },
    message: {
      lineHeight: 20,
    },
    btnRow: {
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    btn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginLeft: 12,
      borderRadius: 12,
      minWidth: 80,
      alignItems: 'center',
    },
  });
