import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ceil, chain} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../HomeScreen/HomeHeader';
import {useCallback, useEffect} from 'react';
import InputBox from './swapComponent/InputBox';
import {
  getPriceSushi,
  v2RouterTokenPrice,
} from '../../../Utils/apis/V2RouterApi';
import {useDispatch, useSelector} from 'react-redux';
import {cutAfterDecimal, toPlainString} from '../../../Utils/web3/helperFunction';
import {initilizeToken} from '../../../Store/V2RouterSlice';
import {
  getTokenDetailSwap,
  getTokenDetailV2Router,
  swapV2Router,
} from '../../../Utils/web3/web3Functions';
import {getGasPrice, setProvider} from '../../../Utils/web3/web3';
import Toast from 'react-native-toast-message';

const SwapScreen = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [initialLoader, setInitialLoader] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({});
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const {fromToken, toToken} = useSelector(store => store.v2Router);
  const {activeWallet, wallets, chainInfo} = useSelector(store => store.wallet);
  const [slippage, setSlippage] = useState(0.005);
  const [args, setArgs] = useState({});
  const [tax,setTax] = useState(1);

  const wallet = wallets[activeWallet];
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleButtonClick = value => {
    // Handle button click logic here
    setSlippage(value);
    console.log(`Button clicked with value: ${value}`);
  };

  // function getPriceImpact(reserve_a_initial, reserve_b_initial) {
  //   const fee = 0.0025;
  //   let max_price_impact = 0.01;
  //   let amount_traded_cake =
  //     (reserve_a_initial * max_price_impact) /
  //     ((1 - max_price_impact) * (1 - fee));
  //   let amount_traded_usdt =
  //     (reserve_b_initial * max_price_impact) /
  //     ((1 - max_price_impact) * (1 - fee));

  //   let amountInCAKE = amount_traded_cake * (1 - fee);
  //   let amountInUSDT = amount_traded_usdt * (1 - fee);
  //   let price_impact_trade_cake =
  //     amountInCAKE / (reserve_a_initial + amountInCAKE);
  //   let price_impact_trade_usdt =
  //     amountInUSDT / (reserve_b_initial + amountInUSDT);

  //   console.log(
  //     price_impact_trade_cake,
  //     price_impact_trade_usdt,
  //     'price_impact_trade_usdt',
  //   );
  //   return {
  //     priceImpact0: price_impact_trade_cake,
  //     priceImpact1: price_impact_trade_usdt,
  //   };
  // }

  function handleSwap() {
    setFrom('');
    setTo('');
    dispatch(initilizeToken({fromToken: toToken, toToken: fromToken}));
  }
  const handleFrom = useCallback(
    async val => {
      try {
        let delay = 500;
        setFrom(val);
        if (val == '' || val == 0) {
          setTo('');
          setTimeout(() => {
            setTo('');
          }, delay);
        } else {
          // clearTimeout(apiCallTimeout);
          // const apiCallTimeout = setTimeout(async() => {
            let deductedVal  = val-(val * tax/100)
           
          let data = await getPriceSushi(
           
            fromToken.token_address,
            toToken.token_address,
            (deductedVal * 10 ** fromToken.decimals)?.toString(),
            fromToken.chainId,
            fromToken.gasPrice,
            slippage,
            wallet,
          );
           console.log(data, 'data::::');
          if (data) {
            let amOut =
              JSON.parse(data).route.amountOut / 10 ** toToken.decimals;
            setTo(cutAfterDecimal(amOut, 5));
            setArgs(JSON.parse(data));
          } else {
            setTo('');
          }
          // }, delay);
          // const dt = await v2RouterTokenPrice(
          //   fromToken,
          //   toToken,
          //   val.length != 0 ? val : 0,
          //   "from"
          // );
          // if (dt?.status) {
          //  let res = dt?.outputAmount?.numerator /
          //   10 ** dt?.outputAmount?.currency.decimals;
          //   console.log(res,"res::::")
          //   let result = res +(res*(tax/100));
          //   console.log(result,"result:::::")

          //   setTo(
          //     cutAfterDecimal(
          //       res,
          //       5
          //     ),
          //   );
          //   let reserve0 = dt.routes[0]?.pools[0]?.reserve0?.numerator/(10 ** dt?.inputAmount?.currency.decimals);
          //   let reserve1 = dt.routes[0]?.pools[0]?.reserve1.numerator /(10 ** dt?.outputAmount?.currency.decimals);
          //   console.log(reserve0,reserve1,"reserve1reserve1reserve1")
          //   const resp = getPriceImpact(reserve0,reserve1);
          //   console.log(resp,"resp")
          // } else {
          //   setTo('');
          // }
        }
      } catch (error) {
        setTo('');
      }
    },
    [from, fromToken, toToken],
  );

  const handleTo = useCallback(
    async val => {
      setTo(val);
      const delay = 500;
      console.log(val, 'val');
      try {
        if (val == '' || val == 0) {
          setFrom('');
          setTimeout(() => {
            setFrom('');
          }, 2000);
        } else {
          // clearTimeout(apiCallTimeout);
          // const apiCallTimeout = setTimeout(async() => {
          let data = await getPriceSushi(
            toToken.token_address,
            fromToken.token_address,
            (val * 10 ** toToken.decimals)?.toString(),
            toToken.chainId,
            fromToken.gasPrice,
            slippage,
            wallet,
          );
          // console.log(data, 'data::::');
          if (data) {
            let amOut =
              JSON.parse(data).route.amountOut / 10 ** toToken.decimals;
            setFrom(cutAfterDecimal(amOut, 5));
          } else {
            setFrom('');
          }
          // }, delay);
          //   const dt = await v2RouterTokenPrice(toToken, fromToken, val,"to");
          //   console.log(dt,"dt")
          //   if (dt?.status) {
          //     let res = dt?.inputAmount?.numerator /
          //         10 ** dt?.inputAmount?.currency.decimals;
          //         console.log(res,"res")
          //         // let result = res - (res*(tax/100));
          //         // console.log(result,"result")
          //   setFrom(
          //     cutAfterDecimal(
          //       res,
          //       2
          //     ),
          //   );
          //   let reserve0 = dt.routes[0].pools[0].reserve0.numerator/(10 ** dt?.inputAmount?.currency.decimals);
          //   let reserve1 = dt.routes[0].pools[0].reserve1.numerator /(10 ** dt?.outputAmount?.currency.decimals);
          //   const resp = getPriceImpact(reserve0,reserve1);
          //   console.log(resp,"resp")
          //     }else{
          //       setFrom("")
          //     }
        }
      } catch (error) {
        setFrom('');
      }
    },
    [to, toToken, fromToken],
  );

  const fetchBalance = async () => {
    setProvider(chainInfo[fromToken.slug].rpcUrl);
    const gasPrice = await getGasPrice();
    var swapFrom = {...fromToken};
    var swapTo = {...toToken};
    const fromBalance = await getTokenDetailV2Router(
      fromToken.token_address,
      wallet,
    );
    const toBalance = await getTokenDetailV2Router(
      toToken.token_address,
      wallet,
    );
    let fromB = fromBalance.balance / 10 ** Number(fromToken.decimals);
    let toB = toBalance.balance / 10 ** Number(toToken.decimals);
    swapFrom['balance'] = fromB;
    swapTo['balance'] = toB;
    swapFrom['balanceStatus'] = true;
    swapTo['balanceStatus'] = true;
    swapFrom['gasPrice'] = gasPrice;
    swapTo['gasPrice'] = gasPrice;
    console.log(swapFrom,swapTo,"swapToswapToswapTo")

    dispatch(initilizeToken({fromToken: swapFrom, toToken: swapTo}));
  };

  async function previewSwap(){
    try {
      
   console.log(fromToken,"fromToken")
    const rpc = chainInfo[fromToken.slug]?.rpcUrl;
    console.log(rpc,"rpc")
    // let fromWeth = toPlainString(from*(10**fromToken.decimals))
    // const res = await swapV2Router(fromWeth,fromToken,toToken,args,fromToken.chainId,rpc,wallet,Toast);
    navigation.navigate("TransactionDetailV2Router",{fromToken:fromToken,toToken:toToken,rpc:rpc,from:from,to:to,chainId:fromToken.chainId,slippage:slippage,args:args})
  } catch (error) {
      console.log(error,"er:::::::::::::::::::::")
  }

  }

  useEffect(() => {
    (async () => {
      setTokenDetails({});
      console.log(fromToken['balanceStatus'],toToken['balanceStatus'],"toToken['balanceStatus']")
      if (!fromToken['balanceStatus'] && !toToken['balanceStatus']) {
        await fetchBalance();
      }

      // const data = await v2RouterTokenPrice(fromToken, toToken, 1,"from");
      // console.log(data,"data")
      // setTokenDetails(data);
      try {
        let dt = await getPriceSushi(
          fromToken.token_address,
          toToken.token_address,
          (0.05 * 10 ** fromToken.decimals)?.toString(),
          fromToken.chainId,
          fromToken.gasPrice,
          slippage,
          wallet,
        );
        console.log(
          JSON.parse(dt),
          'dtdt:::::::::::::::::::::::::::::::::::::',
        );
        setTokenDetails(JSON.parse(dt));
      } catch (error) {
        console.log(error, 'errror');
      }
    })();
  }, [fromToken, toToken]);

  // useEffect(() => {
  //   try {
      
   
  //   var interval;
  //   // clearInterval(interval);
  //   console.log(from,"from")
  //   if (from.length != 0 || from != 0) {
  //     clearInterval(interval);
  //     interval = setInterval(async () => {
  //       if (from.length !== 0 || from !== 0) {
  //         // Your logic here...
  //         let deductedVal = from - from * (tax / 100);
       
  //         console.log(  fromToken.token_address,
  //           toToken.token_address,
  //           (deductedVal * 10 ** fromToken.decimals)?.toString(),
  //           fromToken?.chainId,
  //           fromToken?.gasPrice,
  //           slippage,
  //           wallet.address)
  //         let data = await getPriceSushi(
  //           fromToken.token_address,
  //           toToken.token_address,
  //           (deductedVal * 10 ** fromToken.decimals)?.toString(),
  //           fromToken.chainId,
  //           fromToken.gasPrice,
  //           slippage,
  //           wallet
  //         );
  //         consoel.log("loopData:::::::::::",data)
  
  //         setArgs(JSON.parse(data));
  //       }
  //     }, 4000);
      
  //   } else {
  //     clearInterval(interval);
  //   }
  // } catch (error) {
  //     console.log(error,"error")
  // }
  
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [from,fromToken,toToken]);
  



  return (
    <LinearGradient
      colors={[
        '#d6fffd',
        '#f2fffe',
        '#ffff',
        '#fff',
        '#fffaff',
        '#fef8ff',
        '#faf4ff',
        '#fcf5fe',
        '#f5eefe',
        '#f1e9fe',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1, paddingHorizontal: wp(5)}}>
      <View style={styles.header}>
        <HomeHeader
          icons={true}
          iconName={'arrow-left'}
          size={wp(7)}
          title={'Swap'}
          TextTitle={true}
          RightHeaderName={true}
          RheaderName={'Done'}
          TextTitleStyle={{textAlign: 'center'}}
          leftIocnsSubScreen={false}
          LeftIconsName={'magnify'}
          routeName={'HomeScreen'}
        />
      </View>
      {/* <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2.2),
            fontWeight: '600',
          }}>
          Swap
        </Text>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2.2),
          }}>
          Done
        </Text>
      </View> */}
      <View style={{alignItems: 'center'}}>
        <View style={styles.wrapper}>
          {/* <View style={styles.input}>
            <View>
              <Text style={styles.labels}>You Pay</Text>
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="0"
                placeholderTextColor={'#666'}
                style={{
                  flex: 0.7,
                  color: '#000',
                  fontSize: wp(6),
                  fontWeight: '600',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: '#fff',
                  flex: 0.3,
                }}>
                <View>
                  <Image
                    source={require('../../assets/coins/ethereum.png')}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: wp(50),
                      marginEnd: wp(1),
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.tokenName}>MATIC</Text>
                </View>
                <View>
                  <MaterialIcons
                    style={{
                      marginEnd: wp(4),
                      paddingTop: wp(0.5),
                      marginStart: wp(1),
                    }}
                    name="keyboard-arrow-right"
                    size={19}
                    color={'#ccc'}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.labels2}>Balance: 681.972364532559562</Text>
            </View>
          </View> */}
          <InputBox
            title="You Pay"
            type="from"
            token={fromToken}
            initialLoader={initialLoader}
            setInput={setFrom}
            input={from}
            tokenList="V2TokenList"
            handleChange={val => handleFrom(val)}
          />

          <View style={styles.border}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              position: 'relative',
            }}>
            <TouchableOpacity onPress={handleSwap}>
              <Text style={styles.arrowBg}>
                <MaterialIcons style={styles.exchnageICon} name="swap-vert" />
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.input}>
            <View>
              <Text style={styles.labels}>You Get</Text>
            </View> */}

          {/* <View style={styles.box}>
              <TextInput
                placeholder="0"
                placeholderTextColor={'#666'}
                // value={sendAmount}
                style={{
                  flex: 0.7,
                  color: '#000',
                  fontSize: wp(6),
                  fontWeight: '600',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: '#fff',
                  flex: 0.3,
                  // marginBottom: 0,
                }}>
                <View>
                  <Image
                    source={require('../../assets/coins/tether.png')}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: wp(50),
                      marginEnd: wp(1),
                    }}
                  />
                </View>
                <View style={styles.chainName}>
                  <Text style={styles.tokenName}>USDT</Text>
                  <Text style={styles.subtoken}>POLYGON</Text>
                </View>
                <View>
                  <MaterialIcons
                    style={{
                      marginEnd: wp(4),
                      paddingTop: wp(0.5),
                      marginStart: wp(1),
                    }}
                    name="keyboard-arrow-right"
                    size={19}
                    color={'#ccc'}
                  />
                </View>
              </View>
            </View> */}
          <InputBox
            title="You Get"
            type="to"
            token={toToken}
            initialLoader={true}
            setInput={setTo}
            input={to}
            tokenList="V2TokenList"
            handleChange={val => handleTo(val)}
          />

          {/* <View>
              <Text style={styles.labels2}>Balance: 681.972366</Text>
            </View> */}
          {/* </View> */}
        </View>
      </View>

      <TouchableOpacity onPress={previewSwap}>
        <View style={styles.disabledBtn}  >
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Preview Swap
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.transactionCards}>
        <View style={styles.transactionCardsInner}>
          <Text style={styles.headText}>Quotes </Text>
          <Text style={styles.fromText}>
            1 {fromToken.symbol}
            <MaterialCommunityIcons
              name={'approximately-equal'}
              size={wp(4)}
              style={{color: '#999'}}
            />
            {/* {tokenDetails?.outputAmount?.numerator
              ? cutAfterDecimal(
                  tokenDetails?.outputAmount?.numerator /
                    10 ** tokenDetails?.outputAmount?.currency.decimals,
                  6,
                )
              : 0}{' '} */}
            {tokenDetails?.route?.swapPrice?cutAfterDecimal(tokenDetails?.route?.swapPrice, 6):0}{' '}
            {toToken.symbol}
          </Text>
        </View>
      </View>
      <View style={styles.transactionCards}>
        <View style={styles.transactionCardsInner}>
          <Text style={styles.headText}>Price Impact </Text>
          <Text style={styles.fromText}>
            {args?.route?.priceImpact
              ? cutAfterDecimal(args?.route?.priceImpact*100, 6)
              : 0}
          </Text>
        </View>
      </View>

      <View style={styles.transactionCards}>
        <View style={[styles.transactionCardsInner]}>
          <Text style={styles.headText}>Settings </Text>
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              onPress={() => {
                setIsSettingsVisible(!isSettingsVisible);
              }}
              style={styles.settingsIcon}>
              <Text>
                {' '}
                <MaterialIcons
                  name={isSettingsVisible ? 'close' : 'settings'}
                  size={25}
                  color={'#000'}
                  // onPress={() => navigation.goBack()}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isSettingsVisible ? (
        <View
          style={[
            styles.transactionCards,
            {marginVertical: 0, paddingVertical: 0},
          ]}>
          <View style={styles.transactionCardsInner}>
            <Text style={styles.headText}>Slippage (%) </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
            
              <TouchableOpacity onPress={() => handleButtonClick(0.001)}>
                <Text
                  style={[
                    styles.slippageButton,
                    {
                      backgroundColor: slippage == 0.001 ? '#000' : '#ccc',
                      color: slippage == 0.001 ? '#fff' : '#000',
                    },
                  ]}>
                  0.001
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick(0.005)}>
                <Text
                  style={[
                    styles.slippageButton,
                    {
                      backgroundColor: slippage == 0.005 ? '#000' : '#ccc',
                      color: slippage == 0.005 ? '#fff' : '#000',
                    },
                  ]}>
                  0.005
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick(0.1)}>
                <Text
                  style={[
                    styles.slippageButton,
                    {
                      backgroundColor: slippage == 0.1 ? '#000' : '#ccc',
                      color: slippage == 0.1 ? '#fff' : '#000',
                    },
                  ]}>
                  0.1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonClick(0.5)}>
                <Text
                  style={[
                    styles.slippageButton,
                    {
                      backgroundColor: slippage == 0.5 ? '#000' : '#ccc',
                      color: slippage == 0.5 ? '#fff' : '#000',
                    },
                  ]}>
                  0.5
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}

      {/* <View style={styles.transactionCards}>
        <View style={styles.transactionCardsInner}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.headText}>Provider Fee </Text>
            <Ionicons
              name="information-circle"
              size={15}
              style={{color: '#666', fontWeight: '600'}}
            />
          </View>

          <Text style={styles.fromText}>0.00358 USDT</Text>
        </View>
      </View> */}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
    paddingHorizontal: wp(5),
  },
  header: {
    paddingVertical: hp(5),
  },
  wrapper: {
    paddingVertical: 10,
    backgroundColor: '#eff3f68a',
    marginBottom: hp(2),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: '#444',
    fontSize: 13,
    paddingHorizontal: wp(4),
    // marginVertical: 0,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    marginVertical: wp(3),
  },

  transactionCards: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    backgroundColor: '#eff3f68a',
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

  headText: {
    color: '#444',
    fontSize: hp(1.8),
    fontWeight: '600',
  },

  fromText: {
    color: '#888',
    fontSize: hp(1.5),
  },
  tokenName: {
    color: '#000',
    fontSize: hp(1.8),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  subtoken: {
    color: '#888',
    fontSize: hp(1.2),
  },
  labels: {
    color: '#444',
    fontSize: hp(1.5),
  },
  labels2: {
    color: '#999',
    fontSize: hp(1.5),
  },

  arrowBg: {
    backgroundColor: '#fff',
    height: wp(10),
    width: wp(10),
    borderRadius: wp(50),
    borderWidth: 1,
    borderColor: '#eee',
    textAlign: 'center',
    lineHeight: wp(10),
    position: 'absolute',
    top: -wp(8),
    right: wp(4),
  },

  exchnageICon: {
    color: '#10CF7F',
    fontSize: wp(8),
  },

  send: {
    alignSelf: 'center',
    padding: 15,
    // backgroundColor: '#10CF7F',
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
  },
  disabledBtn: {
    alignSelf: 'center',
    padding: 15,
    // backgroundColor: '#10CF7F',
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
    opacity: 1,
  },
  settingsIcon: {
    // position: 'absolute',
    // top: 20,
    // right: 20,
    // padding: 10,
  },
  settingsContainer: {
    position: 'relative',
    flexDirection: 'row',
    right: 50,
    // top:"500%",

    borderRadius: 5,
  },
  slippageButton: {
    fontSize: 18,
    margin: 5,
    // color: 'white',
    // backgroundColor:"#ccc",
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default SwapScreen;