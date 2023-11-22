import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Checkbox} from 'react-native-paper';

import React, {useRef, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Switch} from 'react-native-gesture-handler';

const Safemoon = ({safemoons, setSafemoon, errors, setErrors, router}) => {
  const [checked1, setChecked1] = useState(false);
  const [selectedRouterAddress, setSelectedRouterAddress] = useState('');

  const handleInputChange = (field, value) => {
    setErrors(prevErrors => ({...prevErrors, [field]: undefined}));
    // setSafemoon((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Name</Text>
            {errors.tokenname && (
              <Text style={styles.errorText}>{errors.tokenname}</Text>
            )}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. Ethereum"
              value={safemoons.tokenname}
              onChangeText={val => {
                setSafemoon({...safemoons, tokenname: val});
                handleInputChange('tokenname', val);
              }}
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Symbol</Text>
            {errors.tokensymbol && (
              <Text style={styles.errorText}>{errors.tokensymbol}</Text>
            )}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. ETH"
              placeholderTextColor={'#999'}
              value={safemoons.tokensymbol}
              onChangeText={val => {
                setSafemoon({...safemoons, tokensymbol: val});
                handleInputChange('tokensymbol', val);
              }}
              style={styles.inputTxt}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Decimals</Text>
            {errors.decimal && (
              <Text style={styles.errorText}>{errors.decimal}</Text>
            )}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. 18"
              placeholderTextColor={'#999'}
              value={safemoons.decimal}
              onChangeText={val => {
                setSafemoon({...safemoons, decimal: val});
                handleInputChange('decimal', val);
              }}
              style={styles.inputTxt}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Total Supply</Text>
            {errors.tokensupply && (
              <Text style={styles.errorText}>{errors.tokensupply}</Text>
            )}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. 10000000000"
              placeholderTextColor={'#999'}
              value={safemoons.tokensupply}
              onChangeText={val => {
                setSafemoon({...safemoons, tokensupply: val});
                handleInputChange('tokensupply', val);
              }}
              style={styles.inputTxt}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Tax fees (%)</Text>
            {errors.taxfeesperc && (
              <Text style={styles.errorText}>{errors.taxfeesperc}</Text>
            )}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. 10000000000"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={safemoons.taxfeesperc}
              onChangeText={val => {
                setSafemoon({...safemoons, taxfeesperc: val});
                handleInputChange('taxfeesperc', val);
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Liquidity Fees (%)</Text>
            {errors.liquidityfeesperc && (
              <Text style={styles.errorText}>{errors.liquidityfeesperc}</Text>
            )}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="5"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={safemoons.liquidityfeesperc}
              onChangeText={val => {
                setSafemoon({...safemoons, liquidityfeesperc: val});
                handleInputChange('liquidityfeesperc', val);
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.wrapper,
          // {
          //   display: 'flex',
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          //   backgroundColor: '#fff',
          //   padding: 10,
          // },
        ]}>
        <View
          // onPress={() => {
          //   setChecked1(!checked1);
          // }}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <Checkbox status={checked1 ? 'checked' : 'unchecked'} /> */}

          <Switch
            trackColor={{false: '#ddd', true: '#14b7af'}}
            thumbColor={checked1 ? '#E9E9E9' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked1(!checked1);
              // setdynamic({...dynamics, canmint: !checked1});
            }}
            value={checked1}
          />

          <Text style={styles.checkboxLable}>Max Transaction</Text>
        </View>
        {checked1 && (
          <View>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Max Transaction Amount</Text>
                {errors.maxtransactionamount && (
                  <Text style={styles.errorText}>
                    {errors.maxtransactionamount}
                  </Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="1000000"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={safemoons.maxtransactionamount}
                  onChangeText={val => {
                    setSafemoon({...safemoons, maxtransactionamount: val});
                    handleInputChange('maxtransactionamount', val);
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>
              Number of tokens sell to add liquidity
            </Text>
            {errors.numTokensSellToAddToLiquidity && (
              <Text style={styles.errorText}>
                {errors.numTokensSellToAddToLiquidity}
              </Text>
            )}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="1000000"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={safemoons.numTokensSellToAddToLiquidity}
              onChangeText={val => {
                setSafemoon({...safemoons, numTokensSellToAddToLiquidity: val});
                handleInputChange('numTokensSellToAddToLiquidity', val);
              }}
            />
          </View>
        </View>
      </View>
      {router.length > 0 && (
        <View style={styles.wrapper}>
          <View style={styles.selectCard}>
            <Picker
              selectedValue={selectedRouterAddress}
              onValueChange={itemValue => {
                setSelectedRouterAddress(itemValue);
                setSafemoon({...safemoons, router: itemValue});
              }}
              style={styles.picker}>
              {router?.map((option, i) => {
                return (
                  <Picker.Item
                    key={option.address}
                    label={option.name}
                    value={option.address}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
      )}
    </>
  );
};

export default Safemoon;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f7',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
  },

  input: {
    color: '#444',
    fontSize: 13,
    // paddingHorizontal: wp(5),
    // marginVertical: 0,
  },
  inputTxt: {
    color: '#000',
    fontSize: wp(4),
    height: 40,
    flex: 1,
    // backgroundColor:'red'
  },
  labels: {
    color: '#666',
    fontSize: hp(1.6),
    paddingVertical: wp(0.8),
  },
  balLabels: {
    color: '#6bd18c',
    fontSize: hp(1.5),
    paddingVertical: wp(1.5),
  },
  errorText: {
    color: 'red',
    fontSize: hp(1.5),
    paddingVertical: wp(0.8),
  },
  checkboxLable: {
    color: '#000',
    fontSize: hp(1.8),
    paddingVertical: wp(0.8),
  },
  selectCard: {
    backgroundColor: '#f3f4f7',
    height: 40,
    borderRadius: wp(2),
    justifyContent: 'center',
  },

  picker: {
    color: '#999',
  },
});
