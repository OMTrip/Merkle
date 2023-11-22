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
 export const tok = [
    {
        tAddress:"0x55dcEbc1021197F55fF560Dc3657D27120cA7415",
        symbol:"CAKE"
    },
    {
        tAddress:"0x2170ed0880ac9a755fd29b2688956bd959f933f8",
        symbol:"ETH"
    },
    {
        tAddress:"0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
        symbol:"BTC"
    },
    {
        tAddress:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        symbol:"BNB"
    }
  ]


const Reward = ({rewardtokens, setRewardToken,errors, setErrors,router}) => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const[selectedAddress,setSelectedAddress]=useState("0x55dcEbc1021197F55fF560Dc3657D27120cA7415");
    const[selectedRouterAddress,setSelectedRouterAddress]=useState("")
    const handleInputChange = (field, value) => {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
      // setRewardToken((prev) => ({ ...prev, [field]: value }));
    };
  return (
    <>
    <View style={styles.wrapper}>
        <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Reward Token</Text>
              {errors.tokenreward && (
              <Text style={styles.errorText}>{errors.tokenreward}</Text>
            )}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="0x00000000000000000000000000000000"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                value={rewardtokens.tokenreward}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,tokenreward:val});
                handleInputChange("tokenreward",val)

              }}
              />
            </View>
          </View>
          </View>
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
                value={rewardtokens.tokenname}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,tokenname:val});
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
                value={rewardtokens.tokensymbol}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,tokensymbol:val});
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
                value={rewardtokens.decimal}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,decimal:val});
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
                value={rewardtokens.tokensupply}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,tokensupply:val});
                handleInputChange('tokensupply', val);

              }}
              />
            </View>
          </View>
        </View>

        <View style={styles.HeadingWrapper}>
            <Text style={styles.headLabels}>Rewards to Holders</Text>
        </View>
        <View style={styles.wrapper}>
        <View style={styles.selectCard}>
        <Picker
              selectedValue={selectedAddress}
              onValueChange={itemValue =>{ setSelectedAddress(itemValue);setRewardToken({...rewardtokens,rewardtoholder:itemValue});}}
              style={styles.picker}>
              {tok?.map((option,i) => {
                return (
                  <Picker.Item
                    key={option.tAddress}
                    label={option.symbol}
                    value={option.tAddress}
                    
                  />
                );
              })}
            </Picker>
            </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Reward Fees (%)</Text>
              {errors.rewardfeeperc1 && (
              <Text style={styles.errorText}>{errors.rewardfeeperc1}</Text>
            )}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="7"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={rewardtokens.rewardfeeperc1}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,rewardfeeperc1:val});
                handleInputChange('rewardfeeperc1', val);

              }}
              />
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Minimum Hold</Text>
              {errors.minimumholds && (
              <Text style={styles.errorText}>{errors.minimumholds}</Text>
            )}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="10000"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={rewardtokens.minimumholds}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,minimumholds:val});
                handleInputChange('minimumholds', val);

              }}
              />
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Marketing User</Text>
              {errors.rewardfeeperc1 && (
              <Text style={styles.marketinguser}>{errors.marketinguser}</Text>
            )}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Marketing wallet Address"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                value={rewardtokens.marketinguser}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,marketinguser:val});
                handleInputChange('marketinguser', val);

              }}
              />
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Marketing Fees %</Text>
              {errors.marketingfeeperc && (
              <Text style={styles.errorText}>{errors.marketingfeeperc}</Text>
            )}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="3"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={rewardtokens.marketingfeeperc}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,marketingfeeperc:val});
                handleInputChange('marketingfeeperc', val);

              }}
              />
            </View>
          </View>
        </View>
        {/* <View
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
          <TouchableOpacity
            onPress={() => {
              setChecked1(!checked1);
            }}
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
            >
            <Checkbox status={checked1 ? 'checked' : 'unchecked'} />
            <Text>Max Transaction</Text>
          </TouchableOpacity>
          {checked1 && <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Max Transaction Amount</Text>
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="1000000"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
              />
            </View>
          </View>
        </View>}

        </View> */}

        <View style={styles.HeadingWrapper}>
            <Text style={styles.headLabels}>Rewards to Holders</Text>
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
                placeholder="2"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={rewardtokens.liquidityfeesperc}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,liquidityfeesperc:val});
                handleInputChange('liquidityfeesperc', val);

              }}
              />
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Extra Sell Fees (%)</Text>
              {errors.extrasellfeesperc && (
              <Text style={styles.errorText}>{errors.extrasellfeesperc}</Text>
            )}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="1"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                // value={rewardtokens.extrasellfeesperc}
                onChangeText={(val)=>{setRewardToken({...rewardtokens,extrasellfeesperc:val}); 
                handleInputChange('extrasellfeesperc', val);
              }}
              />
            </View>
          </View>
        </View>
        {router.length>0 &&<View style={styles.wrapper}>
        <View style={styles.selectCard}>
        <Picker
              selectedValue={selectedRouterAddress}
              onValueChange={itemValue =>{ setSelectedRouterAddress(itemValue);setRewardToken({...rewardtokens,router:itemValue});}}
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

export default Reward

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
    selectCard: {     
      backgroundColor: '#f3f4f7',
      height:40,
      borderRadius: wp(2),      
      justifyContent:'center'
    },

    picker: {     
      color: '#999',
    },
      errorText: {
        color: 'red',
        fontSize: hp(1.5),
        paddingVertical: wp(0.8),
      },

      HeadingWrapper: { 
        color: '#000',
        width: '100%',
        paddingHorizontal: wp(1),
        marginTop:wp(2)
      },

      headLabels:{
        color: '#000',
        fontSize:wp(4.2),
        fontWeight:'600'
        // paddingVertical: wp(0.8),
      },
  });