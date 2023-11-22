import {StyleSheet, Text, View, Image, FlatList, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useRef, useCallback, useState, useMemo, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeHeader from '../../HomeScreen/HomeHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Colors as colors} from '../../../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCryptoPriceInINR,
  makeRechargeRequest,
} from '../../../../Utils/apis/api';

import {sendNativeToken, sendToken} from '../../../../Utils/web3/web3';
import Toast from 'react-native-toast-message';
import { setActiveWallet } from '../../../../Store/web3';

import {
  cutAfterDecimal,
  adminTokens,
  uniqueNumber,
  tax,
} from '../../../../Utils/web3/helperFunction';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
// import ConfirmationModal from './ConfirmationModal';
import {useNavigation} from '@react-navigation/native';

const Payment = ({route}) => {
  const {wallets, networks, activeWallet} = useSelector(stat => stat.wallet);
  // const {wallets, networks, activeWallet} = wallet;
  const [optionsModalVisible, setOptionsModalVisible] = useState(-1);
  const [tokenModalVisible, setTokenModalVisible] = useState(-1);
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [priceInInr, setPriceInInr] = useState({symbol: '', price: ''});
  const [allfilterdData, setAllFilteredData] = useState({});
  const [selectedToken, setSelectedToken] = useState({});
  const [loading, setloading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const optionsRef = useRef();
  const tokenRef = useRef();
  const navigation = useNavigation();

//   const {
//     params: { data, mobileNumber, operator, type},
//   } = route;
//   console.log(data, 'opr');

  const handleOptionsChanges = useCallback(index => {
    setOptionsModalVisible(index);
  }, []);
  const handleTokenChanges = useCallback(index => {
    setTokenModalVisible(index);
  }, []);

  const snapPointsOptions = useMemo(() => ['60%', '60%'], []);
  const handlePresentOptionsModalPress = useCallback(() => {
    optionsRef.current?.present();
  }, []);
  const handlePresentTokenModalPress = useCallback(() => {
    tokenRef.current?.present();
  }, []);

  const toggleOptionsModal = () => {
    optionsModalVisible === -1
      ? handlePresentOptionsModalPress()
      : optionsRef.current?.dismiss();
  };
  const toggleTokenModal = () => {
    tokenModalVisible === -1
      ? handlePresentTokenModalPress()
      : tokenRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );
  const renderToken = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  const confirmTransaction = async () => {
    const reciever = '0x8fEEac8E977bFf35D15AcF701822361d5BEE8C50';
    const amt = cutAfterDecimal(
      (Number(data.rs) + Number((1 / 100) * data.rs) + 6) /
        Number(priceInInr?.price),
      8,
    );
    const activenet = networks.find(
      it => it.chainId == allfilterdData?.filtereData?.chainId,
    );
    var res;
    setloading(true);
    console.log(
      selectedToken.native != undefined,
      'selectedToken.native != undefined',
    );
    if (selectedToken.native != undefined) {
      console.log('hello1');
      if (Number(amt) > 0 && Number(allfilterdData?.filtereData?.balance) > 0) {
        console.log('hello2');
        res = await sendNativeToken(
          reciever,
          allfilterdData?.wallet?.address,
          amt.toString(),
          {
            ...allfilterdData?.wallet,
            network: {...activenet},
            symbol: activenet?.nativeCurrency?.symbol,
            decimal: activenet?.nativeCurrency?.decimals,
            dispatch,
            setActiveWallet,
            activeWallet,
          },
          setloading,
          Toast,
        );
      } else {
        Toast.show({
          type: 'error',
          text1: 'Wrong Information',
          text2: 'Low balance',
        });
      }
    } else {
      if (Number(amt) > 0) {
        res = await sendToken(
          reciever,
          selectedToken.token_address,
          (Number(amt) * Number('1e' + selectedToken?.decimals)).toString(),
          {
            ...allfilterdData?.wallet,
            symbol: selectedToken?.symbol,
            decimal: selectedToken?.decimals,
            network: {...activenet},
            dispatch,
            setActiveWallet,
            activeWallet,
          },
          setloading,
          Toast,
        );
      } else {
        Toast.show({
          type: 'error',
          text1: 'Wrong Information',
          text2: 'Low balance',
        });
      }
    }

    if (res?.status) {
      const {blockNumber, transactionIndex, cumulativeGasUsed} = res;
      const paymentData = {
        number: mobileNumber,
        amount: data.rs,
        opid: operator.operator_id,
        stateCode: 5,
        orderId: uniqueNumber(blockNumber, transactionIndex, cumulativeGasUsed),
      };
      const resp = await makeRechargeRequest(paymentData);
      console.log(resp, 'response');
      if (resp.status=="SUCCESS") {
        // setModalVisible(true);

        // setTimeout(() => {
        toggleOptionsModal();
        // }, 2000);
        navigation.navigate('ReceiptPage', {
          data: data,
          operator: operator,
          number: mobileNumber,
          response: resp,
          type: type,
          priceInInr: priceInInr,
        });

        // setTimeout(() => {
        //   setModalVisible(false);
        // }, 10000);
      }else{
        Alert.alert(
          'Error',
          'Something went wrong. Please try again later.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          { cancelable: false }
        );
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#ccc',
          padding: 5,
          margin: 10,
          width: 170,
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onPress={() => {
          toggleTokenModal();
          toggleOptionsModal();
          setSelectedToken(item);
          setSelectedChain(item.chainId);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              width: 35,
              height: 35,
            }}
            source={{uri: item.logo}}
          />
          {!item.native ? (
            <Image
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                top: 15,
                left: 24,
              }}
              source={{uri: item.explorerLogo}}
            />
          ) : null}
          <Text style={{fontSize: 18, color: '#000', paddingHorizontal: 15}}>
            {item.symbol}
          </Text>
        </View>
        <View>
          <Text>
            ({cutAfterDecimal(item.balance, 4)} {item.symbol}){' '}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (!selectedAddress && wallets.length > 0) {
      setSelectedAddress(activeWallet);
    }
    if (!selectedChain && networks.length > 0) {
      setSelectedChain(networks[0].chainId);
    }
  }, []);

  useEffect(() => {
    const selectedAddressData = wallets[selectedAddress];

    const selectedChainData = networks?.find(
      (data, i) => data.chainId == selectedChain,
    );
    const filtereData = selectedAddressData?.assets?.find(
      (data, i) => data.chainId == selectedChainData?.chainId,
    );

    // const price = {};
    // filtereData?.nativeCurrency?.symbol?.toLowerCase()
    setPriceLoading(true);
    getCryptoPriceInINR(selectedToken?.symbol?.toLowerCase())
      .then(priceInINR => {
        // price['priceInINR'] = priceInINR;
        setPriceInInr({
          symbol: filtereData?.nativeCurrency?.symbol,
          price: priceInINR,
        });
        setPriceLoading(false);
      })
      .catch(error => {
        setPriceLoading(false);
        setPriceInInr({
          symbol: '',
          price: 0,
        });
        console.error('Error:', error.message);
      });

    var tokensarr = [];
    selectedAddressData?.assets.map(it => {
      const obj = {
        ...it.nativeCurrency,
        native: true,
        balance: it.balance,
        show: it?.show,
        chainId: it.chainId,
      };
      const ar = [...it.tokens];
      ar.push(obj);
      tokensarr = [...tokensarr, ...ar];
    });
    const tokensWithNonZeroBalance = adminTokens
      .map(staticToken => {
        const apiToken = tokensarr.find((apiItem, i) => {
          return (
            apiItem.symbol.toLowerCase() === staticToken.symbol.toLowerCase() &&
            apiItem.chainId === staticToken.chainId
          );
        });

        if (apiToken && parseFloat(apiToken.balance) > 0) {
          staticToken.balance = apiToken.balance;
          return staticToken;
        }
        return null;
      })
      .filter(Boolean);

    setAllFilteredData({
      wallet: selectedAddressData,
      selectedChainData,
      filtereData: filtereData,
      token: tokensWithNonZeroBalance,
    });
  }, [selectedChain, selectedAddress, selectedToken]);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#fff', '#fff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: hp(10),
          justifyContent: 'center',
          paddingHorizontal: hp(3),
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          CardInner={true}
          title={'Recharge'}
          TextTitle={true}
        />
      </LinearGradient>
      <View style={styles.detailContainer}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingBottom: 40,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.headerText}>Operator Details</Text>
            <Text style={styles.titleText}>abc</Text>
          </View>
          <Image
            style={{
              width: 50,
              height: 50,
              alignSelf: 'flex-start',
              marginTop: 8.5,
              marginHorizontal: 2,
              borderRadius: 50,
              elevation: 50,
              shadowColor: '#ccc',
              shadowOffset: {width: 5, height: 5},
              shadowRadius: 50,
            }}
            source={require('../../../assets/mobileProvider/nute.png')}
          />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            paddingBottom: 20,
            paddingHorizontal: 10,
          }}>
          <Text style={styles.headerText}>Biller Name</Text>
          <Text style={styles.titleText}>ghgfhdavkm</Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            paddingBottom: 10,
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          <Text style={styles.headerText}>hjsdvbjhdbzhv</Text>
          <Text style={styles.titleText}>dsvfhjadsbj</Text>
        </View>
        
      </View>
      <View style={styles.paymentContainer}>
        <View style={styles.transactionDetails}>
          <Text style={styles.headerText}>Transaction Details</Text>
          <Text style={styles.headerText}>100</Text>
        </View>

        <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              width: 60,
              height: 60,
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => toggleTokenModal()}>
            <Text style={{color: '#fff', fontSize: 16}}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetModal
        index={1}
        ref={optionsRef}
        snapPoints={snapPointsOptions}
        stackBehavior="push"
        // backdropComponent={props => (
        //   <CustomBackdrop dismissModal={toggleOptionsModal} {...props} />
        // )}
        backdropComponent={renderBackdrop}
        backgroundStyle={{backgroundColor: colors.ui_background}}
        handleIndicatorStyle={{backgroundColor: colors.interactive_04}}
        containerStyle={{backgroundColor: colors.backdrop}}
        onChange={handleOptionsChanges}>
        <View style={{padding: 10}}>
          {/* <View style={styles.container}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: 600,
                paddingHorizontal: 10,
              }}>
              Select a chain:
            </Text>
            <Picker
              selectedValue={selectedChain}
              onValueChange={itemValue => setSelectedChain(itemValue)}
              style={styles.picker}>
              {networks?.map(option => (
                <Picker.Item
                  key={option.chainId}
                  label={option.name}
                  value={option.chainId}
                />
              ))}
            </Picker>
          </View> */}
          <View style={[{borderBottomWidth: 0, padding: 10}]}>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
                fontSize: 22,
              }}>
              Transaction Summary
            </Text>
          </View>

          {priceLoading ? (
            <View
              style={{
                minHeight: 200,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <ActivityIndicator animating={true} color={MD2Colors.black} />
            </View>
          ) : (
            <View style={{marginTop: 10}}>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  Amount (Rs.)
                </Text>
                <Text style={styles.column}>0</Text>
              </View>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  TDS (1%)
                </Text>
                <Text style={styles.column}>0</Text>
              </View>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  Service Tax (Rs.)
                </Text>
                <Text style={styles.column}>0</Text>
              </View>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  Total (Rs.):
                </Text>
                <Text style={styles.column}>
                  0
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  Amount ({selectedToken?.symbol})
                </Text>
                <Text style={styles.column}>
                  0
                </Text>
              </View>
            </View>
          )}
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginTop: 30,
              marginBottom: 10,
            }}>
            <Text style={{fontWeight: 800, fontSize: 16}}>
              BALANCE:{' '}
              {cutAfterDecimal(allfilterdData?.filtereData?.balance, 6)}{' '}
              {allfilterdData?.filtereData?.nativeCurrency?.symbol}
            </Text>
          </View>

          <TouchableOpacity style={[styles.send]} onPress={confirmTransaction}>
            {loading ? (
              <ActivityIndicator animating={true} color={MD2Colors.white} />
            ) : (
              <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
                Confirm
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetModal>

      <BottomSheetModal
        index={1}
        ref={tokenRef}
        snapPoints={snapPointsOptions}
        stackBehavior="push"
        // backdropComponent={props => (
        //   <CustomBackdrop dismissModal={toggleOptionsModal} {...props} />
        // )}
        backdropComponent={renderToken}
        backgroundStyle={{backgroundColor: colors.ui_background}}
        handleIndicatorStyle={{backgroundColor: colors.interactive_04}}
        containerStyle={{backgroundColor: colors.backdrop}}
        onChange={handleTokenChanges}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: 600,
                paddingHorizontal: 10,
              }}>
              Select a Wallet Address:
            </Text>
            <Picker
              selectedValue={selectedAddress}
              onValueChange={itemValue => setSelectedAddress(itemValue)}
              style={styles.picker}>
              {wallets?.map(option => {
                return (
                  <Picker.Item
                    key={option.address}
                    label={option.name}
                    value={option.index}
                  />
                );
              })}
            </Picker>
          </View>
          {allfilterdData?.token?.length > 0 ? (
            <FlatList
              data={allfilterdData?.token}
              renderItem={renderItem}
              keyExtractor={item => item.symbol}
              numColumns={2} // Set numColumns to 2 for two columns per row
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#000'}}>No Token Found.</Text>
            </View>
          )}
        </View>
      </BottomSheetModal>
      {/* <ConfirmationModal
        status={isModalVisible}
        setStatus={setModalVisible}
        operator={operator?.operator_name}
        mobileNumber={mobileNumber}
        amount={data.rs}
      /> */}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  detailContainer: {
    flex: 0.6,
    padding: 10,
  },
  paymentContainer: {
    flex: 0.3,
    padding: 10,
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  titleText: {
    color: '#535852',
    fontSize: 16,
  },

  transactionDetails: {
    backgroundColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 20,
    color: '#000',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  picker: {
 
    margin: 10,
  },
  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#080',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  column: {
    width: '50%',
    margin: 5,
    color: '#000',
  },
});
