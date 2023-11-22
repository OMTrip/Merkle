import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Switch} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Checkbox} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import React, {useRef, useState} from 'react';
export const tok = [
  {
    tAddress: '0x55dcEbc1021197F55fF560Dc3657D27120cA7415',
    symbol: 'CAKE',
  },
  {
    tAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    symbol: 'ETH',
  },
  {
    tAddress: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    symbol: 'BTC',
  },
  {
    tAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    symbol: 'BNB',
  },
];

const ProMax = ({promaxs, setProMax, errors, setErrors, router}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const [checked10, setChecked10] = useState(false);
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    '0x55dcEbc1021197F55fF560Dc3657D27120cA7415',
  );
  const [selectedRouterAddress, setSelectedRouterAddress] = useState('');
  const [toggleSwitch1, setToggleSwitch1] = useState(false);
  const handleInputChange = (field, value) => {
    setErrors(prevErrors => ({...prevErrors, [field]: undefined}));
    // setRewardToken((prev) => ({ ...prev, [field]: value }));
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
              value={promaxs.tokenname}
              onChangeText={val => {
                setProMax({...promaxs, tokenname: val});
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
              value={promaxs.tokensymbol}
              onChangeText={val => {
                setProMax({...promaxs, tokensymbol: val});
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
              value={promaxs.decimal}
              onChangeText={val => {
                setProMax({...promaxs, decimal: val});
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
              value={promaxs.tokensupply}
              onChangeText={val => {
                setProMax({...promaxs, tokensupply: val});
                handleInputChange('tokensupply', val);
              }}
            />
          </View>
        </View>
      </View>

      <View style={[styles.wrapper]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked1 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked1(!checked1);
            }}
            value={checked1}
          />
          {/* <Checkbox status={checked1 ? 'checked' : 'unchecked'} /> */}
          <Text style={styles.checkboxLable}>Max User Limit</Text>
        </View>
        {checked1 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Max User (%)</Text>
                {errors.maxuserperc && (
                  <Text style={styles.errorText}>{errors.maxuserperc}</Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="1000000"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.maxuserperc}
                  onChangeText={val => {
                    setProMax({...promaxs, maxuserperc: val});
                    handleInputChange('maxuserperc', val);
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={[styles.wrapper]}>
        <View
          onPress={() => {
            setChecked2(!checked2);
          }}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <Checkbox status={checked2 ? 'checked' : 'unchecked'} /> */}
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked2 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked2(!checked2);
            }}
            value={checked2}
          />

          <Text style={styles.checkboxLable}>Max Transaction Limit</Text>
        </View>
        {checked2 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Max Transaction (%)</Text>
                {errors.maxtransactionperc && (
                  <Text style={styles.errorText}>
                    {errors.maxtransactionperc}
                  </Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="10"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.maxtransactionperc}
                  onChangeText={val => {
                    setProMax({...promaxs, maxtransactionperc: val});
                    handleInputChange('maxtransactionperc', val);
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      {/* <View
          style={[
            styles.wrapper
          ]}>
          <TouchableOpacity
            onPress={() => {
              setChecked3(!checked1);
            }}
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
            >
            <Checkbox status={checked3 ? 'checked' : 'unchecked'} />
            <Text>Max Transaction Limit</Text>
          </TouchableOpacity>
          {checked3 && <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Max Transaction (%)</Text>
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

      <View style={[styles.wrapper]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <Checkbox status={checked4 ? 'checked' : 'unchecked'} /> */}
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked4 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked4(!checked4);
            }}
            value={checked4}
          />
          <Text style={styles.checkboxLable}>Reward to Holders </Text>
        </View>
        {checked4 && (
          <View style={styles.wrapper}>
            <View style={styles.selectCard}>
              <Picker
                selectedValue={selectedAddress}
                onValueChange={itemValue => {
                  setSelectedAddress(itemValue);
                  setProMax({...promaxs, tokenreward: itemValue});
                }}
                style={styles.picker}>
                {tok?.map((option, i) => {
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
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Reward Fees (%)</Text>
                {errors.rewardfeespercpro && (
                  <Text style={styles.errorText}>
                    {errors.rewardfeespercpro}
                  </Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="1000000"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.rewardfeespercpro}
                  onChangeText={val => {
                    setProMax({...promaxs, rewardfeespercpro: val});
                    handleInputChange('rewardfeespercpro', val);
                  }}
                />
              </View>
            </View>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>
                  Minimum token balance for holders
                </Text>
                {errors.mintokenbalance && (
                  <Text style={styles.errorText}>{errors.mintokenbalance}</Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="1000000"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.mintokenbalance}
                  onChangeText={val => {
                    setProMax({...promaxs, mintokenbalance: val});
                    handleInputChange('mintokenbalance', val);
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={[styles.wrapper]}>
        <View
          // onPress={() => {
          //   setChecked5(!checked5);
          // }}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <Checkbox status={checked5 ? 'checked' : 'unchecked'} /> */}
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked5 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked5(!checked5);
            }}
            value={checked5}
          />
          <Text style={styles.checkboxLable}>
            Automatic Liquidity generator{' '}
          </Text>
        </View>
        {checked1 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Liquidity Fees (%)</Text>
                {errors.liquidityfeeperc && (
                  <Text style={styles.errorText}>
                    {errors.liquidityfeeperc}
                  </Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="1000000"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.liquidityfeeperc}
                  onChangeText={val => {
                    setProMax({...promaxs, liquidityfeeperc: val});
                    handleInputChange('liquidityfeeperc', val);
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={[styles.wrapper]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <Checkbox status={checked6 ? 'checked' : 'unchecked'} /> */}
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked6 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked6(!checked6);
            }}
            value={checked6}
          />

          <Text style={styles.checkboxLable}>Burn </Text>
        </View>
        {checked6 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Burn Fees (%)</Text>
                {errors.burnfeesperc && (
                  <Text style={styles.errorText}>{errors.burnfeesperc}</Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="1"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.burnfeesperc}
                  onChangeText={val => {
                    setProMax({...promaxs, burnfeesperc: val});
                    handleInputChange('burnfeesperc', val);
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={[styles.wrapper]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked7 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked7(!checked7);
            }}
            value={checked7}
          />

          {/* <Checkbox status={checked7 ? 'checked' : 'unchecked'} /> */}
          <Text style={styles.checkboxLable}>Marketing User </Text>
        </View>
        {checked7 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View style={styles.box}>
                <TextInput
                  placeholder="0x000"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.marketinguserpro}
                  onChangeText={val => {
                    setProMax({...promaxs, marketinguserpro: val});
                  }}
                />
              </View>
            </View>
          </View>
        )}
        {checked7 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Marketing Fees (%)</Text>
                {errors.marketingfeeperc && (
                  <Text style={styles.errorText}>
                    {errors.marketingfeeperc}
                  </Text>
                )}
              </View>

              <View style={styles.box}>
                <TextInput
                  placeholder="1"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.charityfeesperc}
                  onChangeText={val => {
                    setProMax({...promaxs, marketingfeeperc: val});
                  }}
                />
              </View>
            </View>
          </View>
        )}

        {checked7 && (
          <>
            <View style={styles.wrapper}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Switch
                  trackColor={{false: '#ddecff', true: '#ddecff'}}
                  thumbColor={toggleSwitch ? '#adcdf7' : '#fff'}
                  ios_backgroundColor="#ccc"
                  onValueChange={val => {
                    setToggleSwitch(!toggleSwitch);
                    setProMax({...promaxs, marketingeth: !toggleSwitch});
                  }}
                  value={toggleSwitch}
                />
                <Text style={styles.labels}>Send Fee in BNB</Text>
              </View>
            </View>
            <View
              style={{
                margin: wp(2),
                borderBottomColor: '#ccc',
                borderBottomWidth: 0.5,
              }}></View>
          </>
        )}
      </View>

      <View style={[styles.wrapper]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <Checkbox status={checked8 ? 'checked' : 'unchecked'} /> */}
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked8 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked8(!checked8);
            }}
            value={checked8}
          />
          <Text style={styles.checkboxLable}>Charity User </Text>
        </View>
        {checked8 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View style={styles.box}>
                <TextInput
                  placeholder="0x0000"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.charityuser}
                  onChangeText={val => {
                    setProMax({...promaxs, charityuser: val});
                  }}
                />
              </View>
            </View>
          </View>
        )}
        {checked8 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Charity Fees (%)</Text>
                {errors.charityfeesperc && (
                  <Text style={styles.errorText}>{errors.charityfeesperc}</Text>
                )}
              </View>

              <View style={styles.box}>
                <TextInput
                  placeholder="1"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.charityfeesperc}
                  onChangeText={val => {
                    setProMax({...promaxs, charityfeesperc: val});
                  }}
                />
              </View>
            </View>
          </View>
        )}
        {checked8 && (
          <>
            <View style={styles.wrapper}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Switch
                  trackColor={{false: '#ddecff', true: '#ddecff'}}
                  thumbColor={toggleSwitch ? '#adcdf7' : '#fff'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    setToggleSwitch1(!toggleSwitch1);
                    setProMax({...promaxs, charityeth: !toggleSwitch1});
                  }}
                  value={toggleSwitch1}
                />
                <Text style={styles.labels}>Send Fee in BNB</Text>
              </View>
            </View>

            <View
              style={{
                margin: wp(2),
                borderBottomColor: '#ccc',
                borderBottomWidth: 0.5,
              }}></View>
          </>
        )}
      </View>

      <View style={[styles.wrapper]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked9 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked9(!checked9);
            }}
            value={checked9}
          />
          {/* <Checkbox status={checked9 ? 'checked' : 'unchecked'} /> */}

          <Text style={styles.checkboxLable}>Buyback &amp; Burn </Text>
        </View>
        {checked9 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Buyback &amp; Burn fees (%)</Text>
                {errors.buyback && (
                  <Text style={styles.errorText}>{errors.buyback}</Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="1"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  value={promaxs.buyback}
                  onChangeText={val => {
                    setProMax({...promaxs, buyback: val});
                    handleInputChange('buyback', val);
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={[styles.wrapper]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <Checkbox status={checked10 ? 'checked' : 'unchecked'} /> */}
          <Switch
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={checked10 ? '#14b7af' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={val => {
              setChecked10(!checked10);
            }}
            value={checked10}
          />
          <Text style={styles.checkboxLable}>Tax Fee </Text>
        </View>
        {checked10 && (
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Tax Fee %</Text>
                {errors.taxs && (
                  <Text style={styles.errorText}>{errors.taxs}</Text>
                )}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="1"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  // value={promaxs.taxs}
                  onChangeText={val => {
                    setProMax({...promaxs, taxs: val});
                    handleInputChange('taxs', val);
                  }}
                />
              </View>
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
                setProMax({...promaxs, router: itemValue});
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

      {/* <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Marketing User</Text>
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Marketing wallet Address"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
              />
            </View>
          </View>
        </View> */}

      {/* <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Marketing user (%)</Text>
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Marketing wallet Address"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
              />
            </View>
          </View>
        </View> */}

      {/* <View
          style={[
            styles.wrapper
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

      {/* <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Liquidity Fees (%)</Text>
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="5"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
              />
            </View>
          </View>
        </View> */}
    </>
  );
};

export default ProMax;

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
    backgroundColor: '#fff',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
  },

  picker: {
    color: '#000',
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
