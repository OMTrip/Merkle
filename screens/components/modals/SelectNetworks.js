import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch} from 'react-native-paper';
import {setSelectChain, updateWallets} from '../../../Store/web3';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { fetchChainData } from '../../../Utils/apis/api';

const SelectNetworksNew = () => {
  const {networks, wallets, activeWallet,priceQuotes,selectChain} = useSelector(state => state.wallet);
  const [networklist, setnetworklist] = useState([]);
  const[status,setStatus] = useState({index:0})
  const mynetwork = wallets[activeWallet].assets;
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const[networkData,setNetworkData] = useState([]);
  const wallet = wallets[activeWallet]

  // console.log(priceQuotes,"priceQuotes")
  const NETWORK = {
    chainId: '0x38',
    balance: '0',
    tokens: [],
    nfts: [],
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      address: '0x0000000000000000000000000000000000000000',
      slug: 'bsc',
    },
    show: true,
  };
  // console.log(networklist,"networklist::::",networks,"network:::",wallets)
  useEffect(() => {
    
    //  console.log(mynetwork, mynetwork.length,"  inuseefff")
    const arr = networks.map((network, i) => {
      // console.log(network.nativeCurrency.symbol,"networksss")
    
      
      const obj = {...network};

      const img = priceQuotes.find((ele,i)=>{
        return ele.symbol.toLowerCase()==obj.nativeCurrency.symbol.toLowerCase()
      });
      console.log(img,"img")
      if(img){
        obj.image=img.image
      }

      
      const exist = mynetwork.find(it => it.chainId == obj.chainId);
      if (exist?.show) {
        obj.enabled = true;
      } else {
        obj.enabled = false;
      }
      return {...obj};
    });
    console.log(arr,"arr")
    setnetworklist([...arr]);
    // console.log('networks useeff recalled')
  }, [wallets]);

  function enableNetwork(item) {
    const warr = [...wallets];
    const exist = mynetwork.find(it => it.chainId == item.chainId);
    const net = exist ? {...exist} : undefined;
    if (net) {
      if (net.show) {
        net.show = false;
      } else {
        net.show = true;
      }
    }
    const arr = [...mynetwork];
    const obj = net ? {...net} : {...NETWORK};
    if (!net) {
      const nobj = {...obj.nativeCurrency};
      obj.chainId = item.chainId;
      nobj.slug = item.slug;
      nobj.name = item.nativeCurrency.name;
      nobj.symbol = item.nativeCurrency.symbol;
      obj.nativeCurrency = {...nobj};
    }
    const ind = mynetwork.findIndex(it => it.chainId == item.chainId);
    const i = ind > -1 ? ind : arr.length;
    arr[i] = {...obj};
    const walletobj = {...wallets[activeWallet]};
    walletobj.assets = [...arr];
    warr[activeWallet] = {...walletobj};
    // console.log(walletobj.assets.length,obj,'  updatedussets');
    dispatch(updateWallets([...warr]));
  }
  function selectedNetwork(network){
    const assets = [...wallet.assets];
    const mychain = assets?.find(it => it?.chainId == network?.chainId);

    if(!mychain){
      var warr = [...wallets];
      var aw = {...warr[activeWallet]};
      var aws = [...aw.assets];
      
      aws.push({...network})
      aw.assets = [...aws];
      warr[activeWallet] = {...aw};
      dispatch(updateWallets([...warr]));
      dispatch(setSelectChain(network)); 
      navigation.navigate("importtoken",{qr:false}) 
      return
    }
    dispatch(setSelectChain(network)); 
    navigation.navigate("importtoken",{qr:false}) 
  }

  useEffect(()=>{
    (async()=>{
      try {
     const data =  await fetchChainData();
     console.log(data,"data")
     setNetworkData(data);
    } catch (error) {
      console.log(error,"data")
      setNetworkData([])
    }
     
    })
  ()

  },[])

  return (
    <View style={styles.container}>
      <View style={styles.NetworkCard}>
        {networkData &&
          networkData?.map((network, index) => {
            return (
              <TouchableWithoutFeedback key={index + 'network'} onPress={()=>{setStatus({index:index}); selectedNetwork(network)}}>
              <View style={styles.wallet_patti}  >
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:0}}>
                  <View style={styles.imageChain}>
                    <Image
                      // source={{uri:`https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${network.slug}/logo.png`}}
                      source={{uri:`https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/Chains-main/Chains-main/resources/${network.slug}/logo.png`}}
                      style={{width: 26, height: 26, borderRadius: wp(50)}}
                    />
                  </View>
                  <View
                    style={ styles.chainName}>
                    <Text
                      style={styles.chaintxt}>
                      {network?.name}
                    </Text>

                    <View>
                 {network.chainId==selectChain.chainId && 
                 <AntDesign
                  style={{marginEnd:wp(4),paddingTop:wp(0.5)}}
                  name="check"
                  size={19}
                  color={'#00781a'}
                  // onPress={() => props.navigation.goBack()}
                />
               } 
                  </View>
                  </View>

                 

                  {/* <Text
                  style={{color: '#444', fontSize: hp(1.5), fontWeight: '600'}}>
                  Type: {network.mainnet ? 'Mainnet' : 'Testnet'}
                </Text> */}
                </View>
                {/* <Switch
                value={network.enabled}
                onChange={() => enableNetwork(network)}
                color="#444"
              /> */}
              </View>
              </TouchableWithoutFeedback>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f7',
    alignItems: 'center',
  },

  NetworkCard: {
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: hp(2),
    marginVertical: hp(0.5),
    color: '#444',
    borderRadius: 6,
    width: '90%',
    flex: 1,
    marginHorizontal: wp(20),
  },
  imageChain:{   
    paddingHorizontal: 15,
    paddingVertical: wp(2),    
  },
  
  chainName: {
    paddingStart: wp(1),
    borderBottomWidth: 0.187,
    borderBottomColor: '#ccc',
    flex: 1,    
    paddingVertical:wp(2),
    flexDirection:'row',
    justifyContent:'space-between'
   
  },
  chaintxt:{
    color: '#000',
    lineHeight:25,
    fontSize:wp(3.6)
  }
});

export default SelectNetworksNew;
