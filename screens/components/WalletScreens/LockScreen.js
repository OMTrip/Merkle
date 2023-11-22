import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Checkbox} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {
  getTokenDetails,
  lock,
  vestingLock,
} from '../../../Utils/web3/web3Functions';
import {cutAfterDecimal} from '../../../Utils/web3/helperFunction';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

const LockScreen = () => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const {wallets, activeWallet} = useSelector(stat => stat.wallet);
  const wallet = wallets[activeWallet];
  const [ownerChecked, setOwnerChecked] = React.useState(false);
  const [vestingChecked, setVestingChecked] = React.useState(false);
  const [isLPToken, SetIsLPToken] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    token: '',
    amount: '',
    title: '',
    ownerAddress: '',
    tgeBps: '',
    cycle: '',
    cycleBps: '',
  });
  const [tokenDetails, setTokenDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    token: '',
    amount: '',
    title: '',
    ownerAddress: '',
    tgeBps: '',
    cycle: '',
    cycleBps: '',
  });

  const handleLock = async () => {
    const {token, amount, title, ownerAddress, tgeBps, cycle, cycleBps} = input;
    console.log(
      token,
      amount,
      title,
      ownerAddress,
      'token, amount, title, ownerAddress',
    );
    const da = new Date(date).getTime();
    const currentDt = new Date().getTime();
    const d = da / 1000;
    setErrors({
      token: '',
      amount: '',
      title: '',
      ownerAddress: '',
      tgeBps: '',
      cycle: '',
      cycleBps: '',
    });

    if (!token.startsWith('0x') || !token) {
      setErrors(prevErrors => ({
        ...prevErrors,
        token: 'Invalid Token Address.',
      }));
      return;
    }
    if (ownerChecked) {
      if (!ownerAddress.startsWith('0x')) {
        setErrors(prevErrors => ({
          ...prevErrors,
          ownerAddress: 'Invalid Owner Address.',
        }));
        return;
      }
    }
    if (!title) {
      setErrors(prevErrors => ({
        ...prevErrors,
        title: 'Title should not be empty.',
      }));
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        amount: 'Please enter a valid amount.',
      }));
      return;
    }

    if (vestingChecked) {
      if (!tgeBps || isNaN(Number(tgeBps)) || Number(tgeBps) < 0) {
        setErrors(prevErrors => ({
          ...prevErrors,
          tgeBps: 'Please enter a valid target BPS.',
        }));
        return;
      }
      if (!cycle || isNaN(Number(cycle)) || Number(cycle) < 0) {
        setErrors(prevErrors => ({
          ...prevErrors,
          cycle: 'Please enter a valid cycle.',
        }));
        return;
      }
      if (!cycleBps || isNaN(Number(cycleBps)) || Number(cycleBps) < 0) {
        setErrors(prevErrors => ({
          ...prevErrors,
          cycleBps: 'Please enter a valid Cycle BPS.',
        }));
        return;
      }
    }
    if (da <= currentDt) {
      Toast.show({
        type: 'info',
        text1: 'Please provide valid Date.',
        text2: 'Date Should be greater than current date.',
      });
      return;
    }

    const ownerAddrs = ownerChecked ? ownerAddress : wallet.address;
    console.log(
      amount * 10 ** Number(tokenDetails.decimals),
      tokenDetails.balance,
      'tokenDetails.balance',
    );

    if (amount * 10 ** Number(tokenDetails.decimals) <= tokenDetails.balance) {
      if (vestingChecked) {
        const obj = {
          owner: ownerAddrs,
          tokenAddress: token,
          isLPToken: isLPToken,
          amount: amount * 10 ** Number(tokenDetails.decimals),
          unlockDate: d,
          description: title,
          tgeBps: tgeBps,
          cycle: cycle,
          cycleBps: cycleBps,
        };
        vestingLock(obj, wallet, setLoader, Toast);
      } else {
        const obj = {
          owner: ownerAddrs,
          tokenAddress: token,
          isLPToken: isLPToken,
          amount: amount * 10 ** Number(tokenDetails.decimals),
          unlockDate: d,
          description: title,
        };

        await lock(obj, wallet, setLoader, Toast);
      }
    } else {
      Toast.show({
        type: 'info',
        text1: 'Insufficient Balance',
        text2: 'Please provide valid Token amount.',
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (input[`token`]) {
        const tokenAddrs = input['token'];
        const details = await getTokenDetails(tokenAddrs, wallet);
        console.log(details, 'details');
        setTokenDetails(details);
      }
    })();
  }, [wallet, loader]);

  return (
    <LinearGradient
      colors={[
        '#d6fffd',
        '#f2fffe',
        '#ffff',
        '#fff',
        '#fffaff',
        '#fef8ff',
        '#faf4ff',
        '#fcf5fe',
        '#f5eefe',
        '#f1e9fe',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1, paddingHorizontal: wp(4)}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color={'#444'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: '#000',
              fontSize: wp(5),
              fontWeight: '600',
              marginStart: wp(2),
            }}>
            Lock
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{alignItems: 'center', flex: 1}}>
          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Token or LP Token Addresss</Text>
                {errors.token ? (
                  <Text style={styles.errorText}>{errors.token}</Text>
                ) : null}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="Enter Token or LP Token Addresss"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  value={input.token}
                  onChangeText={async val => {
                    setInput({...input, token: val});
                    const details = await getTokenDetails(val, wallet);
                    console.log(details, 'details');
                    setTokenDetails(details);
                    setErrors(prevErrors => ({...prevErrors, token: ''}));
                  }}
                />
              </View>
            </View>
            {tokenDetails['symbol'] && (
              <View>
                <View
                  style={[
                    styles.row,
                    {backgroundColor: '#fff', marginVertical: 5},
                  ]}>
                  <Text style={styles.text}>Symbol:{tokenDetails?.symbol}</Text>
                  <Text style={styles.text}>
                    Bal:
                    {cutAfterDecimal(
                      tokenDetails?.balance / 10 ** tokenDetails.decimals,
                      6,
                    )}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Checkbox
                    status={isLPToken ? 'checked' : 'unchecked'}
                    onPress={() => {
                      SetIsLPToken(!isLPToken);
                    }}
                  />
                  <Text
                    style={{
                      color: '#999',
                      fontSize: wp(3.8),
                      textAlign: 'center',
                    }}>
                    Is LP Token?
                  </Text>
                </View>
              </View>
            )}
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  status={ownerChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setOwnerChecked(!ownerChecked);
                  }}
                />
                <Text
                  style={{
                    color: '#999',
                    fontSize: wp(3.8),
                    textAlign: 'center',
                  }}>
                  use another owner?
                </Text>
              </View>
              {ownerChecked && (
                <View style={styles.wrapper}>
                  <View style={styles.input}>
                    <View>
                      <Text style={styles.labels}>Owner Address</Text>
                      {errors.ownerAddress ? (
                        <Text style={styles.errorText}>
                          {errors.ownerAddress}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.box}>
                      <TextInput
                        placeholder="Ex. 0x000000000000"
                        placeholderTextColor={'#999'}
                        style={styles.inputTxt}
                        value={input.ownerAddress}
                        onChangeText={val => {
                          setInput({...input, ownerAddress: val});
                          setErrors(prevErrors => ({
                            ...prevErrors,
                            ownerAddress: '',
                          }));
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Title</Text>
                {errors.title ? (
                  <Text style={styles.errorText}>{errors.title}</Text>
                ) : null}
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="Ex. My Lock"
                  placeholderTextColor={'#999'}
                  style={styles.inputTxt}
                  value={input.title}
                  onChangeText={val => {
                    setInput({...input, title: val});
                    setErrors(prevErrors => ({...prevErrors, title: ''}));
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.input}>
              <View>
                <Text style={styles.labels}>Amount</Text>
                {errors.amount ? (
                  <Text style={styles.errorText}>{errors.amount}</Text>
                ) : null}
              </View>
              <View style={styles.box}>
                <View>
                  <TextInput
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    placeholderTextColor={'#999'}
                    style={styles.inputTxtAmount}
                    value={input.amount}
                    onChangeText={val => {
                      setInput({...input, amount: val});
                      setErrors(prevErrors => ({...prevErrors, amount: ''}));
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setInput({
                      ...input,
                      amount: tokenDetails['balance']
                        ? cutAfterDecimal(
                            tokenDetails.balance / 10 ** tokenDetails.decimals,
                            6,
                          )
                        : 0,
                    });
                    setErrors(prevErrors => ({...prevErrors, amount: ''}));
                  }}>
                  <Text style={styles.maxLabels}>MAX</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                status={vestingChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setVestingChecked(!vestingChecked);
                }}
              />
              <Text
                style={{
                  color: '#999',
                  fontSize: wp(3.8),
                  textAlign: 'center',
                }}>
                use vesting?
              </Text>
            </View>
            {vestingChecked && (
              <View style={{paddingTop: 8}}>
                <View style={styles.wrapper}>
                  <View style={styles.input}>
                    <View>
                      <Text style={styles.labels}>Target BPS</Text>
                      {errors.tgeBps ? (
                        <Text style={styles.errorText}>{errors.tgeBps}</Text>
                      ) : null}
                    </View>
                    <View style={styles.box}>
                      <TextInput
                        placeholder="Ex. 1"
                        placeholderTextColor={'#999'}
                        style={styles.inputTxt}
                        value={input.tgeBps}
                        onChangeText={val => {
                          setInput({...input, tgeBps: val});
                          setErrors(prevErrors => ({
                            ...prevErrors,
                            tgeBps: '',
                          }));
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.wrapper}>
                  <View style={styles.input}>
                    <View>
                      <Text style={styles.labels}>Cycle</Text>
                      {errors.cycle ? (
                        <Text style={styles.errorText}>{errors.cycle}</Text>
                      ) : null}
                    </View>
                    <View style={styles.box}>
                      <TextInput
                        placeholder="Ex. 1"
                        placeholderTextColor={'#999'}
                        style={styles.inputTxt}
                        value={input.cycle}
                        onChangeText={val => {
                          setInput({...input, cycle: val});
                          setErrors(prevErrors => ({...prevErrors, cycle: ''}));
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.wrapper}>
                  <View style={styles.input}>
                    <View>
                      <Text style={styles.labels}>Cycle BPS</Text>
                      {errors.cycleBps ? (
                        <Text style={styles.errorText}>{errors.cycleBps}</Text>
                      ) : null}
                    </View>
                    <View style={styles.box}>
                      <TextInput
                        placeholder="Ex. 12"
                        placeholderTextColor={'#000'}
                        style={styles.inputTxt}
                        value={input.cycleBps}
                        onChangeText={val => {
                          setInput({...input, cycleBps: val});
                          setErrors(prevErrors => ({
                            ...prevErrors,
                            cycleBps: '',
                          }));
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.wrapper}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>

            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F3F4F7',
                  fontSize: wp(4),
                  height: 40,
                  justifyContent: 'center',
                  // alignItems: 'center',
                  borderRadius: wp(2),
                  paddingHorizontal: wp(4),
                }}
                onPress={() => setOpen(true)}>
                {!showTime ? (
                  <Text style={{color: '#999', fontSize: wp(4)}}>
                    {vestingChecked ? 'Select Target Date' : 'Select Date'}
                  </Text>
                ) : (
                  <Text style={{color: '#000', fontSize: 16}}>
                    {date.toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}
                  </Text>
                )}
              </TouchableOpacity>

              <DatePicker
                modal
                open={open}
                date={date}
                androidVariant="iosClone"
                theme="light"
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  setShowTime(true);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>

          <View style={styles.infowrapper}>
            <View style={styles.displayHori}>
              <Entypo name="dot-single" size={18} color={'#444'} />
              <Text style={styles.listItem}>
                Please exclude PinkLock's lockup address 0X46584ddfd55324555435
                from fees, rewards, max tx amount to start lockivg tokens.
              </Text>
            </View>
            <View style={styles.displayHori}>
              <Entypo name="dot-single" size={18} color={'#444'} />
              <Text style={styles.listItem}>
                We don't support rebase tokens.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View>
        <TouchableOpacity onPress={handleLock}>
          <View style={styles.send}>
            {loader ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                Lock
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#F3F4F7',
  //   paddingHorizontal: wp(5),
  // },
  header: {
    paddingVertical: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper: {
    // paddingVertical: wp(2),
    // backgroundColor: '#fff',
    marginBottom: hp(1),
    borderRadius: wp(2),
    width: '100%',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F7',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
  },

  inputTxt: {
    color: '#000',
    fontSize: wp(4),
    height: 40,
    flex: 1,
  },
  inputTxtAmount: {
    color: '#000',
    fontSize: wp(4),
    height: 40,
  },
  maxLabels: {
    color: '#dd2e40',
    fontSize: hp(1.7),
    paddingVertical: wp(1),
  },

  labels: {
    color: '#444',
    fontSize: hp(1.6),
    paddingVertical: wp(1),
  },

  infowrapper: {
    backgroundColor: '#DFECF7',
    paddingHorizontal: wp(5),
    paddingVertical: wp(4),
    width:'100%',
    borderRadius: wp(3),
    marginTop: wp(3),
    marginHorizontal: wp(4),
  },
  displayHori: {
    flexDirection: 'row',
  },

  listItem: {
    color: '#003D87',
    marginBottom: wp(1),
    fontSize: wp(3), // Adjust this for spacing between items
  },
  bullet: {
    fontSize: 13,
    marginRight: 5,
    color: '#003D87',
  },

  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
  },
  disabledBtn: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
    opacity: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#777',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: hp(1.5),
    paddingVertical: wp(0.8),
  },
});

export default LockScreen;
