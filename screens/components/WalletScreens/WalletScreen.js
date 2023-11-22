import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {ZERO_ADDRESS} from '../../../Utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Clipboard from '@react-native-clipboard/clipboard';
import HomeHeader from '../HomeScreen/HomeHeader';
import {Link, useNavigation} from '@react-navigation/native';
import CoinPatti from './CoinPatti';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import {setActiveWallet, setRefresh} from '../../../Store/web3';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const WalletScreen = () => {
  const {wallets, activeWallet, priceQuotes, networks, refresh} = useSelector(
    state => state.wallet,
  );
  const wallet = wallets[activeWallet];
  const [listarray, setlistarray] = useState([]);
  const [filteredlist, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [totalAssetsInDollar, setTotalAssetsInDollar] = useState(0); 
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showDeposite, setShowDeposite] = useState(true);
  const dispatch = useDispatch();
  function search(searchtext) {
    const issearch = !searchtext && searchtext.length == 0;
    const arr = !issearch
      ? listarray?.filter(
          it =>
            it?.symbol?.toLowerCase()?.indexOf(searchtext?.toLowerCase()) != -1,
        )
      : [];
    if (arr && arr.length > 0) {
      setFilteredList([...arr]);
    } else if (issearch) {
      var tokensarr = [];
      wallet.assets.map(it => {
        const obj = {
          ...it.nativeCurrency,
          native: true,
          balance: it.balance,
          show: it?.show,
          chainId: it.chainId,
          blockExplorerUrl: it.blockExplorerUrl,
          rpcUrl: it.rpcUrl,
        };
        let ar = [...it.tokens];
        // ar.forEach((token) => {
        //   const tok ={...token}
        //   tok.slug = it.nativeCurrency.slug;
        //   return tok;
        // });
        // console.log(ar,"arr")

        ar.push(obj);
        tokensarr = [...tokensarr, ...ar];
      });
      const narr = [];
      tokensarr.map((item, i) => {
        const it = priceQuotes.find(tok => {
          return tok.symbol.toLowerCase() === item.symbol.toLowerCase();
        });
        const itobj = {...it, ...item, index: i};
        narr.push(itobj);
      });
      // console.log(tokensarr.length, 'tokensarr');
      setlistarray([...narr]);
      setFilteredList([...narr]);
    } else {
      setFilteredList([]);
    }
    setSearchText(searchtext.toUpperCase());
  }
  // console.log(filteredlist,"filteredlist:::::")

  useEffect(() => {
    search('');
    // console.log(wallet.address, 'walletaddress');
  }, [activeWallet, wallets]);
  useEffect(() => {
    dispatch(setActiveWallet(activeWallet));
    dispatch(setRefresh(!refresh));
  }, []);

  useEffect(() => {
    if (listarray.length > 0) {
      const total = listarray.reduce((sum, item) => {
        const cp = item?.current_price ? item?.current_price : 0;
        const balance_in_usd = cp * item?.balance;
        sum = sum + balance_in_usd;
        return sum;
      }, 0);
      const t = total.toString().indexOf('.') > -1 ? total.toFixed(4) : total;
      setTotalAssetsInDollar(t);
    }
  }, [listarray]);

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
      style={{paddingBottom: wp(5), flex: 1}}>
      <View style={styles.Box}>
        <View
          style={{
            // backgroundColor: '#fff',
            color: '#000',
          }}>
          <HomeHeader
            imagePath={require('../../assets/app_logo.png')}
            iconscolor={'#000'}
            headerpadding={5}
            wallettab={true}
            activeTab="WalletScreen"
          />

          <View style={styles.header}>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
                paddingRight: wp(7),
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('importtoken')
                }></TouchableOpacity>
            </View>
            <View style={styles.BodyBoxTitle}>
              <Text style={styles.Icons}>$</Text>
              <Text style={styles.Icons}>{totalAssetsInDollar}</Text>
            </View>
            <View style={[styles.Icons2, {marginRight: 0, paddingBottom: 5}]}>
              <Text style={styles.BodyBoxText}>
                {wallets[activeWallet].name}
              </Text>
            </View>

            <View style={styles.optionsrow}>
              <TouchableOpacity
                style={styles.options}
                onPress={() => navigation.navigate('alltoken', {type: 'send'})}>
                <Ionicons
                  name="arrow-up"
                  size={20}
                  color={'#000'}
                  style={styles.optionsicon}
                />
                <Text style={styles.optext}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  navigation.navigate('alltoken', {type: 'recieve'})
                }>
                <Ionicons
                  name="arrow-down"
                  size={20}
                  color={'#000'}
                  style={styles.optionsicon}
                />
                <Text style={styles.optext}>Recieve</Text>
              </TouchableOpacity>
              <Link to="/BuyTokenlist">
                <View
                  style={styles.options}
                  // onPress={() => navigation.navigate('buytokenlist')}
                >
                  <AntDesign
                    name="wallet"
                    size={17}
                    color={'#000'}
                    style={styles.optionsicon}
                  />
                  <Text style={styles.optext}>Earn</Text>
                </View>
              </Link>
              <TouchableOpacity
                style={styles.options}
                onPress={() => navigation.navigate('alltoken', {type: 'buy'})}>
                <Ionicons
                  name="leaf-outline"
                  size={17}
                  color={'#000'}
                  style={styles.optionsicon}
                />
                <Text style={styles.optext}>Buy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.Body}>
              {/* <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="#ccc"
              value={searchText}
              onChangeText={val => search(val)}
            /> */}
              {/* <View style={styles.Dropdown}>
              <Text style={{color: '#444'}}>All</Text>
              <MaterialCommunityIcons
                name={'chevron-down'}
                size={wp(5)}
                style={{marginTop: hp(0.5), color: '#444'}}
              />
            </View> */}
            </View>
          </View>
        </View>

        <View style={styles.tabcont}>
          <View style={styles.tabcontent}>
            <TouchableOpacity
              onPress={() => [setShow(false), setShowDeposite(true)]}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: showDeposite == true ? '#fff' : '#f4eefe',
                  // borderColor: showDeposite == true ? '#dcc8fe' : '#dcc8fe',
                  // borderWidth: 0.5,
                  color: show == true ? '#000' : '#444',
                  textAlign: 'center',
                  padding: 5,
                  fontWeight: '600',
                  width: wp(45),
                  borderRadius: 5,
                  fontSize: wp(3.5),
                }}>
                Coins
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [setShow(true), setShowDeposite(false)]}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: show == true ? '#fff' : '#f4eefe',
                  // borderColor: showDeposite == true ? '#dcc8fe' : '#dcc8fe',
                  // borderWidth: 0.5,
                  textAlign: 'center',
                  color: show == true ? '#000' : '#000',
                  padding: 5,
                  fontWeight: '600',
                  width: wp(46),
                  borderRadius: 5,
                  fontSize: wp(3.5),
                }}>
                NFTs
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.tabbody}>
            <FlatList
              data={filteredlist}
              renderItem={({item}) => {
                //  console.log('sgjhsgdjhsg', item);
                const istoken =
                  item?.token_address != ZERO_ADDRESS && item?.token_address
                    ? true
                    : false;
                if (item?.show) {
                  return <CoinPatti item={item} route={'token'} />;
                } else {
                  return null;
                }
              }}
              keyExtractor={item => {
                return item?.index + '_' + item?.id;
              }}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.addTokenWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Link
                  to="/AlltokenList"
                  style={styles.addTokenBtn}
                  //onPress={() => navigation.navigate('importtoken')}
                  //onPress={() => alltoken()}
                >
                  <AntDesign
                    name="plus"
                    size={12}
                    style={{color: '#444', fontWeight: '600',marginEnd: 10}}
                  />
                  <Text style={{color: '#444', fontSize: 12, }}>
                    Add Token
                  </Text>
                </Link>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    margin: wp(5),
  },
  nextbuttonText: {
    color: 'white',
    fontSize: wp(4),
    textAlign: 'center',
  },

  Box: {
    // flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },

  BodyBoxTitle: {
    flexDirection: 'row',
  },
  BodyBoxText: {
    fontWeight: 'normal',
    color: '#999',
    marginBottom: 10,
  },
  Icons: {
    fontSize: wp(7),
    color: '#000',
    fontWeight: '600',
  },
  IconBTC: {
    fontSize: wp(5),
    color: '#444',
  },
  Body: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 0.4,
    borderColor: '#666',
    borderRadius: 5,
    color: '#444',
    paddingLeft: 10,
  },
  Dropdown: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: '#444',
    borderRadius: wp(1),
    height: 40,
    marginLeft: 10,
  },
  ThreeDots: {
    marginRight: wp(2),
  },
  tabcont: {
    // flex: 1,
    // backgroundColor:'#fff',
    paddingVertical: wp(2),
  },
  tabhead: {
    width: '100%',
    height: hp(5),
    justifyContent: 'flex-end',
  },
  tab: {
    color: '#0f0f0f',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  tabtext: {
    color: 'rgba(23, 23, 23,0.72)',
    borderRadius: 5,
    paddingVertical: 3,
  },

  tabcontent: {
    marginHorizontal: wp(4),
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: '#f4eefe',
    borderWidth:0.3,
    borderColor:'#dcc8fe',
    paddingVertical: 2,
    paddingHorizontal: 2,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    // elevation: 2,
    // elevation:1
    // marginBottom: 10,
  },

  tabbody: {
    paddingHorizontal: 10,
    // backgroundColor: '#000',

    maxHeight: wp(115),
  },

  MainContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  CradRightSide: {
    marginRight: wp(2),
    color: '#444',
  },
  CradRightText: {
    color: '#444',
    textAlign: 'right',
  },
  header1: {
    height: hp(7),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  Icons1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icons2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text: {
    fontSize: wp(4),
    fontWeight: '400',
    color: '#333',
  },
  Headings: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  HeadingTitle: {
    color: 'grey',
    fontSize: wp(6),
    fontWeight: '500',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: wp(0.5),
    borderBottomLeftRadius: wp(30),
    borderBottomRightRadius: wp(30),
  },
  optionsrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    paddingVertical: 5,
  },
  optionsicon: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#fff',
    borderRadius: 6,
    height: hp(5.5),
    width: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#000',
    // backgroundColor: 'rgba(250,250,250,1)',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    lineHeight: hp(5),
    textAlign: 'center',
  },
  optext: {
    color: '#444',
    fontSize: hp(1.7),
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 5,
  },

  addTokenWrapper: {
    // backgroundColor: '#444',
    paddingVertical: wp(2),
    height: 50,
  },
  addTokenBtn: {
    color: '#444',
    paddingHorizontal: wp(4),
    paddingVertical:wp(2),
    fontSize: 15,
    borderWidth: 0.5,
    backgroundColor:'#fff',
    borderColor: '#dcc8fe',
    width: '32%',
    // alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default WalletScreen;
