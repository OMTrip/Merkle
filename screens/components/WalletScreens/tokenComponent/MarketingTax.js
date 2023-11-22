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

const MarketingTax = ({marketingtaxs, setmarketingtax,errors, setErrors,router}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const[selectedRouterAddress,setSelectedRouterAddress]=useState("")
  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    // setmarketingtax((prev) => ({ ...prev, [field]: value }));
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
              value={marketingtaxs.tokenname}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,tokenname:val});  handleInputChange('tokenname', val)}}
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
              value={marketingtaxs.tokensymbol}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,tokensymbol:val});  handleInputChange('tokensymbol', val)}}
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
              value={marketingtaxs.decimal}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,decimal:val});
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
              value={marketingtaxs.tokensupply}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,tokensupply:val});
              handleInputChange('tokensupply', val);

            }}
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
              value={marketingtaxs.marketinguser}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,marketinguser:val});
              handleInputChange('marketinguser', val);

            }}
            />
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Buy Tax (%)</Text>
            {errors.buytaxperc && <Text style={styles.errorText}>{errors.buytaxperc}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Marketing wallet Address"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              // value={marketingtaxs.buytaxperc}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,buytaxperc:val});
              handleInputChange('buytaxperc', val);

            }}
            />
          </View>
        </View>
      </View>
     

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Sell Tax (%)</Text>
            {errors.selltaxperc && <Text style={styles.errorText}>{errors.selltaxperc}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="5"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              // value={marketingtaxs.selltaxperc}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,selltaxperc:val});
              handleInputChange('selltaxperc', val);

            }}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Max Transaction (%)</Text>
            {errors.maxtransactionperc && <Text style={styles.errorText}>{errors.maxtransactionperc}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="5"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              // value={marketingtaxs.maxtransactionperc}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,maxtransactionperc:val});
              handleInputChange('maxtransactionperc', val);

            }}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View>
            <Text style={styles.labels}>Max user (%)</Text>
            {errors.maxuserperc && <Text style={styles.errorText}>{errors.maxuserperc}</Text>}
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="5"
              placeholderTextColor={'#999'}
              style={styles.inputTxt}
              // value={marketingtaxs.maxuserperc}
              onChangeText={(val)=>{setmarketingtax({...marketingtaxs,maxuserperc:val});
              handleInputChange('maxuserperc', val);
            }}
              
            />
          </View>
        </View>
      </View>
     {router.length>0 && <View style={styles.wrapper}>
     <View style={styles.selectCard}> 
     <Picker
            selectedValue={selectedRouterAddress}
            onValueChange={itemValue =>{ setSelectedRouterAddress(itemValue);setmarketingtax({...marketingtaxs,router:itemValue});}}
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

export default MarketingTax

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