import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import OTPTextView from 'react-native-otp-textinput';
import userCollection from '../../../Store/firebase/user';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import OtpBox from '../../OtpScreen/OtpBox';
import {setEmail} from '../../../Store/authSlice';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const ProfileScreen = props => {
  const dispatch = useDispatch();
  const [firebaseUser, setFirebaseUser] = useState();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('user123@gmail.com');
  const [otpSms, setOtpSms] = useState(
    Math.floor(100000 + Math.random() * 900000),
  );
  const [showOtpSheet, setShowOtpSheet] = useState(false);
  const [isSameOtp, setIsSameOtp] = useState();
  const [otp, setOtp] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const refEmailSheet = useRef();

  const [showFullName, setShowFullName] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showPanNumber, setShowPanNumber] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showAadharNumber, setShowAadharNumber] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  function openDocSheet() {
    setShowOtpSheet(false);
    return refEmailSheet.current.open();
  }
  function closeDocSheet() {
    setShowError(false);
    return refEmailSheet.current.close();
  }
  const navigation = useNavigation();
  const {
    user,
    isLoggedIn,
    kyc,
    aadhardockyc,
    aadharKyc,
    pankyc,
    user_logo,
    panNumber,
    adhaarNumber,
    email,
  } = useSelector(state => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const userdata = await userCollection.getUser(user?.mobile);
        setFirebaseUser(userdata);
        // setAdminKycVerified(userdata?.adminKycVerified);
      })();
    }
  }, [kyc, aadhardockyc, aadharKyc, pankyc, isLoggedIn, email]);
  // email otp sending api

  const sendEmailOTP = async () => {
    setLoading(true);
    setShowError(false);
    console.log(otpSms);
    const data = {
      sender: {
        name: 'Support Nute',
        email: 'noreply@nute.io',
      },
      to: [
        {
          email: userEmail,
        },
      ],
      subject: 'Email Confirmation Code',
      templateId: 3,
      params: {
        name: 'John',
        surname: 'Doe',
        OTPP: otpSms,
      },
      headers: {
        'X-Mailin-custom':
          'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
        charset: 'iso-8859-1',
      },
    };
    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        data,
        {
          headers: {
            accept: 'application/json',
            'api-key':
              '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',
            'content-type': 'application/json',
            Cookie:
              '__cf_bm=mHFwbjaAVf3cFQR63IKOhRIgP7jQZfENBfNmrGDvdCI-1698987187-0-AZNyERrZqouNFhsZ4Fg5aB5KyI5YrhQTs9NrmJvm1E7zyFz0o/bBVnKvkOfqsT4IqimAeUyAgJyeMsERdGiVtUw=',
          },
        },
      );
      setLoading(false);
      console.log(JSON.stringify(response.data));
      setShowOtpSheet(true);
      // const isexist = await userCollection.checkUser(user?.mobile);
      // console.log(isexist,'isssss');
      // if (isexist) {
      //   const userdata = await userCollection.getUser(user?.mobile);
      //   const uobj = {...userdata};
      //   uobj.email=userEmail;
      //   await userCollection.updateUser({...uobj});
      //   dispatch(setEmail(email))
      // }

      // dispatch(setEmail(email))
      // .then(async data=>{
      //   setLoading(false);
      //   console.log(JSON.stringify(response?.data));
      //   setShowOtpSheet(true);
      // }).catch(error => {
      //   console.error(error);
      // });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const verifyOtp = () => {
    console.log(otp, 'verify otp');
    console.log(otpSms, 'otpSms');
    setIsSameOtp(false);
    if (otp == otpSms) {
      setIsSameOtp(true);
      closeDocSheet();
      updateEmailInFirebase(user?.mobile, userEmail);
    } else {
      setShowError(showError => !showError);
      // closeDocSheet();
    }
  };

  const handleOtpChange = v => {
    setOtp(v);
    if (v.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const updateEmailInFirebase = async (mobile, newEmail) => {
    const isexist = await userCollection.checkUser(mobile);
    if (isexist) {
      const userdata = await userCollection.getUser(mobile);
      const uobj = {...userdata};
      uobj.email = newEmail;
      await userCollection.updateUser({...uobj});
      dispatch(setEmail(newEmail));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const userdata = await userCollection.getUser(user?.mobile);
        setFirebaseUser(userdata);
        // setAdminKycVerified(userdata?.adminKycVerified);

        // Set the state variables to true to show the real data
        setShowFullName(true);
        setShowPhoneNumber(true);
        setShowPanNumber(true);
        setShowEmail(true);
        setShowAadharNumber(true);
        setShowAddress(true);
      })();
    }
  }, [kyc, aadhardockyc, aadharKyc, pankyc, isLoggedIn, email]);

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
        style={{paddingBottom: wp(3), flex: 1}}>
        <View>
          <View style={styles.header}>
            <MaterialIcons
              name="arrow-back"
              size={25}
              color={'#444'}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                color: '#444',
                fontSize: wp(5),
                fontWeight: '600',
                paddingLeft: 15,
              }}>
              Account
            </Text>
          </View>
          <ScrollView style={{marginBottom: wp(20)}}>
            <View style={styles.profileCards}>
              <View style={styles.profileCardsInner}>
                <View style={{position: 'relative'}}>
                  <View>
                    
                    <View
                      style={{
                        width: wp(26),
                        backgroundColor: '#fff',
                        height: wp(26),
                        margin: wp(1),
                        borderRadius: wp(50),
                        shadowColor: '#666',
                        shadowOffset: {
                          width: 0,
                          height: 7,
                        },
                        shadowOpacity: 0.41,
                        shadowRadius: 9.11,
                        elevation: 5,
                        justifyContent: 'center',
                      }}>
                        
                      {isLoggedIn && aadharKyc ? (
                        <Image
                          source={{uri: `data:image/jpeg;base64, ${user_logo}`}}
                          style={{
                            width: wp(25),
                            height: wp(25),
                            borderRadius: wp(50),
                            alignSelf: 'center',
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          source={require('../../assets/user.png')}
                          style={{
                            width: wp(25),
                            height: wp(25),
                            borderRadius: wp(50),
                            alignSelf: 'center',
                          }}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      right: 0,
                      width: wp(8.5),
                      height: wp(8.5),
                    }}>
                    {isLoggedIn && aadharKyc === 1 ? (
                      <Image
                        source={require('../../assets/approved-shield.png')}
                        style={{
                          width: wp(8),
                          height: wp(8),
                        }}
                      />
                    ) : null}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.cardItemsWrapper}>
              <View style={styles.headingLabel}>
                <Text style={styles.headingLabelTxt}>Full Name</Text>
              </View>
              <View style={styles.box}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.menuWrapper}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View>
                        <ShimmerPlaceHolder
                          visible={showFullName}
                          style={styles.menuNamePlaceholder}>
                          {isLoggedIn && firebaseUser?.panKyc == 1 ? (
                            <Text
                              style={[styles.menuName, {fontWeight: '500'}]}>
                              {firebaseUser?.panHolderName}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.menuName,
                                {fontWeight: '500'},
                              ]}></Text>
                          )}
                        </ShimmerPlaceHolder>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.headingLabel}>
                <Text style={styles.headingLabelTxt}>Phone Number</Text>
              </View>
              <View style={styles.box}>
                <View style={styles.menuWrapper}>
                  <View>
                    <ShimmerPlaceHolder
                      visible={showFullName}
                      style={styles.menuNamePlaceholder}>
                      {isLoggedIn ? (
                        <Text style={[styles.menuName, {fontWeight: '500'}]}>
                          {user?.mobile ? ' ' + user?.mobile : null}
                        </Text>
                      ) : (
                        <Text style={[styles.menuName, {fontWeight: '500'}]}>
                          {/* {user?.mobile ? ' ' + user?.mobile : null} */}
                        </Text>
                      )}
                    </ShimmerPlaceHolder>
                    {/* <Text style={[styles.menuName, {fontWeight:'500'}]}>{user?.phoneNumber}</Text> */}
                  </View>
                </View>
              </View>

              <View style={styles.headingLabel}>
                <Text style={styles.headingLabelTxt}>Email</Text>
              </View>
              <TouchableOpacity onPress={() => openDocSheet()}>
                <View style={styles.box}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={styles.menuWrapper}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View>
                          <ShimmerPlaceHolder
                            visible={showFullName}
                            style={styles.menuNamePlaceholder}>
                            {firebaseUser?.email ? (
                              <Text numberOfLines={1} style={[styles.menuName]}>
                                {firebaseUser?.email}
                              </Text>
                            ) : (
                              <Text
                                numberOfLines={1}
                                style={[styles.menuName, , {color: '#999'}]}>
                                user@gmail.com
                              </Text>
                            )}
                          </ShimmerPlaceHolder>
                        </View>
                      </View>
                      <View>
                        <MaterialIcons
                          name="arrow-forward-ios"
                          size={14}
                          style={styles.infoIcon}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.headingLabel}>
                <Text style={styles.headingLabelTxt}>PAN Number</Text>
              </View>
              <View style={styles.box}>
                <View style={styles.menuWrapper}>
                  <View>
                    <ShimmerPlaceHolder
                      visible={showFullName}
                      style={styles.menuNamePlaceholder}>
                      {isLoggedIn && firebaseUser?.panKyc === 1 ? (
                        <Text style={[styles.menuName, {fontWeight: '500'}]}>
                          {firebaseUser?.panNumber
                            ? ' ' + firebaseUser?.panNumber
                            : null}
                        </Text>
                      ) : (
                        <Text style={[styles.menuName, {fontWeight: '500'}]}>
                          {/* {panNumber ? ' ' + panNumber : null} */}
                        </Text>
                      )}
                    </ShimmerPlaceHolder>
                    {/* <Text numberOfLines={1} style={[styles.menuName, {fontWeight:'500'}]}>
                    AS4525DF5452415S
                  </Text> */}
                  </View>
                </View>
              </View>
              <View style={styles.headingLabel}>
                <Text style={styles.headingLabelTxt}>
                  Aadhar/ Voter Id / Driving License/ Passport
                </Text>
              </View>
              <View style={styles.box}>
                <View>
                  <View style={styles.menuWrapper}>
                    <View>
                      <View>
                        <ShimmerPlaceHolder
                          visible={showFullName}
                          style={styles.menuNamePlaceholder}>
                          {isLoggedIn && aadharKyc === 1 ? (
                            <Text
                              numberOfLines={1}
                              style={[styles.menuName, {fontWeight: '500'}]}>
                              {firebaseUser?.adhaarNumber}
                            </Text>
                          ) : (
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.menuName,
                                {fontWeight: '500'},
                              ]}></Text>
                          )}
                        </ShimmerPlaceHolder>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.headingLabel}>
                <Text style={styles.headingLabelTxt}>Address</Text>
              </View>
              <View style={styles.box}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.menuWrapper}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // alignItems: 'center',
                        height: 'auto',
                        // backgroundColor:'#ccc'
                      }}>
                      <View>
                        <ShimmerPlaceHolder
                          visible={showFullName}
                          style={[styles.menuNamePlaceholder]}>
                          {isLoggedIn && aadharKyc === 1 ? (
                            <Text style={styles.menuName}>
                              {firebaseUser?.address?.house} ,{' '}
                              {firebaseUser?.address?.landmark},{' '}
                              {firebaseUser?.address?.loc},{' '}
                              {firebaseUser?.address?.dist},{' '}
                              {firebaseUser?.address?.state},{' '}
                              {firebaseUser?.address?.country}
                            </Text>
                          ) : (
                            <Text style={styles.menuName}></Text>
                          )}
                        </ShimmerPlaceHolder>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
      <RBSheet
        ref={refEmailSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={350}
        draggableIcon={false}
        openDuration={400}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 10,
          }}>
          {/* For Email Change */}
          <View>
            <ScrollView>
              <View style={{display: showOtpSheet ? 'none' : 'block'}}>
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: wp(2),
                    marginTop: wp(5),
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontWeight: '600',
                      paddingHorizontal: 10,
                      marginBottom: wp(2),
                    }}>
                    Update Email
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: wp(4),
                    marginTop: wp(3),
                  }}>
                  <View
                    style={{marginBottom: wp(5), paddingHorizontal: wp(0.5)}}>
                    <Text style={{color: '#999', fontSize: 13}}>
                      Must be verified email address for buy/sell crypto tokens
                      with third party apps, also for notifications
                    </Text>
                  </View>
                  <View style={styles.boxEdit}>
                    <View style={styles.input}>
                      <TextInput
                        placeholder="Enter Email Address"
                        placeholderTextColor={'#999'}
                        inputMode="email"
                        // onChangeText={val => setUserEmail(val)}
                        onChangeText={val => {
                          setUserEmail(val);
                          const emailRegex =
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                          setIsEmailValid(emailRegex.test(val));
                        }}
                        // value={userEmail}
                        color={'#000'}
                      />
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      // style={styles.button}
                      style={[
                        styles.button,
                        isEmailValid ? styles.button : styles.disabledButton,
                      ]}
                      // style={[styles.button, { backgroundColor: isEmailValid ? '#007AFF' : '#ccc' }]}
                      onPress={sendEmailOTP}
                      disabled={!isEmailValid} // Disable the button if the email is not valid
                    >
                      {loading ? (
                        <ActivityIndicator
                          size={20}
                          color={'#fff'}
                          style={{marginHorizontal: 5}}
                        />
                      ) : null}
                      <Text style={styles.buttonText}>Send Email OTP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Do not delete this code it is For Email OTP */}

          {showOtpSheet && (
            <View>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: wp(2),
                  marginTop: wp(5),
                }}>
                {showError ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: showError ? 'red' : '#000',
                      fontWeight: '600',
                      paddingHorizontal: 10,
                      marginBottom: wp(2),
                    }}>
                    Wrong Otp Entered
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      color: showError ? 'red' : '#000',
                      fontWeight: '600',
                      paddingHorizontal: 10,
                      marginBottom: wp(2),
                    }}>
                    Email Verification Code
                  </Text>
                )}
                {/* <Text
                  style={{
                    fontSize: 16,
                    color: showError ? 'red' : '#000',
                    fontWeight: '600',
                    paddingHorizontal: 10,
                    marginBottom: wp(2),
                  }}>
                  Email Verification Code
                </Text> */}
              </View>
              <View
                style={{
                  marginHorizontal: wp(4),
                  alignItems: 'center',
                }}>
                <View style={styles.headingLabelEdit}>
                  <View style={{paddingVertical: wp(2)}}>
                    {showError ? null : (
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#888',
                        }}>
                        Please enter six digit email verification code that was
                        sent to{' '}
                        <Text
                          style={{
                            color: '#000',
                          }}>
                          {userEmail}
                        </Text>
                      </Text>
                    )}
                    {/* <Text
                      style={{
                        fontSize: 13,
                        color: '#888',
                      }}>
                      Please enter six digit email verification code that was
                      sent to{' '}
                      <Text
                        style={{
                          color: '#000',
                        }}>
                        {userEmail}
                      </Text>
                    </Text> */}
                  </View>
                </View>

                {/* <OTPTextView
                // handleTextChange={e => {
                //   this.updateOtpText(e);
                // }}
                containerStyle={styles.textInputContainer}
                textInputStyle={styles.roundedTextInput}
                tintColor={'#3CB371'}
                offTintColor={'#f3f2f8'}
                inputCount={6}
                autoFocus={false}
              /> */}
                <OtpBox
                  // checkOtp={v => {
                  //   setOtp(v);
                  // }}
                  checkOtp={handleOtpChange}
                  showError={showError}
                  // style={showError ? styles.errorBox : null} // Apply error style
                />
                <View style={{margin: wp(4), width: '100%'}}>
                  {/* <TouchableOpacity style={styles.button} onPress={verifyOtp} > */}
                  <TouchableOpacity
                    style={[
                      styles.button,
                      disabled ? styles.disabledButton : null,
                    ]}
                    onPress={verifyOtp}
                    disabled={disabled}>
                    <Text style={[styles.buttonText]}>Verify</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f8',
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },

  profileCards: {
    justifyContent: 'center',
    paddingTop: wp(6),
    // borderWidth: 0.4,
    // borderColor: '#ddd',
    // backgroundColor: '#ffffff73',
  },

  profileCardsInner: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(4),
    borderWidth: 0.5,
    borderColor: '#000',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: wp(5),
    marginTop: wp(2),
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ddd', // Change to the color you want for disabled state
    borderColor: '#ddd', // Change to the border color for disabled state
  },
  buttonText: {
    color: 'white', // Text color for enabled state
  },
  redbutton: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(4),
    borderWidth: 0.5,
    borderColor: '#000',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: wp(5),
    marginTop: wp(2),
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  title: {
    fontSize: wp(5),
    fontWeight: '500',
  },

  titleBox: {
    marginLeft: wp(7),
  },

  leftIocnStyle: {
    // width: wp(15),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cardItemsWrapper: {
    marginHorizontal: wp(5),
    marginTop: wp(0),
  },

  box: {
    marginBottom: wp(5),
    backgroundColor: '#f3f2f7',
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: wp(2),
    paddingVertical: wp(3),
  },
  boxEdit: {
    marginBottom: wp(5),
    // backgroundColor: '#f3f2f8',
    // borderRadius: 10,
    width: '100%',
    // paddingHorizontal: wp(2),
    // paddingVertical: wp(3),
  },
  headingLabel: {
    marginBottom: wp(1),
    paddingStart: wp(4),
    width: '98%',
    alignItems: 'flex-start',
  },
  headingLabelTxt: {
    color: '#888',
    fontSize: wp(3.2),
  },

  iconStyle: {color: '#666'},

  menuWrapper: {
    paddingStart: wp(2),
    flex: 1,
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

  menuName: {
    color: '#333',
    fontWeight: 'normal',
    fontSize: wp(3.6),
    fontWeight: '500',
  },
  walletHeading: {
    color: '#999',
    fontSize: wp(3.2),
  },
  walletList: {
    color: '#999',
    fontSize: wp(4),
    marginEnd: wp(2),
  },

  infowrapper: {
    backgroundColor: '#DFECF7',
    // color: '#E0F7E5',
    paddingHorizontal: wp(4),
    paddingVertical: wp(4),
    width: wp(87),
    borderRadius: wp(3),
    marginTop: wp(3),
    marginHorizontal: wp(4),
  },

  listItem: {
    color: '#003D87',
    fontSize: wp(3.2), // Adjust this for spacing between items
  },
  bullet: {
    fontSize: 13, // Adjust bullet size if needed
    marginRight: 5,
    color: '#003D87',
  },
  displayHori: {
    flexDirection: 'row',
  },
  input: {
    color: '#444',
    height: hp(5),
    paddingHorizontal: 10,
    fontSize: 13,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f8',
  },

  headingLabelEdit: {
    width: '100%',
    marginBottom: wp(1),

    // paddingStart: wp(4),
    // width: '98%',
    // alignItems: 'flex-start',
  },

  textInputContainer: {
    flexDirection: 'row',
    marginTop: wp(3),
  },

  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 0.6,
    backgroundColor: '#f3f4f8',
    width: 43,
    height: 43,
    borderColor: '#333',
    borderBottomWidth: 1,
    borderColor: '#333',
    fontSize: 17,
  },
  errorBox: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  menuNamePlaceholder: {
    width: '100%', // Adjust the width as needed
    // height: 18, // Adjust the height as needed
    backgroundColor: '#f3f2f8', // Adjust the background color as needed
    borderRadius: 5,
    // marginBottom: wp(2),
  },
});

export default ProfileScreen;
