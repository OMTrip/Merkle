import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useRef, useCallback, useState, useMemo, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeHeader from '../../../HomeScreen/HomeHeader';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Colors as colors} from '../../../../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCryptoPriceInINR,
  makeRechargeRequest,
  transferFund,
} from '../../../../../Utils/apis/api';

import {sendNativeToken, sendToken} from '../../../../../Utils/web3/web3';
import Toast from 'react-native-toast-message';
import {setActiveWallet} from '../../../../../Store/web3';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TouchableHighlight} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  cutAfterDecimal,
  adminTokens,
  uniqueNumber,
  tax,
  DTHOperator,
  DTHValidation,
  checkNumberLength,
} from '../../../../../Utils/web3/helperFunction';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import ConfirmationModal from './ConfirmationModal';
import {useNavigation} from '@react-navigation/native';
import {transactionCollection} from '../../../../../Store/firebase/user';
import CustomBackdrop from '../../../browser/components/Backdrop';
import {wrap} from 'lodash';

const RechargePayment = ({route}) => {
  const {wallet, user} = useSelector(stat => stat);
  const {wallets, networks, activeWallet} = wallet;
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
  const refTokenSheet = useRef();
  const refTxnSheet = useRef();

  const {
    params: {data, mobileNumber, operator, type, details},
  } = route;
  function openTokenModal() {
    return refTokenSheet.current.open();
  }
  function closeTokenModal() {
    return refTokenSheet.current.close();
  }

  function openTxnModal() {
    return refTxnSheet.current.open();
  }
  function closeTxnModal() {
    return refTxnSheet.current.close();
  }

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

  const rechargeFunction = async paymentData => {
    console.log(paymentData, 'paymentData');
    setloading(true);
    try {
      const resp = await makeRechargeRequest(paymentData);
      if (resp.status == 'SUCCESS') {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };

        const currentData = new Date();
        const date = {
          date: new Intl.DateTimeFormat('en-US', options).format(currentData),
        };

        const phoneNumber = {phoneNumber: user?.user?.phoneNumber};
        transactionCollection.addTransaction({
          ...phoneNumber,
          ...resp,
          ...date,
        });
        // toggleOptionsModal();
        // toggleTokenModal();
        closeTxnModal();
        closeTokenModal();

        navigation.navigate('ReceiptPage', {
          data: data,
          operator: operator,
          number: mobileNumber,
          response: resp,
          type: type,
          priceInInr: priceInInr,
        });
        console.log(resp, 'resp1');
        setloading(false);

        return resp;
      } else {
        setloading(false);
        Alert.alert(
          'Error',
          'Something went wrong. Please try again later.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (err) {
      setloading(false);
      Alert.alert(
        'Error',
        'Something went wrong. Please try again later.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const transferFunction = async () => {
    setloading(true);
    try {
      const {accountNo, mobileNumber, ifscCode, name} = details;
      const resp = await transferFund(
        accountNo,
        mobileNumber,
        ifscCode,
        name,
        data.rs,
      );
      console.log(resp, 'resp12');
      if (resp.status == 'SUCCESS') {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };

        const currentData = new Date();
        const date = {
          date: new Intl.DateTimeFormat('en-US', options).format(currentData),
        };

        const phoneNumber = {phoneNumber: user?.user?.phoneNumber};
        transactionCollection.addTransaction({
          ...phoneNumber,
          ...resp,
          ...date,
        });
        // toggleOptionsModal();
        // toggleTokenModal();
        closeTxnModal();
        closeTokenModal();
        setloading(false);
        navigation.navigate('ReceiptPage', {
          data: data,
          operator: details.ifscCode,
          number: details.accountNo,
          response: resp,
          type: 'Fund Transfer',
          priceInInr: priceInInr,
        });

        return resp;
      } else {
        setloading(false);
        Alert.alert(
          'Error',
          'Transfer Failed.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (err) {
      setloading(false);
      Alert.alert(
        'Error',
        'Something went wrong. Please try again later.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    }
  };

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
      if (Number(amt) > 0 && Number(allfilterdData?.filtereData?.balance) > 0) {
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

      console.log(data?.type?.name != 'transfer', 'hell1');

      if (data?.type?.name && data?.type?.name === 'transfer') {
        console.log('hell2');
        await transferFunction();
      } else {
        console.log('hell3');

        const paymentData = {
          number: mobileNumber,
          amount: data.rs,
          opid: operator.operator_id,
          stateCode: 5,
          orderId: uniqueNumber(blockNumber, mobileNumber),
        };
        await rechargeFunction(paymentData);
      }
    }
  };

  const renderItem = ({item}) => {
    console.log(item,"item")
    return (
      
              <TouchableOpacity style={styles.currencyItem}  onPress={() => {
                    setSelectedToken(item);
                    setSelectedChain(item.chainId);
                    openTxnModal();
                  }}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                     source={{uri: item.logo?item.logo:item.slug?`https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png`:"https://res.cloudinary.com/dpe8nipmq/image/upload/v1695796476/nute/dummy/icons8-question-mark-64_tnsjd1.png"}}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                     {item.logo && <Image
                      source={{uri:`https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png`}}
                      style={styles.abosluteImage}
                      resizeMode="contain"
                    />}
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      {cutAfterDecimal(item.balance,2)} {item.symbol}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

      // <TouchableOpacity
      //   style={{
      //     // borderWidth: 0.5,
      //     // borderRadius: wp(3),
      //     // borderColor: '#ccc',
      //     padding: wp(2),
      //     margin: wp(2),
      //     width: 140,
      //     // alignItems: 'center',
      //     // flexDirection: 'column',
      //   }}
      //   onPress={() => {
      //     setSelectedToken(item);
      //     setSelectedChain(item.chainId);
      //     // refTokenSheet.current.close()

      //     // toggleTokenModal();
      //     // toggleOptionsModal();
      //     // closeTxnModal()
      //     openTxnModal();
      //   }}>
      //   <View style={{flexDirection: 'column', alignItems: 'center'}}>
      //     <View>
      //       <Image
      //         style={{
      //           width: 45,
      //           height: 45,
      //         }}
      //         source={{uri: item.logo}}
      //       />
      //       {!item.native ? (
      //         <Image
      //           style={{
      //             width: 20,
      //             height: 20,
      //             position: 'absolute',
      //             top: 15,
      //             left: 24,
      //           }}
      //           source={{uri: item.explorerLogo}}
      //         />
      //       ) : null}
      //     </View>
      //     <View>
      //       {/* <Text
      //         style={{
      //           fontSize: wp(4),
      //           color: '#000',
      //           fontWeight: '600',
      //           paddingLeft: wp(2),
      //         }}>
      //         {item.symbol}
      //       </Text> */}
      //       <Text style={{color: '#999', paddingLeft: wp(2), fontSize: wp(3)}}>
      //         {cutAfterDecimal(item.balance, 4)} {item.symbol}{' '}
      //       </Text>
      //     </View>
      //   </View>
      // </TouchableOpacity>
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
    console.log(selectedAddressData, 'selectedAddressData');

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
      console.log(ar,"ar")
      tokensarr = [...tokensarr, ...ar];
    });
    // const tokensWithNonZeroBalance = adminTokens
    //   ?.map(staticToken => {
    //     const apiToken = tokensarr?.find((apiItem, i) => {
    //       return (
    //         apiItem.symbol.toLowerCase() === staticToken.symbol.toLowerCase() &&
    //         apiItem.chainId === staticToken.chainId
    //       );
    //     });

    //     if (apiToken && parseFloat(apiToken.balance) > 0) {
    //       staticToken.balance = apiToken.balance;
    //       return staticToken;
    //     }
    //     return null;
    //   })
    //   .filter(Boolean);
    const data = tokensarr.map((item,i)=>{
      if(item.balance>0 && !item?.custom){
     return item
      }
    }).filter(Boolean);
    console.log(data,"data")

    setAllFilteredData({
      wallet: selectedAddressData,
      selectedChainData,
      filtereData: filtereData,
      token: data,
    });
  }, [selectedChain, selectedAddress, selectedToken]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View         
        style={{
          paddingHorizontal: hp(2),
          backgroundColor: '#fff',
          paddingTop: wp(10),
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          CardInner={true}
          // title={'Recharge'}
          TextTitle={true}
        />
      </View>

      {/* ------------------- Recharge----------------------------------------- */}
      {data?.type?.name != 'transfer' && (
        <View style={styles.detailContainer}>
          <View
            style={{
              // backgroundColor: '#f3f4f7',
              borderRadius: wp(3),
              marginBottom: wp(4),
              paddingHorizontal: wp(3),
              paddingVertical: wp(3),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop:wp(3)
            }}>
            <View>
              <Text style={styles.headerText2}>Operator Details</Text>
              <Text style={styles.titleText2}>{operator?.operator_name}</Text>
            </View>
            <View>
            <Image
              style={{
                width: 50,
                height: 50,
                alignSelf: 'center',
                borderRadius: 50,
                // marginTop: 8.5,
                marginHorizontal: 2,
              }}
              source={require('../../../../assets/mobileProvider/nute.png')}
              resizeMode="contain"
            />
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#fff',
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}>
            <Text style={styles.headerText2}>Biller Name</Text>
            <Text style={styles.titleText2}>{operator?.operator_name}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              paddingBottom: 10,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <Text style={styles.headerText2}>{type?.display}</Text>
            <Text style={styles.titleText2}>{mobileNumber}</Text>
          </View>
          {type?.short == 'mobile' && (
            <View
              style={{
                backgroundColor: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginVertical: 10,
              }}>
              <Text style={styles.titleText}>{data?.desc}</Text>
            </View>
          )}
        </View>
      )}

      {/* ------------------- Transfer----------------------------------------- */}
      {data?.type?.name == 'transfer' && (
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
              <Text style={styles.headerText}>Account Number</Text>
              <Text style={styles.titleText}>{details?.accountNo}</Text>
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
              source={require('../../../../assets/mobileProvider/nute.png')}
            />
          </View>

          <View
            style={{
              backgroundColor: '#fff',
              paddingBottom: 20,
              paddingHorizontal: 10,
            }}>
            <Text style={styles.headerText2}>IFSC Code</Text>
            <Text style={styles.titleText2}>{details?.ifscCode}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              paddingBottom: 20,
              paddingHorizontal: 10,
            }}>
            <Text style={styles.headerText2}>Mobile Number</Text>
            <Text style={styles.titleText2}>{details?.mobileNumber}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              paddingBottom: 10,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <Text style={styles.headerText2}>Account Holder Name </Text>
            <Text style={styles.titleText2}>{details?.name}</Text>
          </View>
          {type?.short == 'mobile' && (
            <View
              style={{
                backgroundColor: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginVertical: 10,
              }}>
              <Text style={styles.titleText}>{data?.desc}</Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.paymentContainer}>
        <View style={styles.transactionDetails}>
          <Text style={styles.headerText2}>Transaction Details</Text>
          <Text style={styles.headerText2}>{data?.rs}</Text>
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
              marginRight: wp(5),
              marginBottom: wp(5),
            }}
            onPress={() => openTokenModal()}>
            <Text style={{color: '#fff', fontSize: 16}}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <BottomSheetModal
        index={0}
        ref={optionsRef}
        snapPoints={snapPointsOptions}
        stackBehavior="push"
        backdropComponent={props => (
          <CustomBackdrop dismissModal={toggleOptionsModal} {...props} />
        )}
        // backdropComponent={renderBackdrop}
        backgroundStyle={{backgroundColor: colors.ui_background}}
        handleIndicatorStyle={{backgroundColor: colors.interactive_04}}
        containerStyle={{backgroundColor: colors.backdrop}}
        onChange={handleOptionsChanges}>
        <View style={{padding: 10}}>
         
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
                <Text style={styles.column}>{data.rs}</Text>
              </View>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  TDS (1%)
                </Text>
                <Text style={styles.column}>{tax?.TDS * Number(data?.rs)}</Text>
              </View>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  Service Tax (Rs.)
                </Text>
                <Text style={styles.column}>{tax?.service}</Text>
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
                  {cutAfterDecimal(
                    Number(data.rs) + tax.TDS * Number(data?.rs) + tax?.service,
                    6,
                  )}
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
                  {cutAfterDecimal(
                    (Number(data.rs) + (tax?.TDS) * Number(data?.rs) + tax?.service) /
                      Number(priceInInr?.price),
                    6,
                  )}{' '}
                  {selectedToken?.symbol}
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
      </BottomSheetModal> */}

      <RBSheet
        ref={refTxnSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={530}
        draggableIcon={false}
        openDuration={400}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View style={{padding: 10}}>
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
                <Text style={styles.column}>{data.rs}</Text>
              </View>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  TDS (1%)
                </Text>
                <Text style={styles.column}>{tax?.TDS * Number(data?.rs)}</Text>
              </View>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.column,
                    {borderRightWidth: 1, borderColor: '#ccc'},
                  ]}>
                  Service Tax (Rs.)
                </Text>
                <Text style={styles.column}>{tax?.service}</Text>
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
                  {cutAfterDecimal(
                    Number(data.rs) + tax.TDS * Number(data?.rs) + tax?.service,
                    6,
                  )}
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
                  {cutAfterDecimal(
                    (Number(data.rs) +
                      tax?.TDS * Number(data?.rs) +
                      tax?.service) /
                      Number(priceInInr?.price),
                    6,
                  )}{' '}
                  {selectedToken?.symbol}
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
      </RBSheet>

      <RBSheet
        ref={refTokenSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={550}
        draggableIcon={false}
        openDuration={300}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            padding: 10,
          }}>
          {/* <View style={styles.container}>
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
              mode="dropdown"
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
          </View> */}
          <View
            style={{
              marginHorizontal: wp(2),
              marginBottom: wp(6),
              marginTop: wp(4),
              alignItems: 'center',
            }}>
            <Text style={{color: '#444', fontSize: wp(5), fontWeight: '600'}}>
              Pay By
            </Text>
            <Text style={{color: '#999'}}>
              Please select currency for this payment
            </Text>
          </View>

           {/* <View
            style={{
              margin: wp(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/bitcoin.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 BTC
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/binance.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 BNB
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.positionImage}>
                    <Image
                      source={require('../../../../assets/coins/doge.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('../../../../assets/coins/binance.png')}
                      style={styles.abosluteImage}
                      resizeMode="contain"
                    />
                    <View style={{position: 'absolute', bottom: 0}}></View>
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 Doge
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/ethereum.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 ETH
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/tron.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      100 Tron
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/tether.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 USDT
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/usdc.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 USDC
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/polygon.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 MATIC
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/tron.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      100 Tron
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/seedx.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 SEEDx
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/inrx.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 INRx
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.positionImage}>
                    <Image
                      source={require('../../../../assets/coins/doge.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('../../../../assets/coins/binance.png')}
                      style={styles.abosluteImage}
                      resizeMode="contain"
                    />
                    <View style={{position: 'absolute', bottom: 0}}></View>
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 Doge
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/ethereum.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 ETH
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/binance.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      0.001 BNB
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.currencyItem}>
                <View style={{alignItems: 'center'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../../../assets/coins/tron.png')}
                      style={styles.cImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cValueWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cValue}>
                      100 Tron
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>  */}

          {allfilterdData.token?.length > 0 ? (
            <FlatList
              data={allfilterdData?.token}
              renderItem={renderItem}
              keyExtractor={(item,i )=>i+"tok" }
              numColumns={5} // Set numColumns to 2 for two columns per row
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign color={'#444'} name="frowno" size={wp(6)} />
              <Text style={{fontSize: 20, color: '#444', fontSize: wp(4.5)}}>
                No Token Found
              </Text>
            </View>
          )}
        </View>
      </RBSheet>

      {/* <BottomSheetModal
        index={0}
        ref={tokenRef}
        snapPoints={snapPointsOptions}
        stackBehavior="push"
        backdropComponent={props => (
          <CustomBackdrop dismissModal={toggleTokenModal} {...props} />
        )}
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
      </BottomSheetModal> */}
      <ConfirmationModal
        status={isModalVisible}
        setStatus={setModalVisible}
        operator={operator?.operator_name}
        mobileNumber={mobileNumber}
        amount={data.rs}
      />
    </View>
  );
};

export default RechargePayment;

const styles = StyleSheet.create({
  detailContainer: {
    // flex: 0.6,
    padding: 10,
  },
  paymentContainer: {
    flex: 0.98,
    padding: 10,
    justifyContent: 'space-between',
    // backgroundColor: '#000',
  },
  headerText: {
    color: '#999',
    fontSize: wp(4),
  },
  titleText: {
    color: '#000',
    fontSize: wp(4),
    paddingVertical: wp(2),
  },

  headerText2: {
    color: '#000',
    fontSize: wp(4),
    fontWeight: '600',
  },
  titleText2: {
    color: '#000',
    fontSize: wp(4),

    paddingVertical: wp(2),
  },

  transactionDetails: {
    backgroundColor: '#f3f4f7',
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
    height: 50,
    width: '100%',
    margin: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
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
  currencyItem: {
    marginVertical: wp(2),
    marginHorizontal: wp(1),
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: '#ccc',
    // width: 60,
  },
  cImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: 50,
  },
  cValueWrapper: {
    width: 60,
  },
  cValue: {
    fontSize: 20,
    color: '#999',
    fontSize: wp(3),
    paddingHorizontal: wp(1),
    paddingVertical: 'wp(0.5)',
   
  },
  positionImage: {position: 'relative'},
  abosluteImage: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 22,
    height: 22,
    borderRadius:50
  },
});
