import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {setKYCStatus, setUser} from '../../Store/userinfo';
import {userSchema} from '../../Store/firebase/schema';
import userCollection from '../../Store/firebase/user';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const EmailVerify = () => {
  const {login, kyc, user} = useSelector(state => state.user);
  const [Otp, setOtp] = useState(0);
  const [adhardata, setAdhaarData] = useState('');
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(false);
  const [emailError, setEmailError] = useState('');
  const validateEmail = email => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };
  const handleEmailChange = val => {
    setEmail(val);
    validateEmail(val);
  };

  async function verifyEmail(emailAdd) {
    axios
      .get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=e1d52e88d90e4ccd93517564b593e7fb&email=${emailAdd}`,
      )
      .then(response => {
        if (response.data.deliverability == 'DELIVERABLE') {
          const users = {...user};
          users.email = emailAdd;
          users.isEmailVerify = true;
          setEmailStatus(true);
          userCollection.updateUser({...users});
          dispatch(setUser({...users}));
          dispatch(setKYCStatus(1));
          Toast.show({
            type: 'success',
            text1: 'Your KYC verified and email updated.',
            text2: 'Thank you!',
          });
          navigation.navigate("Home")
        } else {
          setEmailError('Please enter a valid email address.');
        }
      })
      .catch(error => {
        setEmailError('Something Went Wrong.');
        console.log(error);
        return false;
      });

    // if (response.data.deliverability === 'DELIVERABLE') {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  async function emailAuth() {
    const dt = await verifyEmail(email);
    if (dt.deliverability == 'DELIVERABLE') {
      const userD = user;
      console.log(userD, 'userD');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="close"
          size={22}
          color={'#444'}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: '#444',
            fontSize: hp(2),
            fontWeight: '600',
            paddingLeft: 20,
          }}>
          Email Verify
        </Text>
      </View>

      <View style={styles.profileCards}>
        <View style={styles.profileCardsInner}>
          <View>
            <View style={{position: 'relative'}}>
              {user?.profile_image ? (
                <View>
                  <Image
                    source={{
                      uri: 'data:image/png;base64,' + user?.profile_image,
                    }}
                    style={{
                      width: wp(30),
                      height: wp(30),
                      borderRadius: wp(50),
                      margin: wp(1),
                      backgroundColor: '#eee',
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    source={require('../assets/user.png')}
                    style={{
                      width: wp(30),
                      height: wp(30),
                      borderRadius: wp(50),
                      margin: wp(1),
                      backgroundColor: '#000',
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}

              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 0,
                  backgroundColor: '#fff',
                  padding: 5,
                  borderRadius: wp(50),
                  borderWidth: 0.5,
                  borderColor: '#eee',
                }}>
                <MaterialIcons name="photo-camera" size={20} color={'#444'} />
              </View>
            </View>
          </View>
          <View
            style={{
              margin: wp(2),
              // flexDirection: 'column',
            }}>
            <View>
              <Text style={{color: '#444'}}>{user?.phoneNumber}</Text>
            </View>

            {/* {kyc == 0 ? (
              <TouchableOpacity
                style={styles.button}
                // onPress={handlePress}
              >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.buttonText}>Verify KYC</Text>

                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={16}
                    color={'#444'}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 5,
                }}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={16}
                  color={'#25d366'}
                />
                <Text style={{color: '#333', paddingHorizontal: 8}}>
                  KYC Verified
                </Text>
              </View>
            )} */}
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginHorizontal: wp(4),
          flex: 0.78,
          // backgroundColor: '#eee',
        }}>
        <View style={styles.input}>
          <TextInput
            placeholder="Enter Email Address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={handleEmailChange}
            style={{flex: 0.94}}
          />
        </View>
        <View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
        {adhardata ? (
          <>
            <View style={styles.infowrapper}>
              <View style={styles.displayHori}>
                <Entypo name="dot-single" size={18} color={'#444'} />
                <Text style={styles.listItem}>
                  Ckeck your adhaar linked mobile number
                </Text>
              </View>
              <View style={styles.displayHori}>
                <Entypo name="dot-single" size={18} color={'#444'} />
                <Text style={styles.listItem}>
                  An OTP has been sent to your linked mobile number
                </Text>
              </View>
            </View>

            <View style={styles.input}>
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor={'#444'}
                value={Otp}
                onChangeText={val => setOtp(val)}
                style={{flex: 0.94}}
              />
            </View>
          </>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.send}
        onPress={() => {
          //   check(Otp);
          verifyEmail(email);
        }}>
        {loading ? (
          <ActivityIndicator
            size={20}
            color={'#fff'}
            style={{marginHorizontal: 5}}
          />
        ) : null}
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
          {adhardata ? 'Verify Email' : 'Proceed'}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f7',
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
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
    // width: '85%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 13,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 20,
  },
  tabbody: {
    flex: 1,
    paddingHorizontal: 10,
  },
  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontWeight: '800',
    padding: 10,
    fontSize: 16,
  },
});
