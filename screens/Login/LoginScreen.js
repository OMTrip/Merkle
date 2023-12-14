import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Vibration,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setOnboarding} from '../../Store/web3';
// import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import OtpBox from '../OtpScreen/OtpBox';
import {setKYCStatus, setLogin, setUser} from '../../Store/userinfo';
import userCollection from '../../Store/firebase/user';
import {userSchema} from '../../Store/firebase/schema';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Checkbox} from 'react-native-paper';
import {
  setIsLoggedIn,
  setUserData,
  setUserKycStatus,
  setUserLogo,
  // setFullName,
  // setPanHolderName
} from '../../Store/authSlice';

const OtpScreen = props => {
  const navigation = useNavigation();
  const goback = () => {
    navigation.goBack();
  };

  const goBackLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  const [isChecked, setChecked] = useState(false);
  const {confirmCode, number, setstatus, resend, loading} = props;

  const checkOtp = async otp => {
    try {
      confirmCode(otp);
    } catch (e) {
      console.log(e, 'error in otp auth');
      if (otp !== props.route.params.otp) {
        Alert.alert('Invalid otp please check');
      }
    }
  };

  return (
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
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setstatus(false)}>
            <Ionicons name="arrow-back" size={25} color={'#000'} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: wp(5),
                fontWeight: '500',
                paddingLeft: 6,
              }}>
              Mobile Verification Code
            </Text>
          </View>
        </View>

        <View style={{justifyContent: 'center', marginTop: wp(15)}}>
          <View style={styles.heading}>
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                lineHeight: 22,
              }}>
              Enter the six digit mobile verification code that is sent to
              <Text
                style={{
                  color: '#000',
                  fontWeight: 500,
                  paddingLeft:wp(1)
                }}>
                {number}
              </Text>
            </Text>
          </View>
          <View style={styles.otpBox}>
            <View>
              <OtpBox checkOtp={checkOtp} />
            </View>

            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: '5%',
                paddingVertical: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {loading ? (
                  <ActivityIndicator
                    color={'#000'}
                    size={22}
                    style={{paddingHorizontal: 10}}
                  />
                ) : null}
                <Text
                  style={{color: '#666', textDecorationLine: 'underline'}}
                  onPress={() => resend(number)}>
                  Resend OTP
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                paddingHorizontal: '5%',
              }}>
              <TouchableWithoutFeedback style={{marginBottom: wp(3)}}>
                <Text style={{color: '#999'}}>
                  Didn't receive verification code?
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={{marginBottom: wp(3)}}>
                <Text style={{color: '#999'}}>Having trouble in Log In?</Text>
              </TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => setstatus(false)}
                style={{marginBottom: wp(3)}}>
                <Text style={{color: '#999'}}>Try another phone number</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor:'#eee',
                marginTop: wp(15),
              }}></View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const LoginScreen = () => {
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isotp, setisotp] = useState(false);
  const navigation = useNavigation();
  const {onboarding, initialized} = useSelector(state => state.wallet);
  const {user, isLoggedIn} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const [redCheckbox, setRedChecbox] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (text === '') {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (!onboarding) {
      dispatch(setOnboarding(true));
    }
  }, []);

  // Handle login
  function onAuthStateChanged(user) {
    // console.log(user, 'user status');
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    console.log(user, isLoggedIn, 'loginscreen');
    if (user?.mobile && isLoggedIn) {
      if (initialized) {
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('CreateNewWallet', {add: false});
      }
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('HomeScreen');
    }
  }, []);

  const handleCheckboxPress = () => {
    setChecked(!isChecked);
  };

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    try {
      // if (!isChecked) {
      //   setRedChecbox(true)
      // //  setRedChecbox(true)
      //   // Toast.show({
      //   //   type: 'error',
      //   //   text1: 'Checkbox not checked',
      //   //   text2: 'Please agree to the terms and conditions.',
      //   // });
      //   return;
      // }
      if (phoneNumber?.length < 10) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Number',
          text2: 'Phone number must have at least 10 digits.',
        });
      } else if (!isChecked) {
        setRedChecbox(true);
        Vibration.vibrate(500);
        console.log('vibrated')
        // Toast.show({
        //   type: 'error',
        //   text1: 'Checkbox not checked',
        //   text2: 'Please agree to the terms and conditions.',
        // });
      } else {
        setLoading(true);
        const confirmation = await auth().signInWithPhoneNumber(
          '+91 ' + phoneNumber,
          true,
        );
        setConfirm(confirmation);
        setisotp(true);
        setLoading(false);
      }
      // if (phoneNumber?.length == 10 && phoneNumber) {
      //   setLoading(true);
      //   console.log('vibrated')
      //   const confirmation = await auth().signInWithPhoneNumber(
      //     '+91 ' + phoneNumber,
      //     true,
      //   );
      //   // console.log(confirmation);
      //   setConfirm(confirmation);
      //   setisotp(true);
      //   setLoading(false);
      //   // navigation.navigate('OtpScreen');
      // } else {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Invalid Mobile Number',
      //     text2: 'Please enter valid mobile number',
      //   });
      // }
    } catch (e) {
      setLoading(false);
      // setisotp(true);
      console.log(e, 'error in signInWithPhoneNumber in loginscreen');
    }
  }

  async function confirmCode(code) {
    try {
      if (code.length == 6) {
        const r = await confirm.confirm(code);
        const {
          user: {email, phoneNumber},
          additionalUserInfo: {isNewUser},
        } = r;
        let firebase_data = {...userSchema};
        firebase_data.phoneNumber = phoneNumber;
        firebase_data.isNewUser = isNewUser;
        firebase_data.email = email;
        firebase_data.login = true;

        const isexist = await userCollection.checkUser(phoneNumber);
        if (isexist) {
          const firebase_saved_data = await userCollection.getUser(phoneNumber);
          const update_firebase_obj = {...firebase_saved_data};
          update_firebase_obj.login = true;
          await userCollection.updateUser(update_firebase_obj);
          updateAuthState(update_firebase_obj);
        } else {
          updateAuthState(firebase_data);
          userCollection.addUser({...firebase_data});
        }

        setisotp(false);
        if (initialized) {
          navigation.navigate('HomeScreen');
        } else {
          navigation.navigate('CreateNewWallet', {add: false});
        }
      }
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }

  function updateAuthState(data) {
    const user_data = {
      mobile: data?.phoneNumber,
      name: data?.fullName,
    };
    const user_kyc_status = {
      aadharkyc: data?.aadharkyc == 1 ? 1 : 0,
      pankyc: data?.pankyc == 1 ? 1 : 0,
      aadhardockyc: data?.aadhardockyc == 1 ? 1 : 0,
    };
    if (data?.profile_image) {
      dispatch(setUserLogo(data?.profile_image));
    }
    // if(data?.panHolderName){
    //   console.log(data?.panHolderName,'in routesss panholder name')
    //   dispatch(setPanHolderName(data?.panHolderName))
    // }
    // if(data?.fullName){
    //   console.log(data?.fullName,'darta full name ')
    //   dispatch(setFullName(data?.fullName))
    // }
    dispatch(setUserKycStatus(user_kyc_status));
    dispatch(setUserData(user_data));
    dispatch(setIsLoggedIn(true));
  }

  const handleSkipPress = () => {
    navigation.navigate('HomeScreen');
  };

  // function isUserKycExist(number) {
  //   if (number) {
  //     userCollection
  //       .getUser(number)
  //       .then(res => {
  //         // console.log('res', res);
  //         if (res) {
  //           // dispatch(setLogin(res.login));
  //           dispatch(setUser({...res}));
  //           dispatch(setKYCStatus(1));
  //         }
  //       })
  //       .catch(e => {
  //         console.log(e, 'error');
  //       });
  //   }
  // }
  function customLogin() {
    const data = {
      address: {},
      adhaarNumber: '34343434343434',
      care_of: 'XXXXXXXXX',
      client_id: 'XXXXXXXXX',
      dob: '20-09-2000',
      email: 'maneesh@gmail.com',
      fullName: 'Maneesh',
      gender: 'male',
      isEmailVerify: true,
      isNewUser: false,
      login: true,
      phoneNumber: 8209615327,
      profile_image: '',
    };
    dispatch(setUser({...data}));
    dispatch(setLogin(true));
    // navigation.navigate(initialized ? 'TypewiterComponent' : 'TypewiterComponent');
    if (initialized) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.navigate('CreateNewWallet', {add: false});
    }
  }

  if (isotp) {
    return (
      <OtpScreen
        confirmCode={confirmCode}
        number={PhoneNumber}
        setstatus={setisotp}
        resend={signInWithPhoneNumber}
        loading={loading}
      />
    );
  } else {
    return (
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
        style={{paddingBottom: wp(3), flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="arrow-back" size={20} color={'#444'} />
          </TouchableOpacity>
          {/* <View style={styles.skipContainer}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkipPress}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={{justifyContent: 'center', flex: 0.99}}>
          <View>
            <View style={styles.heading}>
              <Text
                style={{
                  color: '#111',
                  paddingVertical: 10,
                  fontSize: wp(9),
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Log In
              </Text>
            </View>
          </View>

          <View
            style={{
              // backgroundColor: '#fff',
              marginHorizontal: wp(5),
              marginVertical: wp(5),
            }}>
            <View style={styles.wrapper}>
              <View style={styles.inputLabel}>
                <Text
                  style={[
                    styles.label,
                    PhoneNumber || isFocused || text !== ''
                      ? styles.labelFocused
                      : null,
                  ]}>
                  Phone Number
                </Text>
              </View>
              <View>
                <Text style={styles.countryCode}>+ 91</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  value={PhoneNumber}
                  onChangeText={no => setPhoneNumber(no)}
                  inputMode="numeric"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Browser', {
                  searchdata: {
                    text: 'https://nute.io/about',
                    inapp: true,
                  },
                });
              }}
              style={{alignItems: 'flex-end', marginVertical: wp(7)}}>
              <Text style={{color: '#14b7af'}}>Need Help ?</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
              }}>
              {/* <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                  console.log(checked,'checked in login')
                }}
              /> */}
              {/* <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!isChecked)}
                uncheckedColor={ isSubmit &&  !isChecked?'red':'black'}
              /> */}
              <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={handleCheckboxPress}
                uncheckedColor={redCheckbox ?  'red' : 'black'} 
                />
              <Text
                style={{
                  color: '#999',
                  fontSize: wp(3.1),
                }}>
                I have read and agree to the
                <Text
                  onPress={() => {
                    navigation.navigate('Browser', {
                      searchdata: {
                        text: 'https://nute.io/terms_of_use',
                        inapp: true,
                      },
                    });
                  }}
                  style={{color: '#14b7af'}}>
                  {' '}
                  terms and conditions
                </Text>{' '}
                of this crypto-fiat wallet service.
              </Text>
            </View>
            <View style={{marginTop: wp(5)}}>
              <TouchableOpacity
                // style={styles.btn}
                style={[styles.btn, redCheckbox ? {borderColor: 'red'} : null]}
                onPress={() => {
                  // Vibration.vibrate(500);
                  // setIsSubmit(true)
                  signInWithPhoneNumber(PhoneNumber);
                }}>
                {loading ? (
                  <ActivityIndicator color={'#fff'} size={22} />
                ) : (
                  <Text style={styles.btnText}> Proceed Securely</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{padding: wp(4)}}>
          <Text style={styles.termsText}>
            By proceeding, you agree to our Terms & Conditions & Privacy Policy.
            If you provide permission to access your contact list, Nute Wallet
            shall sync your contacts with its serves. SMS may be sent from your
            mobile number for verification purposes. Standard operator charges
            may apply for SMS
          </Text>
        </View>
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    width: width,
    paddingVertical: wp(5),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },

  heading: {
    marginHorizontal: wp(5),
    marginVertical: wp(4),
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#14b7af',
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    // marginBottom: wp(5),
    zindex: 0,
    backgroundColor: '#fff',
  },

  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    color: '#999',
  },

  countryCode: {
    color: '#14b7af',
    fontSize: wp(4.5),
    borderRightWidth: 0.5,
    borderRightColor: '#eee',
    paddingHorizontal: wp(2),
  },
  label: {
    position: 'absolute',
    left: 45,
    top: 28,
    fontSize: wp(4),
    color: '#999',
    zIndex: 1,

    paddingHorizontal: 2,
  },
  labelFocused: {
    top: 0,
    fontSize: wp(3.6),
    color: '#14b7af',
    left: 8,
    zIndex: 2,
    backgroundColor: '#fff',
  },

  input: {
    width: wp(74),
    fontSize: wp(4.5),
    color: '#000',
    // backgroundColor:'#fff'
  },

  inputText: {
    color: '#666',
  },

  termsText: {
    color: '#999',
    textAlign: 'justify',
    fontSize: wp(2.8),
  },

  btn: {
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: wp(3),
    paddingVertical: wp(4),
    marginVertical: wp(2),
    backgroundColor: '#000',
  },
  btnText: {
    color: '#fff',
    fontSize: wp(4),
    textAlign: 'center',
  },
  otpBox: {
    // flex: 1,
    // backgroundColor: '#f3f4',
  },
  TextStyle: {
    fontSize: wp(3.2),
    textAlign: 'center',
    color: '#000',
  },

  OtpText: {
    flex: 0.2,
    textAlign: 'center',
    marginTop: -10,
  },
  ImgStyle: {
    flex: 0.3,
    width: '100%',
    // height: isKeyboardOpen ? "40%" :""
  },
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  skipButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
