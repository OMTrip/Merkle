import React from 'react';
import {Text, ScrollView, View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Avatar, Card, IconButton, TextInput} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import HomeHeader from '../HomeScreen/HomeHeader';

const CardInner = () => {
  return (
    <>
      <HomeHeader
        icons={true}
        iconName={'keyboard-backspace'}
        size={wp(8)}
        title={'Uber eGift Voucher'}
        TextTitle={true}
        CardInner={true}
      />
      <ScrollView style={styles.box}>
        <View style={styles.imgBox}>
          <Image
            source={require('../../assets/ubereats.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.curvedContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.logoBox}>
              <Image
                source={require('../../assets/uber.png')}
                style={styles.logoimg}
              />
            </View>
            <View style={styles.logoText}>
              <Image
                source={require('../../assets/uber.png')}
                style={styles.innerimg}
              />
              <View style={styles.titlebox}>
                <Text stytle={styles.title}>Uber eGift Voucher</Text>
              </View>
            </View>
            <View style={styles.inputbox}>
              <TextInput
                label="Please Enter Full Name"
                style={styles.inputfiled}
                activeOutlineColor={'red'}
              />
              <Text style={styles.placholder}>Please Enter The Name</Text>
            </View>
            <View style={[styles.inputbox, {marginTop: hp(3)}]}>
              <TextInput
                label="Please Enter Valid email id"
                style={styles.inputfiled}
                activeOutlineColor="red"
              />
              <Text style={styles.placholder}>Please Enter Valid email id</Text>
            </View>
            <View style={[styles.inputbox, {marginTop: hp(2)}]}>
              <TextInput
                label="Please Enter 10 digit mobile number"
                style={styles.inputfiled}
                keyboardType={'numeric'}
                activeOutlineColor="red"
              />
              <Text style={styles.placholder}>
                Please Enter 10 digit mobile number
              </Text>
            </View>
            <View
              style={[
                styles.inputbox,
                {marginTop: hp(2), marginBottom: hp(10)},
              ]}>
              <TextInput
                label="Please enter amount"
                style={styles.inputfiled}
                keyboardType={'numeric'}
                activeOutlineColor={'red'}
              />
              <Text style={styles.placholder}>
                Please enter amount 100-10000
              </Text>
            </View>
          </View>
          <View style={styles.ActionButton}>
            <ActionButton
              buttonText={'GO'}
              buttonTextStyle={{fontSize: wp(4)}}
              buttonColor={'black'}
              onPress={() => {
                console.log('hi');
              }}
            />
          </View>
          {/* <View style={styles.ActionButton}>
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
              onPress={() => {
                gotoOtpScreen();
              }}>
              <Text style={{color: 'white', fontSize: wp(4)}}>Go</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'white',
  },
  curvedContainer: {
    // flex: 1,
    height: hp(100),
    borderTopLeftRadius: wp(15),
    borderTopRightRadius: wp(15),
    backgroundColor: 'white',
    position: 'absolute',
    top: hp(25),
    left: 0,
    right: 0,
    // transform: [{ scaleX: 2}],
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    marginTop: hp(-25),
    height: hp(8),
    width: wp(20),
    borderRadius: wp(3),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: 'white',
  },
  logoimg: {
    marginHorizontal: wp(3.4),
    marginTop: hp(1),
    height: hp(6),
    width: wp(13),
  },
  logoText: {
    marginRight: wp(45),
    height: hp(10),
    width: wp(50),
    flexDirection: 'row',
  },
  innerimg: {
    borderRadius: wp(2),
    height: hp(8),
    width: wp(18),
  },
  titlebox: {
    justifyContent: 'center',
    marginLeft: wp(10),
  },
  imgBox: {
    height: hp(100),
    width: wp(100),
  },
  img: {
    width: wp(100),
    height: hp(32),
  },
  inputbox: {
    marginTop: hp(3),
    width: wp(95),
  },
  inputfiled: {
    backgroundColor: 'white',
  },
  placholder: {
    marginTop: hp(1),
    fontSize: wp(3.5),
    fontWeight: "400",
    color: 'grey',
  },
  ActionButton: {
    position: 'absolute',
    top: hp(50),
    left: 0,
    right: 0,
  },
});

export default CardInner;
