import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const SkeletonLoader = () => {
  const animatedValue = new Animated.Value(0);

  const shimmerAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  );

  shimmerAnimation.start();

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ActivityIndicator animating={true} color="#fff" />
        <Animated.View
          style={[styles.shimmer, { transform: [{ translateX }] }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  item: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmer: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    height: '100%',
  },
});

export default SkeletonLoader;
