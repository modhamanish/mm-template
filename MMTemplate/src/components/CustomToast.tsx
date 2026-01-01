import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CustomToastProps = {
  text1?: string;
  onPress?: () => void;
  type: 'success' | 'error';
};

export const CustomToast = ({ text1, onPress, type }: CustomToastProps) => {
  const backgroundColor = type === 'success' ? '#4CAF50' : '#ff3f3f';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{text1}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.buttonText}>OK</Text>
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
    fontWeight: '500',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
