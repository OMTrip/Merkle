import {View, StyleSheet, Text, TextInput, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {ZERO_ADDRESS} from '../../../Utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CoinPatti from './CoinPatti';

const AllTokensScreen = props => {
  const {activeTab} = props;

  const {wallets, activeWallet, priceQuotes} = useSelector(
    state => state.wallet,
  );
  const wallet = wallets[activeWallet];
  const [listarray, setlistarray] = useState([]);
  const [filteredlist, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {type, qr, address} = props.route.params;

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

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: wp(4),
            // justifyContent:'center'
          }}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{textAlign: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontSize: hp(2.2),
              fontWeight: '600',
            }}
            onPress={() => navigation.goBack()}>
            {type == 'send'
              ? 'Send'
              : type == 'recieve'
              ? 'Recieve'
              : type == 'buy'
              ? 'Buy'
              : 'Earn'}
          </Text>
        </View>

        <View style={{fontWeight: 'bold', marginEnd: wp(2)}}>
          <Text style={{color: '#000', fontSize: hp(2)}}>Done</Text>
        </View>
      </View>

      <View style={styles.header}>
        <Ionicons name="search" size={15} color="#999" />
        {/* <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#999"
      /> */}
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#999'}
          style={styles.searchinput}
          value={searchText}
          onChangeText={val => search(val)}
        />
      </View>
      <View style={styles.tabbody}>
        <FlatList
          data={filteredlist}
          renderItem={({item}) => {
            console.log(item,'ddd');
            const istoken =
              item?.token_address != ZERO_ADDRESS && item?.token_address
                ? true
                : false;
            const t = type == 'send' ? item.balance > 0 : true;
            const path =
              type == 'send' ? 'send' : type == 'buy' ? 'buy' : 'recieve';
            const addr = qr ? address : wallet.address;
            if (item?.show && t) {
              return (
                <CoinPatti item={{...item, qr}} route={path} address={addr} />
              );
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: hp(3),
  },

  headerTop: {
    width: '100%',
    paddingVertical: hp(3),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#eee',
  },

  header: {
    // width: '100%',
    // paddingVertical: 15,
    // alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: '#ccc',
    // borderWidth: 1,
    height: hp(4),
    lineHeihgt: hp(4),
    borderRadius: 5,
    color: '#000',
    // paddingVertical:0,
    backgroundColor: '#eee',
    width: '94%',
    borderWidth: 0,
    paddingHorizontal: 10,
    marginHorizontal: wp(4),
    marginBottom: wp(4),
    fontSize: hp(1.8),
    borderRadius: wp(3),
  },

  searchinput: {
    flex: 1,
    height: 40,
    color: '#000',
    fontSize: wp(3.3),
  },
  tabbody: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default AllTokensScreen;
