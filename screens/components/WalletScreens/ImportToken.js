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
import Toast from 'react-native-toast-message';
import {getWeb3Instance, getWeb3InstanceDynamic, setProvider, utils} from '../../../Utils/web3/web3';
import {updateWallets} from '../../../Store/web3';
import {ERC20ABI} from '../../../Utils/ABI';
import {coingecko_getChain} from '../../../Services/moralis';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from "axios"
import { fetchTokenPrice } from '../../../Utils/apis/api';

// import SelectNetwork from './SelectNetwork';

const ImportScreen = props => {
  const {wallets, activeWallet, priceQuotes, networks,selectChain} = useSelector(
    state => state.wallet,
  );
  const{qr,address}=props.route.params
  console.log(address,"address12")
  const wallet = wallets[activeWallet];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [tokenAddress, setTokenAddress] = React.useState('');
  const [tokenName, setTokenName] = React.useState('');
  const [tokenSymbol, setTokenSymbol] = React.useState('');
  const [tokenDecimals, setTokenDecimals] = React.useState('');
  const [tokenBalance, setTokenBalance] = React.useState('');
  const [network, setNetwork] = useState('');
  const [isValidAddress, setIsValidAddress] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  console.log(selectChain,"selectChainselectChainselectChain")

  async function getClipboardContent() {
    const content = await Clipboard.getString();
    setTokenAddress(content);
  }

  async function findToken() {
    try {
      const assets = wallet.assets;
      // const Web3 = getWeb3Instance();
      if (utils.isAddress(tokenAddress)) {
        // const code = await web3.eth.getCode(tokenAddress);
        // // console.log(code,' code')
        // if (code === '0x') {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Wrong Information',
        //     text2: 'Please provide recieve address and send amount',
        //   });
        // }
        for (const asset of assets) {
          try {
            // const net = networks.find(it => it.chainId == asset.chainId);
            setProvider(selectChain.rpcUrl);
            const web3 = getWeb3InstanceDynamic(selectChain.rpcUrl);
            // console.log('tryblock ', net.chainId);
            const tokenContract = new web3.eth.Contract(ERC20ABI, tokenAddress);
            const symbol = await tokenContract.methods.symbol().call();
            const decimals = await tokenContract.methods.decimals().call();
            const name = await tokenContract.methods.name().call();
            const balance = await tokenContract.methods
              .balanceOf(wallet.address)
              .call();
            setTokenName(name);
            setTokenSymbol(symbol);
            setTokenDecimals(decimals);
            setTokenBalance(
              (Number(balance) / Number('1e' + decimals)).toString(),
            );
            setNetwork(selectChain);
            setIsValidAddress(true);
            break;
          } catch (e) {
            console.log('catchblock');
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const importToken = async () => {
      
    
    if (tokenName && tokenSymbol && tokenDecimals && tokenAddress ) {
      console.log(selectChain,"selectChain")
      setLoading(true);
      // const url = `https://api.coingecko.com/api/v3/coins/${coingecko_getChain(
      //   selectChain.chainId,
      // )}/contract/${tokenAddress}`;
      // console.log(url, 'url');
      // let response = await axios.get(url);
      // let usd_price_coin_gecko_1 = response.data
      // let usd_price_coin_gecko = await usd_price_coin_gecko_1.json();
      // const usd = usd_price_coin_gecko?.error
      //   ? 0
      //   : usd_price_coin_gecko.data.market_data.current_price.usd;
      const usd = await fetchTokenPrice(tokenSymbol)
      
      const token = {
        name: tokenName,
        symbol: tokenSymbol,
        decimals: Number(tokenDecimals),
        token_address: tokenAddress,
        balance: Number(tokenBalance),
        chainId: selectChain.chainId,
        // slug:selectChain?.nativeCurrency?.slug,
        custom:true,
        type:"token",
        show: true,
        logo: null,
        usd_price: usd,
      };

       console.log(token, 'import token');
      const assets = [...wallet.assets];
      const myasset = assets?.find(it => it?.chainId == selectChain?.chainId);
      if (
        myasset?.tokens?.find(token => token?.token_address === tokenAddress)
      ) {
        Toast.show({
          type: 'error',
          text1: 'Token already exists',
          text2: 'This token already exists in your wallet',
        });
        return;
      }
      var warr = [...wallets];
      var aw = {...warr[activeWallet]};
      var aws = [...aw.assets];
      var aasset = {...aws?.find(it => it.chainId ==selectChain.chainId)};
      var ind = aws.findIndex(it => it.chainId == selectChain.chainId);
      var tarr = [...aasset.tokens];
      // token.type="token";
      tarr.push({...token});
      aasset.tokens = [...tarr];
      aws[ind] = {...aasset};
      aw.assets = [...aws];
      warr[activeWallet] = {...aw};
      setLoading(false);
      dispatch(updateWallets([...warr]));
      navigation.navigate('WalletScreen');
    } else {
      setLoading(false);
      findToken();
    }
 
  };

  useEffect(() => {
    // dispatch(changeTheme({ theme: 'default', darkMode: true }));
    // console.log('tokenAddress', tokenAddress);
    // if (!utils.isAddress(tokenAddress)) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Invalid Address',
    //     text2: 'Please enter a valid address',
    //   });
    //   return;
    // }
    findToken();
  }, [tokenAddress]);
  useEffect(()=>{

    if(qr){
      setTokenAddress(address)
    }

  },[qr])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: wp(3),
            // justifyContent:'center'
          }}>
          <Text
            style={{color: '#444', fontSize: hp(2.1)}}
            onPress={() => navigation.goBack()}>
            Cancel
          </Text>
        </View>
        <View style={{textAlign: 'center'}}>
          <Text
            style={{
              color: '#444',
              fontSize: hp(2.1),
              fontWeight: '600',
            }}>
            Add Custom Token
          </Text>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontWeight: '400',
              fontSize: hp(2.2),
              marginEnd: wp(1),
            }}
            onPress={importToken}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.95,
          // backgroundColor: 'red',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',

            marginVertical: hp(2),
          }}>
          <View style={styles.transactionCards}>
            <View style={styles.colTranxLast}>
              <View
                style={[
                  styles.transactionCardsInner,
                  {paddingVertical: wp(3)},
                ]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>Network </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={styles.fromText}
                  onPress={() => navigation.navigate('selectnetworks')}>
                  {selectChain.name}
                </Text>
                <Ionicons name="chevron-forward" size={15} color={'#bbb'} />
              </View>
            </View>
          </View>

          <View style={styles.transactionCards}>
            <View style={styles.colTranx}>
              <View style={[styles.transactionCardsInner, {marginTop: wp(1)}]}>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Contract Address"
                    placeholderTextColor={'#999'}
                    value={tokenAddress}
                    style={styles.inputfield}
                    onChangeText={val => setTokenAddress(val)}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{marginEnd: wp(2), color: '#444'}}
                      onPress={getClipboardContent}>
                      Paste
                    </Text>
                    <Ionicons
                      name="scan"
                      size={17}
                      color={'#444'}
                      onPress={() =>
                        navigation.navigate('QRCodeScannerComponent', {
                          type: 'importtoken',
                          data: {...props.route.params},
                        })
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.colTranx}>
              <View style={styles.transactionCardsInner}>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor={'#999'}
                    value={tokenName}
                    style={styles.inputfield}
                    onChangeText={val => setTokenName(val)}
                  />
                </View>
              </View>
            </View>

            <View style={styles.colTranx}>
              <View style={styles.transactionCardsInner}>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Symbol"
                    placeholderTextColor={'#999'}
                    value={tokenSymbol}
                    style={styles.inputfield}
                    onChangeText={val => setTokenSymbol(val)}
                  />
                </View>
              </View>
            </View>

            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Decimals"
                    placeholderTextColor={'#999'}
                    value={tokenDecimals}
                    style={styles.inputfield}
                    onChangeText={val => setTokenDecimals(val)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.infowrapper}>
          <View
            style={{
              // color: '#000',
              flexDirection: 'row', //width (according to its parent)
              //its children will be in a column
            }}>
            <Feather
              name="info"
              size={25}
              color={'#00781a'}
              onPress={() => navigation.goBack()}
              style={{padding: 10}}
            />
            <View
              style={{
                width: wp(65),
              }}>
              <Text style={{color: '#00781a'}}>
                Anyone create a token, including fake versions of existing
                tokens. Learn about scams and secuity risks.
              </Text>
            </View>
          </View>
        </View>
        <View
        style={{
          // alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{color: '#999'}}>What is Custom Token?</Text>
        <View style={{fontWeight: 'bold'}}>
          <Ionicons
            name="information-circle"
            size={18}
            style={{color: '#bbb', fontWeight: '600'}}
          />
        </View>
      </View>
      </View>
     

      {/* <View style={{alignItems: 'center', flex: 0.88}}>
        <View style={styles.input}>
          <TextInput
            placeholder="Token Address"
            placeholderTextColor={'#444'}
            style={{flex: 0.94}}
            value={tokenAddress}
            onChangeText={val => setTokenAddress(val)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Token Symbol"
            placeholderTextColor={'#444'}
            style={{flex: 0.5}}
            value={tokenSymbol}
            onChangeText={val => setTokenSymbol(val)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Token Decimals"
            placeholderTextColor={'#444'}
            style={{flex: 0.5}}
            value={tokenDecimals}
            onChangeText={val => setTokenDecimals(val)}
          />
        </View>
      </View> */}

      {/* <TouchableOpacity style={styles.send} onPress={importToken}>
        {loading ? (
          <ActivityIndicator
            size={20}
            color={'#000'}
            style={{marginHorizontal: 5}}
          />
        ) : null}
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
          Import Token
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f7',
  },
  header: {
    width: '100%',
    paddingVertical: hp(5),
    backgroundColor: '#F3F4F7',
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 5,
    // display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    color: '#444',
    height: hp(5),
    width: '100%',
    borderWidth: 0,
    borderColor: '#444',
    fontSize: 13,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputfield: {
    color: '#000',
    flex: 0.95,
  },
  tabbody: {
    flex: 1,
    paddingHorizontal: 10,
  },
  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },

  transactionCards: {
    paddingHorizontal: 15,
    // paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: hp(2),
    marginVertical: hp(1),
    color: '#444',
    borderRadius: 6,
  },

  transactionCardsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(1),
  },

  headText: {
    color: '#888',
    fontSize: hp(1.7),
  },

  fromText: {
    color: '#888',
    fontSize: hp(1.7),
  },
  valuetxt: {
    color: '#4CD073',
    fontSize: hp(4),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  Icons: {
    fontSize: wp(6),
    color: '#000',
    fontWeight: '500',
    // paddingHorizontal: 3,
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
  },

  infowrapper: {
    backgroundColor: '#eaffef',
    // color: '#E0F7E5',
    padding: wp(5),
    width: wp(90),
    borderRadius: wp(3),
    marginBottom: wp(4),
  },

  iconWrapper: {
    flexDirection: 'row',
    // backgroundColor:'#ccc',
    // width: '100%',
    // paddingHorizontal: 10,
    marginTop: wp(10),
    justifyContent: 'space-between',
    // alignItems: 'center',
    // textAlign:'center'
  },
  iconWithWrapper: {
    width: wp(25),
    alignItems: 'center',
    textAlign: 'center',
    // backgroundColor:'#fff',
  },
});

export default ImportScreen;
