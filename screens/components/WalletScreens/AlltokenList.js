import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Switch as RNSwitch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useSelector,useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateNetworks, updateToken, updateWallets } from '../../../Store/web3';
import { coingecko_getChain } from '../../../Services/moralis';
import { fetchAllCryptos, fetchAssetData, fetchChainData, fetchTokenPrice } from '../../../Utils/apis/api';
import AllTokenListCard from './AllTokenListCard';


const AlltokenList = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [switchStates, setSwitchStates] = useState([]);
  const [filteredSwitchStates, setFilteredSwitchStates] = useState([]);
  const {wallets, activeWallet, priceQuotes, allToken,networks} = useSelector(
    state => state.wallet,
  );
  const wallet = wallets[activeWallet];
  const [listarray, setlistarray] = useState([]);
  const [filteredlist, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {type, qr, address} = props.route.params;
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();

  // const toggleSwitch = () => {
  //   setIsEnabled(previousState => !previousState);
  // };

  // const {activeTab} = props;

  // useEffect(() => {
  //   search('');
  // }, [activeWallet, wallets]);

  

  const toggleSwitch = async(index) => {
    try {
      
    
    const chainIdToUpdate = {...filteredlist[index]};

    // const updatedSwitchState = filteredSwitchStates.map(item => {
    //   if (item.index === index) {
    //     return {...item, status: item.status == false ? true : false};
    //   }
    //   return item;
    // });
    
    
    // setFilteredSwitchStates(updatedSwitchState);
    const flag = filteredSwitchStates[index].status?false:true;
    const updatedFilteredSwitchStates = [...filteredSwitchStates];
    updatedFilteredSwitchStates[index].status = flag;
    setFilteredSwitchStates(updatedFilteredSwitchStates);

    if(chainIdToUpdate.type=="token"){
    
    const tok = {...filteredlist[index]}

    const usd=await fetchTokenPrice(tok.symbol);
    

    tok.show = flag
    tok['usd_price']=usd
    const assets = [...wallet.assets];
    const myasset = assets?.find(it => it?.chainId == tok?.chainId);
    if (
      myasset?.tokens?.find(token => token?.token_address === tok.token_address)
    ) {
      var warr = [...wallets];
      var aw = {...warr[activeWallet]};
      var aws = [...aw.assets];
      var aasset = {...aws?.find(it => it.chainId == tok.chainId)};
      var check = aasset.tokens
      const c = check.map((ele)=>{
        const obj ={...ele}
        if(ele.token_address.toLowerCase() == tok.token_address.toLowerCase()){
          obj.show=flag
          return obj
        }
        return obj   
      })
      check =  c;
      aasset['tokens'] = check;
      var ind = aws.findIndex(it => it.chainId == tok.chainId);
      aws[ind] = {...aasset};
      aw.assets = [...aws];
      warr[activeWallet] = {...aw};
      dispatch(updateWallets([...warr]));

      return;
    }
   
    
    var warr = [...wallets];
    var aw = {...warr[activeWallet]};
    var aws = [...aw.assets];
    var aasset = {...aws?.find(it => it.chainId == tok.chainId)};
    var ind = aws.findIndex(it => it.chainId == tok.chainId);
    var tarr = [...aasset.tokens];
    tarr.push({...tok});
    aasset.tokens = [...tarr];
    aws[ind] = {...aasset};
    aw.assets = [...aws];
    warr[activeWallet] = {...aw};
    dispatch(updateWallets([...warr]));
    

  }else{
    var coin = {...filteredlist[index]}
    coin.show = flag;

    const assets = [...wallet.assets];
    const mychain = assets?.find(it => it?.chainId == coin?.chainId);

if(mychain){

    var warr = [...wallets];
    var aw = {...warr[activeWallet]};
    var aws = [...aw.assets];
    var upnw = aws?.map((ele,i)=>{
      const obj =  {...ele}
      if(ele?.chainId?.toLowerCase()==coin?.chainId?.toLowerCase()){
        obj.show=flag
        return obj;
      }
      // else{
      //   if(aws.length-1 ==i){
      //     return coin
      //   }
      // }
     
      return obj; 
    });

    aws= upnw;
    aw.assets = [...aws];
    warr[activeWallet] = {...aw};
    dispatch(updateWallets([...warr]));
    // dispatch(updateNetworks([...upnw]))
    return
  }
  var warr = [...wallets];
  var aw = {...warr[activeWallet]};
  var aws = [...aw.assets];
  
  aws.push({...coin})
  aw.assets = [...aws];
  warr[activeWallet] = {...aw};
  dispatch(updateWallets([...warr]));
  }
} catch (error) {
     console.log(error,"errro") 
}
  };

  const renderItem = ({item, index}) => {
    // if (!switchStates.some(state => state.index === index)) {
    //   const newSwitchState = {index: index, status: item.show};
    //   setSwitchStates([newSwitchState, ...switchStates]);
    // console.log(item,"::item")

    // }
    return (
      // <View style={styles.tokenWrapper}>
      //   <View style={styles.tokenInfo}>
      //     <View>
      //       <Image source={{uri: item.logo?item.logo:`https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png`}}
      //        style={styles.imageCoin} />
      //     </View>
      //     <View>
      //       <Text style={styles.tokenName}>{item?.type=="coin"?item?.nativeCurrency?.symbol:item.symbol}</Text>
      //       <Text style={styles.subtoken}>{item?.type=="coin"?item?.nativeCurrency?.name:item?.name}</Text>
      //     </View>
      //   </View>
      //   <View>
      //     <RNSwitch
      //       trackColor={{false: '#767577', true: '#ccc'}}
      //       thumbColor={switchStates[index]?.status ? '#25d366' : '#f4f3f4'}
      //       ios_backgroundColor="#3e3e3e"
      //       onValueChange={() => {
      //         toggleSwitch(index);
      //       }}
      //       value={switchStates[index]?.status}
      //     />
      //   </View>
      // </View>
      <AllTokenListCard item={item} index = {index} switchStates={filteredSwitchStates} setSwitchStates={setSwitchStates} toggleSwitch={()=>toggleSwitch(index)}/>
    );
  };

  function search(searchtext) {
    // setSwitchStates([]);
    const issearch = !searchtext && searchtext.length == 0;
    const arr = !issearch
      ? list?.filter(
          (it) =>{
            if(it.type=="coin"){
            if(it?.nativeCurrency.symbol?.toLowerCase()?.indexOf(searchtext?.toLowerCase()) != -1 ){
              return it
            }
          }else{
            if(it?.symbol?.toLowerCase()?.indexOf(searchtext?.toLowerCase()) != -1 ){
              return it
            }
          }
          }
        )
      : [];
    if (arr && arr.length > 0) {
      setFilteredList([...arr]);
      const largeList = Array.from({ length: arr.length }, (_, index) => ({
        index:index,
        status: arr[index]?.show || false,
      }));
     
      setFilteredSwitchStates([...largeList])
    } 
    
    else {
      setFilteredList(list);
      const largeList = Array.from({ length: list.length }, (_, index) => ({
        index:index,
        status: list[index]?.show || false,
      }));
      setSwitchStates([...largeList])
      setFilteredSwitchStates([...largeList])
    }
     setSearchText(searchtext.toUpperCase());
  }

  async function fetchInitialDetails(){
    setSearchText("")
    try {
    setReload(true);
    const chainData =  await fetchChainData();
    const toKenData = await fetchAssetData();
    const cData = chainData?.map(ele=>{
      const obj = {...ele}
      obj.type = 'coin'
      const asst = [...wallet.assets];
    const myasset = asst?.some(it => it?.chainId == obj?.chainId && it.show);
    if(myasset){
      obj.show = true;
      return obj
    }else{
      obj.show = false;
      return obj
    }
    });
  
   const tData = toKenData?.map((ele,i)=>{
    const obj = {...ele}
    obj.type = 'token'

    const asst = [...wallet.assets];
    const myasset = asst?.find(it => it?.chainId == obj?.chainId);
   const tkn = myasset?.tokens?.find(token => token?.token_address === obj.token_address && token.show);
    if(tkn){
      obj.show = true;
      return obj;
    }else{
      obj.show = false;
      return obj

    }
   
      
    });

  
    const combinedList = [...cData,...tData];
    const largeList = Array.from({ length: combinedList.length }, (_, index) => ({
      index:index,
      status: combinedList[index]?.show || false,
    }));
    setSwitchStates([...largeList])
    setFilteredSwitchStates([...largeList])

    setList(combinedList);
    setFilteredList(combinedList)
    setReload(false);
    
  } catch (error) {
    console.log(error,"err::token::fetching::")
    setList([]);
    setFilteredList([])
    setReload(false);
  }
  


  }

 
  useEffect(() => {
    fetchInitialDetails()

//    const nt =  wallet?.assets?.map((ele)=>{
//     const obj ={...ele};
//     obj.type = "coin";
//       return obj
//    });
//    const tkn =  allToken?.map((ele)=>{
//     const obj ={...ele};
//     obj.type = "token";
//       return obj
//  });
//  const combinedList = [...nt, ...tkn];
//     setList(combinedList);
  }, []);

  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
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
          All Tokens
        </Text>

        <Entypo
          name="plus"
          size={22}
          style={{color: '#000', fontWeight: '400'}}
          onPress={() => navigation.navigate('importtoken',{qr:false,address:""})}
          //onPress={() => alltoken()}
        />
      </View>
      <View style={styles.searchheader}>
        <Ionicons name="search" size={15} color="#999" />

        <TextInput
          placeholder="Search"
          placeholderTextColor={'#999'}
          style={styles.searchinput}
          //  value={searchText}
          onChangeText={val => search(val)}
        />
      </View>

      <View style={styles.tabbody}>
     
        <FlatList
          data={filteredlist}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, i) => i + item.chainId}
          refreshing={reload}
          onRefresh={() => {
            setReload(true);
             fetchInitialDetails();
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                    fontSize: 18,
                    color: '#000',
                  }}>
                  {reload==false?"No Token Found.":""}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: .85,
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:hp(5)
  },

  searchheader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    color: '#000',
    backgroundColor: '#eee',
    borderWidth: 0,
    paddingHorizontal: 10,
    marginBottom: wp(4),
    borderRadius: wp(3),
  },
  searchinput: {
    flex: 1,
    height: 40,
    color: '#000',
    fontSize: wp(3.3),
  },
  tokenWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: wp(4),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCoin: {
    width: 40,
    height: 40,
    borderRadius: wp(50),
    marginEnd: wp(1),
    backgroundColor:'#eee',
    // borderWidth:0.5,
    // borderColor:'#ccc'
  },

  tokenName: {
    color: '#000',
    fontSize: hp(2),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  subtoken: {
    color: '#888',
    fontSize: hp(1.5),
  },
});

export default AlltokenList;
