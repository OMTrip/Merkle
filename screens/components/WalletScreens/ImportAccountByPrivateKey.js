import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';
//   import {useTheme} from '@/Hooks';
//   import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/Store';
//   import {AlertHelper} from '@/Utils/alertHelper';
import {
  ImportAccount,
  createAccount,
  isValidKey,
  validateMnemonic,
} from '../../../Utils/web3/web3';
import {addWallet, setActiveWallet} from '../../../Store/web3';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  pbkdf2Sync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from 'react-native-crypto';
import {GDrive} from '@robinbobin/react-native-google-drive-api-wrapper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

//   import MainHeader from '@/Components/MainHeader';
const {width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeHeader from '../HomeScreen/HomeHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import {setIsLoggedIn} from '../../../Store/authSlice';
import * as bip39 from 'bip39';
const ImportAccountByphrase = props => {
  // const {NavigationTheme} = useTheme();
  // const {t} = useTranslation();
  // const {colors} = NavigationTheme;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const textobj = {
  //   input: t('import_account.input'),
  //   input1: t('import_account.input1'),
  // };
  const {wallets, activeWallet, password, mnemonic} = useSelector(
    state => state.wallet,
  );
  const [Name, setName] = useState('');
  const [phrase, setPhrase] = useState('');
  const [accToken, setAccToken] = useState('');
  const salt = randomBytes(16).toString('base64');
  const ivs = randomBytes(16);
  //fceb4d5a37f4014e67503d5d8a443181d77be2ae03219b0df53be950a2900e93
  const [loading, setLoading] = useState(false);
  async function copyToClipboard() {
    const content = await Clipboard.getString();
    setPhrase(content);
  }
  const [input, setInput] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const wordList = bip39.wordlists.english;

  const suggestWords = (input) => {
    const words = input.split(/\s+/); // Split input into words
    const lastWord = words[words.length - 1]; // Get the last word
    const lowercaseLastWord = lastWord.toLowerCase(); // Convert the last word to lowercase
  
    if (lastWord.trim() !== "") {
      const matchingWords = wordList.filter(word => word.toLowerCase().startsWith(lowercaseLastWord));
      setSuggestions(matchingWords);
    } else {
      setSuggestions([]); // Clear suggestions if the last word is empty or only whitespace
    }
  };
  const handleSelection = (word) => {
    const updatedInput = selectedWords.concat([word]).join(' '); // Accumulate selected words
    setInput(updatedInput);
    setSelectedWords([...selectedWords, word]); // Update selected words array
    setSuggestions([]); // Clear suggestions after selection
  };

  GoogleSignin.configure({
    scopes: [
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file',
    ],
    webClientId:
      '228049925155-ndg4a11u7onh0plfkung42qngja11112.apps.googleusercontent.com',
    offlineAccess: true,
  });

  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = (await GoogleSignin.getTokens()).accessToken;
      setAccToken(token);

      return userInfo;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      return false;
    }
  }

  function decryptData(encryptedData, key, iv) {
    try {
      console.log(encryptedData, key, iv, 'encryptedData, key, iv');
      const decipher = createDecipheriv('aes-256-cbc', key, iv);
      console.log(decipher, 'decipher:::');

      const decryptedData = Buffer.concat([
        decipher.update(encryptedData, 'base64'),
        decipher.final(),
      ]);
      console.log(decryptedData, 'decryptedData:::');
      return decryptedData.toString('utf8');
    } catch (error) {
      console.log('err::', error);
      return '';
    }
  }

  function deriveEncryptionKey(password) {
    console.log('Password:', password);
    console.log('Salt:', salt);
    return pbkdf2Sync(password, salt, 10000, 32, 'sha256');
  }
  function isValidPrivateKey(privateKey) {
    const isHex = /^[0-9A-Fa-f]{64}$/.test(privateKey);

    return isHex;
  }

  async function verify(name, phrase) {
    setLoading(true);
    if (!isValidPrivateKey(phrase)) {
      if (name && name != '' && phrase && phrase != '') {
        console.log(name, phrase, 'name, phrase');

        try {
          if (phrase && validateMnemonic(phrase.trim())) {
            const account = await createAccount(
              name,
              0,
              phrase?.trim(),
              wallets.length,
            );
            const arr = [...wallets];
            arr?.push(account);
            dispatch(addWallet(arr));
            dispatch(setActiveWallet(wallets.length));
            setLoading(false);
            dispatch(setIsLoggedIn(true));
            navigation.navigate('WalletScreen');
            // console.log(account, 'import account');
          } else {
            await setLoading(true);
            console.log('come');
            Toast.show(
              'error',
              'Import Wallet',
              'Please Provide valid Phrase of your wallet',
            );
            // Alert.alert(
            //   'Error',
            //   'Please Provide valid Phrase of your wallet',
            // );
          }
        } catch (e) {
          setLoading(false);
          console.log('Import wallet Error:', e);
        }
      } else {
        setLoading(false);
        Toast.show(
          'error',
          'Import Wallet',
          'Please Provide Phrase of your wallet',
        );
      }
    } else {
      if (name && name != '' && phrase && phrase != '') {
        console.log(name, phrase, 'name, phrase');

        try {
          if (isValidPrivateKey(phrase)) {
            const account = await ImportAccount(
              name,
              wallets.length,
              phrase?.trim(),
            );
            const arr = [...wallets];
            arr?.push(account);
            dispatch(addWallet(arr));
            dispatch(setActiveWallet(wallets.length));
            setLoading(false);
            dispatch(setIsLoggedIn(true));
            navigation.navigate('WalletScreen');
            // console.log(account, 'import account');
          } else {
            await setLoading(true);
            console.log('come');
            Toast.show(
              'error',
              'Import Wallet',
              'Please Provide valid Private Key of your wallet',
            );
            // Alert.alert(
            //   'Error',
            //   'Please Provide valid Phrase of your wallet',
            // );
          }
        } catch (e) {
          setLoading(false);
          console.log('Import wallet Error:', e);
        }
      } else {
        setLoading(false);
        Toast.show(
          'error',
          'Import Wallet',
          'Please Provide Private Key of your wallet',
        );
      }
    }
  }

  async function saveEncryptedObjectToDrive(encryptedObject, fileName) {
    try {
      const data = await handleGoogleSignIn();
      if (data) {
        const gdrive = new GDrive();
        gdrive.accessToken = accToken;
        gdrive.fetchTimeout = 8000;
        const per = gdrive.permissions;
        if (per?.__accessToken) {
          const lst = await gdrive.files.list();
          // console.log(lst,"lst")
          const id = lst['files'][0].id;
          console.log(id, 'idd');
          const bin = await gdrive.files.getJson(id);
          //  console.log(bin.data,"bin123")
          const da = bin?.data;
          const decryptionKey = deriveEncryptionKey(phrase, salt);
          console.log(da, 'da');
          const dat = decryptData(da, decryptionKey, ivs);

          console.log(dat, 'darta1');
        }
      }
    } catch (error) {
      console.error('Error Fetching:', error);
    }
  }
  useEffect(() => {
    if (props?.route?.params?.qr) {
      setPhrase(props?.route?.params?.address);
    }
  }, [props]);

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
      style={{flex: 1}}>
      <View
        style={{
          // height: hp(10),
          justifyContent: 'center',
          paddingHorizontal: hp(2),
          paddingVertical: wp(3),
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          title={'Import Wallet'}
          TextTitle={true}
          leftIocnsSubScreen={false}
          LeftIconsName={'magnify'}
          routeName={'wallets'}
        />
      </View>
      <ScrollView>
        <KeyboardAvoidingView style={styles.inptcont}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: wp(4.2),
              paddingVertical: wp(2),
              color: '#000',
              // marginTop: wp(2),
            }}>
            Enter Mnemonics
          </Text>

          <Text
            style={{
              fontSize: wp(3),
              color: '#666',
            }}>
            Input your mnemonic phrases with spacing. Suppport 12-word, 24-word
            mnemonic phrases .
          </Text>

          <View style={[styles.password]}>
            {/* <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 18,
                  paddingVertical: 10,
                  color: colors.text_04,
                }}>
                Import Wallet By Private Key
              </Text> */}
            {/* <View style={styles.passwordView}>
              <TextInput
                value={Name}
                onChangeText={val => setName(val)}
                placeholder="Set Name"
                placeholderTextColor="#000"
                style={[
                  styles.passwordText,
                  {
                    color: '#000',
                    backgroundColor: '#fff',
                    borderColor: '#000',
                  },
                ]}
              />
            </View> */}
            <View style={styles.passwordView}>
              {/* <TextInput
                  value={phrase}
                  onChangeText={val => setPhrase(val)}
                  placeholder="Set phrase"
                  placeholderTextColor={"#000"}
                  multiline={true}
                  style={[
                    styles.passwordText,
                    {
                      color:"#000",
                      backgroundColor:"#fff",
                      borderColor: "#000",
                      height: 70,
                    },
                  ]}
                /> */}
              <View
                style={{
                  // flexDirection: 'row',
                  color: '#000',
                  backgroundColor: '#fff',
                  borderColor: '#ccc',
                  borderWidth: 0.5,
                  // alignItems: 'center',
                  // marginHorizontal: 20,
                  borderRadius: 3,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  value={input ? input :phrase}
                  onChangeText={val => {
                    setPhrase(val);
                    setInput(val);
                    suggestWords(val);
                  }}
                  placeholder="Enter Mnemonics "
                  // placeholder="Example: Disorderly mushrooms lemo broken twice optional scraps unhappy dinosaurs original utility"
                  placeholderTextColor="#999"
                  title="Enter Phrase"
                  numberOfLines={6}
                  multiline={true}
                  style={{
                    color: '#000',
                  }}
                />

                {/* <TouchableOpacity
                  onPress={()=>{navigation.navigate('QRImportToken',{type:'ImportAccountByPrivateKey',data:{"address": "", "qr": false}})}}
                  style={{
                    paddingHorizontal: 10,
                    paddingBottom: wp(2),
                    alignItems: 'flex-end',
                  }}>
                  <MaterialCommunityIcons
                    name="line-scan"
                    size={16}
                    color="#000"
                  />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <FlatList
          horizontal={true}
          scrollEnabled={true}
            data={suggestions}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleSelection(item)} style={{padding:hp(0.5),}}>
                <Text style={{padding:hp(1),backgroundColor:"rgba(255, 0, 54, 0.3)",borderRadius:5}}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            style={{}}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              verify(`Imported Account ${wallets.length + 1}`, phrase);
            }}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm</Text>
            )}
          </TouchableOpacity>

          <View style={styles.infowrapper}>
            <Text style={{color: '#000', marginBottom: wp(3)}}>Note</Text>

            <View style={styles.displayHori}>
              <Entypo name="dot-single" size={18} color={'#666'} />
              <Text style={styles.listItem}>
                Nute Wallet will not record your Mnemonics or Private Keys. You
                control the access and assets.
              </Text>
            </View>
            <View style={styles.displayHori}>
              <Entypo name="dot-single" size={18} color={'#666'} />
              <Text style={styles.listItem}>
                Please do not copy and paste the Mnemonics or Private Key to
                prevent the loss of assets due to third-party software
                monitoring.
              </Text>
            </View>
            <View style={styles.displayHori}>
              <Entypo name="dot-single" size={18} color={'#666'} />
              <Text style={styles.listItem}>
                It is recommended that you manully input your Mnemonic or
                Private Key or scan the QR code to import.
              </Text>
            </View>
          </View>

          {/* <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  paddingHorizontal: 30,
                  paddingVertical: 15,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  marginHorizontal: 30,
                  borderRadius: 20,
                  marginVertical: 15,
                }}>
                Note: Please provide a valid Phrase.
              </Text> */}

          {/* <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#000'}]}
            onPress={() => {verify(Name, phrase); saveEncryptedObjectToDrive()}}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Restore from Google Drive</Text>
            )}
          </TouchableOpacity> */}
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordText: {
    borderWidth: 1,
    // borderColor: '#CFD2D8',
    backgroundColor: '#f3f4f7',
    borderRadius: 5,
    width: '90%',
    height: 50,
    // margin: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: '400',
  },
  inptcont: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  password: {
    flex: 1,
    width: '100%',
  },
  passwordView: {
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    marginVertical: 15,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 12,
  },
  btn: {
    paddingVertical: wp(4),
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginVertical: wp(5),
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },

  infowrapper: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(4),
    borderRadius: wp(4),
    marginTop: wp(3),
    borderColor: '#ccc',
    borderWidth: 0.5,
  },

  listItem: {
    color: '#444',
    fontSize: wp(3.2), // Adjust this for spacing between items
  },
  bullet: {
    fontSize: 13, // Adjust bullet size if needed
    marginRight: 5,
    color: '#444',
  },
  displayHori: {
    flexDirection: 'row',
    marginBottom: wp(2),
    width: 290,
  },
});

export default ImportAccountByphrase;
