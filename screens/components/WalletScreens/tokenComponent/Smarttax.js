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
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native-gesture-handler';

const Smarttax = ({smarttaxs,setsmarttax,errors, setErrors,router}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const[selectedRouterAddress,setSelectedRouterAddress]=useState("")
  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    // setmarketingtax((prev) => ({ ...prev, [field]: value }));
  };

return (
  <>
  <View  style={styles.wrapper}>
  <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Reward Token</Text>
            {errors.tokenreward && <Text style={styles.errorText}>{errors.tokenreward}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="0x00000000000000000000000000000000"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={smarttaxs.tokenreward}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,tokenreward:val})}}
            />
          </View>
        </View>
  </View>

  <View  style={styles.wrapper}>
     
      
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Name</Text>
            {errors.tokenname && <Text style={styles.errorText}>{errors.tokenname}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Ex. Ethereum"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={smarttaxs.tokenname}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,tokenname:val});
              handleInputChange('tokenname', val)
            }}
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
              style={styles.inputTxt}
              value={smarttaxs.tokensymbol}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,tokensymbol:val});
              handleInputChange('tokensymbol', val)
            }}
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
              value={smarttaxs.decimal}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,decimal:val});
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
              value={smarttaxs.tokensupply}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,tokensupply:val});
              handleInputChange('tokensupply', val)

            }}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.wrapper,
        

        ]}>
        <View           
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
          >

          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked1 ? '#25d366' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked1(!checked1); 
            }}
            value={checked1}
          />
        
          <Text style={styles.checkboxLable}>Max User</Text>
        </View>
        {checked1 && <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Max User (%)</Text>
            {errors.maxuserperc && <Text style={styles.errorText}>{errors.maxuserperc}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="10"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              // value={smarttaxs.maxuserperc}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,maxuserperc:val});
              handleInputChange('tokensupply', val);
            }}
            />
          </View>
        </View>
      </View>}

      </View>

      <View
        style={[
          styles.wrapper,
        
        ]}>
        <View
          // onPress={() => {
          //   setChecked2(!checked2);
          // }}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
          >

          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked2 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked2(!checked2);
              // setdynamic({...dynamics, canmint: !checked2});
            }}
            value={checked2}
          />


          {/* <Checkbox status={checked2 ? 'checked' : 'unchecked'} /> */}
          <Text style={styles.checkboxLable}>Max Transaction</Text>
        </View>
        {checked2 && <View style={{marginTop:wp(4)}}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Max Transaction Amount</Text>
            {errors.maxtransactionamount && <Text style={styles.errorText}>{errors.maxtransactionamount}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="1000000"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              // value={smarttaxs.maxtransactionamount}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,maxtransactionamount:val});
              handleInputChange('maxtransactionamount', val);
            }}
            />
          </View>
        </View>
      </View>}

      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Marketing User</Text>
            {errors.marketinguser && <Text style={styles.errorText}>{errors.marketinguser}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Marketing wallet Address"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={smarttaxs.marketinguser}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,marketinguser:val});
              handleInputChange('marketinguser', val)
            }}
            />
          </View>
        </View>
      </View>
      <View style={styles.HeadingWrapper}>
          <Text style={styles.headLabels}> Tax:</Text>
      </View>


      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Marketing user (%)</Text>
            {errors.marketinguserperc && <Text style={styles.errorText}>{errors.marketinguserperc}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="2"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              value={smarttaxs.marketinguser}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,marketinguser:val});
              handleInputChange('marketinguser', val)
              
            }}
            />
          </View>
        </View>
      </View>
    

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Liquidity Fees (%)</Text>
            {errors.liquidityfeesperc && <Text style={styles.errorText}>{errors.liquidityfeesperc}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="5"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              // value={smarttaxs.liquidityfeesperc}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,liquidityfeesperc:val});
              handleInputChange('liquidityfeesperc', val)
            }}
            />
          </View>
        </View>
      </View>

      <View style={styles.HeadingWrapper}>
          <Text style={styles.headLabels}> Extra Sell Tax:</Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Tax Fees (%)</Text>
            {errors.taxfeesperc && <Text style={styles.errorText}>{errors.taxfeesperc}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="5"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              // value={smarttaxs.taxfeesperc}
              onChangeText={(val)=>{setsmarttax({...smarttaxs,taxfeesperc:val});
              handleInputChange('taxfeesperc', val)
            }}
            />
          </View>
        </View>
      </View>
     {router.length>0 && <View style={styles.wrapper}>
     <View style={styles.selectCard}>
      <Picker
            selectedValue={selectedRouterAddress}
            onValueChange={itemValue =>{ setSelectedRouterAddress(itemValue);setsmarttax({...smarttaxs,router:itemValue});}}
            style={styles.picker}>
            {router?.map((option,i) => {
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
      </View>}

     
      </>
)
}

export default Smarttax

const styles = StyleSheet.create({
  wrapper: {     
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
  },

  HeadingWrapper: { 
    color: '#000',
    width: '100%',
    paddingHorizontal: wp(1),
    marginTop:wp(2)
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

  headLabels:{
    color: '#000',
    fontSize:wp(4.2),
    fontWeight:'600'
    // paddingVertical: wp(0.8),
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
    height:40,
    borderRadius: wp(2),      
    justifyContent:'center'
  },

  picker: {     
    color: '#999',
  },
});