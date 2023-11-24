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
  TouchableNativeFeedback,
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const AutoLock = props => {
  const navigation = useNavigation();

  const [isSelected, setIsSelected] = useState(true);

  const handlePress = () => {
    setIsSelected(!isSelected);
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
        style={{flex: 1, paddingHorizontal:wp(4)}}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={25} color={'#000'} />
          </Pressable>
         
            <Text
              style={{
                color: '#000',
                fontSize: hp(2.2),
                fontWeight: '600',
                marginStart:wp(2)
              }}> 
              Auto-Lock
            </Text>
          
        </View>

        <View style={styles.lockWrapper}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.InfoBox}>
              <View style={styles.InnerWrapper}>
                <Text style={styles.labelName}>Immediate</Text>
                <View style={styles.displayHori}>
                  <View style={{marginEnd:wp(5)}}>
                    {isSelected && (
                      <AntDesign name="check" size={18} color="#25d366" style={{fontWeight:'600'}}/>
                    )}              
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.InfoBox}>
            <View style={styles.InnerWrapper}>
              <Text style={styles.labelName}>If away for 1 minute</Text>
              <View style={styles.displayHori}>
              <View style={{marginEnd:wp(5)}}>
                    {/* {isSelected && (
                      <AntDesign name="check" size={18} color="#25d366" style={{fontWeight:'600'}}/>
                    )} */}
                  </View>
              </View>
            </View>
          </View>
          <View style={styles.InfoBox}>
            <View style={styles.InnerWrapper}>
              <Text style={styles.labelName}>If away for 5 minute</Text>
              <View style={styles.displayHori}>
              <View style={{marginEnd:wp(5)}}>
                    {/* {isSelected && (
                      <AntDesign name="check" size={18} color="#25d366" style={{fontWeight:'600'}}/>
                    )} */}
                  </View>
              </View>
            </View>
          </View>
          <View style={styles.InfoBox}>
            <View style={styles.InnerWrapper}>
              <Text style={styles.labelName}>If away for 1 hour</Text>
              <View style={styles.displayHori}>
              <View style={{marginEnd:wp(5)}}>
                    {/* {isSelected && (
                      <AntDesign name="check" size={18} color="#25d366" style={{fontWeight:'600'}}/>
                    )} */}
                  </View>
              </View>
            </View>
          </View>
          <View style={styles.InfoBox}>
            <View style={styles.InnerWrapper}>
              <Text style={styles.labelName}>If away for 5 hours</Text>
              <View style={styles.displayHori}>
              <View style={{marginEnd:wp(5)}}>
                    {/* {isSelected && (
                      <AntDesign name="check" size={18} color="#25d366" style={{fontWeight:'600'}}/>
                    )} */}
                  </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
 
  header: {
    alignItems:'center',
    paddingVertical: hp(5),
    flexDirection: 'row',
  },
  boxWrapper: {
    backgroundColor: '#fff',
    paddingVertical: wp(2),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: wp(8),
  },

  boxLabel: {
    color: '#999',
    fontSize: wp(3.3),
    paddingVertical: wp(1),
    paddingHorizontal: wp(5),
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: wp(1),
  },

  lockWrapper: {
    borderRadius: wp(2),
    marginVertical: wp(3),
    paddingHorizontal:wp(2)
  },

  InfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: wp(2),
  },
  InnerWrapper: {
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

export default AutoLock;
