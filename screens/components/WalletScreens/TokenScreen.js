import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import {green} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import BuyModalPage from './BuyModalPage';
import {
  cutAfterDecimal,
  formatDateFromTimestamp,
} from '../../../Utils/web3/helperFunction';

const TokenScreen = props => {
  const {wallets, activeWallet, priceQuotes, networks} = useSelector(
    state => state.wallet,
  );
  const MerklePrice = useSelector(state => state.user?.merklePrice);
  const BtycPrice = useSelector(state => state.user?.BtycPrice);
  const BsbtPrice = useSelector(state => state.user?.BsbtPrice);
  const BubtPrice = useSelector(state => state.user?.BubtPrice);
  const wallet = wallets[activeWallet];
  const {chainId, native, token_address, image, symbol} = props.route.params;
  const network = networks.find(it => it.chainId == chainId);
  const [token, settoken] = useState({});
  const [title, setTitle] = useState('');
  const [reload, setReload] = useState(false);
  const [txns, setTxns] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    try {
      const blockchain = wallet.assets.find(f => f.chainId == chainId);
      const tx = wallet?.transactions[blockchain.nativeCurrency.slug].filter(
        it => {
          if (native) {
            if (it.is_erc20 == false) {
              return it;
            }
          } else {
            if (it.is_erc20) {
              return it;
            }
          }
        },
      );
      setTxns(tx);
      console.log(tx, 'tx::::');
    } catch (error) {
      setTxns([]);
    }
  }, [props]);

  const [modalVisible, setModalVisible] = useState(false);

  const openBuyModal = () => {
    setModalVisible(true);
  };

  const closeBuyModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{flex: 0.8}}
        onPress={() =>
          navigation.navigate('TranscationDetails', {
            data: item,
            extras: props.route.params,
          })
        }>
        <View style={[styles.transactionCards, {flex: 0.8}]}>
          <Text style={{color: '#888'}}>
            {formatDateFromTimestamp(item.timeStamp)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.transactionCardsInner}>
              <Ionicons
                name={
                  item.methodId == '0x' || item.methodId == '0xa9059cbb'
                    ? item.from == wallet.address
                      ? 'arrow-up-outline'
                      : 'arrow-down-outline'
                    : 'leaf-outline'
                }
                size={17}
                color={'#000'}
                style={styles.typeIcon}
              />
              <View style={{}}>
                <Text style={styles.upperText}>
                  {item.functionName.length > 0
                    ? 'Function Call'
                    : item.methodId == '0x'
                    ? 'Transfer'
                    : 'Contract Call'}{' '}
                </Text>
                <Text style={styles.fromText}>
                  From: {item.from.slice(0, 6)}...{item.from.slice(-6)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.coinText}>
                {cutAfterDecimal(
                  Number(item.value) /
                    10 ** Number(props.route.params.decimals),
                  5,
                )}{' '}
                {props.route.params.symbol}{' '}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const dt = wallet?.assets?.find((ele, i) => {
      return ele?.chainId === chainId;
    });
    setTitle(dt);
  }, [wallet]);

  function fetchData() {
    setReload(true);
    const asset = wallet?.assets?.find(it => it.chainId == chainId);
    if (native) {
      const obj = {
        symbol: asset?.nativeCurrency?.symbol,
        balance: asset?.balance,
        decimal: asset?.nativeCurrency?.decimals,
        address: wallet?.address,
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
    setReload(false);
  }

  useEffect(() => {
    fetchData();
  }, [props, wallets]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent:'center'
          }}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{color: '#000', fontSize: hp(2)}}
            onPress={() => navigation.goBack()}>
            Wallet
          </Text>
        </View>
        <View style={{width: wp(25), textAlign: 'center'}}>
          <Text
            style={{
              color: '#444',
              fontSize: hp(2),
              fontWeight: '600',
            }}>
            {title?.nativeCurrency?.name.split(' ')[0]}
          </Text>
        </View>

        <View>
          <AntDesign
            name="linechart"
            size={18}
            color={'#000'}
            //  / onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      <View style={styles.coinHeader}>
        <View>
          <Text
            style={{
              color: '#888',
              fontSize: hp(1.8),
              textTransform: 'uppercase',
              paddingStart: 5,
            }}>
            {symbol === 'BUBT' || symbol === 'BSBT' || symbol === 'BTYC'
              ? 'Token'
              : 'Coin'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: '#888',
              fontSize: hp(2),
              paddingEnd: 5,
            }}>
            $
            {symbol === 'BUBT'
              ? parseFloat(BubtPrice).toFixed(4)
              : symbol === 'BSBT'
              ? parseFloat(BsbtPrice).toFixed(2)
              : symbol === 'BTYC'
              ? parseFloat(BtycPrice).toFixed(7)
              : symbol === 'MRK'
              ? parseFloat(MerklePrice).toFixed(2)
              : props?.route?.params?.current_price
              ? cutAfterDecimal(props?.route?.params?.current_price, 3)
              : 0}
          </Text>
          <Text
            style={{
              color:
                props?.route?.params?.price_change_percentage_24h < 0
                  ? 'red'
                  : 'green',
              fontSize: hp(2),
            }}>
            (
            {props?.route?.params?.price_change_percentage_24h
              ? cutAfterDecimal(
                  props?.route?.params?.price_change_percentage_24h,
                  3,
                )
              : 0}{' '}
            %)
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center', paddingTop: 10}}>
        <Image
          source={{uri: image}}
          style={{
            width: wp(10),
            height: hp(5),
            marginBottom: 10,
            borderRadius: wp(5),
          }}
          resizeMode="stretch"
        />
        {/* <View
          style={{
            paddingBottom: 2,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{color: '#444', paddingHorizontal: 5}}
            onPress={() => {
              Clipboard.setString(wallet.address);
              Toast.show({
                type: 'success',
                text1: 'Copied to clipboard',
                text2: wallet.address,
              });
            }}>
            {token?.address?.slice(0, 8) + '...' + token?.address?.slice(-8)}
          </Text>
          <Ionicons
            name="copy-outline"
            color="#444"
            onPress={() => {
              Clipboard.setString(wallet.address);
              Toast.show({
                type: 'success',
                text1: 'Copied to clipboard',
                text2: wallet.address,
              });
            }}
            style={{padding: 5}}
          />
        </View> */}

        <View style={[styles.BodyBoxTitle, {marginBottom: 1}]}>
          <Text style={[styles.Icons, {paddingEnd: 3}]}>
            {cutAfterDecimal(token?.balance, 6)}
          </Text>
          <Text style={styles.Icons}>{token?.symbol}</Text>
        </View>
        <View
          style={[
            styles.BodyBoxTitle,
            {marginBottom: 10, flexDirection: 'row', alignItems: 'center'},
          ]}>
          <MaterialCommunityIcons
            name={'approximately-equal'}
            size={wp(6)}
            style={{marginTop: hp(0.5), color: '#ccc'}}
          />
          <Text style={styles.BodyBoxText}>
            $
            {symbol === 'BUBT'
              ? (token?.balance * parseFloat(BubtPrice)).toFixed(4)
              : symbol === 'BSBT'
              ? (token?.balance * parseFloat(BsbtPrice)).toFixed(4)
              : symbol === 'BTYC'
              ? (token?.balance * parseFloat(BtycPrice)).toFixed(4)
              : symbol === 'MRK'
              ? (token?.balance * parseFloat(MerklePrice)).toFixed(4)
              : cutAfterDecimal(
                  token?.balance * props.route.params.current_price,
                  6,
                )
              ? cutAfterDecimal(
                  token?.balance * props.route.params.current_price,
                  6,
                )
              : 0}
          </Text>
        </View>
        <View style={styles.optionsrow}>
          <TouchableOpacity
            style={styles.options}
            onPress={() =>
              navigation.navigate('send', {...props.route.params})
            }>
            <Ionicons
              name="arrow-up"
              size={17}
              color={'#444'}
              style={styles.optionsicon}
            />
            <Text style={styles.optext}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            onPress={() =>
              navigation.navigate('recieve', {
                ...props?.route?.params,
                address: wallet?.address,
              })
            }>
            <Ionicons
              name="arrow-down"
              size={17}
              color={'#444'}
              style={styles.optionsicon}
            />
            <Text style={styles.optext}>Recieve</Text>
          </TouchableOpacity>
          {/* <Link to="/SwapScreen">
            <View style={styles.options}>
              <AntDesign
                name="swap"
                size={17}
                color={'#000'}
                style={styles.optionsicon}
              />
              <Text style={styles.optext}>Swap</Text>
            </View>
          </Link> */}

          {/* <TouchableOpacity
            style={styles.options}
            // onPress={() => navigation.navigate('alltoken', {type: 'buy'})}
            onPress={openBuyModal}
            >
            <Ionicons
              name="leaf-outline"
              size={17}
              color={'#000'}
              style={styles.optionsicon}
            />
            <Text style={styles.optext}>Buy</Text>
          </TouchableOpacity> */}
          <BuyModalPage
            isVisible={modalVisible}
            closeModal={closeBuyModal}
            data={props.route.params}
          />
        </View>
      </View>

      <View style={{flex: 0.98, alignItems: 'center'}}>
        {/* <View style={{paddingTop: 15, paddingBottom: 5, paddingHorizontal: 10}}>
          <Text style={{fontWeight: '500', color: '#444'}}>Transactions</Text>
        </View> */}
        <View
          style={{
            width: '100%',
            // backgroundColor: 'rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            borderTopColor: '#eee',
            borderTopWidth: 1,
            flex: 0.84,
            // borderTopLeftRadius: 40,
            // borderTopRightRadius: 40,
            // alignItems: 'center',
            // justifyContent: 'center',
            marginTop: hp(2),
          }}>
          {/* <View style={styles.transactionCards}>
            <Text style={{color: '#888'}}>Aug 2, 2023</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
              <View style={styles.transactionCardsInner}>
                <Ionicons
                  name="leaf-outline"
                  size={17}
                  color={'#000'}
                  style={styles.typeIcon}
                />
                <Link to='/TranscationDetails'>
                <View style={{}}>
                  <Text style={styles.upperText}>Smart Contract Call </Text>
                  <Text style={styles.fromText}>From: 0x9B2d.....46B7</Text>
                </View>
                </Link>
              </View>
              <View>
                <Text style={styles.coinText}>+10 Matic</Text>
              </View>
            </View>
          </View>
          <View style={styles.transactionCards}>
            <Text style={{color: '#888'}}>June 28, 2023</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
              <View style={styles.transactionCardsInner}>
                <Ionicons
                  name="arrow-down-outline"
                  size={17}
                  color={'#000'}
                  style={styles.typeIcon}
                />
                <View style={{}}>
                  <Text style={styles.upperText}>Transfer </Text>
                  <Text style={styles.fromText}>From: 0x98fB2.....46C7</Text>
                </View>
              </View>
              <View>
                <Text style={styles.coinText}>+10.326 Matic</Text>
              </View>
            </View>
          </View> */}

          <FlatList
            data={txns}
            refreshing={reload}
            onRefresh={() => {
              setReload(true);
              fetchData();
            }}
            renderItem={renderItem}
            keyExtractor={item => item.hash}
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
                    Transactions Not Found.
                  </Text>
                </View>
              );
            }}
          />
        </View>

        {/* <View
          style={{
            width: '98%',
            // backgroundColor: 'rgba(0,0,0,0.1)',
            backgroundColor: '#F3F4F7',
            flex: 0.89,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(2),
          }}>
          <View style={styles.transactionCards}>          
            <Text style={{color: '#888'}}>No Transaction Found</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    paddingVertical: hp(5),
    backgroundColor: 'rgba(0,0,0,0.01)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    // display: 'flex',
    justifyContent: 'space-between',
  },

  coinHeader: {
    // width: '100%',
    paddingVertical: 10,
    // backgroundColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },

  optionsrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    // paddingVertical: 10,
  },
  options: {
    marginVertical: hp(0.2),
    // height: hp(7.2),
    // width: hp(7.2),
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 10,
    // backgroundColor: 'rgba(250,250,250,1)',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,
    // elevation: 14,
  },
  optionsicon: {
    // backgroundColor: 'rgba(13,51,14,0.09)',
    // borderRadius: 6,
    // padding: 2,
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#fff',
    borderRadius: 6,
    height: hp(5.5),
    width: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#000',
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
  },
  BodyBoxTitle: {
    flexDirection: 'row',
  },
  BodyBoxText: {
    fontWeight: '400',
    color: '#888',
  },
  Icons: {
    fontSize: wp(6),
    color: '#000',
    fontWeight: '500',
    // paddingHorizontal: 3,
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
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: hp(2),
    marginVertical: hp(1),
    borderRadius: wp(2),
    // paddingBottom: hp(5),
    // shadowColor: '#666',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,
    // elevation: 14,
    color: '#444',
  },

  transactionCardsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    alignItems: 'center',
  },

  typeIcon: {
    backgroundColor: '#eee',
    color: '#888',
    borderRadius: 6,
    height: hp(4.5),
    width: hp(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginEnd: wp(1.2),

    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    lineHeight: hp(4),
    textAlign: 'center',
  },
  upperText: {
    color: '#444',
    fontSize: hp(2),
    fontWeight: '600',
  },
  fromText: {
    color: '#888',
    fontSize: hp(1.5),
  },
  coinText: {
    color: '#4CD073',
    fontSize: hp(2.2),
    // fontWeight:'600'
  },
});

export default TokenScreen;
