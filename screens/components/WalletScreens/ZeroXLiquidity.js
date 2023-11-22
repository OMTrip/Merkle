import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {initializeSwapTokens} from '../../../Store/web3';
import {useState, useCallback, useEffect} from 'react';
import InputBox from './swapComponent/InputBox';
import {
  calculateFeeSell,
  calculateFeesBuy,
  calculateFeesFrom,
  checkAnyPairExist,
  checkExactPair,
  getAmountIn,
  getAmountOut,
  getContractBalance,
  getLiquidityFromRouter,
  getQuickPair,
  getTokenDetailSwap,
  getTokenDetails,
  wethStatus,
} from '../../../Utils/web3/web3Functions';
import {
  cutAfterDecimal,
  toPlainString,
} from '../../../Utils/web3/helperFunction';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';

const ZeroXLiquidity = props => {
  const navigation = useNavigation();
  const {swapFromToken, swapToToken, wallets, activeWallet} = useSelector(
    state => state.wallet,
  );
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(2);
  const [info, setInfo] = useState(false);
  const wallet = wallets[activeWallet];
  const [recieveStatus, setRecieveStatus] = useState({});
  const [constractBalStatus, setContractBalStatus] = useState(false);
  const [changeLoader, setChangeLoader] = useState(false);
  const [initialLoader, setInitialLoader] = useState(false);
  const [propStatus, setPropStatus] = useState(true);
  console.log(propStatus, 'jfkgb');

  const dispatch = useDispatch();
  function handleSwitch() {
    setPropStatus(true);
    dispatch(
      initializeSwapTokens({swapTo: swapFromToken, swapFrom: swapToToken}),
    );
    setFrom('');
    setTo('');
  }

  const handleFrom = useCallback(
    async val => {
      setFrom(cutAfterDecimal(val, swapFromToken.decimals == 2 ? 2 : 6));
      setChangeLoader(true);
      if (status != 2) {
        var dPrice =
          swapFromToken['isQuote'] == true ? Number(price) : Number(1 / price);
        const calculatedValue = Number(val) / Number(dPrice);
        console.log(val, dPrice, 'dPrice');
        setTo(calculatedValue ? (price != 0 ? calculatedValue : 0) : 0);
        setChangeLoader(false);
      } else {
        await pairCalculationFrom(val);
        setChangeLoader(false);
      }
    },
    [from, swapFromToken, swapToToken, price],
  );

  const handleTo = useCallback(
    async val => {
      setTo(cutAfterDecimal(val, swapToToken.decimals == 2 ? 2 : 6));
      setChangeLoader(true);
      if (status != 2) {
        const dPrice = swapFromToken['isQuote']
          ? Number(price)
          : Number(1 / price);

        const calculatedValue = Number(val) * Number(dPrice);
        setFrom(calculatedValue ? calculatedValue : 0);
        setChangeLoader(false);
      } else {
        await pairCalculationTo(val);
        setChangeLoader(false);
      }
    },
    [to, swapFromToken, swapToToken, price],
  );

  async function changeStatusOfAlreadyPairExists() {
    const pToken = swapFromToken['isQuote'] ? swapFromToken : swapToToken;
    const bToken = !swapFromToken['isQuote'] ? swapFromToken : swapToToken;
    const checkPair = await checkAnyPairExist(bToken.token_address, wallet);
    if (checkPair.startsWith('0x')) {
      setStatus(1);

      const data = await getQuickPair(checkPair, wallet);
      console.log(data, 'daaata');

      const {decimals} = await getTokenDetails(data.pairToken, wallet);

      const pri = data.price?.toString();

      // const pri = cutAfterDecimal(data.price * 10 ** Number(pToken.decimals)-1);

      const d = pToken;
      const amtd = d?.decimals;
      const obj = {
        path: [data.pairToken, d.token_address],
        amount: pri,
      };

      const getAOut = await getAmountOut(obj, wallet);
      setPrice(
        isNaN(getAOut[1]) ? 0 : toPlainString(Number(getAOut[1]) / 10 ** amtd),
      );

      setInitialLoader(false);
    } else {
      console.log('Pair not exists12');
      setInfo('Pair not exists.');
      setInitialLoader(false);
    }
  }

  async function setStatusTypeAndPrice() {
    setInitialLoader(true);
    setPrice(0);
    setPropStatus(false);
    try {
      const hash = await checkExactPair(
        swapFromToken.token_address,
        swapToToken.token_address,
        wallet,
      );
      console.log('hello1', hash);

      if (hash != null) {
        console.log('hello2');
        setStatus(0);
        const {price} = await getQuickPair(hash, wallet);

        if (price) {
          const decimal = swapFromToken.isQuote
            ? swapFromToken.decimals
            : swapToToken.decimals;
          console.log(
            toPlainString(price / 10 ** Number(decimal)),
            'decimal',
            swapFromToken.decimals,
          );
          setPrice(toPlainString(price / 10 ** Number(decimal)));

          setInitialLoader(false);
        } else {
          setPrice(0);
        }
      } else if (swapFromToken['isQuote'] && swapToToken['isQuote']) {
        console.log('hello2');
        setStatus(2);

        const obj = {
          path: [swapFromToken.token_address, swapToToken.token_address],
          amount: (1 * 10 ** Number(swapFromToken.decimals)).toString(),
        };
        const a = await getAmountOut(obj, wallet);

        setPrice(Number(a[1]) / 10 ** swapToToken.decimals);

        setInitialLoader(false);
        const params = [swapFromToken.token_address, swapToToken.token_address];

        if (!swapFromToken.liquidityAdded && !swapToToken.liquidityAdded) {
          var swapFrom = {...swapFromToken};
          var swapTo = {...swapToToken};
          const liquiditydata = await getLiquidityFromRouter(params, wallet);
          const {reserve0, reserve1, token0, token1} = liquiditydata;
          const fr = swapFrom.token_address == token0 ? reserve0 : reserve1;
          const t = swapTo.token_address == token0 ? reserve0 : reserve1;

          swapFrom.liquidity = toPlainString(
            fr / 10 ** Number(swapFrom.decimals),
          );
          swapTo.liquidity = toPlainString(t / 10 ** Number(swapTo.decimals));
          swapFrom.liquidityAdded = true;
          swapTo.liquidityAdded = true;
          dispatch(initializeSwapTokens({swapTo: swapTo, swapFrom: swapFrom}));
        }
      } else if (
        swapFromToken.isQuote ||
        (swapToToken.isQuote && hash == null)
      ) {
        console.log('hello3');
        await changeStatusOfAlreadyPairExists(1);
      } else {
        console.log('Pair not exists');
        setInitialLoader(false);
      }
    } catch (error) {
      setInitialLoader(false);
    }
  }

  const pairCalculationFrom = useCallback(
    async (amount, lq) => {
      setRecieveStatus({insufficientLiquidity: false});
      let obj = {};

      const ainmultiple = amount * 10 ** swapFromToken?.decimals;
      console.log(ainmultiple, 'ainmultiple');
      obj = {
        path: [swapFromToken?.token_address, swapToToken?.token_address],
        amount: ainmultiple.toString(),
      };

      const calc = await getAmountOut(obj, wallet);
      if (calc) {
        setTo(
          toPlainString(Number(calc[1]) / 10 ** Number(swapToToken?.decimals)),
        );
        console.log(
          calc,
          Number(calc[1]) / 10 ** Number(swapToToken?.decimals),
          Number(swapToToken.liquidity),
          from.length,
          Number(calc[0]),
          'calc',
        );

        if (
          Number(
            calc[0] / 10 ** Number(swapFromToken?.decimals) >=
              Number(swapFromToken.liquidity),
          ) &&
          Number(calc[1]) / 10 ** Number(swapToToken?.decimals) >=
            Number(swapToToken.liquidity) &&
          from.length > 0 &&
          Number(calc[1]) == 0
        ) {
          setRecieveStatus({insufficientLiquidity: true});
          setTo(0);
          return;
        }
        setInfo('');
      }
    },
    [to],
  );

  const pairCalculationTo = useCallback(
    async (amount, lq) => {
      setRecieveStatus({insufficientLiquidity: false});
      let obj = {};
      const ainmultiple = amount * 10 ** swapToToken?.decimals;

      obj = {
        path: [swapFromToken?.token_address, swapToToken?.token_address],
        amount: ainmultiple?.toString(),
      };
      console.log(obj, 'obj');
      const calc = await getAmountIn(obj, wallet);

      console.log(
        calc,
        Number(calc[0]) / 10 ** Number(swapFromToken.decimals),
        Number(swapFromToken.liquidity),
        'Number(swapFromToken.liquidity)',
      );
      if (calc) {
        setFrom(
          toPlainString(
            Number(calc[0]) / 10 ** Number(swapFromToken?.decimals),
          ),
        );
        if (
          Number(calc[0]) / 10 ** Number(swapFromToken.decimals) >=
            Number(swapFromToken.liquidity) &&
          Number(calc[1]) / 10 ** Number(swapToToken.decimals) >=
            Number(swapToToken.liquidity) &&
          to.length > 0 &&
          Number(calc[0]) == 0
        ) {
          setRecieveStatus({insufficientLiquidity: true});
          setFrom(0);
          return;
        }
      }
    },
    [from],
  );

  async function handleReciveStatus() {
    setChangeLoader(true);

    try {
      if (status != 2) {
        setRecieveStatus({});
        let calculationStatus = swapFromToken['isQuote'] ? true : false;
        let quoteObj = swapFromToken['isQuote'] ? swapFromToken : swapToToken;
        let baseObj = !swapFromToken['isQuote'] ? swapFromToken : swapToToken;
        if (calculationStatus) {
          let data = {
            quoteObj,
            baseObj,
            amount: from * 10 ** swapFromToken.decimals,
          };

          if (status == 1) {
            const hash = await checkAnyPairExist(
              baseObj?.token_address,
              wallet,
            );
            const {pairToken} = await getQuickPair(hash, wallet);
            const pairTokenObj = await getTokenDetailSwap(pairToken, wallet);
            const obj = {
              path: [quoteObj?.token_address, pairToken],
              amount: from * 10 ** swapFromToken.decimals,
            };

            const calc = await getAmountOut(obj, wallet);
            data = {
              ...data,
              pairTokenObj,
            };
            data.amount = calc[1];
          }
          console.log(data, 'dataaaaaa');
          const recieve = await calculateFeesBuy(data, status, wallet);
          recieve['price'] = price;
          setRecieveStatus(recieve);
          setChangeLoader(false);
        } else {
          const hash = await checkAnyPairExist(baseObj?.token_address, wallet);
          const {pairToken, pairBalance} = await getQuickPair(hash, wallet);
          const data = {
            quoteObj,
            baseObj,
            amount: from * 10 ** swapFromToken.decimals,
          };
          if (status == 0) {
            const recieve = await calculateFeeSell(data, status, wallet);
            recieve['price'] = price;
            setRecieveStatus(recieve);
            setContractBal(
              Number(recieve.recieveAmount) <=
                Number(pairBalance) / 10 ** quoteObj.decimals,
            );
            console.log(
              Number(recieve.recieveAmount),
              Number(pairBalance) / 10 ** quoteObj.decimals,
              ' Number(contractBal) >= Number(calc[0])',
            );
            setChangeLoader(false);
          } else {
            const recieve = await calculateFeeSell(data, status, wallet);
            recieve['price'] = price;
            console.log(recieve.recieveAmount, quoteObj.decimals, 'recieve');

            const obj = {
              path: [pairToken, quoteObj.token_address],
              amount: toPlainString(
                Number(recieve.recieveAmount) *
                  Number(10 ** Number(quoteObj.decimals)),
              ),
            };

            const calc = await getAmountOut(obj, wallet);
            console.log(calc, 'calc');
            recieve['recieveAmount'] =
              Number(calc[1]) / Number('1e' + swapToToken.decimals)
                ? Number(calc[1]) / Number('1e' + swapToToken.decimals)
                : 0;
            if (calc[0] == 0 && calc[2] == 0) {
              recieve['insufficientLiquidity'] = true;
            }

            setRecieveStatus(recieve);
            setChangeLoader(false);
            const contractBal = await getContractBalance(pairToken, wallet);
            console.log(contractBal);

            setContractBalStatus(Number(contractBal) >= Number(calc[0]));
          }
        }
      }
    } catch (error) {
      setChangeLoader(false);
      console.log(error, 'errorhandlerecieve');
    }
  }
  const handleSwap = async () => {
    recieveStatus.insufficientLiquidity;
    console.log(from, to, 'fromto');
    if (price == 0) {
      setInfo('Pair Not Exists');
    } else if (from == 0 || to == 0) {
      setInfo('Invalid Input');
    } else if (recieveStatus.insufficientLiquidity) {
      setInfo('Insufficient Fund');
    } else {
      if (Number(swapFromToken.balance) >= Number(from)) {
        navigation.navigate('TransactionDetail', {
          from: toPlainString(from),
          to: status == 2 ? to : toPlainString(recieveStatus.recieveAmount),
          swapFromToken,
          swapToToken,
          status,
        });
      } else {
        console.log(swapFromToken.balance, from, 'balance,from');
        Toast.show({type: 'error', text1: 'Insufficient Balance in Wallet.'});
      }
    }
    setTimeout(() => {
      setInfo('');
    }, 10000);
  };

  useEffect(() => {
    if (swapFromToken?.token_address !== swapToToken?.token_address) {
      if (propStatus || props.route.params.status) {
        setStatusTypeAndPrice();
        setFrom('');
        setTo('');
      }
    }
  }, [swapFromToken, swapToToken]);
  useEffect(() => {
    if (status != 2) {
      handleReciveStatus();
    }
  }, [to, from]);
  useEffect(() => {
    (async () => {
      if (!swapFromToken['balanceStatus'] && !swapToToken['balanceStatus']) {
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

        dispatch(initializeSwapTokens({swapTo: swapTo, swapFrom: swapFrom}));
      }
    })();
  }, []);

  const InputTo = toVal => {
    return (
      <InputBox
        title="You Get"
        type="to"
        token={swapToToken}
        initialLoader={initialLoader}
        setInput={setTo}
        input={toVal}
        handleChange={val => handleTo(val)}
      />
    );
  };

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
          0x Liquidity
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
      <View style={{alignItems:'center'}}>
        <View style={styles.wrapper}>
          <InputBox
            title="You Pay"
            type="from"
            token={swapFromToken}
            initialLoader={initialLoader}
            setInput={setFrom}
            input={from}
            handleChange={val => handleFrom(val)}
          />

          <View style={styles.border}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              position: 'relative',
            }}>
            <TouchableOpacity onPress={handleSwitch}>
              <Text style={styles.arrowBg}>
                <MaterialIcons style={styles.exchnageICon} name="swap-vert" />
              </Text>
            </TouchableOpacity>
          </View>

          {/* <InputBox
            title="You Get"
            type="to"
            token={swapToToken}
            setInput={setTo}
            input={to}
            handleChange={val => handleTo(val)}
          /> */}
          {InputTo(to)}
        </View>
      </View>

      <TouchableOpacity onPress={handleSwap}>
        <View
          style={{
            alignSelf: 'center',
            padding: 15,
            backgroundColor:
              from.length == 0 || to.length == 0 ? 'transparent' : '#000',
              brederColor:
              from.length == 0 || to.length == 0 ? '#eee' : '#000',
            borderRadius: 7,
            borderWidth:1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: wp(5),
            flexDirection: 'row',
            textAlign: 'center',
            opacity: 1,
          }}>
          {info ? (
            <Text
              style={{
                color: 'red',
                fontSize: 15,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {info}
            </Text>
          ) : (
            <Text
              style={{
                color: from.length == 0 || to.length == 0 ?'#000':'#fff',
                fontSize: 15,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Preview Swap
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {changeLoader || initialLoader ? (
        <ActivityIndicator
          size={50}
          color={'#000'}
          style={{marginVertival: 15}}
        />
      ) : (
        <View>
        {(from.length>0 || to.length>0)?<View>
          <View style={styles.transactionCards}>
            <View style={styles.transactionCardsInner}>
              <Text style={styles.headText}>Quotes </Text>
              {status == 2 ? (
                <Text style={styles.fromText}>
                  1 {swapFromToken.symbol}
                  <MaterialCommunityIcons
                    name={'approximately-equal'}
                    size={wp(4)}
                    style={{color: '#000'}}
                  />
                  {cutAfterDecimal(toPlainString(price), 6)}{' '}
                  {swapToToken.symbol}{' '}
                </Text>
              ) : (
                <Text style={styles.fromText}>
                  1 {swapToToken.symbol}
                  <MaterialCommunityIcons
                    name={'approximately-equal'}
                    size={wp(4)}
                    style={{color: '#000'}}
                  />
                  {cutAfterDecimal(toPlainString(price), 6)}{' '}
                  {swapFromToken.symbol}{' '}
                </Text>
              )}
            </View>
          </View>

          {status != 2 ? (
            <View style={styles.transactionCards}>
              <View style={styles.transactionCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>Price Impact </Text>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    style={{color: '#bbb', fontWeight: '600'}}
                  />
                </View>
                <Text style={styles.fromText}>
                  {recieveStatus['priceImpact']
                    ? cutAfterDecimal(recieveStatus.priceImpact, 6)
                    : 0}{' '}
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.transactionCards}>
            <View style={styles.transactionCardsInner}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.headText}>Fees </Text>
                <Ionicons
                  name="information-circle"
                  size={15}
                  style={{color: '#666', fontWeight: '600'}}
                />
              </View>

              <Text style={styles.fromText}>
                {recieveStatus['priceImpact']
                  ? cutAfterDecimal(recieveStatus.fees, 6)
                  : 0}
              </Text>
            </View>
          </View>

          {status != 2 ? (
            <View style={styles.transactionCards}>
              <View style={styles.transactionCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>Recieve Amount </Text>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    style={{color: '#bbb', fontWeight: '600'}}
                  />
                </View>

                <Text style={styles.fromText}>
                  {recieveStatus['priceImpact']
                    ? cutAfterDecimal(recieveStatus.recieveAmount, 6)
                    : 0}{' '}
                  {swapToToken.symbol}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.transactionCards}>
              <View style={styles.transactionCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>Recieve Amount </Text>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    style={{color: '#666', fontWeight: '600'}}
                  />
                </View>

                <Text style={styles.fromText}>
                  {to ? cutAfterDecimal(to, 6) : 0} {swapToToken.symbol}
                </Text>
              </View>
            </View>
          )}
        </View>:null}
    </View>
      )}
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
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    paddingVertical: 10,
    backgroundColor: '#eff3f68a',
    marginVertical: hp(2),
    borderRadius: wp(2),
    width: '100%',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: '#000',
    fontSize: 13,
    paddingHorizontal: wp(4),
    // marginVertical: 0,
  },
  border: {
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc',
    marginVertical: wp(3),
  },

  transactionCards: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    // marginHorizontal: hp(2),
    marginVertical: hp(1),
    color: '#444',
    borderRadius: 6,
    backgroundColor: '#eff3f68a',
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
    color: '#444',
    fontSize: hp(1.6),
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
    color: '#14b7af',
    fontSize: wp(8),
  },

  send: {
    alignSelf: 'center',
    padding: 15,
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
  row: {
    flexDirection: 'row',
    // width:"100%",
    // width:"80%",
    justifyContent: 'space-between',
    // alignItems:"center"
  },
  box1: {
    borderWidth: 0.8,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  centeredView: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '50%',
    justifyContent: 'center',

    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#bbb',
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: 'green',
    margin: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 18,
    width: '70%',
    color: '#000',
    fontWeight: '600',
  },
  modalText1: {
    marginBottom: 18,
    width: '30%',
    color: '#000',
    fontWeight: '600',
  },
});

export default ZeroXLiquidity;
