import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Icons = props => {
  return (
    <>
      <View style={styles.box}>
        <View style={styles.imageBg}>
          <Image
            style={styles.image}
            source={props.imagePath}
            resizeMode="stretch"
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.Text}>{props.Text}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {   
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(18),
    marginBottom: wp(3),
  },
  imageBg: {   
    backgroundColor: '#F5F1FD',
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(1.5),
    shadowOffset: {height: hp(4)},
    shadowColor: '#999',
    elevation: 2,    
  },

  image: {
    width: wp(7),
    height: wp(7),
  },

  Text: {
    fontFamily:'Nunito-ExtraBold',
    color: '#666',
    fontSize: wp(2.8),
    // fontWeight: '500',
    paddingTop: 15,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});

export default Icons;
