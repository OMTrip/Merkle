import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import NumericKeypad from './NumericKeypad';
import {cutAfterDecimal} from '../../../Utils/web3/helperFunction';
import {useNavigation} from '@react-navigation/native';
import {
  fetchOnMetaTokens,
  loginUserOnMeta,
  makeBuyQuoteRequest,
} from '../../../Utils/apis/api';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BuyModalPage = ({isVisible, closeModal, data}) => {
  const [input, setInput] = useState('');
  const {user} = useSelector(state => state.user);

  const [obj, setObj] = useState({});
  const navigation = useNavigation();
  const d = {...data};

  const handleButtonPress = value => {
    if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };
  const dollar =
    input.length == 0
      ? 0
      : cutAfterDecimal(input * Number(data?.current_price), 6);
  const symbol = data.symbol;
  const fiat = input.length == 0 ? 0 : cutAfterDecimal(input, 100);

  useEffect(() => {
    (async () => {
      try {
        if (user?.email) {
          try {
            const token = await loginUserOnMeta(user.email?.toLowerCase());
            console.log(token, 'token12344455');
            const t = token.data.accessToken;
            await AsyncStorage.setItem('onMetaAccessToken', t);
            A;
          } catch (error) {
            console.log(error, 'err');
          }
        }
        const tok = await fetchOnMetaTokens();
        const filteredTok = tok.find(ele => {
          return (
            ele.symbol?.toLowerCase() == d?.symbol?.toLowerCase() &&
            ele.chainId == parseInt(d.chainId, 16)
          );
        });
        setObj(filteredTok);
        const {symbol, decimals, chainId, address} = filteredTok;
        const data = await makeBuyQuoteRequest('MATIC', 80001, 100);
        console.log(data, 'data1233');
      } catch (error) {
        console.log(error, 'error');
      }
    })();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      backdropOpacity={1}
      visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="chevron-back"
              size={25}
              color={'#000'}
              onPress={closeModal}
            />
            <Text style={{color: '#000', fontSize: hp(2)}} onPress={closeModal}>
              Done
            </Text>
          </View>
          <View style={{textAlign: 'center'}}>
            <Text
              style={{
                color: '#444',
                fontSize: hp(2),
                fontWeight: '600',
              }}>
              Buy {symbol}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: '#000', fontSize: hp(1.9), marginEnd: wp(1)}}>
              INR
            </Text>
            <AntDesign name="infocirlceo" size={18} color={'#000'} />
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: wp(5),
            // marginTop: wp(15),
            paddingVertical: 15,
            borderRadius: 10,
            color: '#000',
            flex: 0.87,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: hp(6),
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: wp(5),
            }}>
            &#8377;{input.length == 0 ? 0 : input}
          </Text>

          <View
            style={[
              styles.BodyBoxTitle,
              {
                // marginVertical: wp(1),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <MaterialCommunityIcons
              name={'approximately-equal'}
              size={wp(6)}
              style={{marginTop: hp(0.5), color: '#ccc'}}
            />

            <Text style={styles.BodyBoxText}>
              ${0} {symbol}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardInner}>
            <View>
              <Image
                source={require('../../assets/Onmeta.jpeg')}
                style={{width: 35, height: 35, borderRadius: wp(50)}}
              />
            </View>
            <View
              style={{
                width: wp(58),
                marginHorizontal: wp(3),
              }}>
              <Text style={{color: '#000', fontWeight: '600'}}>Onmeta</Text>
              <Text style={{color: '#444'}}>Third Party Provider</Text>
            </View>
            {/* <Feather
              name="arrow-right"
              size={25}
              color={'#000'}
              onPress={() => navigation.goBack()}
              style={{paddingEnd: 5}}
            /> */}
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            color: '#000',
          }}>
          <NumericKeypad onButtonPress={handleButtonPress} />
        </View>
        <View style={styles.btnWrapper}>
          {/* Your other components */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (obj) {
                navigation.navigate('OnMeta', {data: {item: obj, fiat}});
              }
            }}>
            <Text style={styles.nextbuttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    width: '100%',
    paddingVertical: wp(5),
    marginBottom: wp(5),
    backgroundColor: 'rgba(0,0,0,0.01)',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BodyBoxText: {
    fontWeight: '400',
    color: '#888',
    fontSize: 17,
  },

  card: {
    backgroundColor: '#fff',
    // width: wp(90),
    borderRadius: wp(3),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(5),
  },
  cardInner: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },

  btnWrapper: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    margin: wp(5),
    width: '90%',
  },
  nextbuttonText: {
    color: 'white',
    fontSize: wp(4),
    textAlign: 'center',
  },
});

export default BuyModalPage;
