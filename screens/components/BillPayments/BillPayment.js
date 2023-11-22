import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icons from '../Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';

const BillPayment = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.box}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Bill Payments</Text>
        </View>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
        <View style={[styles.iconsBox, { marginBottom:wp(5)}]}>
          {/* <Link to="/ElectricityBill"> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ElectricityBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/electricity.png')}
              Text={'Electricity'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GasBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/fuel.png')}
              Text={'Gas'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WaterBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/water.png')}
              Text={'Water'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BroadbandBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/broadband.png')}
              Text={'Broadband'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LandlineBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/tele-phone.png')}
              Text={'Landline'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsBox}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LPGCylinderBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/lpg.png')}
              Text={'LPG Cylinder'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PipeGasBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/gaspipe.png')}
              Text={'Piped Gas'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MunicipalTaxes');
            }}>
            <Icons
              imagePath={require('../../assets/services/municiple.png')}
              Text={'Municipal Taxes'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CableTvBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/cable-tv.png')}
              Text={'Cable Tv'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PropertyTaxes');
            }}>
            <Icons
              imagePath={require('../../assets/services/propartytax.png')}
              Text={'Property Taxes'}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.iconsBox}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HospitalsBill');
            }}>
            <Icons
              imagePath={require('../../assets/services/hospital.png')}
              Text={'Hospitals'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FeePayments');
            }}>
            <Icons
              imagePath={require('../../assets/services/feespayment.png')}
              Text={'Fee Payments'}
            />
          </TouchableOpacity>
        </View> */}
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingBottom: 10,
    // marginTop:wp(4)
    // display: 'flex',
    // paddingBottom: 20,
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
   
  },
  line: {
    marginTop: hp(3),
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomLeftRadius: wp(30),
    borderBottomRightRadius: wp(30),
  },
});

export default BillPayment;
