import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Link, useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native';
import Carditems from '../RechargeSerives/RechargeScreen/dth/Carditems';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import userCollection from '../../../Store/firebase/user';
import {userSchema} from '../../../Store/firebase/schema';
import {resetAuthState} from '../../../Store/authSlice';
import PanCardVerificationScreen from '../../KycVerification/PanCardVerificationScreen';
import DocumentVerificationScreen from '../../KycVerification/DocumentVerificationScreen';
import LottieView from 'lottie-react-native';

import KycScreen from '../KycVerify';
import {wrap} from 'lodash';
import {wethStatus} from '../../../Utils/web3/web3Functions';

const HomeHeader = props => {
  const {
    iconName,
    icons,
    imagePath,
    leftIocns,
    TextTitle,
    size,
    title,
    LeftIconsName,
    RightHeaderName,
    leftIocnsSubScreen,
    routeName,
    RheaderName,
    TextTitleStyle,
    CardInner,
    iconscolor,
    headerpadding,
    wallettab,
    activeTab,
    menu,
    openSheet,
    func,
  } = props;
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    user,
    isLoggedIn,
    kyc,
    aadhardockyc,
    aadharKyc,
    panNumber,
    panKyc,
    user_logo,
    adhaarNumber,
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [activetabsprofile, setActiveTabsprofile] = useState(1);
  const {wallets, networks, activeWallet} = useSelector(state => state.wallet);
  const wallet = wallets[activeWallet];
  const [firebaseUser, setFirebaseUser] = useState();
  const [adminKycVerified, setAdminKycVerified] = useState(0); // Initial value can be set to any appropriate default value

  const handleTabClick = tabNumber => {
    setActiveTabsprofile(tabNumber);
  };
  const adminKycVerified1 = {...userSchema};

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  console.log(openSheet, 'openSheet');
  const closeModal = () => {
    setModalVisible(false);
  };

  const goback = () => {
    if (!menu) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const handlePress = () => {
    const ispanKyc1 = firebaseUser?.panKyc === 1;
    const isAdharKyc1 = firebaseUser?.aadharKyc === 1;
    let path = '';
    let value = {};

    if (isLoggedIn) {
      if (ispanKyc1 && isAdharKyc1) {
        path = 'Home';
        value = {};
      } else if (ispanKyc1) {
        path = 'kyc';
        value = {
          panHolderName: {
            pan_number: firebaseUser?.panNumber,
            full_name: firebaseUser?.panHolderName,
          },
        };
      } else {
        path = 'PanCardVerificationScreen';
      }
    } else {
      path = 'LoginScreen';
    }
    goto(path, value);
  };
  const accountNavigation = () => {
    if (!isLoggedIn) {
      // User is not logged in, send to login screen
      navigation.navigate('LoginScreen');
    } else if (aadharKyc === 1 || adminKycVerified === 1) {
      // Admin KYC is verified, send to the bank screen
      navigation.navigate('ProfileScreen');
      toggleModal();
    } else if (firebaseUser?.panKyc !== 1 && firebaseUser?.aadharKyc !== 1) {
      // PAN KYC and Aadhar KYC are not verified, send to Pan KYC verification screen
      navigation.navigate('PanCardVerificationScreen');
      toggleModal();
    } else if (firebaseUser?.aadharKyc !== 1) {
      // Aadhar KYC is not verified, send to Aadhar KYC verification screen
      navigation.navigate('kyc');
      toggleModal();
    } else {
      // User is in a pending state, show a modal
      toggleModal();
    }
  };
  const bankNavigation = () => {
    if (!isLoggedIn) {
      // User is not logged in, send to login screen
      navigation.navigate('LoginScreen');
    } else if (aadharKyc === 1 || adminKycVerified === 1) {
      // Admin KYC is verified, send to the bank screen
      navigation.navigate('BankScreen');
      toggleModal();
    } else if (firebaseUser?.panKyc !== 1 && firebaseUser?.aadharKyc !== 1) {
      // PAN KYC and Aadhar KYC are not verified, send to Pan KYC verification screen
      navigation.navigate('PanCardVerificationScreen');
      toggleModal();
    } else if (firebaseUser?.aadharKyc !== 1) {
      // Aadhar KYC is not verified, send to Aadhar KYC verification screen
      navigation.navigate('kyc');
      toggleModal();
    } else {
      // User is in a pending state, show a modal
      toggleModal();
    }
  };

  const ucpiNavigation = () => {
    if (!isLoggedIn) {
      // User is not logged in, send to login screen
      navigation.navigate('LoginScreen');
    } else if (aadharKyc === 1 || adminKycVerified === 1) {
      // Admin KYC is verified, send to the bank screen
      navigation.navigate('UcpiSettings');
      toggleModal();
    } else if (firebaseUser?.panKyc !== 1 && firebaseUser?.aadharKyc !== 1) {
      // PAN KYC and Aadhar KYC are not verified, send to Pan KYC verification screen
      navigation.navigate('PanCardVerificationScreen');
      toggleModal();
    } else if (firebaseUser?.aadharKyc !== 1) {
      // Aadhar KYC is not verified, send to Aadhar KYC verification screen
      navigation.navigate('kyc');
      toggleModal();
    } else {
      // User is in a pending state, show a modal
      toggleModal();
    }
  };

  const orderAndBooking = () => {
    if (!isLoggedIn) {
      // User is not logged in, send to login screen
      navigation.navigate('LoginScreen');
    } else if (aadharKyc === 1 || adminKycVerified === 1) {
      // Admin KYC is verified, send to the bank screen
      navigation.navigate('PaymentHistory');
      toggleModal();
    } else if (firebaseUser?.panKyc !== 1 && firebaseUser?.aadharKyc !== 1) {
      // PAN KYC and Aadhar KYC are not verified, send to Pan KYC verification screen
      navigation.navigate('PanCardVerificationScreen');
      toggleModal();
    } else if (firebaseUser?.aadharKyc !== 1) {
      // Aadhar KYC is not verified, send to Aadhar KYC verification screen
      navigation.navigate('kyc');
      toggleModal();
    } else {
      // User is in a pending state, show a modal
      toggleModal();
    }
  };

  const cashBackAndOffers = () => {
    if (!isLoggedIn) {
      // User is not logged in, send to login screen
      navigation.navigate('LoginScreen');
    } else if (aadharKyc === 1 || adminKycVerified === 1) {
      // Admin KYC is verified, send to the bank screen
      navigation.navigate('CashbackOffers');
      toggleModal();
    } else if (firebaseUser?.panKyc !== 1 && firebaseUser?.aadharKyc !== 1) {
      // PAN KYC and Aadhar KYC are not verified, send to Pan KYC verification screen
      navigation.navigate('PanCardVerificationScreen');
      toggleModal();
    } else if (firebaseUser?.aadharKyc !== 1) {
      // Aadhar KYC is not verified, send to Aadhar KYC verification screen
      navigation.navigate('kyc');
      toggleModal();
    } else {
      // User is in a pending state, show a modal
      toggleModal();
    }
  };

  const refer = () => {
    if (!isLoggedIn) {
      // User is not logged in, send to login screen
      navigation.navigate('LoginScreen');
    } else if (aadharKyc === 1 || adminKycVerified === 1) {
      // Admin KYC is verified, send to the bank screen
      navigation.navigate('ReferandEarn');
      toggleModal();
    } else if (firebaseUser?.panKyc !== 1 && firebaseUser?.aadharKyc !== 1) {
      // PAN KYC and Aadhar KYC are not verified, send to Pan KYC verification screen
      navigation.navigate('PanCardVerificationScreen');
      toggleModal();
    } else if (firebaseUser?.aadharKyc !== 1) {
      // Aadhar KYC is not verified, send to Aadhar KYC verification screen
      navigation.navigate('kyc');
      toggleModal();
    } else {
      // User is in a pending state, show a modal
      toggleModal();
    }
  };

  const trustScore = () => {
    if (!isLoggedIn) {
      // User is not logged in, send to login screen
      navigation.navigate('LoginScreen');
    } else if (aadharKyc === 1 || adminKycVerified === 1) {
      // Admin KYC is verified, send to the bank screen
      navigation.navigate('TrustScore');
      toggleModal();
    } else if (firebaseUser?.panKyc !== 1 && firebaseUser?.aadharKyc !== 1) {
      // PAN KYC and Aadhar KYC are not verified, send to Pan KYC verification screen
      navigation.navigate('PanCardVerificationScreen');
      toggleModal();
    } else if (firebaseUser?.aadharKyc !== 1) {
      // Aadhar KYC is not verified, send to Aadhar KYC verification screen
      navigation.navigate('kyc');
      toggleModal();
    } else {
      // User is in a pending state, show a modal
      toggleModal();
    }
  };

  function goto(path, value) {
    toggleModal();
    navigation.navigate(path, value);
  }

  const handleMenuPress = screenName => {
    navigation.navigate(screenName);
    toggleModal();
  };

  const handleLinkPressSocial = () => {
    const url = 'https://twitter.com/seedxapp'; // Replace with your external link
    Linking.openURL(url);
  };

  // logout button
  const logoutHandler = async () => {
    dispatch(resetAuthState());
    closeModal();
    // toggleModal();
  };
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const userdata = await userCollection.getUser(user?.mobile);
        setFirebaseUser(userdata);
        setAdminKycVerified(userdata?.adminKycVerified);
      })();
    }
  }, [kyc, aadhardockyc, aadharKyc, panKyc, isLoggedIn]);

  return (
    <>
      {icons === true ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // justifyContent:'space-between',
            alignItems: 'center',
            // marginTop: 40,
            marginTop: hp(3),
          }}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            // backgroundColor="#d6fffd"
            barStyle="dark-content"
          />

          <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={'#000'}
            onPress={() => navigation.navigate(routeName)}
          />

          {TextTitle === true ? (
            <View style={{width: '80%'}}>
              <View style={styles.titleBox}>
                <Text
                  style={[
                    {color: '#000', fontSize: hp(2.2), fontWeight: '500'},
                    TextTitleStyle,
                  ]}>
                  {title}
                </Text>
              </View>
            </View>
          ) : (
            <Image
              style={[styles.image, {marginTop: hp(1)}]}
              source={imagePath}
              resizeMode="stretch"
            />
          )}

          <View style={{}}>
            {leftIocns === true ? (
              <View style={styles.leftIocnsBox}>
                <TouchableWithoutFeedback>
                  <MaterialCommunityIcons
                    name={LeftIconsName}
                    size={wp(6)}
                    color={'#000'}
                    style={{marginLeft: wp(20)}}
                  />
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View style={styles.leftIocnsBox}></View>
            )}

            {RightHeaderName === true ? (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(routeName)}>
                <View style={{}}>
                  <Text
                    style={[
                      {color: '#000', fontSize: hp(2.2), TextTitleStyle},
                    ]}>
                    {RheaderName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ) : null}

            {leftIocnsSubScreen === true ? (
              <View style={styles.leftIocnStyle}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    openSheet
                      ? openSheet(true)
                      : [navigation.navigate(routeName)]
                  }>
                  <MaterialCommunityIcons
                    name={LeftIconsName}
                    size={wp(7)}
                    color={'#000'}
                    style={{textAlign: 'right'}}
                  />
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View style={styles.leftIocnsBox}></View>
            )}
          </View>
        </View>
      ) : (
        <View style={[styles.headerbox]}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            // backgroundColor="#d6fffd"
            barStyle="dark-content"
          />

          <View
            style={{
              flexDirection: 'row',
              // marginHorizontal: wp(2),
              // backgroundColor:'#eee',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('wallets')}>
              {isLoggedIn && user_logo ? (
                <View>
                  <Image
                    source={{
                      uri: 'data:image/png;base64,' + user_logo,
                    }}
                    style={{
                      width: wp(9),
                      height: wp(9),
                      resizeMode: 'contain',
                      borderRadius: wp(50),
                      margin: wp(1),
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    source={require('../../assets/user.png')}
                    style={{
                      width: wp(9),
                      // backgroundColor: '#000',
                      height: wp(9),
                      borderRadius: wp(50),
                      marginVertical: wp(1),
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.leftIocnsBox}>
            {activeTab !== 'WalletScreen' ? (
              <Link to="/QRscanner">
                <LottieView
                  source={require('../../assets/json/scan.json')}
                  autoPlay
                  loop
                  style={{width: 40}}
                  onPress={() =>
                    navigation.navigate('QRscanner', {type: activeTab})
                  }
                />
                {/* <MaterialCommunityIcons
                  color={'black'}
                  name="qrcode-scan"
                  size={wp(6)}
                  style={{color: iconscolor, paddingRight: wp(2)}}
                   onPress={() =>
                    navigation.navigate('QRscanner', {type: activeTab})
                  }
                /> */}
              </Link>
            ) : (
              <Link to="/AlltokenList">
                <Octicons
                  color={'black'}
                  name="plus"
                  size={wp(6)}
                  style={{color: iconscolor, marginRight: wp(2)}}
                  //onPress={() => navigation.navigate('importtoken')}
                />
              </Link>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f2f7',
    margin: 0,
  },
  header: {
    // width: width,
    paddingVertical: wp(5),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tabsWrapper: {
    // marginHorizontal: wp(4),
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    // paddingVertical: 2,
    // paddingHorizontal: 2,
    // marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9.84,
    elevation: 3,
    // borderWidth: 0.5,
    // borderColor: '#FAF8FE',
  },

  tabsButtons1: {
    textAlign: 'center',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    fontSize: wp(3.5),
  },
  tabsButtons2: {
    textAlign: 'center',
    padding: 5,
    // width: wp(45),
    // borderRadius: 5,
    fontSize: wp(3.5),
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },

  headerbox: {
    flexDirection: 'row',
    marginTop: hp(2.6),
    padding: wp(3),
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileCards: {
    // paddingHorizontal: wp(3),
    marginHorizontal: wp(4),
    // paddingVertical: wp(1),
    // backgroundColor: '#fff',
    // marginBottom: wp(2),
    color: '#444',
    // borderRadius: 6,
  },

  profileCardsInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  walletCards: {
    // paddingHorizontal: wp(3),
    marginHorizontal: wp(4),
    // paddingVertical: wp(1),
    // backgroundColor: '#DBFBFA',
    // marginBottom: wp(2),
    // borderRadius: 6,
  },

  walletCardsInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imagedefault: {
    width: wp(20),
    height: hp(4),
  },

  leftIocnsBox: {
    // backgroundColor:'#fff',
    width: wp(33),
    // textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: wp(5),
    fontWeight: '500',
    // textAlign: 'center',
  },
  titleBox: {
    marginLeft: wp(1),
  },
  leftIocnStyle: {
    // backgroundColor:'#000',
    width: wp(10),
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: wp(1),
    paddingHorizontal: wp(1),
    borderWidth: 0.5,
    borderColor: '#000',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: wp(5),
  },
  buttonText: {
    color: '#000',
  },

  loginBtn: {
    // paddingBottom: wp(1),
    // borderWidth: 0.5,
    // borderColor: '#000',
    // alignItems: 'center',
    // textAlign: 'center',
    // borderRadius: wp(5),
    // marginTop: wp(2),
    // width: wp(25),
  },
  loginBtnTxt: {
    color: '#000',
    fontSize: wp(4.8),
    marginStart: wp(3),
    fontWeight: '600',
  },

  cardItemsWrapper: {
    // backgroundColor: '#ccc',
    // borderRadius: 10,
    // paddingHorizontal: wp(4),
    // marginHorizontal: wp(4),
    // marginBottom: wp(3),
    // borderTopWidth: 0.187,
    // borderTopColor: '#ccc',
    // borderBottomWidth: 0.187,
    // borderBottomColor: '#ccc',
  },
  divider: {
    borderBottomWidth: 0.187,
    borderBottomColor: '#ccc',
    marginVertical: wp(2),
  },

  iconBgSquare: {
    backgroundColor: '#F3F2F6',
    height: wp(8),
    width: wp(8),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 0.5,
    // borderColor: '#eee',
    marginHorizontal: wp(5),
    marginVertical: wp(1),
  },
  iconStyle: {
    color: '#888',
    fontSize: 14,
  },
  iconStyle2: {
    color: '#888',
  },

  menuWrapper: {
    paddingStart: wp(1),
    // borderBottomWidth: 0.187,
    // borderBottomColor: '#ccc',
    flex: 0.93,
    paddingVertical: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
  },
  walletWrapper: {
    paddingStart: wp(1),
    // borderBottomWidth: 0.187,
    // borderBottomColor: '#ccc',
    flex: 0.97,
    paddingVertical: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
  },

  infoIcon: {
    color: '#666',
    // paddingEnd: wp(3),
    fontWeight: 'normal',
  },

  menuName: {
    color: '#000',
    fontWeight: 'normal',
    fontSize: wp(4),
  },
  walletHeading: {
    color: '#999',
    fontSize: wp(3.2),
  },
  walletList: {
    color: '#333',
    fontSize: wp(4),
    marginEnd: wp(2),
  },

  versionWrapper: {
    // backgroundColor: '#fff',
    // borderRadius: 10,
    padding: wp(4),
    // marginHorizontal: wp(4),
    marginBottom: wp(20),
    // marginTop: wp(4),
    // height:wp(20)
  },
  TextBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  logoutWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp(4),
    marginHorizontal: wp(4),
    marginBottom: wp(2),
    marginTop: wp(4),
    // height:wp(20)
  },
  logoutInnerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infowrapper: {
    backgroundColor: '#fef0f0',
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    borderRadius: wp(3),
    marginTop: wp(1),
    marginBottom: wp(1),
    marginHorizontal: wp(4),
  },
  displayHori: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconInfo: {
    color: '#f15750',
    fontSize: wp(4),
  },

  infowrapperGreen: {
    backgroundColor: '#E6F9F5',
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    borderRadius: wp(3),
    marginTop: wp(2),
    marginBottom: wp(1),
    marginHorizontal: wp(4),
  },
  displayHori: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconInfoGreen: {
    color: '#14b7af',
    // fontSize: wp(4),
  },

  claimBtn: {
    backgroundColor: '#14b7af',
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(1),
  },
});

export default HomeHeader;
