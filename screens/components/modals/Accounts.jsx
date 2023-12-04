import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import makeBlockie from 'ethereum-blockies-base64';
import {useDispatch, useSelector} from 'react-redux';
import {addressAbbreviate, renderBalance} from '../../../Utils/web3/web3';
import {Colors as colors} from '../../assets/colors';
import {setActiveWallet} from '../../../Store/web3';
import FastImage from 'react-native-fast-image';
import { getTokenIcon } from '../../../Utils/tokenIcons';

const Accounts = props => {
  const dispatch = useDispatch();
  const {wallets, activeWallet, activeNetwork, networks} = useSelector(
    state => state.wallet,
  );
  const wallet = wallets[activeWallet];
  const {navigation} = props;
  const [activeAsset, setActiveAsset] = useState('');
  const Item = useMemo(
    () =>
      ({item, index, asset}) => {
        console.log(item, 'item');
        const symbol = asset.chainId == '0x61' ? 'TBNB' : asset?.symbol;
        return (
          <TouchableOpacity
            onPress={() => {
              dispatch(setActiveWallet(index));
              props.toggleModal();
              // const data =props.toggleNetworkModal();
            }}
            style={{
              flexDirection: 'row',
              width: '95%',
              alignContent: 'center',
              alignItems: 'center',
              marginVertical: 8,
              marginHorizontal: 12,
              borderColor: 'rgba(0,0,0,0.09)',
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            key={index}>
            <View style={{marginLeft: 6, marginRight: 6, marginVertical: 5}}>
              {/* <Image
                source={{uri: makeBlockie(item.address)}}
                style={{width: 48, height: 48, borderRadius: 24}}
              /> */}
              <FastImage
                defaultSource={require('../../assets/blockie.png')}
                style={{
                  width: getTokenIcon(symbol).url ? 50 : 48,
                  height: getTokenIcon(symbol).url ? 50 : 48,
                  borderRadius: getTokenIcon(symbol).url ? 30 : 24,
                  marginHorizontal: getTokenIcon(symbol).url ? 0 : 8,
                  marginVertical: getTokenIcon(symbol).url ? 0 : 6,
                  ...getTokenIcon(symbol).style,
                }}
                source={
                  getTokenIcon(symbol).url
                    ? getTokenIcon(symbol).url
                    : require('../../assets/blockie.png')
                }
              />
            </View>
            <View style={{marginLeft: 10}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{textAlign: 'left', color: colors.text_01}}>
                  {item.name}
                </Text>
                <Text style={{textAlign: 'left', color: colors.text_02}}>
                  {addressAbbreviate(item.address)}
                </Text>
              </View>
            </View>
            <View style={{position: 'absolute', right: 30}}>
              <Text style={{textAlign: 'right', color: colors.positive_01}}>
                {renderBalance(asset?.balance, symbol)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      },
    [],
  );

  useEffect(() => {
    const asset = wallet?.assets?.find(ast => ast.chainId === activeNetwork);
    const net = networks?.find(it => it.chainId === activeNetwork);
    if (asset || net) {
      const nobj = asset ? asset?.nativeCurrency : net?.nativeCurrency;
      const obj = {
        balance: asset?.balance ? asset?.balance : '0',
        chainId: activeNetwork,
        ...nobj,
        show: true,
      };
      setActiveAsset({...obj});
      // console.log(obj, 'according to network active asset');
    }
    // console.log('confdhfgjd', asset, activeNetwork, wallet?.assets);
  }, [activeWallet, activeNetwork, wallets]);

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 50}}
      ListHeaderComponent={() => (
        <TouchableOpacity
          onPress={() => {
            props.openNetworkModal();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 24,
            margin: 20,
            paddingVertical: 18,
            borderRadius: 12,
            borderColor: colors.border_01,
            borderWidth: 0.8,
          }}>
          <View
            style={[
              styles.dot,
              {backgroundColor: colors.positive_01, marginRight: 10},
            ]}
          />
          <Text
            style={{color: colors.text_02, fontSize: 15, fontWeight: '500'}}>
            {props.network?.name}
          </Text>
          <FontAwesome
            name="chevron-down"
            size={13}
            color={colors.text_02}
            style={{marginLeft: 10}}
          />
          {/* <View style={{position: 'absolute', right: 20}}>
            <AntDesign
              name="checkcircleo"
              size={24}
              color={colors.positive_01}
            />
          </View> */}
        </TouchableOpacity>
      )}
      // ListFooterComponent={() => (
      //   <View
      //     style={{
      //       width: '100%',
      //       justifyContent: 'center',
      //       alignContent: 'center',
      //       alignItems: 'center',
      //       marginTop: 8,
      //     }}>
      //     <TouchableOpacity
      //       onPress={() => {
      //         props.toggleModal()
      //         navigation.navigate('CreateNewWallet', {add: true})
      //       }}
      //       style={{
      //         backgroundColor: colors.ui_01,
      //         paddingVertical: 12,
      //         paddingHorizontal: 24,
      //         borderRadius: 8,
      //         marginVertical: 5,
      //       }}>
      //       <Text
      //         style={{
      //           color: colors.interactive_01,
      //           fontSize: 15,
      //           fontWeight: '700',
      //         }}>
      //         Create Account
      //       </Text>
      //     </TouchableOpacity>
      //   </View>
      // )}
      data={props.wallets}
      renderItem={({item, index}) => (
        <Item item={item} index={index} asset={activeAsset} />
      )}
      keyExtractor={item => item.address}
    />
  );
};

export default Accounts;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
