import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomSheetComp from './BottomSheetComp';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {
  getHDWallet,
  setDefaultAccount,
  createAccount,
} from '../../../Utils/web3/web3';
import {
  addWallet,
  createWallet,
  setActiveWallet,
  setInitialised,
  setMnemonic,
} from '../../../Store/web3';
import * as bip39 from 'bip39';
import * as crypto from 'crypto';
import {useDispatch, useSelector} from 'react-redux';
// import TypeWriter from 'react-native-typewriter';
import LinearGradient from 'react-native-linear-gradient';
import TypewriterComponent from './TypewriterComponent';
import {ScrollView} from 'react-native-gesture-handler';
import WalletScreen from './WalletScreen';
import {setIsLoggedIn} from '../../../Store/authSlice';

const CreateNewWallet = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {wallets, mnemonic} = useSelector(state => state.wallet);
  const {add} = props.route.params;
  console.log(props.route.params, ' props.route.params');
  const [walletName, setWalletName] = useState('Main Wallet');
  const [loading, setLoading] = useState(false);
  const [mnemonicWords, setMnemonicWords] = useState('');
  const [mnemonicWordsArray, setMnemonicWordsArray] = useState([]);
  const [mnemonicShuffled, setMnemonicShuffled] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const createPassword = async () => {
    try {
      if (add) {
        await setLoading(true);
        let account = await createAccount(walletName, wallets.length, mnemonic);
        const arr = [...wallets];
        arr?.push(account);
        dispatch(addWallet(arr));
        dispatch(setActiveWallet(wallets.length));
        setLoading(false);

        navigation.navigate('WalletScreen');
      } else {
        await setLoading(true);
        console.log('Before navigation');
        // navigation.navigate('TypewriterComponent');
        navigation.navigate('WalletScreen');
        // navigation.navigate('Home');

        console.log('After navigation');

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
        console.log(HDWallet?.address, ' wallet address');
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
            networks: ['0x775', '0x38', '0x1', '0x89', '0x61'],
            assets: [
              {
                chainId: '0x775',
                balance: '0',
                tokens: [
                  {
                    balance: 0,
                    chainId: '0x775',
                    slug: 'merkle',
                    decimals: 18,
                    logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/merkle/0xce5161293b416abebda86956c6ce20c75a1b942e/logo.png',
                    explorerLogo:
                      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
                    name: 'Big Tycoon',
                    possible_spam: false,
                    show: true,
                    type: 'token',
                    symbol: 'mBTYC',
                    thumbnail: null,
                    token_address: '0xce5161293b416abebda86956c6ce20c75a1b942e',
                  },
                  {
                    balance: 0,
                    chainId: '0x775',
                    slug: 'merkle',
                    decimals: 18,
                    logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/merkle/0xbB96b900EF03507b530D158cc5A0B0C8c3a8D178/logo.png',
                    explorerLogo:
                      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
                    name: 'Big Tycoon',
                    possible_spam: false,
                    show: true,
                    type: 'token',
                    symbol: 'BTYC',
                    thumbnail: null,
                    token_address: '0xbB96b900EF03507b530D158cc5A0B0C8c3a8D178',
                  },
                  {
                    balance: 0,
                    chainId: '0x775',
                    slug: 'merkle',
                    decimals: 18,
                    logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/merkle/0x1B1D576Bb6a1E364Ea4674e7A77fECB4BDf2bF08/logo.png',
                    explorerLogo:
                      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
                    name: 'BUZZBT',
                    possible_spam: false,
                    show: true,
                    type: 'token',
                    symbol: 'BUBT',
                    thumbnail: null,
                    token_address: '0x1B1D576Bb6a1E364Ea4674e7A77fECB4BDf2bF08',
                  },
                  {
                    balance: 0,
                    chainId: '0x775',
                    slug: 'merkle',
                    decimals: 18,
                    logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/merkle/0xC4B16708A2356e27178B34D9de406F850c317168/logo.png',
                    explorerLogo:
                      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
                    name: 'Big Shot',
                    possible_spam: false,
                    show: true,
                    type: 'token',
                    symbol: 'BSBT',
                    thumbnail: null,
                    token_address: '0xC4B16708A2356e27178B34D9de406F850c317168',
                  },
                ],
                nfts: [],
                slug: 'merkle',
                rpcUrl: 'https://marklechain-rpc.merklescan.com/',
                blockExplorerUrl: 'https://merklescan.com/',
                nativeCurrency: {
                  name: 'Merkle',
                  symbol: 'MRK',
                  decimals: 18,
                  balance: '0',
                  address: '0x0000000000000000000000000000000000000000',
                  slug: 'merkle',
                },
                show: true,
              },
              {
                chainId: '0x38',
                balance: '0',
                tokens: [
                  {
                    balance: 0,
                    chainId: '0x38',
                    slug: 'bsc',
                    decimals: 18,
                    logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x42dABca1aF369FBd9e8Ea286dAFBA45b23fC92D9/logo.png',
                    explorerLogo:
                      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
                    name: 'Big Tycoon',
                    possible_spam: false,
                    show: true,
                    type: 'token',
                    symbol: 'BTYC',
                    thumbnail: null,
                    token_address: '0x42dABca1aF369FBd9e8Ea286dAFBA45b23fC92D9',
                  },
                  {
                    balance: 0,
                    chainId: '0x38',
                    slug: 'bsc',
                    decimals: 18,
                    logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x2B9ec6d94199F80e63fBAa0a4A502E411B211058/logo.png',
                    explorerLogo:
                      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
                    name: 'BUZZBT',
                    possible_spam: false,
                    show: true,
                    type: 'token',
                    symbol: 'BUBT',
                    thumbnail: null,
                    token_address: '0x2B9ec6d94199F80e63fBAa0a4A502E411B211058',
                  },
                  {
                    balance: 0,
                    chainId: '0x38',
                    slug: 'bsc',
                    decimals: 18,
                    logo: 'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x0A23558A20A128F463b1E7034C89620c862c36F5/logo.png',
                    explorerLogo:
                      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
                    name: 'Big Shot',
                    possible_spam: false,
                    show: true,
                    type: 'token',
                    symbol: 'BSBT',
                    thumbnail: null,
                    token_address: '0x0A23558A20A128F463b1E7034C89620c862c36F5',
                  },
                ],
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
        // navigation.navigate('HomeScreen');
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
    // openModal()
    dispatch(setIsLoggedIn(true));
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
        style={{paddingBottom: wp(5), flex: 1}}>
        <ScrollView>
          <View style={styles.imgView}>
            <Image
              style={{width: wp(60), height: wp(80)}}
              source={require('../../assets/key-unlock-wallet.png')}
              resizeMode="contain"
            />
            <Text style={styles.text}>Welcome to Merkle Wallet</Text>
          </View>

          <View style={{justifyContent: 'center', marginTop: wp(45)}}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('CreateNewWallet',{add:false})}
              onPress={handleAddWallet}>
              {/* <TouchableOpacity onPress={openModal}> */}
              <View style={styles.boxView}>
                <View style={styles.BoxText}>
                  <View>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: wp(4.2),
                        // width: wp(50),
                        textAlign: 'center',
                      }}>
                      Create a Wallet
                    </Text>
                    <Text
                      style={{
                        color: '#ccc',
                        fontSize: wp(3.2),
                        textAlign: 'center',
                      }}>
                      I do not have a wallet
                    </Text>
                  </View>

                  <View style={{marginStart: wp(1)}}>
                    {loading ? <ActivityIndicator color={'#99dddd'} /> : null}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* <TouchableWithoutFeedback
          // onPress={() => refRBSheet.current.open()}>
          onPress={() => navigation.navigate('CreateNewWallet',{add:false})}>
          <View style={styles.boxView}>
            <View style={styles.BoxText}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp(4.2),
                  // width: wp(50),
                  textAlign: 'center',
                }}>
                Create a Wallet
              </Text>
              <Text
                style={{color: '#ccc', fontSize: wp(3.2), textAlign: 'center'}}>
                I do not have a wallet
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback> */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ImportAccountByPrivateKey');
              }}>
              <View style={[styles.boxView2, {marginTop: wp(5)}]}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: wp(70),
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp(4.2),
                      // width: wp(50),
                      textAlign: 'center',
                    }}>
                    Import a Wallet{' '}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp(3.2),
                      textAlign: 'center',
                    }}>
                    Import mnemonic phrases or private keys
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    // marginTop: 100,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 30,
    // marginRight: wp(29),
  },
  imgView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: wp(7),
    // width: wp(35),
    textAlign: 'center',
    // marginTop: wp(5),
    fontWeight: 'bold',
    paddingHorizontal: wp(14),
  },
  boxView: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    width: wp(80),
    paddingVertical: wp(3),
    // marginTop: wp(10),
    borderRadius: wp(10),
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView2: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    width: wp(80),
    paddingVertical: wp(3),
    // marginTop: wp(10),
    borderRadius: wp(10),
    // backgroundColor:'#fff'
  },
  BoxImg: {
    width: wp(10),
    height: hp(5),
    marginTop: wp(4),
    marginLeft: wp(3.5),
  },
  BoxText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: wp(70),
  },

  typeWriterText: {
    color: 'red',
    fontSize: 24,
  },
  typeWriterCursorText: {
    color: 'blue',
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#318f50',
  },
  title2: {
    // fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  input: {
    height: 40,
    color: '#000',
  },
  button: {
    backgroundColor: '#318f50',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 15,
    borderTopStartRadius: 5,
    borderBottomEndRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 5,
  },
});

export default CreateNewWallet;
