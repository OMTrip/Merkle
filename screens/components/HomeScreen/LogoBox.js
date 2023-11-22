import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LogoBox = ({ImagePath, Title, onPress, logoBox}) => {
  return (
    <>
      {logoBox == true ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.rightBox}>
            <View style={styles.boxs}>
              <Image
                style={styles.image}
                // source={require('../assets/Rupee.png')}
                source={ImagePath}
                resizeMode="stretch"
              />
            </View>
            <View>
              <Text style={styles.Text}>{Title}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={{
              marginHorizontal: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={ImagePath} resizeMode="contain" style={styles.img} />
            <Text style={styles.text}>{Title}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxs: {
    justifyContent: 'center',
    width: wp(15),
    height: hp(7),
    borderRadius: wp(2),
    backgroundColor: 'white',
    // margin: wp(5),
    alignItems: 'center',
    //shadowOffset: {height: hp(90)},
    //shadowColor: 'black',
    elevation: 60,
  },
  image: {
    width: wp(8),
    height: hp(4),
  },
  Text: {
    fontSize: wp(3.2),
    marginTop: wp(1),
    color: 'black',
  },
  DefultrightBox: {
    backgroundColor: 'white',
  },
  Boxs: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(10),
    borderRadius: wp(2),
  },
  img: {
    width: wp(18),
    height: hp(6),
  },
  text: {
    color: 'black',
    fontSize: wp(3.8),
    fontWeight: '400',
    flex: 1,
  },
});

export default LogoBox;
