import React, { useState } from 'react';
// import { View, StyleSheet, Image, Canvas } from 'react-native-canvas';
// import { PanResponder } from 'react-native';

const CustomScratchCard = () => {
  // const [isScratching, setScratching] = useState(false);

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onMoveShouldSetPanResponder: () => true,
  //   onPanResponderGrant: () => {
  //     setScratching(true);
  //   },
  //   onPanResponderMove: (event) => {
  //     if (isScratching) {
  //       const { nativeEvent: { locationX, locationY } } = event;
  //       const context = this._canvas.getContext('2d');
  //       context.clearRect(locationX, locationY, 40, 40);
  //     }
  //   },
  //   onPanResponderRelease: () => {
  //     setScratching(false);
  //   },
  //   onPanResponderTerminate: () => {
  //     setScratching(false);
  //   },
  // });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* <Image
        source={require('../../assets/google-scratch-card.jpg')}
        style={styles.scratchCard}
      />
      <Canvas ref={canvas => this._canvas = canvas} />
      <View style={styles.overlay} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scratchCard: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

export default CustomScratchCard;