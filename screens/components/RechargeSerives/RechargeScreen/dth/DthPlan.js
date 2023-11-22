import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeHeader from '../../../HomeScreen/HomeHeader';
import {
  DTHOperator,
  DTHValidation,
  checkNumberLength,
} from '../../../../../Utils/web3/helperFunction';
import {TextInput, ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {validateBill} from '../../../../../Utils/apis/api';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {red} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const DthPlan = ({route}) => {
  const [customerId, setCustomerId] = useState('');
  const [amount, setamount] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedConsumerId, setIsFocusedConsumerId] = useState(false);
  const [textInputHidden, setTextInputHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {user} = useSelector(store => store);



  const {
    params: {
      data,
      input: {name, type},
    },
  } = route;

  console.log(user?.user?.phoneNumber?.replace(/^(\+91)/, ''), 'user');

  const handleFocusConsumerId = status => {
    setIsFocusedConsumerId(status);
  };
  const handleFocusAmount = status => {
    setIsFocused(status);
  };
  const handleTextInput = async () => {
    if (type == 'DTH') {
      if (!textInputHidden) {
        if (checkNumberLength(data.operator_name, customerId)) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setTextInputHidden(true);
          }, 2000);
        }
      } else {
        if (
          checkNumberLength(data.operator_name, customerId) &&
          Number(amount) >= data.amount_minimum &&
          Number(amount) <= data.amount_maximum
        ) {
          navigation.navigate('RechargePayment', {
            operator: data,
            data: {rs: amount},
            mobileNumber: customerId,
            type: {display: 'Customer Id', type: 'DTH Recharge'},
          });
        }
      }
    } else {
      const mobile = user?.user?.phoneNumber?.replace(/^(\+91)/, '');
      const res = await validateBill(
        customerId,
        '2',
        amount,
        data.operator_id,
        '1121695015922',
        mobile,
      );
      console.log(res, 'respDataPlan123');
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.box}>
        <View
          style={{
            // padding:wp(3),
            // height: hp(10),
            justifyContent: 'space-between',
            paddingHorizontal: hp(2),
            backgroundColor: '#fff',
            paddingTop: wp(10),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <MaterialCommunityIcons
              color={'#000'}
              name="keyboard-backspace"
              size={wp(8)}
             onPress={()=>navigation.goBack()}
            />
          </View>

      
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <View
            style={{
              width: '88%',
              height: 100,
              borderRadius: 8,
              // backgroundColor: '#eee',
              // marginBottom: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margingHorizontal: hp(3),
            }}>
            <View style={{width:'82%'}}>
              <Text
                style={{
                  color: '#999',
                  fontWeight: 'normal',
                  fontSize: wp(3.5),
                }}>
                Operator Details
              </Text>
             <View>
             <Text style={styles.mobileDetails}>{data.operator_name}</Text>
             </View>
            </View>
            <Image
              style={{
                width: 50,
                height: 50,
                alignSelf: 'center',
                borderRadius: 50,
                // marginTop: 8.5,
                marginHorizontal: 2,
              }}
              source={{
                uri: DTHOperator[`${data.operator_name}`]
                  ? DTHOperator[`${data.operator_name}`]
                  : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1694598963/nute/dth/all_tzctrd.png',
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={{flex: 0.96, justifyContent: 'space-between'}}>
          <View>
            <View style={{paddingHorizontal: hp(3)}}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                label={name}
                value={customerId}
                mode="outlined"
                onChangeText={text => setCustomerId(text)}
                outlineColor="#eee"
                activeOutlineColor="#ccc"
                height={200}
                onFocus={() => handleFocusConsumerId(true)}
                onBlur={() => handleFocusConsumerId(false)}
              />
              {type == 'DTH' &&
                isFocusedConsumerId &&
                DTHValidation[data.operator_name] && (
                  <Text
                    style={
                      checkNumberLength(data.operator_name, customerId)
                        ? styles.message
                        : styles.messageErr
                    }>
                    Valid Amount range between min{' '}
                    {DTHValidation[data.operator_name].min} & max{' '}
                    {DTHValidation[data.operator_name].max} digits{' '}
                  </Text>
                )}
            </View>
            {textInputHidden && (
              <View style={{paddingHorizontal: hp(3), marginTop: wp(5)}}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  label="Amount"
                  value={amount}
                  mode="outlined"
                  onChangeText={text => setamount(text)}
                  outlineColor="#eee"
                  activeOutlineColor="#ccc"
                  height={200}
                  onFocus={() => handleFocusAmount(true)}
                  onBlur={() => handleFocusAmount(false)}
                />

                {type == 'DTH' && isFocused && (
                  <Text
                    style={
                      amount >= Number(data.amount_minimum) &&
                      amount <= Number(data.amount_maximum)
                        ? styles.message
                        : styles.messageErr
                    }>
                    Valid Amount range between {data.amount_minimum} & max{' '}
                    {data.amount_maximum}{' '}
                  </Text>
                )}
              </View>
            )}
          </View>
          <View style={styles.btn}>
          
              <TouchableWithoutFeedback
                style={styles.btn}
                onPress={() => {
                  handleTextInput();
                }}>
                {loading ? (
                  <ActivityIndicator animating={true} color={MD2Colors.white} />
                ) : (
                  <Text
                    style={{
                      fontSize: wp(4),
                      width: '100%',
                      fontWeight: '400',
                      textAlign: 'center',
                      color: '#fff',
                    }}>
                    {textInputHidden ? 'Next' : 'Continue'}
                  </Text>
                )}
              </TouchableWithoutFeedback>
          
          </View>
        </View>
      </View>
    </>
  );
};

export default DthPlan;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mobileDetails: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 5,
    flexWrap:'wrap'
    // paddingHorizontal: 15,
  },
  input: {
    color: '#000',
    fontSize: wp(4),
    backgroundColor: '#fff',
  },
  btn: {
    width: wp(90),
    padding: wp(4),
    marginHorizontal: wp(4),
    justifyContent: 'center',
    paddingHorizontal: hp(3),
    borderRadius: 7,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: '#999',
    fontSize: wp(3.5),
    paddingTop: wp(2),
  },
  messageErr: {
    color: '#FF6666',
    fontSize: wp(3.5),
    paddingTop: wp(2),
  },
});
