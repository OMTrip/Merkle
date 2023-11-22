import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RadioButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../../../HomeScreen/HomeHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {OperatorCircle} from '../../../../../Utils/apis/api';
import SkeletonLoader from './SkeletonLoader';
import {prepaidMb} from '../../../../../Utils/web3/helperFunction';
import {useDispatch} from 'react-redux';
import {setIcon} from '../../../../../Store/paymentDetails';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MobileRecharge = ({route}) => {
  const [checked, setChecked] = useState('prepaid');
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation();
  const [operatorCircleResponse, setOperatorCircleResponse] = useState({});
  const dispatch = useDispatch();

  const {params} = route;

  async function getOperatorDetails(number) {
   
    try {
      const result = await OperatorCircle(number);
      console.log(result,"setult");
      if (result.success) {
        console.log(result,"result")
        setOperatorCircleResponse(result);
      } else {
        setOperatorCircleResponse({});
        Alert.alert('Error', 'Invalid response from the API');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error or API request failed');
      setOperatorCircleResponse({});
    }
  }
  useEffect(() => {
    if (params?.phone) {
      console.log('hi');
      setMobileNumber(params?.phone);

      getOperatorDetails(params?.phone);
    }
  }, [route.params]);

  return (
    <>

      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.container}>
        <LinearGradient
          colors={['#000', '#000']}
          start={{x: 0, y: 0}} // Start point of the gradient (top-left)
          end={{x: 1, y: 0}} // End point of the gradient (top-right)
          style={{
            // height: hp(10),
            justifyContent: 'center',
            paddingHorizontal: hp(2),
            paddingVertical: wp(3),
          }}>
          <HomeHeader
            icons={true}
            iconName={'keyboard-backspace'}
            size={wp(8)}
            title={'Mobile Recharge'}
            TextTitle={true}
            menu={false}
          />
        </LinearGradient>

        <View style={{marginTop: wp(5)}}>
          <View style={styles.sectionCards}>
            {/* <View style={{marginHorizontal: wp(4)}}>
              <Text style={{color: '#444', fontSize: wp(4)}}>
                Connection Type
              </Text>
            </View> */}

             
              <View style={styles.radioBox}>
                <View>
                  <RadioButton
                    value="first"
                    status={checked === 'prepaid' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('prepaid')}
                    color="black"
                  />
                </View>

                <Text style={styles.text}>Prepaid</Text>
                <View style={{marginLeft: wp(5)}}>
                  <RadioButton
                    value="second"
                    status={checked === 'postpaid' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('postpaid')}
                    color="black"
                  />
                </View>
                <Text style={styles.text}>Postpaid</Text>
              </View>
            

            {mobileNumber.length == 10 ? (
              operatorCircleResponse.details ? (
                <View style={{alignItems: 'center', marginTop: 8}}>
                  <View
                    style={{
                      width: '92%',
                      height: 100,
                      borderRadius: 8,
                      backgroundColor: '#ccc',
                      marginBottom: 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 16,
                    }}>
                    <View style={{width: wp(65)}}>
                      <Text style={styles.mobileDetails}>{mobileNumber}</Text>
                      <Text style={styles.mobileDetails}>
                        {operatorCircleResponse?.details?.operator},{' '}
                        {operatorCircleResponse?.details?.Circle}
                      </Text>
                    </View>
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        alignSelf: 'flex-start',
                        marginTop: 8.5,
                        marginHorizontal: 2,
                        borderRadius: 50,
                      }}
                      resizeMode="contain"
                      source={{
                        uri: prepaidMb[
                          `${operatorCircleResponse?.details?.operator}`
                        ]
                          ? prepaidMb[
                              `${operatorCircleResponse?.details?.operator}`
                            ]
                          : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1695380908/nute/mobile/nute_ksor59.png',
                      }}
                    />
                  </View>
                </View>
              ) : (
                <SkeletonLoader />
              )
            ) : null}

            <View style={{marginHorizontal: wp(5), marginTop: wp(5)}}>
              {/* <Text style={{color: '#999', fontSize: wp(3.2)}}>
                Mobile Number
              </Text> */}
              <View style={styles.inputbox}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter Moblie Number"
                  placeholderTextColor={'#ccc'}
                  textColor="#000"
                  value={mobileNumber}
                  onChangeText={async number => {
                    setMobileNumber(number.trim(''));
                    if (number.length == 10) {
                      await getOperatorDetails(number);
                    }
                  }}
                />
                <View style={styles.icons}>
                  <AntDesign
                    name={'contacts'}
                    size={wp(5)}
                    style={{paddingStart: hp(2.1), color: '#999'}}
                    onPress={() => navigation.navigate('ContactsList')}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.btn}>
        <View
          style={{
            // height: hp(7),
            width: wp(90),
            padding: wp(4),
            justifyContent: 'center',
            paddingHorizontal: hp(3),
            borderRadius: 7,
            backgroundColor: mobileNumber.length === 10 ? '#000' : '#ddd',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (
                mobileNumber.length === 10 &&
                operatorCircleResponse?.success
              ) {
                const url = prepaidMb[
                  `${operatorCircleResponse?.details?.operator}`
                ]
                  ? prepaidMb[`${operatorCircleResponse?.details?.operator}`]
                  : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1695380908/nute/mobile/nute_ksor59.png';
                dispatch(setIcon(url));
                navigation.navigate('MobileRechargePlans', {
                  operatorCircleResponse,
                  simType: checked,
                  mobileNumber: mobileNumber,
                });
              } else {
                Alert.alert(
                  'Something went wrong.',
                  'Enter a valid mobile number.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                  ],
                  {
                    cancelable: true,
                  },
                );
              }
            }}>
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: '400',
                textAlign: 'center',
                color: mobileNumber.length == 10 ? '#fff' : '#000',
              }}>
              Continue
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.88,
    backgroundColor: '#f3f4f7',
  },
  radioBox: {
    flexDirection: 'row',
    marginTop: hp(1),
    marginLeft: wp(3),
  },
  text: {
    marginTop: hp(0.5),
    fontSize: wp(4.3),
    fontWeight: '300',
    color: '#444',
  },
  btn: {
    // alignSelf: 'center',
    // // padding: 5,
    // backgroundColor: '#000',
    // borderRadius: 7,
    // width: '93%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    // marginTop: 10,
  },
  input: {
    color: '#000',
    // backgroundColor:'#ccc',
    height: 28,
    flex: 1,
    // lineHeight:wp(1),
    borderBottomWidth: 0,
    padding: 0,
    fontSize: wp(4.2),
  },
  inputbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // marginTop: wp(2),
    // marginHorizontal: wp(5),
    // backgroundColor:'#ccc',
    color: '#000',
    borderBottomWidth: wp(0.4),
    borderBottomColor: '#ddd',
  },

  icons: {
    width: wp(10),
    // borderBottomWidth: wp(0.4),
    // paddingBottom: hp(1.5),
    // borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileDetails: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    padding: 5,
    paddingHorizontal: 15,
  },

  sectionCards: {
    // padding:10,
    // backgroundColor: '#fff',
    // margin: hp(2),
    borderRadius: wp(2),
    paddingBottom: hp(5),
    // shadowColor: '#666',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,
    // elevation: 14,
    color: '#444',
  },
});

export default MobileRecharge;
