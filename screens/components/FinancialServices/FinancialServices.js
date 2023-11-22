import React from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icons from '../Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';

const FinancialServices = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.box}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Financial Services</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
         >
          <View style={styles.iconsBox}>
            <TouchableOpacity onPress={() => {navigation.navigate('LicInsurance')}}>           
              <Icons
                imagePath={require('../../assets/services/insurance.png')}
                Text={'Lic/Insurance'}
                StyleProp={true}
              />
            </TouchableOpacity>
           
            <TouchableOpacity onPress={() => {navigation.navigate('LoanRepayment')}}>     
              <Icons
                imagePath={require('../../assets/services/loan-tax.png')}
                Text={'Loan Repayment'}
                StyleProp={true}
              />
            </TouchableOpacity>
           
            <TouchableOpacity onPress={() => {navigation.navigate('CreditCard')}}>     
              <Icons
                imagePath={require('../../assets/services/credit-cards.png')}
                Text={'Credit Card'}
                StyleProp={true}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('EMIPayments')}}> 
              <Icons
                imagePath={require('../../assets/services/loan-repayment.png')}
                Text={'EMI Payments'}
                StyleProp={true}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    // width: '100%',
    // borderBottomColor: 'rgba(0,0,0,0.4)',
    // borderBottomWidth: 0.5,
    // borderRadius: 40,
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
    marginBottom: wp(4),
  },

  title: {
    textTransform: 'uppercase',
    color: '#0B0B0C',
    fontWeight: '600',
  },
  iconsBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center'
  },
  line: {
    marginTop: hp(3),
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    borderBottomLeftRadius: wp(30),
    borderBottomRightRadius: wp(30),
    shadowOffset: {height: hp(4)},
    shadowColor: 'green',
    elevation: 8,
  },
});

export default FinancialServices;
