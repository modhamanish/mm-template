import React, { memo, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const AnimationView = ({
  children,
  animType,
  duration = 500,
  delay = 0,
  rotateValue = 360,
  style,
}: {
  children: React.ReactNode;
  animType:
    | 'FadeIn'
    | 'FadeOut'
    | 'ZoomIn'
    | 'ZoomOut'
    | 'RotateIn'
    | 'RotateOut'
    | 'SlideInDown';
  duration?: number;
  delay?: number;
  rotateValue?: number;
  style?: any;
}) => {
  const fadeAnim = useSharedValue(0);
  const zoomAnim = useSharedValue(0);
  const rotateAnim = useSharedValue(0);
  const translateAnim = useSharedValue(-100);

  const animStyle = useAnimatedStyle(() => {
    switch (animType) {
      case 'FadeIn':
        return {
          opacity: fadeAnim.value,
        };
      case 'FadeOut':
        return {
          opacity: fadeAnim.value,
        };
      case 'ZoomIn':
        return {
          transform: [{ scale: zoomAnim.value }],
        };
      case 'ZoomOut':
        return {
          transform: [{ scale: zoomAnim.value }],
        };
      case 'RotateIn':
        return {
          transform: [{ rotate: rotateAnim.value + 'deg' }],
        };
      case 'RotateOut':
        return {
          transform: [{ rotate: rotateAnim.value + 'deg' }],
        };
      case 'SlideInDown':
        return {
          transform: [{ translateY: translateAnim.value }],
        };
      default:
        return {};
    }
  });

  useEffect(() => {
    if (animType === 'FadeIn') {
      fadeAnim.value = withDelay(delay, withTiming(1, { duration: duration }));
    } else if (animType === 'FadeOut') {
      fadeAnim.value = withDelay(delay, withTiming(0, { duration: duration }));
    } else if (animType === 'ZoomIn') {
      zoomAnim.value = withDelay(
        delay,
        withTiming(1, { duration: duration, easing: Easing.elastic(1) }),
      );
    } else if (animType === 'ZoomOut') {
      zoomAnim.value = withDelay(
        delay,
        withTiming(0, { duration: duration, easing: Easing.elastic(1) }),
      );
    } else if (animType === 'RotateIn') {
      rotateAnim.value = withDelay(
        delay,
        withTiming(rotateValue, {
          duration: duration,
          easing: Easing.elastic(1),
        }),
      );
    } else if (animType === 'RotateOut') {
      rotateAnim.value = withDelay(
        delay,
        withTiming(rotateValue, {
          duration: duration,
          easing: Easing.elastic(1),
        }),
      );
    } else if (animType === 'SlideInDown') {
      translateAnim.value = withDelay(
        delay,
        withTiming(0, { duration: duration, easing: Easing.elastic(1) }),
      );
    }
  }, [animType, duration, delay, rotateValue]);
  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
};

export default memo(AnimationView);
