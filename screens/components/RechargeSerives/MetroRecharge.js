import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Link, useNavigation} from '@react-navigation/native';
import Carditems from './RechargeScreen/dth/Carditems';
import HomeHeader from '../HomeScreen/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';

const MetroRecharge = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
     <View         
        style={{
          // height: hp(10),
          paddingVertical: wp(3),
          justifyContent: 'center',
          paddingHorizontal: hp(2),
          backgroundColor:'#000'
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          title={'Metro'}
          TextTitle={true}
          leftIocnsSubScreen={false}
          LeftIconsName={'magnify'}
        />
      </View>
      
       <View style={styles.wrapper}>
       <View style={{marginHorizontal: wp(2), paddingBottom: wp(10)}}>
       <Carditems
          title={'Delhi Metro'}
          source={require('../../assets/DelhiMetro.png')}
          //onPress={() => navigation.navigate('Airteltv')}
        />
    
    
        <Carditems
          title={'Hyderabad Metro'}
          source={require('../../assets/HYDMetro.png')}
        />
     
     
        <Carditems
          title={'Mumbai Metro'}
          source={require('../../assets/MMRC_Logo.jpg')}
        />
        </View>

       </View>
      
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
  wrapper: {
    // backgroundColor: '#fff',
    // borderRadius: 10,   
    marginHorizontal: wp(2),
    
    marginTop: wp(3),  
  },
  
});

export default MetroRecharge;
