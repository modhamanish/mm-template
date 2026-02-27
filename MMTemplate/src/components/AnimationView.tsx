import React, { FC, memo, useEffect } from 'react';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { AnimationViewProps } from '@src/types/components.types';

const AnimationView: FC<AnimationViewProps> = ({
  children,
  animType,
  duration = 500,
  delay = 0,
  rotateValue = 360,
  style,
}) => {
  const getInitialValue = () => {
    switch (animType) {
      case 'SlideInDown':
        return -100;
      case 'FadeOut':
      case 'ZoomOut':
        return 1;
      default:
        return 0;
    }
  };
  const animValue = useSharedValue(getInitialValue());

  const animStyle = useAnimatedStyle(() => {
    switch (animType) {
      case 'FadeIn':
      case 'FadeOut':
        return {
          opacity: animValue.value,
        };
      case 'ZoomIn':
      case 'ZoomOut':
        return {
          transform: [{ scale: animValue.value }],
        };
      case 'RotateIn':
      case 'RotateOut':
        return {
          transform: [{ rotate: animValue.value + 'deg' }],
        };
      case 'SlideInDown':
        return {
          transform: [{ translateY: animValue.value }],
        };
      default:
        return {};
    }
  });

  useEffect(() => {
    let targetValue = 0;
    let easing = Easing.inOut(Easing.ease);

    switch (animType) {
      case 'FadeIn':
        targetValue = 1;
        break;
      case 'FadeOut':
        targetValue = 0;
        break;
      case 'ZoomIn':
        targetValue = 1;
        easing = Easing.elastic(1);
        break;
      case 'ZoomOut':
        targetValue = 0;
        easing = Easing.elastic(1);
        break;
      case 'RotateIn':
      case 'RotateOut':
        targetValue = rotateValue;
        easing = Easing.elastic(1);
        break;
      case 'SlideInDown':
        targetValue = 0;
        easing = Easing.elastic(1);
        break;
    }

    animValue.value = withDelay(
      delay,
      withTiming(targetValue, { duration, easing }),
    );
  }, [animType, duration, delay, rotateValue, animValue]);
  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
};

export default memo(AnimationView);
