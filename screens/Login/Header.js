import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const Header = ({imagePath, rightText, initialized}) => {
  const navigation = useNavigation();

  const gotoHomeScreen = () => {
    if (initialized) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.navigate('ConnetWallet');
    }
  };

  return (
    <>
      <View style={styles.headerbox}>
        <Image
          style={styles.image}
          // source={require('../assets/ZuelPay.png')}
          source={imagePath}
          resizeMode="stretch"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerbox: {
    position: 'absolute',
    top: '10%',
    left: '5%',
  },

  image: {
    width: wp(24),
    height: hp(4),
  },
});

export default Header;
