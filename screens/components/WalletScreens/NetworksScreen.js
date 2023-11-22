import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch} from 'react-native-paper';
import {updateWallets} from '../../../Store/web3';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NetworksScreen = () => {
  const {networks, wallets, activeWallet} = useSelector(state => state.wallet);
  const [networklist, setnetworklist] = useState([]);
  const mynetwork = wallets[activeWallet].assets;
  const dispatch = useDispatch();
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
  useEffect(() => {
    const mynetwork = wallets[activeWallet].assets;
    // console.log(mynetwork, mynetwork.length,"  inuseefff")
    const arr = networks.map((network, i) => {
      const obj = {...network};
      const exist = mynetwork.find(it => it.chainId == obj.chainId);
      if (exist?.show) {
        obj.enabled = true;
      } else {
        obj.enabled = false;
      }
      return {...obj};
    });
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

  return (
    <View style={styles.container}>
      {networklist &&
        networklist.map((network, index) => {
          return (
            <View style={styles.wallet_patti} key={index + 'network'}>
              <View>
                <Text
                  style={{
                    color: '#070',
                    paddingVertical: 5,
                    fontSize: hp(2),
                    fontWeight: '600',
                  }}>
                  Network: {network?.name}
                </Text>
                <Text
                  style={{color: '#070', fontSize: hp(1.8), fontWeight: '600'}}>
                  Type: {network.mainnet ? 'Mainnet' : 'Testnet'}
                </Text>
              </View>
              <Switch
                value={network.enabled}
                onChange={() => enableNetwork(network)}
                color="#070"
              />
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
    alignItems: 'center',
  },
  wallet_patti: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '97%',
    alignItems: 'center',
    // height: height / 14,
    // borderBottomWidth: 0.187,
    // borderBottomColor: '#030',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 2,
    backgroundColor: '#d7d9db',
    borderRadius: 12,
  },
});

export default NetworksScreen;
