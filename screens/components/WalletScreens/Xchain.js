import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {estimateGasBridge, toAmount, xchainSwapOut} from '../../../Utils/web3/xchainHelperFunction';
import Toast from 'react-native-toast-message';
import {setXChainCoin, setXChainFrom, setXChainTo} from '../../../Store/xchainSlice';
import { cutAfterDecimal, toPlainString } from '../../../Utils/web3/helperFunction';
import { getBalance, getERC20Balance, setProvider } from '../../../Utils/web3/web3';
// import { getTokenDetails } from '../../../Utils/web3/web3Functions';
import { getTokenDetails } from '../../../Utils/web3/xchainHelperFunction';
import TransferPopup from './xchainComponent/TransferPopup';

const Xchain = props => {
  const navigation = useNavigation();
  const [from, SetFrom] = useState('');
  const [to, setTo] = useState('');
  const [recieve, setRecieve] = useState('');
  const {status} = props.route.params;
  const {xchains, xpair, xchainFrom, xchainTo, xchainCoin} = useSelector(
    state => state.xchain
  );
  const {wallets, activeWallet} = useSelector(
    state => state.wallet
  );
  const wallet = wallets[activeWallet]
  const [pairStatus, setPairStatus] = useState(false);
  const [btnLoader,setBtnLoader]= useState(false);
  const[bal,setBal] = useState({fromChain:0,toChain:0,tokenBal:0})
  const [popupVisible, setPopupVisible] = useState(false);
  const[info,setInfo] = useState("")
  const dispatch = useDispatch();

  async function handleBridge() {
    if((from.length==0 && to.length==0)){
      setInfo("InValid Info.")
      return
    }else if(from>bal.tokenBal){
      setInfo("Insufficient Token Balance.")
      return
    }else if(recieve>bal.fromChain){
      setInfo(`Insufficient ${xchainFrom['name']}.`)
      return
    }else if(to==0){
      setInfo(`Increase amount.`)
      return
    }else{
      handleTransferSuccess()
    }
   

   
  //   try {
      
   
  //   const data = {
  //     token: xchainCoin.tokenAddress,
  //     amount: toPlainString(from * 10 ** xchainCoin.tokenDeciamls),
  //     chainId: xchainTo.chainId?.toString(),
  //     routerContract: xchainFrom.routerContract,
  //     underlying:xchainCoin.tokenUnderlyingContract
  //   };
  //   console.log(data,"data")
  //   const response = await xchainSwapOut(data, Toast, wallet);
  //   console.log(response,"response")
  //   if(response['status']==true){
  //     setBtnLoader(false)
  //   }else{
  //     setBtnLoader(false)
  //   }
  // } catch (error) {
  //     console.log(error,"erorr")
  // }
  }

  const handleTransferSuccess = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  async function handleCalculation(val) {
    SetFrom(val);
    setInfo("")
    if (pairStatus) {
      const toValue = toAmount(val,pairStatus)
      console.log(toValue,"toValue")
      
        setTo(val?toValue:"");
        setProvider(xchainFrom.rpcUrls[0])
        const data = {
          token: xchainCoin.tokenAddress,
          amount: toPlainString(val * 10 ** xchainCoin.tokenDeciamls),
          chainId: xchainTo.chainId?.toString(),
          routerContract: xchainFrom.routerContract,
          underlying:xchainCoin.tokenUnderlyingContract
        };
       const gas = await estimateGasBridge(data,wallet)
       setRecieve(val?Number(gas):"")
       
      

   
    
     console.log(gas,"gas:::")
    }
  }
  async function swapChains(){
    dispatch(setXChainTo(xchainFrom))
    dispatch(setXChainFrom(xchainTo))
    dispatch(setXChainCoin({}));
    setTo("");
    SetFrom("");
    setRecieve("");
  }

  const initiaize = useCallback(async () => {
    console.log(xpair[0].srcChainId, 'xpair', xchainCoin?.chainId);
    const d = xpair?.filter((ele, i) => {
      if (ele?.srcChainId == xchainCoin?.chainId) {
        return ele;
      }
    });
    // console.log(d, 'd');
    if (d) {
      const fromdt = d?.map(ele => {
        console.log(ele?.srcChainId,xchainFrom?.chainId,xchainCoin,"xchainId")
        if (
          ele?.srcChainId == xchainFrom?.chainId &&
          xchainCoin?.chainId == xchainFrom?.chainId
        ) {
          return ele;
        }
      });
      // console.log(fromdt, 'fromdt');
      if (!fromdt[0]) {
        dispatch(setXChainCoin({}));
      } else {
        const todt = d?.map(ele => {
          if (ele?.destChainId == xchainTo?.chainId) {
            return ele;
          }
        });

        if (todt) {
          setPairStatus(todt[0]);
        } else {
          setPairStatus(false);
        }
      }
    }
  }, [xchainFrom, xchainTo, xchainCoin]);

  useEffect(() => {
    if (xchainCoin['tokenSymbol'] &&xchainFrom['name'] && xchainTo['name']) {
      initiaize();
     
      
    }
    (async()=>{
      try {
        
     
      if (xchainCoin['tokenSymbol'] && xchainFrom['name'] && xchainTo['name']) {
        setBtnLoader(true)
      setProvider(xchainFrom.rpcUrls[0])
      const fromChainBalance = await getBalance(wallet.address)

       const  tok = await getTokenDetails(xchainCoin.tokenUnderlyingContract,wallet)
       const tokB=tok.balance/10**Number(tok.decimals)
      console.log(fromChainBalance,"fromChainBalance",tok.balance/10**Number(tok.decimals))
      setProvider(xchainTo.rpcUrls[0])
      const toChainBalance = await getBalance(wallet.address)
      console.log(toChainBalance,"toChainBalance")
      setBal({fromChain:fromChainBalance,toChain:toChainBalance,tokenBal:tokB})
      setBtnLoader(false)
      }
    } catch (error) {
      setBtnLoader(false)
        console.log(error,"balance Bridge fetchin failed.")
    }
    })()
    
  }, [xchainFrom,xchainTo,xchainCoin]);
  

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
        </View>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2),
            fontWeight: '600',
          }}>
          X Chain
        </Text>

        <Text
          onPress={() => navigation.goBack()}
          style={{
            color: '#444',
            fontSize: hp(2),
          }}>
          Done
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={[styles.wrapperCoin, {paddingVertical: wp(3)}]}>
          <View style={styles.input}>
            <View style={styles.boxCoin}>
              <View>
                {xchainCoin['tokenId'] ? (
                  <Text style={styles.amountlabels}>
                    {xchainCoin['tokenSymbol']} {bal.tokenBal!=0&&<Text style={{fontWeight:"600"}}>({cutAfterDecimal(toPlainString(bal.tokenBal),6) } {xchainCoin['tokenSymbol']})</Text>}
                  </Text>
                ) : (
                  <Text style={styles.amountlabels}>Select Coin</Text>
                )}
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('xchainpair', {data: xchainFrom});
                  }}>
                  <MaterialIcons
                    style={{
                      paddingTop: wp(0.5),
                      marginStart: wp(1),
                    }}
                    name="keyboard-arrow-right"
                    size={19}
                    color={'#999'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Pay</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('xchainchains', {
                    type: 'from',
                    chainData: xchainTo,
                  })
                }>
                <View style={[styles.box, {minWidth: '60%'}]}>
                  {xchainFrom['name'] ? (
                    <Text style={styles.amountlabels}>{xchainFrom.name} {bal.fromChain!=0&&<Text style={{fontWeight:"600"}}> {'\n'}({cutAfterDecimal(toPlainString(bal.fromChain),3) } {xchainFrom['symbol']})</Text>} </Text>
                  ) : (
                    <Text style={styles.amountlabels}>Select Source Chain</Text>
                  )}
                  <MaterialIcons
                    style={{
                      marginEnd: wp(4),
                      paddingTop: wp(0.5),
                      marginStart: wp(1),
                    }}
                    name="keyboard-arrow-right"
                    size={19}
                    color={'#999'}
                  />
                </View>
              </TouchableOpacity>
              {xchainTo['name'] && (
                <View style={{maxWidth: '40%'}}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#999'}
                    onChangeText={val => {
                      handleCalculation(val);
                    }}
                    value={from}
                    style={{
                      color: '#000',
                      fontSize: wp(6),
                      fontWeight: '600',
                      textAlign: 'right',
                    }}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.border}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              position: 'relative',
            }}>
            <TouchableOpacity onPress={swapChains}>
              <Text style={styles.arrowBg}>
                <MaterialIcons style={styles.exchnageICon} name="swap-vert" />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Recieve</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('xchainchains', {
                    type: 'to',
                    chainData: xchainFrom,
                  })
                }>
                <View style={[styles.box, {minWidth: '60%'}]}>
                  {xchainTo['name'] ? (
                    <Text style={styles.amountlabels}>{xchainTo.name} {<Text style={{fontWeight:"600"}}>{'\n'}({cutAfterDecimal(toPlainString(bal.toChain),3) } {xchainTo['symbol']})</Text>}</Text>
                  ) : (
                    <Text style={styles.amountlabels}>
                      Select Target Chain{' '}
                    </Text>
                  )}
                  <MaterialIcons
                    style={{
                      marginEnd: wp(4),
                      paddingTop: wp(0.5),
                      marginStart: wp(1),
                    }}
                    name="keyboard-arrow-right"
                    size={19}
                    color={'#999'}
                  />
                </View>
              </TouchableOpacity>
              {xchainTo['name'] && (
                <View style={{maxWidth: '40%'}}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#999'}
                    editable={false}
                    onChangeText={val => {
                      SetTo(val);
                    }}
                    value={to?.toString()}
                    style={{
                      //   flex: 0.8,
                      color: '#000',
                      fontSize: wp(6),
                      fontWeight: '600',
                      textAlign: 'right',
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={[styles.wrapperCoin, {paddingHorizontal: wp(2)}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.amountlabels}>Estmaited Fees</Text>
            </View>
            <View>
              {/* <TextInput
                placeholder="0"
                placeholderTextColor={'#999'}
                editable={false}
                onChangeText={(val)=>{setRecieve(val)}}
                value={cutAfterDecimal(recieve?.toString(),6)}
                style={{
                  //   flex: 0.8,
                  color: '#999',
                  fontSize: wp(4),
                  fontWeight: '400',
                }}
              /> */}
              <Text  style={{
                  //   flex: 0.8,
                  color: '#999',
                  fontSize: wp(4),
                  fontWeight: '400',
                  paddingVertical:10
                }} >{cutAfterDecimal(recieve?.toString(),6)} {xchainFrom.symbol}</Text>
            </View>
          </View>
        </View>
        <TransferPopup
         visible={popupVisible}
         onClose={handleClosePopup}
         xchainCoin={xchainCoin}
         xchainFrom={xchainFrom}
         xchainTo={xchainTo}
         pairStatus={pairStatus}
         recieve={cutAfterDecimal(recieve?.toString(),6)}
         from={from}
         to={to}
         wallet={wallet}
        
        />
      </View>

      <TouchableOpacity onPress={()=>{
        handleBridge()
        // navigation.navigate("xchainTransaction")
      }
        }>
        <View style={styles.disabledBtn}>
         { btnLoader? <ActivityIndicator size="small" color="#fff" />:info?<Text
            style={{
              color: 'red',
              fontSize: 15,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            {info}
          </Text>:<Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Bridge
          </Text>}
        </View>
      </TouchableOpacity>
    </View>
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
  wrapperCoin: {
    // paddingVertical: wp(0),
    backgroundColor: '#fff',

    marginbottom: hp(1),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
  },
  wrapper: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginVertical: hp(2),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
  },
  boxCoin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',

    // justifyContent: 'space-between',
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
    marginVertical: wp(5),
  },

  transactionCards: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
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
    color: '#999',
    fontSize: hp(1.5),
    marginBottom: wp(2),
  },
  amountlabels: {
    color: '#999',
    fontSize: wp(4),
    // fontWeight: '600',
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
    top: -wp(11),
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
  tokenDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 50,
  },
  tokenSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Xchain;
