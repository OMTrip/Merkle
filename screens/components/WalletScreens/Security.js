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

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AutoLock from './AutoLock';
import LinearGradient from 'react-native-linear-gradient';

const Security = props => {
  const navigation = useNavigation();
  // const {back} = props.route.params;
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  

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
              // backgroundColor:'#ccc',
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(25),
              alignItems: 'center',
              // backgroundColor:'red'
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: hp(2.2),
                fontWeight: '600',
              }}>
              Security
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Browser', {
                searchdata: {
                  text: 'https://nute.io/security',
                  inapp: true,
                },
              });
            }}>
            <AntDesign name="infocirlceo" size={20} style={{color: '#444'}} />
          </TouchableOpacity>
        </View>

        <View style={styles.boxWrapper}>
          <View>
            <Text style={{color: '#333'}}>App Lock</Text>
          </View>
          <View>
            <Switch
              value={isVisible}
              onValueChange={toggleVisibility}
              trackColor={{false: '#E9E9E9', true: '#14b7af'}}
              thumbColor={isVisible ? '#eee' : '#ccc'}
              ios_backgroundColor="#3e3e3e"
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}} // Adjust size here
            />
          </View>
        </View>
        <View style={styles.lockWrapper}>
          <View style={styles.InfoBox}>
            <View style={styles.InnerWrapper}>
              <Text style={styles.labelName}>Auto-Lock</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AutoLock');
                }}>
                <View style={styles.displayHori}>
                  <Text style={styles.subLebel}>Immediate</Text>
                  <View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={20}
                      style={styles.infoIcon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.InfoBox}>
            <View style={styles.InnerWrapper}>
              <Text style={styles.labelName}>Lock Method</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LockMethod');
                }}>
                <View style={styles.displayHori}>
                  <Text style={styles.subLebel}>Passcode / Face ID</Text>
                  <View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={20}
                      style={styles.infoIcon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{marginVertical: wp(5)}}>
          <View>
            <Text style={styles.boxLabel}>Ask Authentication for</Text>
          </View>
          <View style={styles.boxWrapper}>
            <View>
              <Text style={{color: '#333'}}>Transaction Signing</Text>
            </View>
            <View>
              <Switch
                value={isVisible}
                onValueChange={toggleVisibility}
                trackColor={{false: '#E9E9E9', true: '#14b7af'}}
                thumbColor={isVisible ? '#eee' : '#ccc'}
                ios_backgroundColor="#3e3e3e"
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}} // Adjust size here
              />
            </View>
          </View>
        </View>

        <View>
          <View style={styles.boxWrapper}>
            <View>
              <Text style={{color: '#333'}}>Security Scanner</Text>
            </View>
            <View>
              <Switch
                value={isVisible}
                onValueChange={toggleVisibility}
                trackColor={{false: '#E9E9E9', true: '#14b7af'}}
                thumbColor={isVisible ? '#eee' : '#ccc'}
                ios_backgroundColor="#3e3e3e"
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
              />
            </View>
          </View>
          <Text style={[styles.boxLabel, {textTransform: 'none'}]}>
            Keep your assets safer with proactive warning for risky transactions
          </Text>
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
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
  },
  boxWrapper: {
    // backgroundColor: '#fff',
    paddingVertical: wp(2),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  boxLabel: {    
    fontSize: wp(3.3),
    paddingVertical: wp(1),
    paddingHorizontal: wp(5),
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: wp(1),
  },

  lockWrapper: {
    // backgroundColor: '#fff',
    borderRadius: wp(2),
    marginVertical: wp(5),
    paddingStart: 15,
  },

  InfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  InnerWrapper: {
    paddingStart: wp(1),
    borderBottomWidth: 0.4,
    borderBottomColor: '#d6c7ef',
    flex: 1,
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  labelName: {
    color: '#000',
    fontSize: wp(3.8),
  },

  subLebel: {
    color: '#888',
    fontSize: wp(3.8),
  },

  displayHori: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infoIcon: {
    color: '#999',
    paddingEnd: wp(3),
  },
});

export default Security;
