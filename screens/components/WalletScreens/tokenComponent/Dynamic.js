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

const Dynamic = ({dynamics, setdynamic, errors, setErrors, router}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [selectedRouterAddress, setSelectedRouterAddress] = useState('');

  const handleInputChange = (field, value) => {
    setErrors(prevErrors => ({...prevErrors, [field]: undefined}));
    // setStandard((prev) => ({ ...prev, [field]: value }));
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
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={dynamics.tokenname}
              onChangeText={val => {
                setdynamic({...dynamics, tokenname: val});
                handleInputChange('tokenname', val);
              }}
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
              style={styles.inputTxt}
              value={dynamics.tokensymbol}
              onChangeText={val => {
                setdynamic({...dynamics, tokensymbol: val});
                handleInputChange('tokensymbol', val);
              }}
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
              style={styles.inputTxt}
              value={dynamics.decimal}
              onChangeText={val => {
                setdynamic({...dynamics, decimal: val});
                handleInputChange('decimal', val);
              }}
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
              style={styles.inputTxt}
              value={dynamics.tokensupply}
              onChangeText={val => {
                setdynamic({...dynamics, tokensupply: val});
                handleInputChange('tokensupply', val);
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.wrapper,
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: '#fff',
            // padding: 10,
          },
        ]}>
        <View style={{width: '50%'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked1 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked1(!checked1);
                setdynamic({...dynamics, canmint: !checked1});
              }}
              value={checked1}
            />

            <Text style={styles.checkboxLabel}>Can Mint</Text>
          </View>
        </View>
        <View style={{width: '50%'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked2 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked2(!checked2);
                setdynamic({...dynamics, canburn: !checked2});
              }}
              value={checked2}
            />
            {/* <Checkbox status={checked2 ? 'checked' : 'unchecked'} /> */}
            <Text style={styles.checkboxLabel}>Can Burn</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.wrapper,
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: '#fff',
            // padding: 10,
          },
        ]}>
        <View style={{width: '50%'}}>
          <View
           
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>

            <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked3 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked3(!checked3);
                setdynamic({...dynamics, canrecover: !checked3});
              }}
              value={checked3}
            />
            
            {/* <Checkbox status={checked3 ? 'checked' : 'unchecked'} /> */}
            <Text style={styles.checkboxLabel}>Can Recover</Text>
          </View>
        </View>
        <View style={{width: '50%'}}>
          <View
           
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>

            <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked4 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked4(!checked4);
                setdynamic({...dynamics, canpause: !checked4});
              }}
              value={checked4}
            />


            {/* <Checkbox status={checked4 ? 'checked' : 'unchecked'} /> */}
            <Text style={styles.checkboxLabel}>Can Pause</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.wrapper,
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: '#fff',
            // padding: 10,
          },
        ]}>
        <View style={{width: '50%'}}>
          <View
           
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked6 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked6(!checked6);
                setdynamic({...dynamics,ownerburn:!checked6})
              }}
              value={checked6}
            />
            {/* <Checkbox status={checked6 ? 'checked' : 'unchecked'} /> */}
            <Text style={styles.checkboxLabel}>Owner Burn</Text>
          </View>
        </View>
        <View style={{width: '50%'}}>
          <View           
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>

            <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked7 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked7(!checked7);
                setdynamic({...dynamics, ownerpause: !checked7});
              }}
              value={checked7}
            />

            {/* <Checkbox status={checked7 ? 'checked' : 'unchecked'} /> */}
            <Text style={styles.checkboxLabel}>Owner Pause</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.wrapper,
          {
            display: 'flex',
            // flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: '#fff',
            // checkboxLabel,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            setChecked5(!checked5);
            setdynamic({...dynamics, iscapped: !checked5});
          }}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

            <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked5 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked5(!checked5);
                setdynamic({...dynamics, iscapped: !checked5});
              }}
              value={checked5}
            />


          {/* <Checkbox status={checked5 ? 'checked' : 'unchecked'} /> */}
          <Text style={styles.checkboxLabel}>Is Capped</Text>
        </TouchableOpacity>

        {checked5 && (
          <View style={{marginTop:wp(5)}}>
            <View>
              <Text style={styles.labels}>Capped Supply</Text>
              {errors.cappedsupply && (
                <Text style={styles.errorText}>{errors.cappedsupply}</Text>
              )}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Capped Supply"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={dynamics.cappedsupply}
                onChangeText={val => {
                  setdynamic({...dynamics, cappedsupply: val});
                  handleInputChange('cappedsupply', val);
                }}
              />
            </View>
          </View>
        )}
      </View>
      {router.length > 0 && (
        <View style={styles.wrapper}>
          <View style={styles.selectCard}>
            <Picker
              selectedValue={selectedRouterAddress}
              onValueChange={itemValue => {
                setSelectedRouterAddress(itemValue);
                setdynamic({...dynamics, router: itemValue});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
              }}
              style={styles.picker}>
              {router?.map((option, i) => {
                return (
                  <Picker.Item
                    key={option.address}
                    label={option.name}
                    value={option.address}
                    style={{color: '#999'}}
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

export default Dynamic;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
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

  checkboxLabel: {
    color: '#000',
    fontSize: hp(1.8),
    paddingVertical: wp(0.8),
  },
  selectCard: {     
    backgroundColor: '#f3f4f7',
    height:40,
    borderRadius: wp(2),      
    justifyContent:'center'
  },

  picker: {     
    color: '#999',
  },
});
