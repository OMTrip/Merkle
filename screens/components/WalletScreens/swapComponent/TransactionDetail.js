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
import {
  buyToken,
  getTokenDetailSwap,
  sellTokenWithCondition,
  swapPairTokens,
  wethStatus,
} from '../../../../Utils/web3/web3Functions';
import Toast from 'react-native-toast-message';
import {toPlainString} from '../../../../Utils/web3/helperFunction';
import {getSlippage} from '../../../../Utils/web3/web3Functions';
import {getGasPrice} from '../../../../Utils/web3/web3';
import {initializeSwapTokens} from '../../../../Store/web3';
import TransferSuccessPopup from './TransferSuccessPopup';

const TransactionDetail = props => {
  const navigation = useNavigation();
  const {wallets, activeWallet} = useSelector(state => state.wallet);
  const wallet = wallets[activeWallet];
  const [btnLoader, setBtnLoader] = useState(false);
  const paramsData = props.route.params;
  const {swapFromToken, swapToToken, from, to, status} = paramsData;
  const [popupVisible, setPopupVisible] = useState(false);
  const [details, setDetails] = useState(0);
  const dispatch = useDispatch();
  async function updateBalance(){
    // if (swapFromToken['balanceStatus'] && swapToToken['balanceStatus']) {
      var swapFrom = {...swapFromToken};
      var swapTo = {...swapToToken};
      const fromBalance = await getTokenDetailSwap(
        swapFrom.token_address,
        wallet,
      );
      const toBalance = await getTokenDetailSwap(
        swapTo.token_address,
        wallet,
      );
      const fromWeth = await wethStatus(swapFrom.token_address, wallet);
      const toWeth = await wethStatus(swapTo.token_address, wallet);
      const fromB = fromWeth
        ? fromBalance.balance
        : fromBalance.balance / 10 ** Number(swapFrom.decimals);
      const toB = toWeth
        ? fromBalance.balance
        : toBalance.balance / 10 ** Number(swapTo.decimals);
      swapFrom['balance'] = toPlainString(fromB);
      swapTo['balance'] = toPlainString(toB);
      swapFrom['balanceStatus'] = true;
      swapTo['balanceStatus'] = true;
      dispatch(
        initializeSwapTokens({swapTo: swapTo, swapFrom: swapFrom}),
      );
    // }
  }

  async function handleSwap() {
    setBtnLoader(true);
    try {
      if (status != 2) {
        const buySellStatus = swapFromToken['isQuote'] ? true : false;
        if (buySellStatus) {
          const data = {
            swapFromToken,
            swapToToken,
            amount: from * 10 ** Number(swapFromToken.decimals),
          };
          const res = await buyToken(data, Toast, wallet);
          setBtnLoader(false);
          if (res?.status) {
            // Toast.show({type:"success", text1:"Transfer Successfull.",text2:`${res.transactionHash}`});
            handleTransferSuccess();
            await updateBalance()
          }
          setBtnLoader(false);
          return res;
        } else {
          const data = {
            swapFromToken,
            swapToToken,
            amount: from * 10 ** Number(swapFromToken.decimals),
          };
          const res = await sellTokenWithCondition(data, Toast, wallet);
          if (res?.status) {
            // Toast.show({type:"success", text1:"Transfer Successfull.",text2:`${res.transactionHash}`})
            handleTransferSuccess();
            await updateBalance()
            console.log(res,"res")
          }
          // if (swapFromToken['balanceStatus'] && swapToToken['balanceStatus']) {
          //   var swapFrom = {...swapFromToken};
          //   var swapTo = {...swapToToken};
          //   swapFrom['balanceStatus'] = false;
          //   swapTo['balanceStatus'] = false;
          //   dispatch(
          //     initializeSwapTokens({swapTo: swapTo, swapFrom: swapFrom}),
          //   );
          // }

          setBtnLoader(false);
          return res;
        }
      } else {
        const calc = [
          from * 10 ** Number(swapFromToken.decimals),
          to * 10 ** Number(swapToToken.decimals),
        ];
        console.log(
          swapFromToken.token_address,
          swapToToken.token_address,
          calc,
          'callc',
          to,
        );
        const data = {
          swapFromToken: swapFromToken,
          swapToToken: swapToToken,
          calc: calc,
        };

        const res = await swapPairTokens(data, Toast, wallet);
        console.log(res, 'resp');
        if (res?.status) {
          // Toast.show({type:"success", text1:"Transfer Successfull.",text2:`${res.transactionHash}`})
          handleTransferSuccess();
          await updateBalance()
          // if (swapFromToken['balanceStatus'] && swapToToken['balanceStatus']) {
          //   var swapFrom = {...swapFromToken};
          //   var swapTo = {...swapToToken};
          //   const fromBalance = await getTokenDetailSwap(
          //     swapFrom.token_address,
          //     wallet,
          //   );
          //   const toBalance = await getTokenDetailSwap(
          //     swapTo.token_address,
          //     wallet,
          //   );
          //   const fromWeth = await wethStatus(swapFrom.token_address, wallet);
          //   const toWeth = await wethStatus(swapTo.token_address, wallet);
          //   const fromB = fromWeth
          //     ? fromBalance.balance
          //     : fromBalance.balance / 10 ** Number(swapFrom.decimals);
          //   const toB = toWeth
          //     ? fromBalance.balance
          //     : toBalance.balance / 10 ** Number(swapTo.decimals);
          //   swapFrom['balance'] = toPlainString(fromB);
          //   swapTo['balance'] = toPlainString(toB);
          //   swapFrom['balanceStatus'] = false;
          //   swapTo['balanceStatus'] = false;
          //   dispatch(
          //     initializeSwapTokens({swapTo: swapTo, swapFrom: swapFrom}),
          //   );
          // }
        }
        setBtnLoader(false);
        return res;
      }
    } catch (error) {
      setBtnLoader(false);
      console.log(error, 'buy error::::');
    }
  }
  const handleTransferSuccess = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    (async () => {
      const slip = await getSlippage(wallet);
      const gasPrice = await getGasPrice();
      const weiValue = 1000000000000000000;
      const actualGas = gasPrice / weiValue;
      console.log(gasPrice / weiValue, 'gasPrice');
      setDetails({slippage: slip, gasPrice: actualGas});
    })();
  }, []);

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
          Swap
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
                uri: swapFromToken.logo,
              }}
              style={styles.tokenImage}
            />
            <Text>
              <Text style={styles.amount}>{from}</Text>
              <Text style={[styles.amount, {paddingHorizontal: 10}]}>
                {' '}
                {swapFromToken.symbol}
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
                uri: `${swapToToken.logo}`,
              }}
              style={styles.tokenImage}
            />
            <Text>
              <Text style={styles.amount}>{to}</Text>
              <Text style={[styles.amount, {paddingHorizontal: 10}]}>
                {' '}
                {swapToToken.symbol}
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
                <Text style={styles.headText}>Max Slippage </Text>
                <Ionicons
                  name="information-circle"
                  size={15}
                  style={{color: '#bbb', fontWeight: '600'}}
                />
              </View>

              <Text style={styles.fromText}>
                {details.slippage ? details.slippage : 0}%
              </Text>
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
          onPress={handleSwap}>
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
      <TransferSuccessPopup
        visible={popupVisible}
        onClose={handleClosePopup}
        // amount="100 USD"
        // recipient="John Doe"
      />
    </View>
  );
};

export default TransactionDetail;

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
