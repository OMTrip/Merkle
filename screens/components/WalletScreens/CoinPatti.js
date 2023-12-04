import {useNavigation} from '@react-navigation/native';
import {memo, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getTokenIcon} from '../../../Utils/tokenIcons';
import {setActiveWallet} from '../../../Store/web3';
import {useSelector, useDispatch} from 'react-redux';
import BuyModalPage from './BuyModalPage';
import {cutAfterDecimal} from '../../../Utils/web3/helperFunction';
import {setMerklePrice} from '../../../Store/userinfo';
const coinimg = require('../../assets/no_image.jpeg');

const CoinPatti = ({item, route, address}) => {
  const {wallets, activeWallet, priceQuotes, networks, refresh} = useSelector(
    state => state.wallet,
  );
  const dispatch = useDispatch();
  const cp = item?.current_price ? item?.current_price : 0;
  const balance_in_usd = cp * item?.balance;
  const pricechange = item?.price_change_percentage_24h
    ? item?.price_change_percentage_24h
    : 0;
  const symbol = item.slug == 'bsc_testnet' ? 'T' + item.symbol : item.symbol;
  const [modalVisible, setModalVisible] = useState(false);
  const [mrklePrice, setMrklePrice] = useState();
  dispatch(
    setMerklePrice(item.symbol == 'MRK' ? mrklePrice * item.balance : ''),
  );
  const openBuyModal = () => {
    setModalVisible(true);
  };

  const closeBuyModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchLogo();
  }, []);
  // Fetch the logo URL from the web
  const fetchLogo = async () => {
    try {
      const response = await fetch(
        'https://analogx.seedx.live/MerkleCopy/public/index.php/api/getPrice',
      );
      const data = await response.json(); // Modify this depending on the response format
      setMrklePrice(data.price);
    } catch (error) {
      console.error('Error :=-===', error);
    }
  };
  const renderimage = (item, i) => {
    return (
      <View>
        <Image
          style={{
            width: 22,
            height: 22,
            position: 'absolute',
            bottom: -5,
            right: 6,
            zIndex: 1,
            borderRadius: 12,
          }}
          source={item?.token_address ? getTokenIcon(item?.chainId).url : ''}
        />
        <Image
          style={styles.cardImage}
          // source={{uri:https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png}}
          source={{
            uri: item.logo
              ? item.logo
              : item.image
              ? item.image
              : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1695796476/nute/dummy/icons8-question-mark-64_tnsjd1.png',
          }}
        />
      </View>
    );
  };
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // colors={['#0d330e', '#0d330e']}
      // start={{x: 0, y: 0.008}} // Start point of the gradient (top-left)
      // end={{x: 1, y: 0.8}} // End point of the gradient (top-right)
      style={styles.card}
      onPress={() => {
        console.log(item, address, 'address', route);
        if (route == 'buy') {
          openBuyModal();
        } else {
          route ? navigation.navigate(route, {...item, address}) : null;
          dispatch(setActiveWallet(activeWallet));
        }
      }}>
      {item?.token_address ? (
        renderimage(item)
      ) : (
        <Image
          source={
            item?.image
              ? {
                  uri: `https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/Chains-main/Chains-main/resources/${item.slug}/logo.png`,
                }
              : {
                  uri: `https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/Chains-main/Chains-main/resources/${item.slug}/logo.png`,
                }
          }
          style={styles.cardImage}
        />
      )}
      <View style={styles.cardContent}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.cardTitle}>{symbol?.toUpperCase()}</Text>

          {item?.token_address ? (
            <Text style={styles.badgeGrey}>
              {item.slug?.replace(/_/g, ' ')}
            </Text>
          ) : null}
        </View>
        <View style={styles.innercardContent}>
          <Text style={styles.cardText}>
            $
            {symbol === 'MRK'
              ? parseFloat(mrklePrice).toFixed(2)
              : cp?.toString()?.indexOf('.') > -1
              ? cp?.toFixed(2)
              : cp}
          </Text>
          <Text
            style={[
              styles.cardText,
              {marginLeft: wp(3), color: pricechange > 0 ? '#070' : '#f00'},
            ]}>
            {pricechange?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.CradRightText}>
        <Text style={styles.CradRightText}>
          {/* {cutAfterDecimal(item?.balance, 6)} */}
          {cutAfterDecimal(item?.balance, 6)}
        </Text>
        <Text style={styles.CradRightTextbelow}>
          $
          {symbol === 'MRK'
            ? item?.balance * mrklePrice
            : balance_in_usd?.toString()?.indexOf('.') > -1
            ? balance_in_usd?.toFixed(4)
            : balance_in_usd}
        </Text>
      </View>
      {route == 'buy' ? (
        <BuyModalPage
          isVisible={modalVisible}
          closeModal={closeBuyModal}
          data={item}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(2),
    // backgroundColor: 'rgba(73, 103, 73,0.32)',
    // backgroundColor:'#fff',
    borderRadius: wp(2),
    // paddingVertical: 14,
    marginVertical: wp(1),
  },
  cardImage: {
    width: wp(9),
    height: wp(9),
    marginRight: wp(4),
    borderRadius: wp(50),
  },
  cardContent: {
    flex: 1,
  },
  innercardContent: {
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: wp(3.6),
    fontWeight: '600',
    // marginBottom: hp(0.2),
    color: '#000',
  },

  badgeGrey: {
    fontSize: wp(3.2),
    color: '#888',
    backgroundColor: '#f3f4f7',
    marginStart: wp(3),
    paddingHorizontal: wp(2),
    borderRadius: wp(3),
    fontSize: wp(2.8),
    textTransform: 'capitalize',
    lineHeight: 18,
  },
  cardText: {
    fontSize: wp(3.2),
    color: '#444',
  },

  CradRightSide: {
    marginRight: wp(2),
    color: '#444',
  },
  CradRightText: {
    color: '#000',
    textAlign: 'right',
    fontWeight: '600',
  },
  CradRightTextbelow: {
    color: '#444',
    textAlign: 'right',
    fontSize: wp(3.5),
  },
});

export default memo(CoinPatti);
