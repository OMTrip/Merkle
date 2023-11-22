import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function ServicesOffer({imagePath, start, end}) {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.Logocont}>
        <Icon name="arrowleft" size={30} color="black" 
          onPress={()=>navigation.goBack()}
        />
        <Text style={styles.headerText}>Services Offer by ZuelPay</Text>
      </View>
      <LinearGradient
        colors={['#808080', '#00308F']}
        start={start == true ? {x: 1, y: 1} : {x: 0, y: 0}} // Start point of the gradient (top-left)
        end={end == true ? {x: 0, y: 1} : {x: 1, y: 0}} // End point of the gradient (top-right)
        style={styles.linearView}>
        <View style={styles.TextView}>
          <Text style={styles.Text_Title}>
            {/* {props.Title}  */}
            Mobile App Develop
          </Text>
          <Text style={styles.Text}>
            {/* {props.Text} */}
            Make Your Own B2b & B2c Mobile App With Our 1st Party API. Make
            Travel APP, Recharge APP, Bill Pay APP, & More Customized IOS & ...
          </Text>
        </View>

        {/* <Image
          style={styles.image}
          source={props.imagePath}
          resizeMode="stretch"
        /> */}
      </LinearGradient>
      <View style={{marginTop: 12}}>
        <LinearGradient
          colors={['orange', 'red']}
          start={start == true ? {x: 1, y: 1} : {x: 0, y: 0}} // Start point of the gradient (top-left)
          end={end == true ? {x: 0, y: 1} : {x: 1, y: 0}} // End point of the gradient (top-right)
          style={styles.linearView}>
          <View style={styles.TextView}>
            <Text style={styles.Text_Title}>
              {/* {props.Title}  */}
              API Services Offer
            </Text>
            <Text style={styles.Text}>
              {/* {props.Text} */}
              ZuelPay is the first and only online api service provider to
              openly publish Recharges API, BBPS API, UPI Payments API, Flight
              Booking API, Hotels....
            </Text>
          </View>

          {/* <Image
          style={styles.image}
          source={props.imagePath}
          resizeMode="stretch"
        /> */}
        </LinearGradient>
      </View>
      <View style={{marginTop: 12}}>
        <LinearGradient
          colors={['#52c234', '#061700']}
          start={start == true ? {x: 1, y: 1} : {x: 0, y: 0}} // Start point of the gradient (top-left)
          end={end == true ? {x: 0, y: 1} : {x: 1, y: 0}} // End point of the gradient (top-right)
          style={styles.linearView}>
          <View style={styles.TextView}>
            <Text style={styles.Text_Title}>
              {/* {props.Title}  */}
              Website Develop
            </Text>
            <Text style={styles.Text}>
              {/* {props.Text} */}
              ZuelPay is the first and only online api service provider to
              openly publish Recharges API, BBPS API, UPI Payments API, Flight
              Booking API, Hotels....
            </Text>
          </View>

          {/* <Image
          style={styles.image}
          source={props.imagePath}
          resizeMode="stretch"
        /> */}
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Logocont: {
    borderBottomWidth: 0.2,
    color: 'gray',
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    // margin:10
    alignItems: 'center',
    paddingHorizontal:20,
  },
  linearView: {
    // marginLeft: wp(25),
    width: '95%',
    height: hp(20),
    borderRadius: wp(3),
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 10,
  },
  TextView: {
    marginLeft: wp(2.5),
  },
  image: {
    borderRadius: wp(5),
    marginTop: hp(-7),
    marginLeft: wp(54),
    // backgroundColor:"black",
    width: wp(20),
    height: hp(10),
  },
  Text_Title: {
    marginTop: hp(1),
    width: wp(40),
    color: 'white',
    fontSize: wp(4.5),
    fontWeight: '500',
  },
  Text: {
    width: wp(50),
    marginTop: hp(1.5),
    color: '#D3D3D3',
    fontSize: wp(3.5),
    fontWeight: '400',
  },
  headerText: {
    marginLeft: 35,
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    padding: 10,
  },
});
