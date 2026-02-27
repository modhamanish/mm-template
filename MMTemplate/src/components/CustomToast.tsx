import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '@components/AppText';

type CustomToastProps = {
  text1?: string;
  onPress?: () => void;
  type: 'success' | 'error';
};

export const CustomToast = ({ text1, onPress, type }: CustomToastProps) => {
  const backgroundColor = type === 'success' ? '#4CAF50' : '#ff3f3f';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <AppText variant="medium" style={styles.text}>
        {text1}
      </AppText>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <AppText variant="semiBold" size="body" style={styles.buttonText}>
            OK
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 15,
    width: '90%',
    marginTop: 20,
    borderRadius: 5,
    gap: 12,
  },
  text: {
    flex: 1,
    color: 'white',
  },
  buttonText: {
    color: 'white',
  },
});
