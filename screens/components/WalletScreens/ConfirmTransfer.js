import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ZERO_ADDRESS} from '../../../Utils/constants';
import Toast from 'react-native-toast-message';
import {
  getTransactionReceipt,
  getWeb3Instance,
  getWeb3InstanceDynamic,
  sendNativeToken,
  sendToken,
  utils,
} from '../../../Utils/web3/web3';
import {setActiveWallet} from '../../../Store/web3';
import {NetworkFees, cutAfterDecimal} from '../../../Utils/web3/helperFunction';
import Web3 from 'web3';
import {BSC_TESTNET_RPC} from '../../../Utils/constants';
import {ERC20ABI} from '../../../Utils/ABI';

const ConfirmTransfer = props => {
  const {wallets, activeWallet, priceQuotes, networks, chainInfo} = useSelector(
    state => state.wallet,
  );
  const wallet = wallets[activeWallet];
  const {propData, recieveAddress, sendAmount} = props.route.params;
  const {symbol, balance, data, qr, address, chainId, native, token_address} =
    propData;
  const network = networks.find(it => it.chainId == chainId);
  const [loading, setloading] = useState(false);
  const [token, settoken] = useState({});
  const [item, setItem] = useState({});
  const [gasFees, setGasFees] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const istoken = !native;
  // const txDetail = wallet.transactions[propData.slug];
  console.log({address: propData}, 'propData.slug');

  // const dat = wallet.assets.find(ele=>ele.nativeslug==propData.slug);

  useEffect(() => {
    try {
      
    var tokensarr = [];
    console.log( wallet.assets," wallet.assets")
    wallet.assets?.map(it => {
      const obj = {
        ...it.nativeCurrency,
        native: true,
        balance: it.balance,
        show: it?.show,
        chainId: it.chainId,
        blockExplorerUrl: it.blockExplorerUrl,
        rpcUrl: it.rpcUrl,
      };
      const ar = [...it.tokens];
      ar.push(obj);
      tokensarr = [...tokensarr, ...ar];
    });
    const narr = [];
    tokensarr.map((item, i) => {
      const it = priceQuotes.find(
        tok => tok?.symbol?.toLowerCase() === item?.symbol?.toLowerCase(),
      );
      const itobj = {...it, ...item, index: i};
      narr.push(itobj);
    });
    const d = narr.find(data => {
      console.log(propData,"data123::::::::::")
      if (!propData.token_address && !data.token_address ) {
        return data.slug == propData.slug;
      } else {
        return data.token_address == propData.token_address;
      }
    });
    setItem(d);
    console.log(d, 'tokensarr');
  } catch (error) {
    setItem([]);
    console.log(error,"err")
      
  }
  }, []);

  useEffect(() => {
    const asset = wallet?.assets?.find(it => it.chainId == chainId);
    if (native) {
      const obj = {
        symbol: asset?.nativeCurrency?.symbol,
        balance: asset?.balance,
        decimal: asset?.nativeCurrency?.decimals,
        address: ZERO_ADDRESS,
      };
      settoken({...obj});
    } else {
      const token = asset?.tokens?.find(
        it =>
          it.chainId == chainId &&
          it?.token_address.toLowerCase() == token_address?.toLowerCase(),
      );
      const obj = {
        symbol: token?.symbol,
        balance: token?.balance,
        address: token?.token_address,
        decimal: token?.decimals,
      };
      settoken({...obj});
    }
  }, [props, wallets]);
  // const getGasAmount = async () => {
  //   if (!istoken) {
  //     const web3 = getWeb3InstanceDynamic(chainInfo[propData.slug].rpcUrl);
  //     const gasPrice = await web3.eth.getGasPrice();
  //     const toAddress = recieveAddress;
  //     const etherAmountWei = web3.utils.toWei(sendAmount, 'ether');
  //     const gasEstimate = await web3.eth.estimateGas({
  //       to: toAddress,
  //       value: etherAmountWei,
  //       gasPrice: gasPrice, // Use the current gas price
  //     });
  //     return gasEstimate;
  //   }

  //   return 0;
  // };
  useEffect(() => {
    // (()=>{
    // })();
    const fetchGasFees = async () => {
      try {

       
        

        if (!istoken) {
          const web3 = getWeb3InstanceDynamic(chainInfo[propData.slug].rpcUrl);
        console.log(chainInfo[propData.slug].rpcUrl,"")
          const gasPrice = await web3.eth.getGasPrice();
          const toAddress = recieveAddress;
          const etherAmountWei = web3.utils.toWei(sendAmount, 'ether');
          const gasEstimate = await web3.eth.estimateGas({
            to: toAddress,
            value: etherAmountWei,
            gasPrice: gasPrice,
          });
          // const gasEstimateGwei = web3.utils.fromWei(gasEstimate, 'gwei');
          console.log(gasEstimate / 10 ** 9, 'gasEstimate');
          setGasFees(gasEstimate / 10 ** 9);
        } else {
          const dt = wallet?.assets?.find(e=>e.chainId==propData?.chainId)
          const web3 = getWeb3InstanceDynamic(chainInfo[dt.slug].rpcUrl);
          const tokenAddress = token.address;
          const tokenABI = ERC20ABI;
          const recieveAddress = recieveAddress;
          const sender = wallet.address;
          const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
          const tokenAmount = web3.utils.toWei(sendAmount, 'ether');
          const gasEstimate = await tokenContract.methods
            .transfer(recieveAddress, tokenAmount)
            .estimateGas({from: sender});
          // const gasEstimateGwei = web3.utils.fromWei(gasEstimate.toString(), 'gwei');
          setGasFees(gasEstimate / 10 ** 9);
        }
      } catch (error) {
        console.error('Error fetching gas fees:', error);
        setGasFees(0); // Handle the error appropriately
      }
    };

    fetchGasFees();
  }, [chainInfo]);

  async function SendCurrency() {
    if (istoken) {
      // console.log('token transfer');
      if (
        Number(sendAmount) &&
        Number(sendAmount) > 0 &&
        recieveAddress &&
        recieveAddress !== ZERO_ADDRESS
      ) {
        setloading(true);
        const res = await sendToken(
          recieveAddress,
          token.address,
          (Number(sendAmount) * Number('1e' + token?.decimal)).toString(),
          {
            ...wallet,
            symbol: token?.symbol,
            decimal: token?.decimal,
            network,
            dispatch,
            setActiveWallet,
            activeWallet,
          },
          setloading,
          Toast,
        );
        if (res?.status) {
          // console.log(res, 'resp1:::::::::::::::::::::::');
          // const data =await getTransactionReceipt(res?.hash)
          // console.log(data,"dtattta:::::::::::::::::::::::::::::::::::::::1");
          navigation.navigate('token', {...item, address: propData.address});

          //  navigation.navigate("TranscationDetails",{data:res,extras:propData})
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Wrong Information',
          text2: 'Please provide recieve address and send amount',
        });
      }
    } else {
      if (
        Number(sendAmount) &&
        Number(sendAmount) > 0 &&
        recieveAddress &&
        recieveAddress !== ZERO_ADDRESS
      ) {
        console.log(network, 'acn');
        setloading(true);
        const res = await sendNativeToken(
          recieveAddress,
          wallet.address,
          sendAmount,
          {
            ...wallet,
            symbol: token?.symbol,
            decimal: token?.decimal,
            network,
            dispatch,
            setActiveWallet,
            activeWallet,
          },
          setloading,
          Toast,
        );
        if (res?.status) {
          try {
            navigation.navigate('token', {...item, address: propData.address});

            // setloading(true)
            // setTimeout(async()=>{
            //   setloading(false)
            //   console.log(res?.transactionHash,"transactionHash::::::",txDetail)
            //    const data = txDetail?.filter(ele=>ele.hash=="0x4dc58d9115715150d30618a72124e1fa14932bd09db83a2c63066b49ff1cefb3");
            // //   const web3 = new Web3(BSC_TESTNET_RPC);
            // //  const data =await web3.eth.getTransactionReceipt(res.transactionHash)

            //  console.log(data,"data:::::::")
            // },100000)

            // console.log(data,"data::::")
            //  navigation.navigate("SendTransactionDetail",{type:"coin",data:res,extras:propData,recieveAddress:recieveAddress, sendAmount:sendAmount})
            // console.log(data, "dtattta:::::::::::::::::::::::::::::::::::::::2");

            // },30000)
          } catch (err) {
            console.log(err, 'errrr::::');
          }

          // console.log(data,"data::::::::::::::::::::::::::::::::")

          //  navigation.navigate("TranscationDetails",{data:data,extras:propData})
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Wrong Information',
          text2: 'Please provide recieve address and send amount',
        });
      }
    }
    //    console.log(result,"result of send")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="arrow-back-ios" size={19} color={'#10CF7F'} />
          <Text
            onPress={() => navigation.goBack()}
            style={{
              color: '#10CF7F',
              fontSize: hp(2),
            }}>
            Send {token?.symbol?.toUpperCase()}
          </Text>
        </View>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2),
            fontWeight: '600',
          }}>
          Transfer
        </Text>

        <AntDesign name="setting" size={19} color={'#10CF7F'} />
      </View>

      <View style={{alignItems: 'center', paddingTop: 10}}>
        <View style={[styles.BodyBoxTitle, {marginBottom: 1}]}>
          <Text style={[styles.Icons, {paddingEnd: 3}]}></Text>
          <Text style={styles.valuetxt}>
            {sendAmount} {symbol}
          </Text>
        </View>
        <View
          style={[
            styles.BodyBoxTitle,
            {marginBottom: 10, flexDirection: 'row', alignItems: 'center'},
          ]}>
          <MaterialCommunityIcons
            name={'approximately-equal'}
            size={wp(6)}
            style={{marginTop: hp(0.5), color: '#ccc'}}
          />
          <Text style={styles.TokenText}>
            ${cutAfterDecimal(sendAmount * propData.current_price, 5)}
          </Text>
        </View>
      </View>

      <View style={{flex: 0.86, alignItems: 'center'}}>
        <View style={styles.wrapper}>
          <View style={styles.transferCards}>
            <View style={styles.colTranx}>
              <View style={styles.transferCardsInner}>
                <View style={{}}>
                  <Text style={styles.headText}>Asset </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>{symbol}</Text>
              </View>
            </View>

            <View style={styles.colTranx}>
              <View style={styles.transferCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>From </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>
                  {wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}
                </Text>
              </View>
            </View>

            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={{}}>
                  <Text style={styles.headText}>To </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>
                  {recieveAddress.slice(0, 8)}...{recieveAddress.slice(-8)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.transferCards}>
            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>Network Fee </Text>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    style={{color: '#bbb', fontWeight: '600'}}
                  />
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.fromText}>
                  {gasFees} {symbol}
                </Text>
                <Text style={styles.fromText}>
                ($
                  {cutAfterDecimal(
                    Number(gasFees) * propData.current_price,
                    5,
                  )})
                </Text>
              </View>
            </View>
            <View style={styles.border}></View>
            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>Max Total </Text>
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{color: '#000', fontWeight: '600'}}>
                 
                   ${' '}
                  {cutAfterDecimal(
                    sendAmount * propData.current_price +
                      Number(gasFees) * propData.current_price,
                    4,
                  )}
                  
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.send} onPress={() => SendCurrency()}>
        {loading ? (
          <ActivityIndicator
            size={20}
            color={'#fff'}
            style={{marginHorizontal: 5}}
          />
        ) : null}
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
          {/* Send {token?.symbol?.toUpperCase()} */}
          Confirm
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
    //   paddingHorizontal: wp(5),
  },
  header: {
    width: '100%',
    paddingVertical: hp(5),
    paddingHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  wrapper: {
    width: '100%',
  },

  transferCards: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: hp(2),
    marginVertical: hp(1),
    color: '#444',
    borderRadius: 6,
  },

  transferCardsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingVertical: wp(4),
  },

  colTranx: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  colTranxLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 0,
    paddingTop: wp(4),
    paddingBottom: wp(2),
  },

  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    MarginHorizontal: 10,
    paddingHorizontal: 10,
  },
  send: {
    alignSelf: 'center',
    padding: 15,
    // backgroundColor: '#10CF7F',
    backgroundColor: '#000',
    borderRadius: 7,
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },

  headText: {
    color: '#444',
    fontSize: hp(1.9),
    fontWeight: '600',
  },
  infoIcon: {
    color: '#666',
    fontSize: hp(1.9),
  },

  fromText: {
    color: '#888',
    fontSize: hp(1.9),
  },
  valuetxt: {
    color: '#000',
    fontSize: hp(2.2),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  TokenText: {
    color: '#888',
    fontSize: hp(2),
  },
});

export default ConfirmTransfer;
