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
import {Link, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ZERO_ADDRESS} from '../../../Utils/constants';
import Toast from 'react-native-toast-message';
import {sendNativeToken, sendToken} from '../../../Utils/web3/web3';
import {setActiveWallet} from '../../../Store/web3';
import Clipboard from '@react-native-clipboard/clipboard';
import { AlertHelper } from '../../../Utils/alertHelper';


const SendScreen = props => {
  const {wallets, activeWallet, priceQuotes, networks} = useSelector(
    state => state.wallet,
  );
  const wallet = wallets[activeWallet];
  const {symbol, balance, data, qr, address, chainId, native, token_address} =
    props.route.params;
  const network = networks.find(it => it.chainId == chainId);
  const [recieveAddress, setRecieveAddress] = useState('');
  const [sendAmount, setSendAmount] = useState(0);
  const [loading, setloading] = useState(false);
  const [token, settoken] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const istoken = !native;
  const[error,setError] = useState("")

  useEffect(() => {
    if (qr) {
      console.log(address,"addresss")
      const add = JSON.parse(address)
      setRecieveAddress(add.address);
      setSendAmount(add.amount)
    }

    // console.log('effect',props.route.params)
  }, [props]);

  async function getClipboardContent() {
    const content = await Clipboard.getString();
    setRecieveAddress(content);
  }

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
        sendToken(
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
        sendNativeToken(
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
        <Text
          onPress={() => navigation.goBack()}
          style={{      
            color: '#444',
            fontSize: hp(2),
          }}>
          Cancel
        </Text>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2),
            fontWeight: '600',
          }}>
          Send {token?.symbol?.toUpperCase()}
        </Text>

        <Text
          style={{
            color: '#444',
            fontSize: hp(2),
          }}>
          Next
        </Text>
      </View>
      <View style={{alignItems: 'center', flex: 0.98}}>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <TextInput
              placeholder="Address or Sns"
              placeholderTextColor={'#bbb'}
              value={recieveAddress}
              onChangeText={val => setRecieveAddress(val)}
              style={styles.inputfield}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={getClipboardContent}>
                <Text style={{marginEnd: wp(5), color: '#10CF7F'}}>Paste</Text>
              </TouchableOpacity>
              <Ionicons
                name="scan"
                size={17}
                color={'#10CF7F'}
                onPress={() =>
                  navigation.navigate('QRCodeScannerComponent', {
                    type: 'send',
                    data: {...props.route.params},
                  })
                }
                //style={{flex: 0.06}}
              />
            </View>
          </View>
          <View style={styles.border}></View>
          <View style={styles.input}>
            <TextInput
              placeholder={`${token?.symbol?.toUpperCase()} Amount`}
              placeholderTextColor={'#bbb'}
              value={sendAmount}
              onChangeText={val => setSendAmount(val)}
              style={styles.inputfield}
              keyboardType='numeric'
            />
            <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
              <TouchableOpacity onPress={()=>setSendAmount(token.balance)}>
              <Text style={{marginEnd: wp(5), color: '#10CF7F'}}>Max</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#10CF7F',
                  textAlign: 'right',
                }}>
                {/* {token?.balance} */}
                {' ' + token?.symbol?.toUpperCase()}
              </Text>
            </View>
          </View>
          </View>
      {error.length !=0 && <View>
        <Text style={{color:"red",fontSize:16}}>{error}</Text>
      </View>}
        </View>
     

      <TouchableOpacity
        style={styles.send}
        onPress={() => {
          if(recieveAddress.startsWith("0x") && sendAmount!=0 && sendAmount.length !=0){
          navigation.navigate('ConfirmTransfer', {
            propData:{...props.route.params},
            recieveAddress: recieveAddress,
            sendAmount: sendAmount,
          });
        }else{
         if(recieveAddress.length==0 && !recieveAddress.startsWith("0x")){
          setError("Invalid Reciever address.")
         }else if(!sendAmount && sendAmount==0){
          setError("Enter Valid amount.")
         }
         setTimeout(()=>{
          setError("")
         },10000)
        }
        }}>
        {/* <Link to="/ConfirmTransfer" style={styles.send}> */}
        {loading ? (
          <ActivityIndicator
            size={20}
            color={'#fff'}
            style={{marginHorizontal: 5}}
          />
        ) : null}

        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          {/* Send {token?.symbol?.toUpperCase()} */}
          Next
        </Text>
      </TouchableOpacity>
      {/* </Link> */}
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
    paddingVertical: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginVertical: hp(2),
    borderRadius: wp(2),
    color: '#888',
    marginHorizontal: wp(7),
    width: '100%',
  },
  input: {
    color: '#444',
    fontSize: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 0,
  },
  inputfield: {
    color: '#444',
    flex: 0.95,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    MarginHorizontal: 10,
    paddingHorizontal: 10,
  },
  tabbody: {
    flex: 1,
    paddingHorizontal: 10,
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
    marginBottom: 10,
    flexDirection: 'row',
    textAlign: 'center',
  },
});

export default SendScreen;
