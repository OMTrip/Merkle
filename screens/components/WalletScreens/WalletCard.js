import react, {memo, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {ZERO_ADDRESS} from '../../../Utils/constants';
import {getTokenIcon} from '../../../Utils/tokenIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import HomeHeader from '../HomeScreen/HomeHeader';
const coinimg = require('../../assets/no_image.jpeg');

const CoinCard = memo(({item}) => {
  const cp = item?.current_price ? item?.current_price : 0;
  const balance_in_usd = cp * item?.balance;
  const pricechange = item?.price_change_percentage_24h ? item?.price_change_percentage_24h : 0;
  const symbol = item.slug == 'bsc_testnet' ? 'T' + item.symbol : item.symbol;
  const renderimage = item => {
    return (
      <View>
        <Image
          style={{
            width: 28,
            height: 28,
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 1,
            borderRadius: 12,
          }}
          source={item?.token_address ? getTokenIcon(item?.chainId).url : ''}
        />
        <Image
          // style={{width: 50, height: 50, borderRadius: 30}}
          style={styles.cardImage}
          source={item?.image ? {uri: item?.image} : coinimg}
        />
      </View>
    );
  };
  return (
    <View
      // colors={['#0d330e', '#0d330e']}
      // start={{x: 0, y: 0.008}} // Start point of the gradient (top-left)
      // end={{x: 1, y: 0.8}} // End point of the gradient (top-right)
      style={styles.card}>
      {item?.token_address ? (
        renderimage(item)
      ) : (
        <Image
          source={item?.image ? {uri: item?.image} : coinimg}
          style={styles.cardImage}
        />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{symbol?.toUpperCase()}</Text>
        <View style={styles.innercardContent}>
          <Text style={styles.cardText}>
            ${cp?.toString()?.indexOf('.') > -1 ? cp?.toFixed(2) : cp}
          </Text>
          <Text
            style={[
              styles.cardText,
              {marginLeft: wp(3), color: pricechange > 0 ? '#5f2' : '#f52'},
            ]}>
            {pricechange?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.CradRightText}>
        <Text style={styles.CradRightText}>{item?.balance}</Text>
        <Text style={styles.CradRightText}>
          $
          {balance_in_usd?.toString()?.indexOf('.') > -1
            ? balance_in_usd?.toFixed(4)
            : balance_in_usd}
        </Text>
      </View>
    </View>
  );
});

const WalletCard = () => {
  const {wallets, activeWallet, networks, priceQuotes} = useSelector(
    state => state.wallet,
  );
  const navigation = useNavigation();
  const wallet = wallets[activeWallet];
  const [listarray, setlistarray] = useState([]);
  const [filteredlist, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [totalAssetsInDollar, setTotalAssetsInDollar] = useState(0);

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
        };
        const ar = [...it.tokens];
        ar.push(obj);
        tokensarr = [...tokensarr, ...ar];
      });
      const narr = [];
      tokensarr.map((item, i) => {
        const it = priceQuotes.find(
          tok => tok.symbol.toLowerCase() === item.symbol.toLowerCase(),
        );
        const itobj = {...it, ...item, index: i};
        narr.push(itobj);
      });
      console.log(tokensarr.length, 'tokensarr');
      setlistarray([...narr]);
      setFilteredList([...narr]);
    } else {
      setFilteredList([]);
    }
    setSearchText(searchtext.toUpperCase());
  }

  useEffect(() => {
    search('');
    console.log(wallet.address, 'walletaddress');
  }, [activeWallet, wallets]);

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
    <View style={styles.Box}>
      <View
        // colors={['#0d330e', '#0d330e', '#0d330e', '#0d330e']}
        // start={{x: 1, y: 0.002}} // Start point of the gradient (top-left)
        // end={{x: 0.002, y: 1}} // End point of the gradient (top-right)
        style={{
          marginHorizontal: 0,
          borderTopLeftRadius: 0,
          borderBottomRightRadius: 525,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          // marginVertical: 1,
          paddingVertical: 10,
          backgroundColor: 'rgba(13,51,14,0.2)',
        }}>
        {/* <View style={styles.header1}>
          <TouchableOpacity
            style={styles.Icons2}
            onPress={() => navigation.navigate('networks')}>
            <Text style={styles.Text}>Networks</Text>
            <MaterialCommunityIcons
              name={'chevron-down'}
              size={wp(5)}
              style={{marginTop: hp(0.5), color: '#fff'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.Icons2, {marginRight: 0}]}
            onPress={() => navigation.navigate('wallets')}>
            <Ionicons
              name={'wallet'}
              size={wp(5)}
              style={{marginTop: hp(0.5), color: '#fff'}}
            />
            <Text style={styles.Text}>{wallets[activeWallet].name}</Text>
            <MaterialCommunityIcons
              name={'chevron-down'}
              size={wp(5)}
              style={{marginTop: hp(0.5), color: '#fff'}}
            />
          </TouchableOpacity>
          <View>
            <MaterialCommunityIcons
              name={'line-scan'}
              size={wp(5)}
              style={{color: '#fff'}}
            />
          </View>
        </View> */}
        <HomeHeader imagePath={require('../../assets/app_logo.png')} />
        <View style={styles.header}>
          <View
            style={{
              paddingBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{color: 'white', paddingHorizontal: 5}}
              onPress={() => {
                Clipboard.setString(wallet.address);
              }}>
              {wallet.address.slice(0, 8) + '...' + wallet.address.slice(-8)}
            </Text>
            <Ionicons
              name="copy"
              color="#fff"
              onPress={() => {
                Clipboard.setString(wallet.address);
              }}
            />
          </View>
          <View style={styles.BodyBoxTitle}>
            <Text style={styles.BodyBoxText}>Balance</Text>
            {/* <MaterialCommunityIcons
              name={'line-scan'}
              size={wp(4)}
              style={{marginLeft: wp(2), color: 'white'}}
            /> */}
          </View>
          <View style={styles.BodyBoxTitle}>
            <Text style={styles.Icons}>$</Text>
            <Text style={styles.Icons}>{totalAssetsInDollar}</Text>
          </View>
          {/* <View style={styles.BodyBoxTitle}>
            <Text style={styles.IconBTC}>0</Text>
            <Text style={[styles.IconBTC, {marginLeft: wp(2)}]}>BTC</Text>
          </View> */}
        </View>
        <View style={styles.Body}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#fff"
            // rightIcon={()=>
            //   <MaterialCommunityIcons
            //     name="magnify"
            //     size={29}
            //     color="#fff"
            //     style={{marginRight: 10}}
            //   />
            // }
            value={searchText}
            onChangeText={val => search(val)}
          />
          <View style={styles.Dropdown}>
            <Text style={{color: '#fff'}}>All</Text>
            <MaterialCommunityIcons
              name={'chevron-down'}
              size={wp(5)}
              style={{marginTop: hp(0.5), color: '#fff'}}
            />
          </View>
          {/* <View style={[styles.Dropdown, {marginLeft: wp(1.7)}]}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={wp(6)}
            color="black"
            style={styles.ThreeDots}
          />
        </View> */}
        </View>
      </View>
      <View
        // colors={['#006930', '#0d330e', '#0d330e', '#006930']}
        // start={{x: 0.008, y: 1}} // Start point of the gradient (top-left)
        // end={{x: 0.002, y: 0.007}} // End point of the gradient (top-right)
        style={{
          marginHorizontal: 0,
          borderTopLeftRadius: 400,
          borderBottomRightRadius: 5,
          borderTopRightRadius: 4,
          borderBottomLeftRadius: 4,
          // marginVertical: 1,
          paddingVertical: 10,
          flex: 1,
          backgroundColor: 'rgba(13,51,14,0.2)',
        }}>
        <View
          style={{
            width: '100%',
            // backgroundColor: '#fff',
            height: hp(5),
            justifyContent: 'flex-end',
            // marginTop: 15,
          }}>
          <View
            style={{
              color: '#0f0f0f',
              // backgroundColor: '#d7d9db',
              height: '100%',
              width: '100%',
              textAlign: 'center',
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'rgba(273, 273, 273,0.72)',
                borderBottomWidth: 3,
                borderBottomColor: 'rgba(273, 273, 273,0.72)',
                borderRadius: 5,
                paddingVertical: 3,
              }}>
              Tokens
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.88,
            paddingHorizontal: 10,
            // backgroundColor: '#d7d9db',
          }}>
          <FlatList
            data={filteredlist}
            renderItem={({item}) => {
              const istoken =
                item?.token_address != ZERO_ADDRESS && item?.token_address
                  ? true
                  : false;
              if (item?.show || istoken) {
                return <CoinCard item={item} />;
              } else {
                return null;
              }
            }}
            keyExtractor={item => {
              return item?.index + '_' + item?.id;
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Box: {
    flex: 1,
    backgroundColor: '#006930',
  },
  header: {
    marginTop: hp(2.5),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  BodyBoxTitle: {
    flexDirection: 'row',
  },
  BodyBoxText: {
    fontWeight: '400',
    color: 'white',
  },
  Icons: {
    fontSize: wp(7),
    color: 'white',
  },
  IconBTC: {
    fontSize: wp(5),
    color: 'white',
  },
  Body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: 10,
  },
  input: {
    flex: 0.9,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 5,
    color: '#fff',
    paddingLeft: 10, // Adjust the padding to position the text inside the TextInput
  },
  Dropdown: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: wp(1),
    height: 40,
    marginLeft: 10,
  },
  ThreeDots: {
    marginRight: wp(2),
  },

  card: {
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(2),
    marginBottom: hp(0),
    backgroundColor: 'rgba(273, 273, 273,0.12)',
    borderRadius: wp(2),
    paddingVertical: 10,
  },
  cardImage: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(4),
    borderRadius: wp(10),
  },
  cardContent: {
    flex: 1,
  },
  innercardContent: {
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: wp(3.5),
    fontWeight: '700',
    marginBottom: hp(1),
    color: '#fff',
  },
  cardText: {
    fontSize: wp(4),
    color: '#fff',
  },
  MainContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  CradRightSide: {
    marginRight: wp(2),
    color: '#fff',
  },
  CradRightText: {
    color: '#fff',
    textAlign: 'right',
  },
  header1: {
    height: hp(7),
    // width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    // backgroundColor: '#e8eaed',
  },
  Icons1: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: hp(2.5),
  },
  Icons2: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: wp(16),
    // marginTop: hp(2.5),
  },
  Text: {
    fontSize: wp(4),
    fontWeight: '400',
    color: '#fff',
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
    marginTop: wp(1),
    borderBottomColor: 'grey',
    borderBottomWidth: wp(0.5),
    borderBottomLeftRadius: wp(30),
    borderBottomRightRadius: wp(30),
  },
});

export default WalletCard;
