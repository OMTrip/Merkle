import {StyleSheet, Text, View, Image, Switch as RNSwitch} from 'react-native';
import React, {memo} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AllTokenListCard = ({
  item,
  index,
  switchStates,
  setSwitchStates,
  toggleSwitch,
}) => {
  // console.log(switchStates,"switchStates")
  // if (!switchStates.some(state => state.index === index)) {
  //     const newSwitchState = {index: index, status: item.show};
  //     setSwitchStates([newSwitchState, ...switchStates]);

  //   }
  return (
    <View style={styles.tokenWrapper}>
      <View style={styles.tokenInfo}>
        <View style={{position: 'relative'}}>
          <Image
            resizeMode="contain"
            source={{
              uri: item.logo
                ? item.logo
                : `https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/Chains-main/Chains-main/resources/${item.slug}/logo.png`,
            }}
            style={[
              styles.imageCoin,
              {
                borderRadius: item.slug == 'merkle' ? 0 : 50,
                backgroundColor: item.slug == 'merkle' ? '#fff' : '#eee',
              },
            ]}
          />
          {item.logo && (
            <Image
              resizeMode="contain"
              source={{
                uri:
                  item.logo &&
                  `https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/Chains-main/Chains-main/resources/${item.slug}/logo.png`,
              }}
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 1,
                borderRadius: 12,
              }}
            />
          )}
        </View>
        <View>
          <Text style={styles.tokenName}>
            {item?.type == 'coin' ? item?.nativeCurrency?.symbol : item.symbol}
          </Text>
          <Text style={styles.subtoken}>
            {item?.type == 'coin' ? item?.nativeCurrency?.name : item?.name}
          </Text>
        </View>
      </View>
      <View>
        <RNSwitch
          trackColor={{false: '#767577', true: '#ccc'}}
          thumbColor={switchStates[index]?.status ? '#25d366' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            toggleSwitch(index);
          }}
          value={switchStates[index]?.status}
        />
      </View>
    </View>
  );
};

export default memo(AllTokenListCard);

const styles = StyleSheet.create({
  tokenWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: wp(4),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCoin: {
    width: 40,
    height: 40,
    borderRadius: wp(50),
    marginEnd: wp(1),
    backgroundColor: '#eee',
    // borderWidth:0.5,
    // borderColor:'#ccc'
  },

  tokenName: {
    color: '#000',
    fontSize: hp(2),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  subtoken: {
    color: '#888',
    fontSize: hp(1.5),
  },
});
