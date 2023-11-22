import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animation from '../../JSON_WAVE/Animation';

const AddCard = (props, {imagePath, start, end}) => {
  return (
    <View style={styles.linearView}>
      <LinearGradient
        colors={['#3b3b3b', '#061700']}
        start={start == true ? {x: 1, y: 1} : {x: 0, y: 0}} // Start point of the gradient (top-left)
        end={end == true ? {x: 0, y: 1} : {x: 1, y: 0}} // End point of the gradient (top-right)
        // style={styles.linearView}
                >
        <View style={styles.TextView}>
          <Text style={styles.Text_Title}>{props.Title} </Text>
          <Text style={styles.Text}>{props.Text}</Text>
        </View>

        <Image
          style={styles.image}
          source={props.imagePath}
          resizeMode="stretch"
        />
       {/* <Text style={{position:"absolute"}}>Hello</Text> */}
       <Animation
          style={{
            position: 'absolute',
            top: '54%',
            width: '100%',
          }}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearView: {
    // flex:1,
    // marginLeft: wp(25),
    width: '78%',
    height: hp(10.2),
    borderRadius: wp(3),
    flexDirection: 'column',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    overflow:"hidden"
  },
  TextView: {
    marginLeft: wp(2.5),
  },
  image: {
    borderRadius: wp(5),
    marginTop: hp(-7),
    marginLeft: wp(54),
    // backgroundColor:"black",
    width: wp(20),
    height: hp(10),
  },
  Text_Title: {
    marginTop: hp(1),
    width: wp(40),
    color: 'white',
    fontSize: wp(4.5),
    fontWeight: "400",
  },
  Text: {
    width: wp(50),
    marginTop: hp(1.5),
    color: '#D3D3D3',
    fontSize: wp(3),
    fontWeight: "400",
  },
  animation: {
    margin: 10,
  },
});

export default AddCard;
