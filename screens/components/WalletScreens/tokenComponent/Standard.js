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
import { Switch } from 'react-native-gesture-handler';

const Standard = ({standards, setStandard,errors, setErrors}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
 

  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    // setStandard((prev) => ({ ...prev, [field]: value }));
  };


  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Name</Text>
            {errors.tokenname && <Text style={styles.errorText}>{errors.tokenname}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. Ethereum"
              placeholderTextColor={'#999'}
              // value={standards.tokenname}
              onChangeText={(val)=>{
                setStandard((prev)=>{return {...prev,tokenname:val}})
                handleInputChange('tokenname', val)
              }}
              style={styles.inputTxt}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Symbol</Text>
            {errors.tokensymbol && <Text style={styles.errorText}>{errors.tokensymbol}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. ETH"
              placeholderTextColor={'#999'}
              value={standards.tokensymbol}
              onChangeText={(val)=>{
                setStandard({...standards,tokensymbol:val})
                handleInputChange('tokensymbol', val)
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
            {errors.decimal && <Text style={styles.errorText}>{errors.decimal}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. 18"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={standards.decimal}
              
              onChangeText={(val)=>{
                setStandard({...standards,decimal:val})
                handleInputChange('decimal', val)
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Total Supply</Text>
            {errors.tokensupply && <Text style={styles.errorText}>{errors.tokensupply}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. 10000000000"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={standards.tokensupply}
              onChangeText={(val)=>{
                setStandard({...standards,tokensupply:val});
                handleInputChange('tokensupply', val)

              }}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.wrapper,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',         
            
          },
        ]}>
        <View         
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
             <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked1 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked1(!checked1);
                setStandard({...standards,canburns:!checked1})
              }}
              value={checked1}
            />

          {/* <Checkbox status={checked1 ? 'checked' : 'unchecked'} /> */}
          <Text style={styles.labels}>Burnable</Text>
        </View>
        <View
         
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Switch
              trackColor={{false: '#ccc', true: '#ccc'}}
              thumbColor={checked2 ? '#25d366' : '#fff'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked2(!checked2);
                setStandard({...standards,canmints:!checked2})
              }}
              value={checked2}
            />
          {/* <Checkbox status={checked2 ? 'checked' : 'unchecked'} /> */}
          <Text style={styles.labels}>Mintable</Text>
        </View>
      </View>
    </>
  );
};

export default Standard;

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
});
