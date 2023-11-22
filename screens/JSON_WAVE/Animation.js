import React from 'react';
import Lottie from 'lottie-react-native';

export default function Animation(props) {
  return (
    <Lottie
      source={require('./fwave.json')}
      style={props.style}
      autoPlay
      loop
      resizeMode="cover"
      speed={0.7}      
    />
  );
}
  