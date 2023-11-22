import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Carousel} from 'react-native-auto-carousel';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carditems from '../RechargeSerives/RechargeScreen/dth/Carditems';
import LogoBox from '../HomeScreen/LogoBox';
import HomeHeader from '../HomeScreen/HomeHeader';
import SliderCardMore from '../SliderCardMore';
import {Link, useNavigation} from '@react-navigation/native';

let Data = [
  {
    image: require('../../assets/moneytransfer.png'),
    nav: 'GasBill',
  },
  {
    image: require('../../assets/creditcardbill.png'),
    nav: 'CardInner',
  },
  {
    image: require('../../assets/moneytransfer.png'),
    nav: 'CardInner',
  },
  {
    image: require('../../assets/moneytransfer.png'),
    nav: 'CardInner',
  },
  {
    image: require('../../assets/moneytransfer.png'),
    nav: 'CardInner',
  },
];
let listData = [
  {
    id: 1,
    Title: 'Add Money',
    image: require('../../assets/AddMoney.png'),
  },
  {
    id: 2,
    Title: 'Rewards',
    image: require('../../assets/Rewards.png'),
  },
  {
    id: 3,
    Title: 'Wallet Transfer',
    image: require('../../assets/walletTransfer.png'),
  },
  {
    id: 4,
    Title: 'Payout',
    image: require('../../assets/Payout.png'),
  },
  {
    id: 5,
    Title: 'Commission',
    image: require('../../assets/Commission.png'),
  },
  {
    id: 6,
    Title: 'My Transactions',
    image: require('../../assets/MyTransactions.png'),
  },
  {
    id: 7,
    Title: 'Share & Earn',
    image: require('../../assets/Share&Earn.png'),
  },
];

const More = (props) => {
  const goToCardItems = nav => {
    console.log(nav, 'nav');
    props.navigation.navigate(nav);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F2F3F4'}}>
      <ScrollView>
        <LinearGradient
          colors={['#52c234', '#061700']}
          start={{x: 0, y: 0}} // Start point of the gradient (top-left)
          end={{x: 1, y: 0}} // End point of the gradient (top-right)
          style={{height: hp(10)}}>
          <HomeHeader
            icons={true}
            iconName={'keyboard-backspace'}
            size={wp(8)}
            imagePath={require('../../assets/app_logo.png')}
            leftIocns={true}
            LeftIconsName={'question'}
          />
        </LinearGradient>
        <View style={styles.card}>
          <SliderCardMore />
        </View>
        <View style={styles.SecondCard}>
          <Carousel
            data={Data}
            autoPlay={false}
            dotStyle={{display: 'none'}}
            
            renderItem={(item, index) => (
              <TouchableOpacity onPress={()=>goToCardItems(`${item?.nav}`)}>
                <Image
                  source={item.image}
                  key={index}
                  resizeMode="cover"
                  style={styles.image}
                  
                />
               </TouchableOpacity>
            )}
            
          />
        </View>
        <View style={styles.SecondCard}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={listData}
            renderItem={({item , i}) => (
              <LogoBox ImagePath={item.image} Title={item.Title} key={i} />
            )}
            style={{height: hp(30)}}
          />
        </View>

        <View style={styles.Carditems}>
          <Link to="/MobileRecharge" style={styles.Card}>
            <Carditems
              title={'Mobile'}
              backgroundColor={'white'}
              source={require('../../assets/mobile.png')}
            />
          </Link>
          <Link to="/DthRecharge" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Dth'}
              source={require('../../assets/dth.png')}
            />
          </Link>
          <Link to="/FastagRecharge" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Fastag'}
              source={require('../../assets/fastag.png')}
            />
          </Link>
          <Link to="/MetroRecharge" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Metro'}
              source={require('../../assets/metro.png')}
            />
          </Link>
          <Link to="/Datacard" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Datacard'}
              source={require('../../assets/datacard.png')}
            />
          </Link>
          <Text style={styles.title}>Bill Payments</Text>
          <Link to="/ElectricityBill" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Electricity'}
              source={require('../../assets/Asset30.png')}
            />
          </Link>
          <Link to="/GasBill" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Gas'}
              source={require('../../assets/Asset29.png')}
            />
          </Link>
          <Link to="/WaterBill" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Water'}
              source={require('../../assets/Asset28.png')}
            />
          </Link>
          <Link to="/BroadbandBill" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'BroadBand'}
              source={require('../../assets/Asset27.png')}
            />
          </Link>
          <Link to="/LandlineBill" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Landline'}
              source={require('../../assets/Asset26.png')}
            />
          </Link>
          <Link to="/LPGCylinderBill" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'LPG Cylinder'}
              source={require('../../assets/Asset25.png')}
            />
          </Link>
          <Link to="/PipeGasBill" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Piped Gas'}
              source={require('../../assets/Asset24.png')}
            />
          </Link>
          <Link to="/MunicipalTaxes" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Municipal Taxes'}
              source={require('../../assets/Asset23.png')}
            />
          </Link>
          <Link to="/MunicipalTaxes" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Cable Tv'}
              source={require('../../assets/Asset22.png')}
            />
          </Link>
          <Link to="/PropertyTaxes" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Property Taxes'}
              source={require('../../assets/Asset21.png')}
            />
          </Link>
          <Link to="/HospitalsBill" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Hospitals'}
              source={require('../../assets/Asset20.png')}
            />
          </Link>
          <Link to="/FeePayments" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Fee Payment'}
              source={require('../../assets/Asset19.png')}
            />
          </Link>
          <Text style={styles.title}>Financial Services</Text>
          <Link to="/LicInsurance" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Lic/Insurance'}
              source={require('../../assets/Asset35.png')}
            />
          </Link>
          <Link to="/LoanRepayment" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Loan Repayment'}
              source={require('../../assets/Asset34.png')}
            />
          </Link>
          <Link to="/CreditCard" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Credit Card'}
              source={require('../../assets/Asset33.png')}
            />
          </Link>
          <Link to="/EMIPayments" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'EMI Payment'}
              source={require('../../assets/Asset32.png')}
            />
          </Link>
          <Text style={styles.title}>Purchase Services</Text>
          <Link to="/EMIPayments" style={styles.Card}>
            <Carditems
              backgroundColor={'white'}
              title={'Gift Card'}
              source={require('../../assets/Asset38.png')}
            />
          </Link>
          <Carditems
            backgroundColor={'white'}
            title={'Digital Gold'}
            source={require('../../assets/Asset39.png')}
          />
          <Carditems
            backgroundColor={'white'}
            title={'Traffic Challan'}
            source={require('../../assets/Asset37.png')}
          />
          <Carditems
            backgroundColor={'white'}
            title={'Google Pay Recharge'}
            source={require('../../assets/Asset36.png')}
          />
          <Carditems
            backgroundColor={'white'}
            title={'Amazon Egift Card'}
            source={require('../../assets/Asset35.png')}
          />

          <Text style={styles.title}>Travel Services</Text>

          <Carditems
            backgroundColor={'white'}
            title={'Flight'}
            source={require('../../assets/Asset44.png')}
          />
          <Carditems
            backgroundColor={'white'}
            title={'Hotel'}
            source={require('../../assets/Asset43.png')}
          />
          <Carditems
            backgroundColor={'white'}
            title={'Bus'}
            source={require('../../assets/Asset42.png')}
          />
          <Carditems
            backgroundColor={'white'}
            title={'Car'}
            source={require('../../assets/Asset41.png')}
          />
          <Carditems
            backgroundColor={'white'}
            title={'Holidays'}
            source={require('../../assets/Asset40.png')}
          />
          <View style={styles.imgbox}>
            <Image
              source={require('../../assets/Udaipur.jpg')}
              style={styles.imagstyle}
            />
            <Image
              source={require('../../assets/Udaipur.jpg')}
              style={styles.imagstyle}
            />
            <Image
              source={require('../../assets/Udaipur.jpg')}
              style={styles.imagstyle}
            />
            <Image
              source={require('../../assets/Udaipur.jpg')}
              style={styles.imagstyle}
            />
          </View>
          <View style={styles.Secondimgbox}>
            <Image
              source={require('../../assets/Udaipur.jpg')}
              style={styles.imagstyle}
            />
            <Image
              source={require('../../assets/Udaipur.jpg')}
              style={styles.imagstyle}
            />
            <Image
              source={require('../../assets/Udaipur.jpg')}
              style={styles.imagstyle}
            />
            <Image
              source={require('../../assets/Udaipur.jpg')}
              style={styles.imagstyle}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // marginTop: hp(1)
  },
  SecondCard: {
    height: hp(13),
    position: 'relative',
    bottom: hp(20),
    borderWidth: wp(1),
    borderColor: '#D3D3D3',
    padding: wp(1),
    // backgroundColor: "red",
  },
  image: {
    marginTop: hp(1),
    width: wp(40),
    height: hp(9),
    borderRadius: wp(2),
    marginHorizontal: wp(4),
  },
  Carditems: {
    position: 'relative',
    bottom: hp(21),
    backgroundColor: '#F2F3F4',
  },
  Card: {
    marginTop: wp(2),
    backgroundColor: '#fff',
  },
  title: {
    margin: wp(5),
    marginLeft: wp(1),
    fontSize: wp(5),
    fontWeight: "500",
    color: 'black',
    marginLeft: 10,
  },
  imgbox: {
    marginTop: hp(5),
    // marginLeft: wp(1),
    marginBottom: hp(5),
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
  },
  imagstyle: {
    borderRadius: wp(0.8),
    marginRight: wp(3),
    width: wp(19),
    height: hp(6),
  },
  Secondimgbox: {
    marginBottom: hp(5),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default More;
