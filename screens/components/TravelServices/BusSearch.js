import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BusCard from './BusCard';
const BusSearch = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.Container}>
        <View style={styles.box}>
          <View style={styles.header}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Home')}>
              <MaterialCommunityIcons
                name={'keyboard-backspace'}
                size={wp(8)}
                color={'black'}
              />
            </TouchableWithoutFeedback>
            <View style={styles.Textbox}>
              <Text style={{fontWeight: '300', fontSize: wp(8), color: 'grey'}}>
                Bus
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: wp(8),
                  color: 'black',
                  marginRight: 20,
                }}>
                Search
              </Text>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              borderWidth: 1,
              borderColor: 'black ',
            }}
          />
          <View style={styles.TextArea}>
            <TouchableOpacity>
              <Text style={{fontSize: wp(4), fontWeight: '500', color: 'grey'}}>
                From
              </Text>
              <View style={styles.Textboxinside}>
                <Text
                  style={{fontSize: wp(5), fontWeight: '500', color: 'black'}}>
                  Delhi
                </Text>
                <View style={styles.chipbox}>
                  <Text
                    style={{
                      marginTop: wp(-1),
                      fontSize: wp(4),
                      fontWeight: '500',
                      color: 'grey',
                    }}>
                    DEL
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginTop: wp(1),
                  fontSize: wp(3.5),
                  fontWeight: '400',
                  color: 'black',
                }}>
                Indira Gandhi international Airport
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.line, {marginTop: wp(4)}]} />
          <View style={[styles.TextArea, {marginTop: wp(4)}]}>
            <TouchableOpacity>
              <Text style={{fontSize: wp(4), fontWeight: '500', color: 'grey'}}>
                To
              </Text>
              <View style={styles.Textboxinside}>
                <Text
                  style={{fontSize: wp(5), fontWeight: '500', color: 'black'}}>
                  Mumbai
                </Text>
                <View style={styles.chipbox}>
                  <Text
                    style={{
                      marginTop: wp(-1),
                      fontSize: wp(4),
                      fontWeight: '500',
                      color: 'grey',
                    }}>
                    BOM
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginTop: wp(1),
                  fontSize: wp(3.5),
                  fontWeight: '400',
                  color: 'black',
                }}>
                Chhatrapati Shivaji
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.line, {marginTop: wp(5)}]} />
          <View style={styles.TextAreaDate}>
            <TouchableOpacity>
              <Text style={{fontSize: wp(4), fontWeight: '500', color: 'grey'}}>
                DEPARTURE
              </Text>
              <Text
                style={{fontSize: wp(3.5), fontWeight: '500', color: 'green'}}>
                20 jun 2023
              </Text>
              <Text
                style={{fontSize: wp(3.5), fontWeight: '500', color: 'green'}}>
                Tuesday
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.ActionBtn}> */}

        <View
          style={{
            marginTop: hp(7),
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
            paddingHorizontal: 30,
            marginRight: wp(34),
            marginTop: hp(-8),
          }}>
          <LinearGradient
            colors={['green', '#32CD32']}
            start={{x: 1, y: 0.5}}
            end={{x: 0.5, y: 1.0}}
            style={{
              backgroundColor: 'green',
              width: 55,
              height: 55,
              borderRadius: 55,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: wp(4)}}>Search</Text>
          </LinearGradient>
        </View>
        <Text
          style={{
            fontSize: wp(5.5),
            fontWeight: '500',
            color: 'black',
            margin: 10,
          }}>
          Pan India Bus Booking
        </Text>
        <Image
          source={require('../../assets/map.png')}
          style={styles.ImageStyle}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: 'white',
  },
  box: {
    backgroundColor: 'white',
    height: hp(57),
    borderBottomWidth: wp(0.8),
    borderBottomColor: 'grey',
    borderBottomStartRadius: wp(13),
    borderBottomRightRadius: wp(10),
    // transform: [{ scaleX: 0.5 }, { translate: "-50%" }]
  },
  header: {
    marginTop: hp(3),
    marginHorizontal: wp(5),
    flexDirection: 'row',
  },
  Textbox: {
    marginLeft: wp(6),
    width: wp(50),
    height: hp(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  line: {
    borderBottomRadius: wp(10),
    borderBottomColor: 'grey',
    borderBottomWidth: wp(0.2),
  },
  btnBox: {
    borderRadius: wp(1),
    backgroundColor: 'white',
    width: wp(60),
    borderWidth: wp(0.1),
    borderColor: 'white',
    position: 'relative',
    top: hp(3.5),
    left: wp(18),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10,
    elevation: 24,
  },
  imgbox: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: wp(2),
  },
  btn: {
    borderRadius: wp(1),
    alignItems: 'center',
    width: wp(25),
    backgroundColor: 'green',
    padding: wp(2),
    // borderWidth: wp(.5)
  },
  btns: {
    borderRadius: wp(1),
    alignItems: 'center',
    width: wp(28),
    padding: wp(2),
    backgroundColor: 'white',
    marginLeft: wp(4),
  },
  TextArea: {
    marginTop: hp(7),
    marginLeft: wp(5),
    flexDirection: 'row',
  },
  Textboxinside: {
    flexDirection: 'row',
  },
  chipbox: {
    height: hp(4),
    borderRadius: wp(1),
    borderColor: 'grey',
    borderWidth: wp(0.4),
    marginLeft: wp(3),
    padding: wp(2),
  },
  TextAreaDate: {
    marginTop: hp(1.5),
    marginLeft: wp(5),
    flexDirection: 'row',
    //  justifyContent:"space-between"
  },
  ImageStyle: {
    height: '30%',
    width: '100%',
  },
  //   ImgView:{
  //     height:"40%",
  //     width:"100%"
  //   }
});

export default BusSearch;
