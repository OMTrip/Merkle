import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Link, useNavigation} from '@react-navigation/native';
import Carditems from './RechargeScreen/dth/Carditems';
import HomeHeader from '../HomeScreen/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';

const Datacard = () => {
  const navigation = useNavigation();
  return (
    <>
      <LinearGradient
        colors={['#52c234', '#061700']}
        start={{x: 0, y: 0}} // Start point of the gradient (top-left)
        end={{x: 1, y: 0}} // End point of the gradient (top-right)
        style={{
          height: hp(10),
          justifyContent: 'center',
          paddingHorizontal: hp(3),
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          title={'Datacard'}
          TextTitle={true}
          leftIocnsSubScreen={true}
          LeftIconsName={'magnify'}
        />
      </LinearGradient>
      <Link to="/DatacardScreen" style={styles.Card}>
        <Carditems
          title={'Jio Fi'}
          source={require('../../assets/Jio-Logo.png')}
          onPress={() => navigation.navigate('Airteltv')}
        />
      </Link>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },

  Card: {
    margin: wp(1),
    backgroundColor: '#fff',
    // width:"100%",
  },
});

export default Datacard;
