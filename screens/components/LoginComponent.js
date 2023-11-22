import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActionButton from 'react-native-action-button';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from './HomeScreen/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const LoginComponent = () => {
  const {login} = useSelector(state => state.user);
  const navigate=useNavigation()
  const navigateToOtherScreen=()=>{
    navigation.navigate('gotoOtpScreen');

  }

  
  return (
    <View style={{backgroundColor:"white"}}>
      <LinearGradient
        colors={['#52c234', 'transparent']}
        start={{x: 3.5, y: 1}} // Start point of the gradient (top-left)
        end={{x: 1, y: 0}} // End point of the gradient (top-right)
        style={{height: '100%'}}>
        <HomeHeader
          icons={true}
          iconName={'window-close'}
          size={wp(7)}
          imagePath={require('../assets/app_logo.png')}
        />
        <View style={styles.textArea}>
          <Text
            style={{
              fontSize: wp(5),
              fontWeight: "500",
              color: 'black',
            }}>
            Login or Create an Account
          </Text>
        </View>
        <View style={{marginTop: hp(10)}}>
          <Text style={styles.numtile}> Mobile Number</Text>
          <View style={{flexDirection: 'row', marginLeft: wp(9)}}>
            <View
              style={{
                borderBottomWidth: wp(0.6),
                borderBottomColor: '#087840',
                width: wp(13),
              }}>
              <Text style={{fontSize: wp(5)}}>
                +<Text style={{fontWeight: "500", fontSize: wp(6)}}>91</Text>
              </Text>
            </View>
            <TextInput style={styles.input} keyboardType={'numeric'}   onSubmitEditing={navigateToOtherScreen}/>
          </View>
        </View>
        <View
          style={{
            marginTop: hp(42),
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
            paddingHorizontal: 30,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              width: 50,
              height: 50,
              borderRadius: 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            //   onPress={() => {
            //     gotoOtpScreen();
            //   }}
          >
            <Text style={{color: 'white', fontSize: wp(4)}}>Go</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    marginTop: hp(3),
    marginHorizontal: wp(7),
  },
  title: {
    fontSize: wp(4),
    fontWeight: "300",
    color: '#bdc3c7',
  },
  input: {
    width: wp(70),
    borderBottomWidth: wp(0.6),
    paddingBottom: hp(1.5),
    borderBottomColor: '#087840',
    fontSize: wp(5),
  },
  numtile: {
    marginLeft: wp(8),
    fontSize: wp(4.5),
    fontWeight: "400",
    color: 'black',
  },
});

export default LoginComponent;