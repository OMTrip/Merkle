import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import {useNavigation} from '@react-navigation/native';
  import {useDispatch, useSelector} from 'react-redux';
  
  import Toast from 'react-native-toast-message';
  import {toPlainString} from '../../../../Utils/web3/helperFunction';
  import {getSlippage} from '../../../../Utils/web3/web3Functions';
  import {getGasPrice} from '../../../../Utils/web3/web3';
//   import {initializeSwapTokens} from '../../../../Store/web3';
//   import TransferSuccessPopup from './TransferSuccessPopup';
  
  const xChainTransaction = props => {
    const navigation = useNavigation();
    const {wallets, activeWallet} = useSelector(state => state.wallet);
    const wallet = wallets[activeWallet];
    const [btnLoader, setBtnLoader] = useState(false);
    const paramsData = props.route.params;
    // const {swapFromToken, swapToToken, from, to, status} = paramsData;
    const [popupVisible, setPopupVisible] = useState(false);
    const [details, setDetails] = useState(0);
    const dispatch = useDispatch();
  
  
  
    const handleTransferSuccess = () => {
      setPopupVisible(true);
    };
  
    const handleClosePopup = () => {
      setPopupVisible(false);
    };
  
    // useEffect(() => {
    //   (async () => {
    //     const slip = await getSlippage(wallet);
    //     const gasPrice = await getGasPrice();
    //     const weiValue = 1000000000000000000;
    //     const actualGas = gasPrice / weiValue;
    //     console.log(gasPrice / weiValue, 'gasPrice');
    //     setDetails({slippage: slip, gasPrice: actualGas});
    //   })();
    // }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="arrow-back-ios"
              size={18}
              color={'#444'}
              onPress={() => navigation.goBack()}
            />
            {/* <Text
          onPress={() => navigation.goBack()}
          style={{
            color: '#444',
            fontSize: hp(2),
          }}>
          Cancel
        </Text> */}
          </View>
  
          <Text
            style={{
              color: '#000',
              fontSize: hp(2),
              fontWeight: '600',
            }}>
            XCross
          </Text>
  
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text
              style={{
                color: '#444',
                fontSize: hp(2),
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.wrapper}>
            <View style={styles.row}>
              <Image
                source={{
                //   uri: swapFromToken.logo,
                }}
                style={styles.tokenImage}
              />
              <Text>
                <Text style={styles.amount}>.001</Text>
                <Text style={[styles.amount, {paddingHorizontal: 10}]}>
                  {' '}
                  BUSD
                </Text>
              </Text>
            </View>
            <MaterialIcons
              name="arrow-downward"
              size={24}
              color={'#444'}
              style={{paddingHorizontal: 10}}
              // onPress={() => navigation.goBack()}
            />
            <View style={styles.row}>
              <Image
                source={{
                //   uri: `${swapToToken.logo}`,
                }}
                style={styles.tokenImage}
              />
              <Text>
                <Text style={styles.amount}>1</Text>
                <Text style={[styles.amount, {paddingHorizontal: 10}]}>
                  {' '}
                  {/* {swapToToken.symbol} */}
                  INRX
                </Text>
              </Text>
            </View>
  
            <View style={styles.transactionCards}>
              <View style={styles.transactionCardsInner}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <Text style={styles.headText}>From </Text>
                </View>
  
                <Text style={styles.fromText}>
                  {wallet.name} ({wallet.address.slice(0, 5)}...
                  {wallet.address.slice(-5)})
                </Text>
              </View>
            </View>
  
            <View style={styles.transactionCards}>
              <View style={styles.transactionCardsInner}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <Text style={styles.headText}>Provider </Text>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    style={{color: '#bbb', fontWeight: '600'}}
                  />
                </View>
  
                <Text style={styles.fromText}>BSC</Text>
              </View>
             
              <View style={styles.transactionCardsInner}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <Text style={styles.headText}>Network Fee </Text>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    style={{color: '#bbb', fontWeight: '600'}}
                  />
                </View>
  
                <Text style={styles.fromText}>
                  {details.gasPrice ? toPlainString(details.gasPrice) : 0} BNB
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{width: '100%', backgroundColor: 'black', borderRadius: 10}}
            >
            {btnLoader ? (
              <ActivityIndicator
                size="small"
                color={'#fff'}
                style={{padding: 15}}
              />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  textAlign: 'center',
                  paddingVertical: 10,
                }}>
                Swap
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* <TransferSuccessPopup
          visible={popupVisible}
          onClose={handleClosePopup}
          // amount="100 USD"
          // recipient="John Doe"
        /> */}
      </View>
    );
  };
  
  export default xChainTransaction;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F4F7',
      paddingHorizontal: wp(5),
    },
    header: {
      width: '100%',
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    wrapper: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      marginVertical: hp(2),
      borderRadius: wp(2),
      color: '#888',
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
    },
    tokenImage: {
      width: 40,
      height: 40,
      borderRadius: 50,
      marginRight: 10,
      backgroundColor:"#ccc"
    },
    amount: {
      color: '#000',
      fontSize: 20,
      fontWeight: '600',
      paddingHorizontal: 10,
    },
    border: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#ddd',
      marginVertical: wp(3),
    },
  
    transactionCards: {
      // paddingHorizontal: wp(3),
      paddingVertical: wp(3),
      // backgroundColor:"#eee",
      backgroundColor: '#fff',
      // marginHorizontal: hp(2),
      marginVertical: hp(1),
      color: '#444',
      borderRadius: 6,
    },
  
    transactionCardsInner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    fromText: {
      color: '#888',
      fontSize: hp(1.5),
    },
    innerContainer: {
      flex: 0.9,
      justifyContent: 'space-between',
    },
  });
  