import React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import OtpBox from './OtpBox';
import {useSelector} from 'react-redux';

const OtpScreen = props => {
  const navigation = useNavigation();
  const {initialized} = useSelector(state => state.wallet);
  const goBackLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };
  const {callback} = props.route.params;
  const checkOtp = async otp => {
    try {
      // if (otp == props.route.params.otp) {
      // Alert.alert('Login Successfully');
      const res = await callback.confirm(code);
      console.log(res, ' verified res');
      // navigation.navigate(initialized ? 'HomeScreen' : 'ConnetWallet');
    } catch (e) {
      console.log(e, 'error in otp auth');
      if (otp !== props.route.params.otp) {
        Alert.alert('Invalid otp please check');
      }
    }
    // } else if (otp.length == 6) {
    // if (otp !== props.route.params.otp) {
    // Alert.alert('Invalid otp please check');
    // }
    // }
  };

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
  //     setKeyboardOpen(true);
  //   });

  //   const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardOpen(false);
  //   });

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <LinearGradient
        colors={['#d6fffd', '#fff','#f1e9fe']}
        start={{x: 2, y: 0.5}}
        end={{x: 2, y: 1.1}}
        style={styles.otpBox}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingVertical: 25,
            paddingHorizontal: 20,
          }}>
          <Icon
            name="remove"
            size={30}
            color="black"
            onPress={() => goBackLoginScreen()}
          />
          {/* <Text>Close</Text> */}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            //   marginTop: wp(15),
          }}>
          <Text style={{fontSize: wp(4.5), fontWeight: '600', color: 'black'}}>
            Verification OTP
          </Text>
          <View style={{marginTop: '5%'}}>
            <Text style={styles.TextStyle}>
              One Time Password (OTP) has been sent{' '}
            </Text>
            <Text style={styles.TextStyle}>
              to your registered number ******8809
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <OtpBox checkOtp={checkOtp} />
        </View>
        <View style={styles.BorderStyle}>
          <Text
            style={{
              borderColor: 'black',
              borderTopWidth: 1,
              flex: 0.4,
            }}></Text>
          <Text style={styles.OtpText}>OTP</Text>
          <Text
            style={{
              borderColor: 'black',
              borderTopWidth: 1,
              flex: 0.4,
            }}></Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '10%',
            paddingVertical: 20,
          }}>
          <Text style={{}}>Not Received OTP</Text>
          <Text style={{fontWeight: '800'}}>Resend OTP</Text>
        </View>
      </LinearGradient>
      {/* <Image
        source={require('../assets/otpImage.png')}
        resizeMode="contain"
        style={styles.ImgStyle}
      /> */}
    </View>
  );
};
// backgroundColor:"#90EE90"
const styles = StyleSheet.create({
  otpBox: {
    flex: 1,
    backgroundColor: '#fff',
    // borderRadius: 30,
  },
  TextStyle: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: 'black',
  },
  BorderStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  OtpText: {
    flex: 0.2,
    textAlign: 'center',
    marginTop: -10,
  },
  ImgStyle: {
    flex: 0.3,
    width: '100%',
    // height: isKeyboardOpen ? "40%" :""
  },
});

export default OtpScreen;
