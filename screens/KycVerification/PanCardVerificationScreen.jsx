import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import userCollection from '../../Store/firebase/user';
import axios from 'axios';
import {setUserKycStatus} from '../../Store/authSlice';
import {Image} from 'react-native-ui-lib';
import {ScrollView} from 'react-native-gesture-handler';

const PanCardVerificationScreen = () => {
  const {user} = useSelector(state => state.auth);
  const [loading, setloading] = useState(false);
  const [panNumber, setPanNumber] = useState('');
  const [panHolderName, setPanHolderName] = useState('');
  const [panCardError, setPanCardError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Regular expression pattern for a valid PAN card number
  const panCardRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

  async function kycverifyPanNumber(panNumber) {
    if (panCardRegex.test(panNumber) && user?.mobile) {
      try {
        setloading(true);
        axios
          .post(
            'https://kyc-api.surepass.io/api/v1/pan/pan',
            {
              id_number: panNumber,
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
          .then(async data => {
            const res = data?.data;
            if (res) {
              const {pan_number, full_name} = res.data;
              setPanHolderName(full_name);
              const isexist = await userCollection.checkUser(user?.mobile);
              if (isexist) {
                const userdata = await userCollection.getUser(user?.mobile);
                const uobj = {...userdata};
                uobj.panNumber = pan_number;
                uobj.panHolderName = full_name;
                uobj.panKyc = 1; // Set panKyc to 1
                await userCollection.updateUser({...uobj});
                const user_kyc_status = {
                  pankyc: 1,
                  aadharkyc: 0,
                  aadhardockyc: 0,
                };
                dispatch(setUserKycStatus(user_kyc_status));
                setloading(false);
                // handleSaveAndNext();
              }
            }
          })
          .catch(error => {
            console.error(error);
          });
      } catch (e) {
        setloading(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
        console.log('inside catch');
        console.log(e, 'error in checkpan ');
      }
    } else {
      setloading(false);
      setPanCardError('Invalid Pan Number');
      Toast.show({
        type: 'error',
        text1: 'Invalid Pan Number',
        text2: 'PAN Number should be in the format ABCDE1234F',
      });
    }
  }

  useEffect(() => {
    // setloading(true)
    if (panNumber.length === 10) {
      setShowLoader(true);
      kycverifyPanNumber(panNumber);
    }
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, [panNumber]);
  const handleSaveAndNext = () => {
    navigation.navigate('kyc');
  };

  return (
    <View style={styles.container}>
      
  
        <StatusBar backgroundColor="#f3f4f8" barStyle="dark-content" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={22} color={'#000'} />
          <Text
            style={{
              color: '#000',
              fontSize: wp(5),
              fontWeight: '600',
              marginBottom: wp(1),
              marginStart: wp(2),
            }}>
            Verify KYC
          </Text>
        </View>
      </TouchableOpacity>
      {/* pancard ui */}
      <ScrollView>
        <View style={styles.pageWrapper}>
          <Text
            style={{
              color: '#000',
              fontSize: wp(4.5),
              fontWeight: '600',
              marginBottom: wp(1),
            }}>
            Verify Pan Card
          </Text>
          <Text style={{color: '#666', fontSize: wp(3.5)}}>
            To ensure the security of your account and prevent fraud, Identity
            verification is required
          </Text>
        </View>
        <View style={{marginVertical: wp(8)}}>
          <Image
            resizeMode="contain"
            style={{width: '100%', height: 180}}
            source={require('../assets/pancard-dummy.png')}
          />
        </View>

        <View
          style={{
            marginHorizontal: wp(5),
            // flex: 0.95,
          }}>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter Pan Number"
              placeholderTextColor="#999"
              autoCapitalize="characters"
              value={panNumber}
              onChangeText={text => setPanNumber(text)}
              style={{flex: 0.94}}
              keyboardType="default"
              color={'#000'}
            />

            <View>
              {showLoader && (
                <ActivityIndicator
                  size={20}
                  color={'#25d366'}
                  // style={{marginTop: wp(5)}}
                />
              )}
            </View>
          </View>

          {panHolderName ? (
            <>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: wp(8),
                }}>
                <View
                  style={{
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Image
                      source={require('../assets/approved-shield.png')}
                      style={{
                        width: wp(6),
                        height: wp(6),
                      }}
                    />
                  </View>
                  <Text
                    style={{color: '#333', paddingHorizontal: 8, fontSize: 22, textTransform:'capitalize'}}>
                    {panHolderName}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.infowrapper}>
                <Text style={{color: '#000', marginBottom: wp(3)}}>Note</Text>

                <View style={styles.displayHori}>
                  <Entypo name="dot-single" size={18} color={'#666'} />
                  <Text style={styles.listItem}>
                    The Pan Number should consist of exactly 10 characters.
                  </Text>
                </View>
                <View style={styles.displayHori}>
                  <Entypo name="dot-single" size={18} color={'#666'} />
                  <Text style={styles.listItem}>
                    The initial five characters must be uppercase letters.
                  </Text>
                </View>
                <View style={styles.displayHori}>
                  <Entypo name="dot-single" size={18} color={'#666'} />
                  <Text style={styles.listItem}>
                    The subsequent four characters should be any numeric value
                    ranging from 0 to 9.
                  </Text>
                </View>
                <View style={styles.displayHori}>
                  <Entypo name="dot-single" size={18} color={'#666'} />
                  <Text style={styles.listItem}>
                    The final (tenth) character must be an uppercase letter.
                  </Text>
                </View>
                <View style={styles.displayHori}>
                  <Entypo name="dot-single" size={18} color={'#666'} />
                  <Text style={styles.listItem}>
                    No white spaces are allowed in the Pan Number.
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* {panCardError ? (
          <>
            <View style={styles.infowrapper}>
             

              <View style={styles.displayHori}>
                <Entypo name="dot-single" size={18} color={'#666'} />
                <Text style={styles.listItem}>
                  The Pan Number should consist of exactly 10 characters.
                </Text>
              </View>
              <View style={styles.displayHori}>
                <Entypo name="dot-single" size={18} color={'#666'} />
                <Text style={styles.listItem}>
                  The initial five characters must be uppercase letters.
                </Text>
              </View>
              <View style={styles.displayHori}>
                <Entypo name="dot-single" size={18} color={'#666'} />
                <Text style={styles.listItem}>
                  The subsequent four characters should be any numeric value
                  ranging from 0 to 9.
                </Text>
              </View>
              <View style={styles.displayHori}>
                <Entypo name="dot-single" size={18} color={'#666'} />
                <Text style={styles.listItem}>
                  The final (tenth) character must be an uppercase letter.
                </Text>
              </View>
              <View style={styles.displayHori}>
                <Entypo name="dot-single" size={18} color={'#666'} />
                <Text style={styles.listItem}>
                  No white spaces are allowed in the Pan Number.
                </Text>
              </View>
            </View>
          </>
        ) : null} */}
        </View>

      

       
      </ScrollView>
      <View
          style={{
            background: '#eee',
            justifyContent: 'center',
            flex: 1,
          }}>
          {panHolderName ? (
            <TouchableOpacity style={styles.send} onPress={handleSaveAndNext}>
              {loading ? (
                <ActivityIndicator
                  size={20}
                  color={'#fff'}
                  style={{marginHorizontal: 5}}
                />
              ) : null}
              <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
                Save and Next
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
    </View>
  );
};

export default PanCardVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    paddingHorizontal: wp(2),
    paddingVertical: wp(4),
    borderRadius: wp(4),
    marginTop: wp(8),
    borderColor: '#ccc',
    borderWidth: 0.5,
    marginHorizontal:wp(5)
  },

  listItem: {
    color: '#666',
    fontSize: wp(3.2),
    flexWrap:'wrap'
  },
  bullet: {
    fontSize: 13,
    marginRight: 5,
    color: '#333',
  },
  displayHori: {
    flexDirection: 'row',
    marginBottom: wp(2),
    width: 260,
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

  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 10,
    flexDirection: 'row',
    // marginTop: 130,
  },

  errorLines: {
    color: '#666',
    fontSize: wp(3),
    lineHeight: wp(5),
  },
});
