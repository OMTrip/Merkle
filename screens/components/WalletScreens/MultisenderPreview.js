import {StyleSheet, Text, View, Image, TouchableOpacity,ActivityIndicator, ScrollView} from 'react-native';
import React,{useState,useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {
  multiSendEther,
  multiSendToken,
} from '../../../Utils/web3/web3Functions';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getBalance, getERC20Balance, setProvider } from '../../../Utils/web3/web3';


const MultisenderPreview = props => {
  const navigation = useNavigation();
  const data = props.route.params;
  const [loader, setIsLoader] = useState(false);
  const [error, setIsError] = useState(false);
  const [bal,setBal] = useState(0)
  const {wallets, activeWallet,chainInfo} = useSelector(stat => stat.wallet);
  const wallet = wallets[activeWallet];
  const decimals =
    data.activeChain.type == 'coin'
      ? data.activeChain.nativeCurrency.decimals
      : data.activeChain.decimals;



  const handleProceed = async () => {
   const{recipients,
    amounts,
    nativetotal,activeChain} = data;

    if (data.activeChain.type == 'coin') {
      await multiSendEther(
        recipients,
        amounts,
        nativetotal,
        wallet,
        setIsLoader,
        setIsError,
        Toast,
        activeChain.nativeCurrency.slug,
        chainInfo[activeChain.nativeCurrency.slug].rpcUrl

      );
    } else {
      await multiSendToken(
        recipients,
        amounts,
        nativetotal,
        data.activeChain.token_address,
        wallet,
        setIsLoader,
        setIsError,
        Toast,
        activeChain.slug,
        chainInfo[activeChain.slug].rpcUrl
      );
    }
  };
useEffect(() => {
    (async()=>{
try {
    

  if(data.activeChain.type=="coin"){
console.log(data?.activeChain,"coin",data.activeChain.rpcUrl)

setProvider(data.activeChain.rpcUrl)
const balance = await getBalance(wallet.address);
setBal(balance)
  }else{
    const rpc = chainInfo[data?.activeChain?.slug];
    setProvider(rpc.rpcUrl)
    const balance = await getERC20Balance(wallet.address,data.activeChain.token_address);
    setBal(balance/10**Number(data.activeChain.decimals))
  }
} catch (error) {
    console.log(err)
}
})()

 
}, [props,loader])


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
          Preview
        </Text>

        <Text
          style={{
            color: '#444',
            fontSize: hp(2),
          }}
          onPress={()=>navigation.navigate("Home")}>
          Done
        </Text>
      </View>

      <View style={styles.wrapper}>
        <View
          style={[
            styles.box,
            {marginTop: 5, flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Image
            source={{
              uri: data?.activeChain?.logo
                ? data?.activeChain?.logo
                : `https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${data?.activeChain?.nativeCurrency.slug}/logo.png`,
            }}
            style={styles.imageCoin}
          />
          <Text style={[styles.text, {fontWeight: '600', fontSize: 18}]}>
            {data?.activeChain.type == 'coin'
              ? data?.activeChain.nativeCurrency.name
              : data?.activeChain.name}
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.text}>Total Address</Text>
            <Text style={styles.text}>{data?.recipients.length}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Total Amount to Send</Text>
            <Text style={styles.text}>
              {data?.nativetotal / 10 ** decimals}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Number of Transaction</Text>
            <Text style={styles.text}>1</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Your{' '}
              {data?.activeChain.type == 'coin'
                ? data?.activeChain.nativeCurrency.symbol?.toUpperCase()
                : data?.activeChain.symbol}{' '}
              balance
            </Text>
            <Text style={styles.text}>{bal}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Token to Send</Text>
            <Text style={styles.text}>{data?.activeChain.type == 'coin'
                ? data?.activeChain.nativeCurrency.symbol?.toUpperCase()
                : data?.activeChain.symbol}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.wrapper]}>
        <ScrollView style={[styles.box,{maxHeight:200}]}>
          <View style={styles.row}>
            <Text style={[styles.text, {fontWeight: '800', fontSize: 18}]}>
              Address
            </Text>
            <Text style={[styles.text, {fontWeight: '800', fontSize: 18}]}>
              Amount
            </Text>
          </View>
          {data?.recipients?.map((addr, i) => {
            const amounts = data.amounts[i];
            // const decimals =
            //   data.activeChain.type == 'coin'
            //     ? data.activeChain.nativeCurrency.decimals
            //     : data.activeChain.decimals;
            return (
              <>
                <View style={styles.row} key={i+"addr"}>
                  <Text style={styles.text}>
                    {addr.slice(0, 7)}...{addr.slice(-6)}
                  </Text>
                  <Text style={styles.text}>
                    {Number(amounts) / 10 ** Number(decimals)}
                  </Text>
                </View>
              </>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.goBack()}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          {loader ? (
              <ActivityIndicator size="small" color="#fff" />
            ) :
            <Text style={styles.buttonText} onPress={handleProceed}>

              Proceed
            </Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MultisenderPreview;

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
    // paddingVertical: wp(2),
    // backgroundColor: '#fff',
    marginBottom: hp(1),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#777',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 10,
  },
  box: {
    borderWidth: 0.6,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
  },
  imageCoin: {
    width: 30,
    height: 30,
    borderRadius: wp(50),
    marginEnd: wp(1),
    backgroundColor: '#eee',
    // borderWidth:0.5,
    // borderColor:'#ccc'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Add padding as needed
  },
  button: {
    flex: 1, // Equal width for both buttons
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
