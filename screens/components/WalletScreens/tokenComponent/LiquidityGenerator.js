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

const LiquidityGenerator = ({liquiditygenerators, setliquiditygenerator,errors, setErrors,router}) => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const[selectedRouterAddress,setSelectedRouterAddress]=useState("")
    console.log(liquiditygenerators,"liquiditygenerators",router)

    const handleInputChange = (field, value) => {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
      // setliquiditygenerator((prev) => ({ ...prev, [field]: value }));
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
                style={styles.inputTxt}
                value={liquiditygenerators.tokenname}
                onChangeText={(val)=>{
                  setliquiditygenerator({...liquiditygenerators,tokenname:val});
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
              {errors.tokensymbol && <Text style={styles.errorText}>{errors.tokensymbol}</Text>}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Ex. ETH"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                value={liquiditygenerators.tokensymbol}
                onChangeText={(val)=>{setliquiditygenerator({...liquiditygenerators,tokensymbol:val});
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
              {errors.decimal && <Text style={styles.errorText}>{errors.decimal}</Text>}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Ex. 18"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                value={liquiditygenerators.decimal}
                onChangeText={(val)=>{setliquiditygenerator({...liquiditygenerators,decimal:val});
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
                value={liquiditygenerators.tokensupply}
                onChangeText={(val)=>{setliquiditygenerator({...liquiditygenerators,tokensupply:val});handleInputChange('tokensupply', val)}}
              />
            </View>
          </View>
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
                value={liquiditygenerators.marketinguser}
                onChangeText={(val)=>{setliquiditygenerator({...liquiditygenerators,marketinguser:val}); handleInputChange('marketinguser', val)}}
                
              />
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Marketing user (%)</Text>
              {errors.marketingtaxperc && <Text style={styles.errorText}>{errors.marketingtaxperc}</Text>}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Marketing User (%)"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={liquiditygenerators.marketingtaxperc}
                onChangeText={(val)=>{setliquiditygenerator({...liquiditygenerators,marketingtaxperc:val});handleInputChange('marketingtaxperc', val)}}
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
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
            >

            <Switch
          
              trackColor={{false: '#ddd', true: '#14b7af'}}
              thumbColor={checked1 ? '#E9E9E9' : '#E9E9E9'}
              ios_backgroundColor="#ccc"
              onValueChange={val => {
                setChecked1(!checked1);
                // setdynamic({...dynamics, canmint: !checked1});
              }}
              value={checked1}
            />

            {/* <Checkbox status={checked1 ? 'checked' : 'unchecked'} /> */}
            <Text style={styles.checkboxLable}>Max Transaction </Text>
          </View>
          {checked1 && <View style={{}}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Max Transaction Amount</Text>
              {errors.maxtransactionamounts && <Text style={styles.errorText}>{errors.maxtransactionamounts}</Text>}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="1000000"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={liquiditygenerators.maxtransactionamounts}
                onChangeText={(val)=>{setliquiditygenerator({...liquiditygenerators,maxtransactionamounts:val});handleInputChange('maxtransactionamounts', val);}}
              />
            </View>
          </View>
        </View>}

        </View>

        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Liquidity Fees (%)</Text>
              {errors.liquidityfeesperc && <Text style={styles.errorText}>{errors.liquidityfeesperc}</Text>}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="1"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={liquiditygenerators.liquidityfeesperc}
                onChangeText={(val)=>{setliquiditygenerator({...liquiditygenerators,liquidityfeesperc:val}); handleInputChange('liquidityfeesperc', val)}}
              />
            </View>
          </View>
        </View>
       {router.length>0 && <View style={styles.wrapper}>
       <View style={styles.selectCard}>
       <Picker
              selectedValue={selectedRouterAddress}
              onValueChange={itemValue =>{ setSelectedRouterAddress(itemValue);setliquiditygenerator({...liquiditygenerators,router:itemValue});}}
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

export default LiquidityGenerator

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
    checkboxLable: {
      color: '#000',
      fontSize: hp(1.8),
      paddingVertical: wp(0.8),
    },
    input: {
      color: '#444',
      fontSize: 13,
      // paddingHorizontal: wp(5),
      // marginVertical: 0,labels
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