import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../HomeScreen/HomeHeader';
import Carditems from '../RechargeSerives/RechargeScreen/dth/Carditems';

const CreditCard = () => {
  const navigation = useNavigation();
  return (
    <>
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
          title={'Credit Card'}
          TextTitle={true}
          leftIocnsSubScreen={false}
          LeftIconsName={'magnify'}
        />
      </View>

      <View style={styles.wrapper}>
        <View style={{marginHorizontal: wp(2), paddingBottom: wp(10)}}>
          <Carditems
            title={'Amex Card'}
            source={require('../../assets/Amex.png')}
            onPress={() => navigation.navigate('Airteltv')}
          />
          <Carditems title={'Diners'} source={require('../../assets/Diners.png')} />
          <Carditems
            title={'Master card'}
            source={require('../../assets/MasterCard.png')}
          />
          <Carditems
            title={'Visa card'}
            source={require('../../assets/Visa.png')}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    marginBottom:20
  },
  radioBox: {
    flexDirection: 'row',
    marginTop: hp(7),
    marginLeft: wp(6),
  },
  text: {
    marginTop: hp(0.5),
    fontSize: wp(4.5),
    fontWeight: '300',
  },
  btn: {
    marginTop: hp(63),
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(8),
  },
  input: {
    borderBottomWidth: 1,
  },
  inputbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(10),
  },
  input: {
    width: wp(70),
    borderBottomWidth: wp(0.4),
    paddingBottom: hp(1.5),
    borderBottomColor: 'grey',
    fontSize: wp(5),
  },
  icons: {
    width: wp(10),
    borderBottomWidth: wp(0.4),
    marginTop: hp(1),
    borderBottomColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {   
    marginHorizontal: wp(2),
    marginTop: wp(3),  
  },
});

export default CreditCard;
