import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  getHDWallet,
  setDefaultAccount,
  createAccount,
} from '../../../Utils/web3/web3';
import {
  addWallet,
  createWallet,
  setActiveWallet,
  setAddMnemonic,
  setInitialised,
  setMnemonic,
} from '../../../Store/web3';
import * as bip39 from 'bip39';
import * as crypto from 'crypto';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const CreateMywallet = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {wallets, mnemonic} = useSelector(state => state.wallet);
  const {add} = props.route.params;
  const [walletName, setWalletName] = useState('');
  const [loading, setLoading] = useState(false);
  const [mnemonicWords, setMnemonicWords] = useState('');
  const [mnemonicWordsArray, setMnemonicWordsArray] = useState([]);
  const [mnemonicShuffled, setMnemonicShuffled] = useState([]);
  const createPassword = async () => {
    try {
      if (add) {
        await setLoading(true);
        let Mnemonic = bip39.generateMnemonic();
        let account = await createAccount(walletName, wallets.length, Mnemonic);
        const arr = [...wallets];
        arr?.push(account);
        dispatch(addWallet(arr));
        dispatch(setActiveWallet(wallets.length));
        setLoading(false);
        navigation.navigate('wallets');
      } else {
        await setLoading(true);
        console.log('come');
        // if (password.length < 8) {
        //   AlertHelper.show(
        //     'error',
        //     t('import.mnemonic'),
        //     t('import.errors.passwordLength'),
        //   );
        //   setLoading(false);
        //   return;
        // }
        console.log('come1');

        // if (password !== confirmPassword) {
        //   AlertHelper.show(
        //     'error',
        //     t('import.mnemonic'),
        //     t('import.errors.passwordsDoNotMatch'),
        //   );
        //   setLoading(false);
        //   return;
        // }
        console.log('come2');
        const randomBytes = crypto.randomBytes(16);
        const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));
        // let mnemonic = bip39.generateMnemonic();
        console.log('come3');
        const mnemonicArray = mnemonic.split(' ');
        setMnemonicWords(mnemonic);
        console.log('come4');
        setMnemonicWordsArray(mnemonicArray);
        console.log('come5');
        // Avoid repeating words
        const hasDuplicates =
          _.uniq(mnemonicArray).length !== mnemonicArray.length;
        if (hasDuplicates) {
          createPassword();
          return;
        }
        console.log('come6', hasDuplicates);
        let shuffled = _.shuffle(mnemonicArray);
        console.log('come7');
        setMnemonicShuffled(shuffled);
        console.log('come8', shuffled);
        // const _wallet = importWallet(mnemonic);
        // await setItem('mnemonic', mnemonic);
        // await setItem('privateKey', `${_wallet?.privateKey}`);
        // await setItem('isTouchIdEnabled', `${isTouchIdEnabled}`);
        let HDWallet = getHDWallet(0, mnemonic);
        console.log('come9');
        // console.log(HDWallet?.address, ' wallet address');
        let web3 = setDefaultAccount(HDWallet?.privateKey);
        dispatch(setMnemonic(mnemonic));
        // dispatch(setPassword(password));
        // const connection = new Connection('https://api.devnet.solana.com');
        // const balance = await web3.eth.getBalance(HDWallet?.address);
        // const solBalance = await connection.getBalance(
        //   new PublicKey(HDWallet?.solana.publicKey as any),
        // );
        // const uniqueId = await DeviceInfo.getUniqueId();
        // dispatch(setUniqueId(uniqueId));
        // OneSignal.setExternalUserId(uniqueId);
        dispatch(
          createWallet({
            index: 0,
            address: HDWallet?.address,
            privateKey: HDWallet?.privateKey,
            name: walletName,
            networks: ['0x38', '0x1'],
            assets: [
              {
                chainId: '0x38',
                balance: '0',
                tokens: [],
                nfts: [],
                nativeCurrency: {
                  name: 'Binance Coin',
                  symbol: 'BNB',
                  decimals: 18,
                  address: '0x0000000000000000000000000000000000000000',
                  slug: 'bsc',
                },
                show: true,
              },
              {
                chainId: '0x1',
                balance: '0',
                tokens: [],
                nfts: [],
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                  address: '0x0000000000000000000000000000000000000000',
                  slug: 'ethereum',
                },
                show: true,
              },
              {
                chainId: '0x89',
                balance: '0',
                tokens: [],
                nfts: [],
                nativeCurrency: {
                  name: 'Matic',
                  symbol: 'MATIC',
                  decimals: 18,
                  address: '0x0000000000000000000000000000000000000000',
                  slug: 'polygon',
                },
                show: true,
              },
              {
                chainId: '0x61',
                balance: '0',
                tokens: [],
                nfts: [],
                nativeCurrency: {
                  name: 'Binance Coin',
                  symbol: 'BNB',
                  decimals: 18,
                  balance: '0',
                  address: '0x0000000000000000000000000000000000000000',
                  slug: 'bsc_testnet',
                },
                show: true,
              },
            ],
            transactions: {
              ethereum: [],
              bsc: [],
              arbitrum: [],
              polygon: [],
              avalanche: [],
              optimism: [],
              fantom: [],
              cronos: [],
              merkle: [],
            },
          }),
        );
        dispatch(setActiveWallet(0));
        dispatch(setInitialised(true));
        setLoading(false);
        navigation.navigate('HomeScreen');
      }
    } catch (e) {
      setLoading(false);
      console.log(e, 'Error in createwallet');
    }
  };

  const handleAddWallet = () => {
    if (walletName.trim() === '' && walletName) {
      Alert.alert('Error', 'Please enter a wallet name');
      return;
    }
    createPassword();
  };

  return (
    <>
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
        style={{flex: 1}}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: wp(3),
              // justifyContent:'center'
            }}>
            <MaterialCommunityIcons
              name="arrow-back"
              size={25}
              color={'#000'}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                color: '#000',
                fontSize: hp(2.3),
                marginStart: wp(2),
                fontWeight: 600,
              }}>
              Create Wallet
            </Text>
          </View>
        </View>
        <View style={styles.pageWrapper}>
          <Text
            style={{
              fontWeight: '600',
              color: '#000',
              fontSize: wp(4.5),
            }}>
            Create your new wallet
          </Text>

          <Text
            style={{
              fontSize: wp(3.5),
              color: '#555',
              lineHeight: 20,
            }}>
            Enter a unique name for your wallet. It should be between 1 to 20
            characters long
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Wallet Name"
              placeholderTextColor="#bbb"
              value={walletName}
              onChangeText={text => setWalletName(text)}
              maxLength={20}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddWallet}>
          <View>
            <Text style={{marginEnd: wp(1)}}>
              {loading ? <ActivityIndicator color={'#99dddd'} /> : null}
            </Text>
          </View>
          <View>
            <Text style={styles.buttonText}>Create Wallet</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // // justifyContent: 'center',
    // padding: 16,
    // marginTop: 100,
  },

  header: {
    width: '100%',
    paddingVertical: hp(5.4),
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 5,
    // display: 'flex',
    justifyContent: 'space-between',
  },
  pageWrapper: {
    marginHorizontal: wp(5),
    marginVertical: wp(4),
    flex: 0.95,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  title2: {
    // fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 16,
    alignItems: 'center',
  },
  input: {
    height: 40,
    color: '#000',
    backgroundColor: '#f3f2f7',
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#eee',
    borderRadius: 5,
    paddingHorizontal: wp(4),
    fontSize: wp(4),
  },

  button: {
    paddingVertical: wp(4),
    backgroundColor: '#000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: wp(4),
    flexDirection: 'row',
  },
  buttonText: {
    // fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
});

export default CreateMywallet;
