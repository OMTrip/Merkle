import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DEFAULT_SPEED = 300;
const DEFAULT_DELAY = 40;
const WHITE = '#ffffff';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  wrapper: {
    marginHorizontal: wp(2),
    marginTop: wp(3),
  },
  text: {
    color: WHITE,
    fontSize: 18,
  },
  cursor: {
    color: '#000',
    fontSize: 18,
  },
  whileTypingtxt: {
    color: '#000',
    fontSize: 20,
    // opacity: 0.3,
    fontWeight: '500',
    lineHeight: 45,
  },
  secondTypingtxt: {
    color: '#36cabd',
    fontSize: 20,
    // opacity: 0.3,
    fontWeight: '500',
    lineHeight: 45,
  },
});
const TypeWriter = ({
  textArray,
  speed = DEFAULT_SPEED,
  loop = false,
  delay = DEFAULT_DELAY,
  textStyle,
  cursorStyle,
}) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 2,
          useNativeDriver: true,
        }),
        Animated.delay(300),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 2,
          useNativeDriver: true,
        }),
        Animated.delay(300),
      ]),
    ).start();
  }, [opacityValue]);

  useEffect(() => {
    setTimeout(() => {
      if (textIndex < textArray[stringIndex].length) {
        setTextIndex(textIndex + 1);
      } else {
        if (stringIndex < textArray.length - 1) {
          setTimeout(() => {
            setTextIndex(0);
            setStringIndex(stringIndex + 1);
          }, delay);
        } else {
          if (loop) {
            setTimeout(() => {
              setTextIndex(0);
              setStringIndex(0);
            }, delay);
          } else {
            console.log('Hello');
            navigation.navigate("WalletScreen")
          }
        }
      }
    }, speed);
  });
  console.log(textArray[2].length, 'dfjhdfh');
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {stringIndex > 0 && (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                // opacity: 0.3,
                fontWeight: '500',
                lineHeight: 45,
              }}>
              {textArray[0].slice(0, 6)}
            </Text>
            <Text style={styles.secondTypingtxt}>
              {textArray[0].slice(-(27 - 6))}
            </Text>
          </View>
        )}
        {stringIndex > 1 && (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                // opacity: 0.3,
                fontWeight: '500',
                lineHeight: 45,
              }}>
              {textArray[1].slice(0, 8)}
            </Text>
            <Text style={styles.secondTypingtxt}>
              {textArray[1].slice(-(20 - 8))}
            </Text>
          </View>
        )}
        {stringIndex > 2 && (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                // opacity: 0.3,
                fontWeight: '500',
                lineHeight: 45,
              }}>
              {textArray[2].slice(0, 6)}
            </Text>
            <Text style={styles.secondTypingtxt}>
              {textArray[2].slice(-(27 - 6))}
            </Text>
          </View>
        )}

        <Text style={textStyle ? textStyle : styles.text}>
          {textArray[stringIndex].substring(0, textIndex)}
        </Text>
        {/* <Animated.View style={{opacity: opacityValue}}>
          <Text style={cursorStyle ? cursorStyle : styles.cursor}>|</Text>
        </Animated.View> */}
      </View>
    </View>
  );
};

export default TypeWriter;
