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

const Notification = props => {
  const navigation = useNavigation();
  // const {back} = props.route.params;
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleLinkPress = () => {
    const url = 'https://nute.io/security'; // Replace with your external link
    Linking.openURL(url);
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
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
              <MaterialIcons
              name="arrow-back"
              size={25}
              color={'#000'}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                color: '#000',
                fontSize: hp(2.2),
                fontWeight: '600',
                marginStart:wp(2)
              }}>
              Notifications
            </Text>
          </TouchableOpacity>
         
        </View>

        <View style={styles.mainWrapper}>
          <View style={styles.boxWrapper}>
            <View>
              <Text style={styles.headingLabel}>Push Notifications</Text>
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
          <Text style={[styles.boxLabel, {textTransform: 'none'}]}>
            Be the first to learn about our newest features
          </Text>
        </View>

        <View style={styles.mainWrapper}>
          <View style={styles.boxWrapper}>
            <View>
              <Text style={styles.headingLabel}>SMS Notification</Text>
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
          <Text style={[styles.boxLabel, {textTransform: 'none'}]}>
            Get the SMS Notification on every transactions
          </Text>
        </View>

        <View style={styles.mainWrapper}>
          <View style={styles.boxWrapper}>
            <View>
              <Text style={styles.headingLabel}>Send and Recieve</Text>
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
            You will be notified for sent and recieved transactions
          </Text>
        </View>

        <View style={styles.mainWrapper}>
          <View style={styles.boxWrapper}>
            <View>
              <Text style={styles.headingLabel}>Decentralized Utility</Text>
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
            Be the first to know about Decentralized utility
          </Text>
        </View>

        <View style={styles.mainWrapper}>
          <View style={styles.boxWrapper}>
            <View>
              <Text style={styles.headingLabel}>UCPI Notification</Text>
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
            Be the first to get UCPI Notification
          </Text>
        </View>

        <View style={styles.mainWrapper}>
          <View style={styles.boxWrapper}>
            <View>
              <Text style={styles.headingLabel}>Announcement</Text>
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
            Be the first to know about new features
          </Text>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F7',   
    // alignItems: 'center',
  },
  header: {
    paddingVertical: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginBottom:wp(3)
  },

  mainWrapper:{
    marginVertical:wp(3),
    paddingHorizontal:wp(1)
  },
  boxWrapper: {
    // paddingVertical: wp(2),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop:wp(2)
    // marginBottom: wp(8),
  },
  headingLabel:{
    color:'#000',
    fontSize:wp(4)
    // fontWeight:'500'

  },

  boxLabel: {   
    fontSize: wp(3.3),
    // paddingVertical: wp(1),
    paddingHorizontal: wp(5),
    textTransform: 'uppercase',
    color: '#666',
    marginBottom: wp(1),
  },

  lockWrapper: {
    backgroundColor: '#fff',
    borderRadius: wp(2),
    marginVertical: wp(5),
    paddingStart: 15,
  },

  InfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: wp(2),
  },
  InnerWrapper: {
    paddingStart: wp(1),
    borderBottomWidth: 0.187,
    borderBottomColor: '#ccc',
    flex: 1,
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
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

  heading: {
    color: '#999',
    fontSize: hp(1.5),
    marginTop: hp(2),
    textTransform: 'uppercase',
    paddingHorizontal: wp(3),
  },

  card: {
    marginBottom: hp(2),
    marginTop: wp(1),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
    backgroundColor: '#fff',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ImageShield: {
    paddingHorizontal: wp(4),
    marginEnd: wp(3),
    position: 'relative',
  },

  checkIconbg: {
    position: 'absolute',
    top: -7,
    right: 0,
  },

  walletWrapper: {
    paddingStart: wp(1),
    borderBottomWidth: 0.187,
    borderBottomColor: '#eee',
    flex: 1,
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
  },
  infoIcon: {
    color: '#999',
    paddingEnd: wp(3),
  },

  walletName: {
    color: '#000',
    fontWeight: '400',
    fontSize: wp(4),
    textTransform: 'capitalize',
  },
  walletAddress: {
    color: '#999',
    fontSize: wp(3.2),
  },

  sheetContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: wp(5),
    alignItems: 'center',
  },

  selectWallet: {
    backgroundColor: '#f3f2f7',
    width: wp(90),
    borderRadius: wp(4),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f4f3f7',
    marginBottom: wp(3),
    marginHorizontal: wp(3),
  },
  selectWalletInner: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  arrowBg: {
    backgroundColor: '#e2e3f5',
    height: wp(8),
    width: wp(8),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#eee',
    marginStart: wp(3),
  },
});

export default Notification;
