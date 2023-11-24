import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  Switch,
  Linking,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {Link, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const Preferences = props => {
  const navigation = useNavigation();

  return (
    <>
      <LinearGradient
        colors={[
          '#d6fffd',
          '#f2fffe',
          '#ffff',
          '#fff',
          '#fffaff',
          '#fef8ff',
          '#faf4ff',
          '#fcf5fe',
          '#f5eefe',
          '#f1e9fe',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
              <MaterialIcons
              name="arrow-back"
              size={25}
              color={'#000'}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text
              style={{
                color: '#444',
                fontSize: hp(2.2),
                fontWeight: '600',
                marginStart:wp(2)
              }}>
              Preferences
            </Text>
         
        </View>

        <View style={styles.boxWrapper}>
          <View>
          <Text style={styles.headingLabel}>Currency</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CurrencyPreference');
            }}>
            <View style={styles.displayHori}>
              <Text style={styles.boxLabel}>USD US-Dollar</Text>
              <MaterialIcons
                name="arrow-forward-ios"
                size={14}
                style={styles.infoIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxWrapper}>
          <View>
          <Text style={styles.headingLabel}>App Language</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LanguagePreference');
            }}>
            <View style={styles.displayHori}>
              <Text style={styles.boxLabel}>English</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                style={styles.infoIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.boxWrapper}>
          <View>
          <Text style={styles.headingLabel}>Browser</Text>
          </View>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={22}
              style={styles.infoIcon}
            />
          </View>
        </View>

        <View style={styles.boxWrapper}>
          <View>
            <Text style={{color: '#333'}}>Node Settings</Text>
          </View>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={22}
              style={styles.infoIcon}
            />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#F3F2F7',   
   
  // },
  header: {
    paddingVertical: hp(5),
    flexDirection: 'row',
    marginHorizontal: wp(4),
    alignItems:'center',
    marginBottom:wp(3)
  },
  boxWrapper: {
    paddingVertical: wp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(8),
  },

  boxLabel: {
    color: '#666',
    fontSize: wp(3.5),
    color: '#999',
  },

  displayHori: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingLabel:{
    color:'#000',
    fontSize:wp(4)
    // fontWeight:'500'

  },

  infoIcon: {
    color: '#999',
    marginStart: wp(1),
  },
});

export default Preferences;
