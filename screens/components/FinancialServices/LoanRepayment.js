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

const LoanRepayment = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          // height: hp(10),
          paddingVertical: wp(3),
          justifyContent: 'center',
          paddingHorizontal: hp(2),
          backgroundColor: '#000',
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          title={'Loan Repayment'}
          TextTitle={true}
          leftIocnsSubScreen={false}
          LeftIconsName={'magnify'}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={{marginHorizontal: wp(2), paddingBottom: wp(10)}}>
          <Carditems
            title={'Aadhar Housing Finance Limited'}
            source={require('../../assets/AadharFinc.png')}
            onPress={() => navigation.navigate('Airteltv')}
          />
          <Carditems
            title={'AAVAS FINANCIERS LIMITED'}
            source={require('../../assets/AAVAS.png')}
          />
          <Carditems
            title={'Adani Capital Pvt Ltd'}
            source={require('../../assets/AdaniCapital.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    marginBottom:20
  },
  
  wrapper: {
   
    marginHorizontal: wp(2),
    marginTop: wp(3),
  },
});

export default LoanRepayment;
