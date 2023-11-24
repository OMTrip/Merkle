import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  Switch,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {Link, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const PriceAlert = props => {
  const navigation = useNavigation();
  // const {back} = props.route.params;
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
       <LinearGradient
        colors={[
          '#d6fffd',
          '#f2fffe',
          '#ffff',
          '#fff',
          '#fffaff',
          '#fef8ff',
          '#faf4ff',
          '#fcf5fe',
          '#f5eefe',
          '#f1e9fe',
        ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
        <View style={styles.header}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={25}
              color={'#000'}
              onPress={() => navigation.goBack()}
            />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(25),
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: hp(2.2),
                fontWeight: '600',
              }}>
              Price Alerts
            </Text>
          </View>

          <Link to="/AlltokenList">
            <AntDesign name="plus" size={22} style={{color: '#000'}} />
          </Link>
        </View>

        <View
          style={{
            paddingVertical: wp(3),
            paddingHorizontal: wp(5),
            borderRadius: wp(2),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{color: '#000', fontSize:wp(4.5), fontWeight:500}}>Price Alert</Text>
          </View>
          <View>
            <Switch
              value={isVisible}
              onValueChange={toggleVisibility}
              trackColor={{false: '#E9E9E9', true: '#ccc'}}
              thumbColor={isVisible ? '#14b7af' : '#ccc'}
              ios_backgroundColor="#3e3e3e"
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}} // Adjust size here
            />
          </View>
        </View>
        <View style={{paddingHorizontal: wp(5)}}>
          <Text
            style={{color: '#444', fontSize: wp(3.3), paddingVertical: wp(1)}}>
            Get alerts for significant price change of your favourite
            cryptocurrencies.
          </Text>
        </View>

        <View style={styles.priceWrapper}>
          {isVisible && (
            <>
              <View style={styles.PriceInfoBox}>
                <View>
                  <Image
                    source={require('../../assets/coins/bitcoin.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View style={styles.InnerWrapper}>
                  <Text style={styles.tokenName}>Bitcoin</Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>$28,259,52</Text>
                    <Text style={styles.green}> +35.42%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.PriceInfoBox}>
                <View>
                  <Image
                    source={require('../../assets/coins/ethereum.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View style={styles.InnerWrapper}>
                  <Text style={styles.tokenName}>Ethereum</Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>$0.02568</Text>
                    <Text style={styles.red}> +35.42%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.PriceInfoBox}>
                <View>
                  <Image
                    source={require('../../assets/coins/seedx.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View style={styles.InnerWrapper}>
                  <Text style={styles.tokenName}>SEEDx</Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>$56,253</Text>
                    <Text style={styles.green}> +35.42%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.PriceInfoBox}>
                <View>
                  <Image
                    source={require('../../assets/coins/doge.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View style={styles.InnerWrapper}>
                  <Text style={styles.tokenName}>Doge</Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>$23,456,00</Text>
                    <Text style={styles.red}> +35.42%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.PriceInfoBox}>
                <View>
                  <Image
                    source={require('../../assets/coins/tron.png')}
                    style={styles.imageCoin}
                  />
                </View>
                <View style={styles.InnerWrapper}>
                  <Text style={styles.tokenName}>Tron</Text>
                  <View style={styles.displayHori}>
                    <Text style={styles.subtoken}>$45,23,56</Text>
                    <Text style={styles.green}> +35.42%</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#F3F2F7',
  //   marginHorizontal: wp(5),
   
  // },
  header: {
    width: '100%',
    paddingVertical: wp(8.5),
    paddingHorizontal:wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceWrapper: {
    // backgroundColor: '#fff',
    borderRadius: wp(2),
    marginVertical: wp(5),
    // paddingHorizontal: wp(3),
  },

  PriceInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  InnerWrapper: {
    paddingStart: wp(1),
    borderBottomWidth: 0.4,
    borderBottomColor: '#d6c7ef',
    flex: 1,
    paddingVertical: wp(4),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
  },

  imageCoin: {
    width: 45,
    height: 45,
    borderRadius: wp(50),
    margin: wp(2),
  },

  tokenName: {
    color: '#000',
    fontSize: hp(1.6),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  subtoken: {
    color: '#666',
    fontSize: hp(1.5),
  },
  green: {
    color: '#25d366',
    fontSize: hp(1.5),
  },
  red: {
    color: 'red',
    fontSize: hp(1.5),
  },

  displayHori: {
    flexDirection: 'row',
  },

  heading: {
    color: '#999',
    fontSize: hp(1.5),
    marginTop: hp(2),
    textTransform: 'uppercase',
    paddingHorizontal: wp(3),
  },

  card: {
    marginBottom: hp(2),
    marginTop: wp(1),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
    backgroundColor: '#fff',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ImageShield: {
    paddingHorizontal: wp(4),
    marginEnd: wp(3),
    position: 'relative',
  },

  checkIconbg: {
    position: 'absolute',
    top: -7,
    right: 0,
  },

  walletWrapper: {
    paddingStart: wp(1),
    borderBottomWidth: 0.187,
    borderBottomColor: '#eee',
    flex: 1,
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
  },
  infoIcon: {
    color: '#999',
    paddingEnd: wp(3),
  },

  walletName: {
    color: '#000',
    fontWeight: '400',
    fontSize: wp(4),
    textTransform: 'capitalize',
  },
  walletAddress: {
    color: '#999',
    fontSize: wp(3.2),
  },

  sheetContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: wp(5),
    alignItems: 'center',
  },

  selectWallet: {
    backgroundColor: '#f3f2f7',
    width: wp(90),
    borderRadius: wp(4),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f4f3f7',
    marginBottom: wp(3),
    marginHorizontal: wp(3),
  },
  selectWalletInner: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  arrowBg: {
    backgroundColor: '#e2e3f5',
    height: wp(8),
    width: wp(8),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#eee',
    marginStart: wp(3),
  },
});

export default PriceAlert;
