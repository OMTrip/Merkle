import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icons from '../Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';

const DecentralisedUtility = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.box}> 
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Decentralised Utilities</Text>
        </View>
        
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
          <View style={[styles.iconsBox,{marginBottom:wp(4)}]}>            
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SwapScreen');
              }}>
              <Icons
                imagePath={require('../../assets/services/swap.png')}
                Text={'Swap'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Xchain',{status:false});
              }}>
              <Icons
                imagePath={require('../../assets/services/crosschain.png')}
                Text={'X-Chain'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ZeroXLiquidity',{status:false});
              }}>
              <Icons
                imagePath={require('../../assets/services/0x.png')}
                Text={'0xliquidity'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('BuyTokenlist')}>
              <Icons
                imagePath={require('../../assets/services/earning.png')}
                Text={'Earn'}
              />
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate('Xchain');
            // }}
            >
              <Icons
                imagePath={require('../../assets/services/airdrop.png')}
                Text={'Airdrop'}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('SwapScreen');
            }}
            >
              <Icons
                imagePath={require('../../assets/services/pre-sale.png')}
                Text={'Presale'}
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
              navigation.navigate('SwapScreen');
            }}
            >
              <Icons
                imagePath={require('../../assets/services/lottery.png')}
                Text={'Lottery'}
              />
            </TouchableOpacity> */}
          </View>

          <View style={styles.iconsBox}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateTokenScreen');
              }}>
              <Icons
                imagePath={require('../../assets/services/token.png')}
                Text={'Create Token'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MultisenderScreen');
              }}>
              <Icons
                imagePath={require('../../assets/services/multisend.png')}
                Text={'Multisender'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AuditReport',{qr:false});
              }}>
              <Icons
                imagePath={require('../../assets/services/audit.png')}
                Text={'Audit Report'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LockScreen');
              }}>
              <Icons
                imagePath={require('../../assets/services/lock.png')}
                Text={'Lock'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate('LockScreen');
              // }}
              >
              <Icons
                imagePath={require('../../assets/services/signal.png')}
                Text={'Pump'}
              />
            </TouchableOpacity>
          </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // display: 'flex',
    paddingBottom: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderRadius: wp(2),
    backgroundColor: '#F2EDFC',
    paddingVertical: wp(2),
    paddingHorizontal:wp(3),
    width: '103%',
    marginBottom: wp(4),
  },

  title: {
    textTransform: 'uppercase',
    color: '#0B0B0C',
    fontWeight: '600',
  },
  iconsBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  heading: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderRadius: wp(2),
    backgroundColor: '#F2EDFC',
    padding: wp(2),
    color: '#000',
    width: '100%',
    marginBottom: wp(4),
  },
  headingTxt: {
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: '600',
  },
  tokenLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 50,
  },
});

export default DecentralisedUtility;
