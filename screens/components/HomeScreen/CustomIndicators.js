import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomIndicators = ({ data, currentIndex }) => {
  return (
    <View style={styles.indicatorContainer}>
      {data.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            { opacity: index === currentIndex ? 1 : 0.5 },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginHorizontal: 5,
  },
});

export default CustomIndicators;
