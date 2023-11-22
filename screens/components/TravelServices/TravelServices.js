import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import Icons from '../Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Link } from '@react-navigation/native';

const TravelServices = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.box}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Travel Services</Text>
        </View>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
          <View style={styles.iconsBox}>         
            <Icons
              imagePath={require('../../assets/services/plane.png')}
              Text={'Flight'}
            />
           
            <Icons imagePath={require('../../assets/services/hotels.png')} Text={'Hotel'} />
            <Icons
              imagePath={require('../../assets/services/bus.png')}
              Text={'Bus'}
            />
            <Icons imagePath={require('../../assets/services/car.png')} Text={'Car'} />
            <Icons
              imagePath={require('../../assets/services/chair.png')}
              Text={'Holidays'}
            />
          </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // display: 'flex',
    // paddingBottom: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderRadius: wp(2),
    backgroundColor: '#F2EDFC',
    paddingVertical: wp(2),
    paddingHorizontal:wp(3),
    width: '103%',
    marginBottom: wp(4),
  },

  title: {
    textTransform: 'uppercase',
    color: '#0B0B0C',
    fontWeight: '600',
  },
  iconsBox: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default TravelServices;
