import React, {useMemo} from 'react';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Pressable, Text, TouchableOpacity} from 'react-native';
import { Colors } from '../../../assets/colors';

// const CustomBackdrop = ({ animatedIndex, style, dismissModal }: BottomSheetBackdropProps) => {
const CustomBackdrop = ({animatedIndex, style, dismissModal}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      <Pressable
        onPress={() => dismissModal()}
        style={{
          backgroundColor: Colors.transparent,
          width: '100%',
          height: '100%',
        }}
      />
    </Animated.View>
  );
};

export default CustomBackdrop;
