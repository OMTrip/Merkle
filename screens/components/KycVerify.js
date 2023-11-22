import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import userCollection from '../../Store/firebase/user';
import axios from 'axios';
import {
  setUserData,
  setUserKycStatus,
  setUserLogo,
} from '../../Store/authSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native-ui-lib';
import OtpBox from '../OtpScreen/OtpBox';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';

const KycScreen = props => {
  const {user, isLoggedIn} = useSelector(state => state.auth);
  const [adhaarNumber, setadhaarNumber] = useState('');
  const [Otp, setOtp] = useState('');
  const [adhardata, setAdhaarData] = useState('');
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [firebaseUser, setFirebaseUser] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [changeBtnText, setChangeBtnText] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const refDocSheet = useRef();

  function openDocSheet() {
    return refDocSheet.current.open();
  }
  function closeDocSheet() {
    return refDocSheet.current.close();
  }

  async function checkadhaar(aadharno) {
    if (aadharno && aadharno?.toString()?.length > 0) {
      try {
        setLoadingOtp(true);
        // setloading(true);
        axios
          .post(
            'https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-v2/generate-otp',
            {
              id_number: aadharno,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization:
                  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0MTI4OTg5NiwianRpIjoiMmFmODgwMWUtNTU0NC00NDMzLWJlNWYtOGU5ZmFlNThhNDQ4IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmJpdGZsYXNoQGFhZGhhYXJhcGkuaW8iLCJuYmYiOjE2NDEyODk4OTYsImV4cCI6MTk1NjY0OTg5NiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInJlYWQiXX19.8-DTl7BMrqnimNXINKxRymjLp7tEyR96T4jLIG67STg',
                responseType: 'json',
              },
            },
          )
          .then(data => {
            if (data?.data) {
              setAdhaarData(data?.data);
            }
            setLoadingOtp(false);
            // setloading(false);
          })
          .catch(error => {
            console.error(error);
            setLoadingOtp(false);
          });
      } catch (e) {
        setLoadingOtp(false);
        // setloading(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try agian',
        });
        console.log(e, 'error in checkadhaar');
      }
    } else {
      // setloading(false);
      setLoadingOtp(false);
      Toast.show({
        type: 'error',
        text1: 'Invalid Adhaar Number',
        text2: 'Please enter valid Adhaar number',
      });
    }
  }

  async function verifyadhar(clientid, mobileno, otp) {
    console.log(clientid, otp, 'result of send');
    if (otp) {
      setLoadingVerify(true); // Set loadingVerify to true

      // setloading(true);
      try {
        axios
          .post(
            'https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-v2/submit-otp',
            {
              client_id: clientid,
              otp: otp,
              mobile_number: mobileno,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization:
                  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0MTI4OTg5NiwianRpIjoiMmFmODgwMWUtNTU0NC00NDMzLWJlNWYtOGU5ZmFlNThhNDQ4IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmJpdGZsYXNoQGFhZGhhYXJhcGkuaW8iLCJuYmYiOjE2NDEyODk4OTYsImV4cCI6MTk1NjY0OTg5NiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInJlYWQiXX19.8-DTl7BMrqnimNXINKxRymjLp7tEyR96T4jLIG67STg',
                // 'cache-control': 'no-cache',
                // 'Access-Control-Allow-Origin': '*',
                responseType: 'json',
              },
            },
          )
          .then(async data => {
            // Process the JSON data here
            setLoadingVerify(false); // Set loadingVerify to false after the call

            if (data?.data) {
              const res = data?.data;
              if (res) {
                const {
                  aadhaar_number,
                  address: {
                    country,
                    dist,
                    house,
                    landmark,
                    loc,
                    po,
                    state,
                    street,
                    subdist,
                    vtc,
                  },
                  care_of,
                  client_id,
                  dob,
                  full_name,
                  gender,
                  profile_image,
                } = res.data;

                const isexist = await userCollection.checkUser(user?.mobile);
                if (isexist) {
                  const userdata = await userCollection.getUser(user?.mobile);
                  const uobj = {...userdata};
                  uobj.adhaarNumber = aadhaar_number;
                  uobj.aadharKyc = 1; // Set aadharKyc to 1
                  uobj.address = {
                    country,
                    dist,
                    house,
                    landmark,
                    loc,
                    po,
                    state,
                    street,
                    subdist,
                    vtc,
                  };
                  uobj.care_of = care_of;
                  uobj.dob = dob;
                  uobj.fullName = full_name;
                  uobj.gender = gender;
                  uobj.profile_image = profile_image;
                  await userCollection.updateUser({...uobj});
                  const user_data = {
                    mobile: user?.mobile,
                    name: full_name,
                  };
                  const user_kyc_status = {
                    aadharKyc: 1,
                    panKyc: 1,
                    aadhardockyc: 0,
                  };
                  if (profile_image) {
                    dispatch(setUserLogo(profile_image));
                  }
                  dispatch(setUserKycStatus(user_kyc_status));
                  dispatch(setUserData(user_data));
                  setChangeBtnText(true);
                  // Toast.show({
                  //   type: 'success',
                  //   text1: 'Your Adhaar is verified',
                  //   text2: 'Thank you!',
                  // });
                }
              }
            }
          })
          .catch(error => {
            console.error(error);
            setLoadingVerify(false); // Set loadingVerify to false after the call
          });
      } catch (e) {
        setLoadingVerify(false); // Set loadingVerify to false after the call
        Toast.show({
          type: 'error',
          text1: 'Something webt wrong',
          text2: 'Please try again',
        });
        console.log(e, 'error in verifyadhaar');
      }
    } else {
      setLoadingVerify(false); // Set loadingVerify to false after the call
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter valid OTP',
      });
    }
  }

  function check(otp) {
    if (adhardata) {
      verifyadhar(adhardata?.data?.client_id, '', otp);
      setOtpModalVisible(true);
    } else {
      checkadhaar(adhaarNumber);
    }
  }
  // function navigateTo() {
  //   setChangeBtnText(true)
  //   // setOtpModalVisible(false);
  //   // navigation.navigate('DocumentVerificationScreen');
  // }
  const changeNavigation = () => {
    // navigation.navigate('UploadDocumentSingle');
    // closeModal();
    navigation.navigate('Home')
    setOtpModalVisible(!otpModalVisible);
  };

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const userdata = await userCollection.getUser(user?.mobile);
        setFirebaseUser(userdata);
      })();
    }
  }, []);

  useEffect(() => {
    if (adhaarNumber.length === 12) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [adhaarNumber]);

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
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={22} color={'#000'} />
          <Text
            style={{
              color: '#000',
              fontSize: wp(4.5),
              fontWeight: '500',
              marginBottom: wp(1),
              marginStart: wp(2),
            }}>
            Verify KYC
          </Text>
        </View>
      </TouchableOpacity>
        <ScrollView>
          <View style={styles.pageWrapper}>
            <Text
              style={{
                color: '#000',
                fontSize: wp(4.5),
                fontWeight: '600',
                marginBottom: wp(1),
              }}>
              Verify Adhaar Number
            </Text>
            {/* <Text style={{color: '#666', fontSize: wp(3.5)}}>
              Adhaar card is mandatory for user verification
            </Text> */}
            <Text style={{color: '#666', fontSize: wp(3.5), lineHeight: 18}}>
              To verify your KYC please enter Aadhar Number of{' '}
              <Text
                style={{
                  color: '#000',
                  fontSize: wp(3.5),
                  fontWeight: '500',
                  textTransform: 'capitalize',
                }}>
                {' '}
                {firebaseUser?.panHolderName}{' '}
              </Text>{' '}
              only.
            </Text>
            <View style={{marginVertical: wp(8)}}>
              <Image
                resizeMode="contain"
                style={{width: '100%', height: 180}}
                source={require('../assets/adhaar-card-dummy.png')}
              />
            </View>
            <View>
              <View style={styles.input}>
                <TextInput
                  placeholder="Enter Aadhar Number"
                  placeholderTextColor={'#999'}
                  value={adhaarNumber}
                  keyboardType="numeric"
                  onChangeText={val => setadhaarNumber(val)}
                  style={{flex: 0.94}}
                  color={'#000'}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => openDocSheet()}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '400',
                  textAlign: 'right',
                  fontSize: wp(3.5),
                  paddingEnd:wp(6),
                  textDecorationLine:'underline'
                }}>
                Manual KYC
              </Text>
            </TouchableOpacity>
          </View>
         
        </ScrollView>
        <TouchableOpacity
          style={[styles.send, isButtonDisabled ? styles.sendDisabled : null]}
          onPress={() => {
            check(Otp);
            setOtpModalVisible(true);
          }}
          disabled={isButtonDisabled || loadingOtp}>
          {loadingOtp ? (
            <ActivityIndicator
              size={20}
              color={'#fff'}
              style={{marginHorizontal: 5}}
            />
          ) : null}
          <Text
            style={[
              styles.sendBtnTxt,
              isButtonDisabled ? styles.sendBtnTxtDisabled : null,
            ]}>
            Proceed
          </Text>
        </TouchableOpacity>
        </LinearGradient>
    
        <View>
        
      </View>
      {adhardata ? (
        <>
          <Modal
            visible={otpModalVisible}
            animationType="slide"
            transparent={true}>         
          
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
            style={{flex: 1, paddingHorizontal:wp(5)}}>
              

            <View style={{paddingVertical:wp(5)}}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={30}
                color={'#000'}
                onPress={() => navigation.navigate('HomeScreen')}
              />
            </View>
             <View style={{
                // backgroundColor: '#eee',
                flex: 0.95,   
                justifyContent:'center',
                // paddingHorizontal: wp(5),
              }}>

            <View
              style={{
              }}>
              <Text
                style={{
                  fontSize: wp(4.5),
                  color: '#000',
                  fontWeight: '600',
                  paddingHorizontal: 10,
                  marginBottom: wp(2),
                  textAlign:'center'
                }}>
                Aadhar Verification Code
              </Text>
            </View>

                <View style={styles.infowrapper}>
                  <Text style={styles.listItem}>
                    A one-time password (OTP) has been sent to the mobile number
                    linked to your Aadhar.
                  </Text>               

                  <View style={{marginBottom:wp(4)}}>
                    <OtpBox
                      checkOtp={v => {
                        setOtp(v);
                      }}
                    />  
                  
                  </View>           

                  {/* {changeBtnText &&  */}
                  <TouchableOpacity
                    style={[styles.verifyBtn, changeBtnText ? styles.remove : null]}
                    onPress={() => {
                      // console.log(Otp,'OTP')
                      verifyadhar(adhardata?.data?.client_id, '', Otp);
                    }}
                    disabled={loadingVerify}>
                    {loadingVerify ? ( // Show loader if loadingVerify is true
                      <ActivityIndicator
                        size={20}
                        color={'#fff'}
                        style={{marginHorizontal: 5}}
                      />
                    ) : null}
                    <Text style={{color: '#fff'}}>Verify Aadhar</Text>
                  </TouchableOpacity>
                  {changeBtnText && (
                    <View>
                      <Text style={{color: '#36cabd'}}>
                        Your Aadhar Number is verified successfully !
                      </Text>
                      <TouchableOpacity
                        style={styles.verifyBtn}
                        onPress={changeNavigation}
                        disabled={loadingVerify} // Disable the button while loading
                      >
                        {loadingVerify ? ( // Show loader if loadingVerify is true
                          <ActivityIndicator
                            size={20}
                            color={'#fff'}
                            style={{marginHorizontal: 5}}
                          />
                        ) : null}
                        <Text style={{color: '#fff'}}>
                         Verified Successfully
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                   </View>
              </View>
            </LinearGradient>
          </Modal>
        </>
      ) : null}
      <RBSheet
        ref={refDocSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={450}
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
          <View style={{alignItems: 'center', paddingVertical: wp(2)}}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: '600',
                paddingHorizontal: 10,
                marginBottom: wp(2),
                textTransform: 'uppercase',
              }}>
              Select Document
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: wp(4),
              marginTop: wp(4),
            }}>
            <View style={styles.wrapper}>
              <TouchableOpacity
                style={styles.sheetCard}
                onPress={() => {
                  navigation.navigate('ManualKycUploadDoc', {
                    documentType: 'Passport', // Pass the data you want to send here
                  });
                  closeDocSheet(); // Optionally close the bottom sheet
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/passport.png')}
                    style={{
                      width: wp(9),
                      height: wp(9),
                      marginEnd: wp(2),
                    }}
                  />
                  <Text style={styles.headinglabels}>Passport</Text>
                </View>

                <View>
                  <MaterialIcons
                    style={styles.arrowIcon}
                    name="keyboard-arrow-right"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sheetCard}
                onPress={() => {
                  navigation.navigate('ManualKycUploadDoc', {
                    documentType: 'Voter ID',
                  });
                  closeDocSheet();
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/adhara-card.png')}
                    style={{
                      width: wp(9),
                      height: wp(9),
                      marginEnd: wp(2),
                    }}
                  />
                  <Text style={styles.headinglabels}>Voter ID</Text>
                </View>

                <View>
                  <MaterialIcons
                    style={styles.arrowIcon}
                    name="keyboard-arrow-right"
                    size={20}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sheetCard}
                onPress={() => {
                  navigation.navigate('ManualKycUploadDoc', {
                    documentType: 'Aadhar Card',
                  });
                  closeDocSheet();
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/id-card.png')}
                    style={{
                      width: wp(9),
                      height: wp(9),
                      marginEnd: wp(2),
                    }}
                  />
                  <Text style={styles.headinglabels}>Adhaar Card ID</Text>
                </View>

                <View>
                  <MaterialIcons
                    style={styles.arrowIcon}
                    name="keyboard-arrow-right"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  pageWrapper: {
    marginHorizontal: wp(6),
    marginVertical:wp(2),
  },
  profileCards: {
    paddingHorizontal: wp(3),
    marginHorizontal: wp(4),
    paddingVertical: wp(3),
    backgroundColor: '#fff',
    marginVertical: hp(1),
    color: '#444',
    borderRadius: wp(2),
    shadowColor: '#666',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },

  profileCardsInner: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: wp(2),
    borderWidth: 0.5,
    borderColor: '#000',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: wp(5),
    marginTop: wp(2),
    width: wp(32),
  },
  buttonText: {
    color: '#000',
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

  infowrapper: {
    // paddingHorizontal: wp(2),
    paddingVertical: wp(4),
    // borderRadius: wp(4),
    // marginVertical: wp(2),
    // borderColor: '#ccc',
    // borderWidth: 0.5,
  },

  listItem: {
    color: '#999',
    marginBottom: wp(4),
    lineHeight:20,
    // textAlign:'center',
    fontSize: wp(3.2), 
  },
  bullet: {
    fontSize: 13, 
    marginRight: 5,
    color: '#333',
  },
  displayHori: {
    flexDirection: 'row',
    marginBottom: wp(2),
    width: 290,
  },
  input: {
    color: '#444',
    height: hp(5),
    backgroundColor: '#f3f4f7',
    textTransform: 'uppercase',
    width: '85%',
    // borderWidth: 0.5,
    // borderColor: '#ccc',
    alignSelf:'center',
    paddingHorizontal: 10,
    fontSize: 13,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: wp(3),
  },
  ModalInputBox: {
    color: '#444',
    height: hp(5),
    backgroundColor: '#eee',
    textTransform: 'uppercase',
    // width: '85%',
    // borderWidth: 0.5,
    // borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 13,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: wp(3),
  },

  send: {
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    marginBottom: 30,
  },

  verifyBtn: {
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    marginTop: wp(5),
  },
  remove: {
    display: 'none',
  },
  textInputContainer: {
    flexDirection: 'row',
  },

  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 0.6,
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    borderColor: '#333',
    borderBottomWidth: 0.6,
    borderColor: '#333',
  },

  sendDisabled: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor:'#000',
  },

  sendBtnTxt: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 15,
  },
  sendBtnTxtDisabled: {
    color: '#000',
    fontWeight: 'normal',
  },

  selectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
  },

  wrapper: {
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
    // paddingHorizontal: wp(2),
    marginVertical: hp(1),
  },
  labels: {
    color: '#666',
    fontSize: hp(1.6),
    paddingBottom: wp(1.5),
  },

  sheetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f8',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    marginVertical: wp(2),
  },
  
  headinglabels:{
    color:'#444'
  }
});

export default KycScreen;
