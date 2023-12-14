import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomSheetComp from './BottomSheetComp';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {setLogin} from '../../../Store/userinfo';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn} from '../../../Store/authSlice';

export default function ConnetWallet() {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();


  return (
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
      style={{paddingBottom: wp(5), flex: 1}}>
      <View style={styles.header}>
        {/* <Text style={{color: '#000'}}>
          <Octicons name="chevron-left" size={30} color="#000"></Octicons>
        </Text> */}
        {/* <Text style={{color: '#000', fontSize: wp(5)}}>Add Wallet</Text> */}
      </View>
      <View style={styles.imgView}>
        <Image
          style={{width: wp(60), height: wp(80)}}
          source={require('../../assets/key-unlock-wallet.png')}
          resizeMode="contain"
        />
        <Text style={styles.text}>Welcome to Merkle Wallet</Text>
      </View>

      <View style={{justifyContent: 'center', marginTop: wp(45)}}>
        <TouchableWithoutFeedback
          // onPress={() => refRBSheet.current.open()}>
          onPress={() => [
            navigation.navigate('CreateNewWallet', {add: false}),
           
          ]}>
          <View style={styles.boxView}>
            <View style={styles.BoxText}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp(4.2),
                  // width: wp(50),
                  textAlign: 'center',
                }}>
                Create a Wallet
              </Text>
              <Text
                style={{color: '#ccc', fontSize: wp(3.2), textAlign: 'center'}}>
                I do not have a wallet
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.boxView2, {marginTop: wp(5)}]}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',
              width: wp(70),
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: wp(4.2),
                // width: wp(50),
                textAlign: 'center',
              }}>
              Import a Wallet{' '}
            </Text>
            <Text
              style={{color: '#000', fontSize: wp(3.2), textAlign: 'center'}}>
              Import mnemonic phrases or private keys
            </Text>
          </View>
        </View>
      </View>
      <BottomSheetComp refRBSheet={refRBSheet} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 30,
    // marginRight: wp(29),
  },
  imgView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: wp(7),
    // width: wp(35),
    textAlign: 'center',
    // marginTop: wp(5),
    fontWeight: 'bold',
    paddingHorizontal: wp(14),
  },
  boxView: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    width: wp(80),
    paddingVertical: wp(3),
    // marginTop: wp(10),
    borderRadius: wp(10),
    backgroundColor: '#000',
  },
  boxView2: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    width: wp(80),
    paddingVertical: wp(3),
    // marginTop: wp(10),
    borderRadius: wp(10),
    // backgroundColor:'#fff'
  },
  BoxImg: {
    width: wp(10),
    height: hp(5),
    marginTop: wp(4),
    marginLeft: wp(3.5),
  },
  BoxText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(70),
  },
});
