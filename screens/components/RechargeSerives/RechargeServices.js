import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icons from '../Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';

const RechargeServices = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.box}>
        <View style={styles.titleWrapper}>
        <Text style={styles.title}>Recharge Services</Text>
        </View>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
          <View style={styles.iconsBox}>
            
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MobileRecharge');
              }}>
              <Icons
                imagePath={require('../../assets/services/mobile-recharge.png')}
                Text={'Mobile'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DthRecharge');
              }}>
              <Icons
                imagePath={require('../../assets/services/dish.png')}
                Text={'DTH'}
              />
            </TouchableOpacity>
            <TouchableOpacity             
              onPress={() => {
                navigation.navigate('FastagRecharge');
              }}>
              <Icons
                imagePath={require('../../assets/services/fast-tag.png')}
                Text={'Fastag'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              
              onPress={() => {
                navigation.navigate('MetroRecharge');
              }}>
              <Icons
                imagePath={require('../../assets/services/metro.png')}
                Text={'Metro'}
              />
            </TouchableOpacity>
            <TouchableOpacity            
              onPress={() => {
                navigation.navigate('DatacardRecharge');
              }}>
              <Icons
                imagePath={require('../../assets/services/datacard.png')}
                Text={'Datacard'}
              />
            </TouchableOpacity>
          </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // display: 'flex',
    paddingBottom: 10,
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
    marginVertical: wp(4),
  },

  title: {
    textTransform: 'uppercase',
    color: '#0B0B0C',
    fontWeight: '600',
  },
  iconsBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RechargeServices;
