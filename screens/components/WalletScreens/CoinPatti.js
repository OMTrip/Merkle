import {useNavigation} from '@react-navigation/native';
import {memo,useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getTokenIcon} from '../../../Utils/tokenIcons';
import { setActiveWallet } from '../../../Store/web3';
import { useSelector ,useDispatch} from 'react-redux';
import BuyModalPage from './BuyModalPage';
import { cutAfterDecimal } from '../../../Utils/web3/helperFunction';
const coinimg = require('../../assets/no_image.jpeg');

const CoinPatti = ({item, route, address}) => {
  const {wallets, activeWallet, priceQuotes, networks,refresh} = useSelector(
    state => state.wallet,
  );
  const dispatch = useDispatch();
  const cp = item?.current_price ? item?.current_price : 0;
  const balance_in_usd = cp * item?.balance;
  const pricechange = item?.price_change_percentage_24h ? item?.price_change_percentage_24h : 0;
  const symbol = item.slug == 'bsc_testnet' ? 'T' + item.symbol : item.symbol;
  const [modalVisible, setModalVisible] = useState(false);

  const openBuyModal = () => {
    setModalVisible(true);
  };

  const closeBuyModal = () => {
    setModalVisible(false);
  };
  const renderimage = (item,i) => {
    return (
      <View>
        <Image
          style={{
            width:28,
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
          style={styles.cardImage}
          // source={{uri:`https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png`}}
           source={{uri: item.logo?item.logo:item.image?item.image: "https://res.cloudinary.com/dpe8nipmq/image/upload/v1695796476/nute/dummy/icons8-question-mark-64_tnsjd1.png"}}
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
        console.log(item,address,"address",route)
        if(route=="buy"){
          openBuyModal()
        }else{
        
        route ? navigation.navigate(route, {...item, address}) : null;
        dispatch(setActiveWallet(activeWallet));
        }
        
      }}>
      {item?.token_address ? (
        renderimage(item)
      ) : (
        <Image
        source={item?.image ? { uri: `https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png` } : {uri:`https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item.slug}/logo.png`}}
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
              {marginLeft: wp(3), color: pricechange > 0 ? '#070' : '#f00'},
            ]}>
            {pricechange?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.CradRightText}>
        <Text style={styles.CradRightText}>{cutAfterDecimal(item?.balance,6)}</Text>
        <Text style={styles.CradRightTextbelow}>
          $
          {balance_in_usd?.toString()?.indexOf('.') > -1
            ? balance_in_usd?.toFixed(4)
            : balance_in_usd} 
        </Text>
      </View>
       {route=="buy"?<BuyModalPage isVisible={modalVisible} closeModal={closeBuyModal} data={item} />:null}
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
    // marginBottom: hp(1),
    color: '#444',
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
    fontWeight:'600'
  },
  CradRightTextbelow:{
    color: '#444',
    textAlign: 'right',
  }
});

export default memo(CoinPatti);
