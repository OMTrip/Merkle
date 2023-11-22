import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { testnet_token, v2RouterTokens } from '../../../../Utils/web3/config';
import {
  setSwapFromTokenSelection,
  setSwapToTokenSelection,
} from '../../../../Store/web3';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTokenBalances,
  getTokenDetails,
} from '../../../../Utils/web3/web3Functions';
import {cutAfterDecimal} from '../../../../Utils/web3/helperFunction';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setFromToken, setToToken } from '../../../../Store/V2RouterSlice';

const V2TokenList = props => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const {wallets, activeWallet, networks, swapFromToken, swapToToken} =
  useSelector(store => store.wallet);
  const wallet = wallets[activeWallet];
  // const [activeChain, setActiveChain] = useState({

  const [loading, setLoading] = useState(false);

  const {type} = props.route.params;
  const dispatch = useDispatch();

  const onChangeSearch = async query => {
    try {
      setLoading(true);
      if (query.startsWith('0x')) {
        // setProvider(activeChain.rpcUrl)
        var token = await getTokenDetails(query, wallet);
        token['balance'] = Number(token.balance) / 10 ** Number(token.decimals);

        setFilteredData([token, ...data]);
        setLoading(false);
      } else {
        setLoading(false);
        const filtered = filteredData.filter(it => {
          if (it.symbol?.toLowerCase()?.indexOf(query?.toLowerCase()) != -1) {
            return it;
          }
        });
        if (filtered.length > 0) {
          setFilteredData(filtered);
        } else {
          setFilteredData(data);
        }
        if (query.length == 0 || !query) {
          setFilteredData(data);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const selectorFunc =
    type == 'from' ? setFromToken : setToToken;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.tokenContainer}
        onPress={() => {
          // const net =[...networks]
          // // const data = net?.fliter((ele)=>{
          // //   return ele.chainId == item.chainId
          // // });
          // console.log(item.chainId,"networks",data)
          navigation.navigate('SwapScreen', {status: true});
          const it = {...item};
          it.logo = it?.logo
            ? it.logo
            : `https://res.cloudinary.com/dpe8nipmq/image/upload/v1695796476/nute/dummy/icons8-question-mark-64_tnsjd1.png`;
          if (
            !(type == 'from'
              ? it.token_address == swapToToken.token_address
              : it.token_address == swapFromToken.token_address)
          ) {
            dispatch(selectorFunc(it));
          }
        }}>
        <View style={styles.tokenDetails}>
          <Image
            source={{
              uri: item?.logo
                ? item.logo
                : `https://res.cloudinary.com/dpe8nipmq/image/upload/v1695796476/nute/dummy/icons8-question-mark-64_tnsjd1.png`,
            }}
            style={styles.tokenLogo}
          />
          <View>
            <Text style={styles.tokenSymbol}>{item.symbol}</Text>
            <Text style={styles.tokenName}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>
            {item?.balance ? cutAfterDecimal(item?.balance, 6) : 0}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const dt = Object.values(v2RouterTokens)?.map((ele, i) => ele);

    // setData(dt);
    (async () => {
      try {
        setLoading(true);
        // const toKenData = await fetchAssetData();
        // const updated = await getTokenBalances(dt, wallet);
        setData(dt);
        setFilteredData(dt);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

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
      style={{flex: 1, paddingHorizontal:wp(5)}}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color={'#000'}
            onPress={() => 
              navigation.navigate('SwapScreen', {status: true})
            }
          />
          <Text
            style={{
              color: '#000',
              fontSize: hp(2.2),
              fontWeight: '600',
              marginStart: wp(2),
            }}>
            Token List
          </Text>
        </View>
      </View>
      <View style={styles.searchheader}>
        <Ionicons name="search" size={15} color="#14b7af" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#666'}
          style={styles.searchinput}
          //  value={searchText}
          onChangeText={onChangeSearch}
        />
      </View>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          // value={searchQuery}
          style={{flex: 1, minWidth: '100%'}}
        /> */}
        {/* <TouchableOpacity
    style={{ flex: 1, minWidth: '15%', height: 50}}
    onPress={openChainSheet}>
    <Image
      resizeMode="contain"
      source={{
        uri: `https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${activeChain.nativeCurrency.slug}/logo.png`,
      }}
      style={{  width: 40, height: 40, borderRadius:50,margin:5}}
    />
  </TouchableOpacity> */}
      </View>

      <View>
        {loading ? (
          <ActivityIndicator
            size={25}
            color={'#14b7af'}
            style={{marginHorizontal: 5, marginVertical: wp(10)}}
          />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, i) => item.token_address + i}
            contentContainerStyle={styles.contentContainer}
          />
        )}
      </View>
      {/* <RBSheet
        ref={refChainSteet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={600}
        draggableIcon={false}
        openDuration={400}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            // justifyContent: 'space-between',
            padding: 10,
          }}>
          <ScrollView>
            <View style={styles.sheetContainer}>
              <View style={{alignItems: 'center', paddingBottom: wp(2)}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '600',
                    paddingHorizontal: 10,
                    marginBottom: wp(2),
                  }}>
                  Select Chain
                </Text>
              </View>

              {networks.map((item, i) => {
                return (
                  <TouchableOpacity
                    style={styles.tokenWrapper}
                    onPress={() => {
                      setActiveChain(item);
                      // setErrors({});
                      closeChainSheet();
                    }}
                    key={i + 'abc'}>
                    <View style={styles.tokenInfo}>
                      <Image
                        source={{
                          uri:
                            item?.slug &&
                            `https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item?.slug}/logo.png`,
                        }}
                        style={styles.flatImage}
                      />
                      <Text style={styles.tokenName}>{item.name}</Text>
                    </View>
                    {activeChain.chainId === item.chainId && (
                      <View>
                        <MaterialIcons
                          name="check"
                          size={18}
                          color={'#32CD32'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </RBSheet> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
    paddingHorizontal: wp(4),
  },
  header: {
    width: '100%',
    paddingVertical: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: wp(2), // Added horizontal padding
  },

  searchheader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    color: '#000',
    backgroundColor: '#f3f4f7',
    borderWidth: 0,
    paddingHorizontal: 10,
    marginBottom: wp(4),
    borderRadius: wp(3),
  },
  searchinput: {
    flex: 1,
    height: 40,
    color: '#000',
    fontSize: wp(3.5),
    paddingLeft:wp(2)
  },

  contentContainer: {
    paddingHorizontal: wp(2),
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(6),
  },
  tokenDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenLogo: {
    width: 35,
    height: 35,
    marginRight: 12,
    borderRadius: 50,
  },
  tokenSymbol: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#000',
  },
  tokenName: {
    fontSize: wp(3.2),
    color: '#444',
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 16,
  },
  sheetContainer: {
    flex: 1,
    // backgroundColor: '#eee',
    marginHorizontal: wp(3),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flatImage: {
    width: 30, // Adjust width to your preference
    height: 30,
    paddingRight: 20,
    marginRight: 10,
  },
  tokenWrapper: {
    paddingVertical: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
});

export default V2TokenList;
