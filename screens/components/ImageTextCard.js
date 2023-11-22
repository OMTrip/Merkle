import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Card, Cover} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
const ImageTextCard = props => {
  return (
    <>
      <Card style={styles.ImageBox}>
        <Card.Cover source={props.source} style={{height: hp(10)}} />

        <Card.Content style={{marginTop: hp(1), height: hp(8)}}>
          <Text
            variant="titleLarge"
            style={{fontSize: wp(3.5), fontWeight: "400"}}>
            {props.Title}
          </Text>

          <Text
            variant="bodyMedium"
            style={{color: '#87CEEB', fontSize: wp(3.5), fontWeight: "400"}}>
            {props.Text}
          </Text>
        </Card.Content>
        <LinearGradient
          colors={['#aa4b6b', 'transparent']}
          start={props.start == true ? {x: 1, y: 1} : {x: 0, y: 0}} // Start point of the gradient (top-left)
          end={props.end == true ? {x: 0, y: 1} : {x: 1, y: 0}} // End point of the gradient (top-right)
          style={styles.overlay}>
          <Text style={styles.text}>{props.imgtext}</Text>
        </LinearGradient>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  ImageBox: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginLeft: wp(5),
    marginBottom: hp(18),
    width: wp(38),
    backgroundColor: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(10),
  },
  text: {
    marginTop: hp(6),
    marginRight: hp(8),
    color: 'white',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});

export default ImageTextCard;
