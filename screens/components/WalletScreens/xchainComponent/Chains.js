import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {testnet_token} from '../../../../Utils/web3/config';
import {
  setSwapFromTokenSelection,
  setSwapToTokenSelection,
} from '../../../../Store/web3';
import {useDispatch, useSelector} from 'react-redux';
import {Searchbar} from 'react-native-paper';
import {
  getTokenBalances,
  getTokenDetails,
} from '../../../../Utils/web3/web3Functions';
import {cutAfterDecimal} from '../../../../Utils/web3/helperFunction';
import {getAllChain} from '../../../../Utils/apis/xchainApi';
import {setXChainFrom, setXChainTo} from '../../../../Store/xchainSlice';

const Chains = props => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const {wallets, activeWallet, networks} = useSelector(store => store.wallet);
  const wallet = wallets[activeWallet];
  const {xchains, xpair} = useSelector(state => state.xchain);
  const {type, chainData} = props?.route?.params;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log(props?.route?.params,"type")

  const setChain =
    props?.route?.params['type'] == 'to' ? setXChainTo : setXChainFrom;

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
  // const selectorFunc =
  //   type == 'from' ? setSwapFromTokenSelection : setSwapToTokenSelection;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.tokenContainer}
        onPress={() => {
          const it = {...item};
          it.logo = item?.slug
            ? `https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png`
            : `https://res.cloudinary.com/dpe8nipmq/image/upload/v1695796476/nute/dummy/icons8-question-mark-64_tnsjd1.png`;

          navigation.navigate('Xchain', {item: it, status: true, type: type});
          dispatch(setChain(it));
        }}>
        <View style={styles.tokenDetails}>
          <Image
            source={{
              uri: item?.slug
                ? `https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png`
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
          <Text style={styles.balance}>{item.balance ? item.balance : 0}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const chains = await getAllChain();
        const updatedChain = networks?.map((ele, i) => {
          const elem = {...ele};
          const ch = chains.data.find((ite, index) => {
            return (
              elem.nativeCurrency.symbol.toLowerCase() ===
              ite.symbol.toLowerCase()
            );
          });
          if (ch) {
           
            ch['slug'] = elem.nativeCurrency.slug;

            return ch;
          }
          return null;
        });

        const uniqueSet = new Set();

        const upd = updatedChain?.filter(dat => {
          if (dat) {
            if (chainData.routerContract) {
              if (dat.routerContract !== chainData.routerContract) {
                if (!uniqueSet.has(JSON.stringify(dat))) {
                  uniqueSet.add(JSON.stringify(dat));
                  return dat;
                }
              }
            } else {
              if (!uniqueSet.has(JSON.stringify(dat))) {
                uniqueSet.add(JSON.stringify(dat));
                return dat;
              }
            }
          }
        });
        setData(upd);
        setFilteredData(upd);
        setLoading(false);

        // setLoading(true);
        // // const toKenData = await fetchAssetData();
        // const updated = await getTokenBalances(dt, wallet);
        // setData(updated);
        // setFilteredData(updated);
        // setLoading(false);
      } catch (error) {
        console.log(error, 'error');
        setLoading(false);

        // setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="arrow-back-ios"
            size={18}
            color={'#444'}
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text style={{color: '#000', fontSize: hp(2), fontWeight: '600'}}>
          Chain List
        </Text>

        <Text style={{color: '#444', fontSize: hp(2)}}></Text>
      </View>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          // value={searchQuery}
          style={{flex: 1, minWidth: '100%'}}
        />
      </View>

      <View>
        {loading ? (
          <ActivityIndicator
            size={20}
            color={'#000'}
            style={{marginHorizontal: 5}}
          />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, i) => i + 'abc'}
            contentContainerStyle={styles.contentContainer}
          />
        )}
      </View>
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
    paddingHorizontal: wp(2), // Added horizontal padding
  },
  contentContainer: {
    paddingHorizontal: wp(2), // Added horizontal padding
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  tokenName: {
    fontSize: 16,
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
  tokenName: {
    color: '#000',
    fontSize: hp(2),
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

export default Chains;
