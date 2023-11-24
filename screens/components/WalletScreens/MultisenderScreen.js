import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import {Link, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ceil, wrap} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Checkbox} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {red} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import {fetchAssetData, fetchChainData} from '../../../Utils/apis/api';
import {
  multiSendEther,
  multiSendToken,
} from '../../../Utils/web3/web3Functions';
import {useSelector} from 'react-redux';
import Papa from 'papaparse';
import {fetch} from 'whatwg-fetch';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import NewlistScreen from './NewlistScreen';
import MultisenderWatchScreen from './MultisenderWatchScreen';

const MultisenderScreen = () => {
  const navigation = useNavigation();
  const refChainSteet = useRef();
  const [allChain, setAllChain] = useState([]);
  const [activeChain, setActiveChain] = useState({
    blockExplorerUrl: 'https://testnet.bscscan.com',
    chainId: '0x61',
    mainnet: false,
    name: 'BNB Smart Chain Testnet',
    nativeCurrency: {
      address: '0x0000000000000000000000000000000000000000',
      balance: '0',
      decimals: 18,
      name: 'Binance Coin',
      slug: 'bsc_testnet',
      symbol: 'BNB',
    },
    networkVersion: '97',
    nfts: [],
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    show: true,
    slug: 'bsc_testnet',
    tokens: [],
    type: 'coin',
  });
  const [text, setText] = useState('');
  const [pickedDocument, setPickedDocument] = useState(null);
  const {wallets, activeWallet} = useSelector(stat => stat.wallet);
  const [loader, setIsLoader] = useState(false);
  const [error, setIsError] = useState(false);

  const wallet = wallets[activeWallet];
  // console.log(activeChain);
  function convertJSONToCSV(data) {
    // const dat = JSON.parse(data)
    console.log(data, 'data');
    const filteredData = data.filter(
      item => item.address && item.value !== undefined,
    );
    const csvLines = filteredData
      .map(item => `${item.address},${item.value}`)
      .join('\n');
    return csvLines;
  }
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(result, 'result');
      setPickedDocument(result[0]);
      const res = result[0];

      if (res.type === 'text/csv') {
        console.log(res.uri, 'res.uri');
        // const response = await fetch(res.uri);
        const content = await RNFS.readFile(res.uri, 'utf8');
        console.log(content, 'response123');
        // setText(content);
        // const blob = await response.blob();
        // const text = await blob.text();

        Papa.parse(content, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            // const res = results.data.map(item => ({
            //   address: item.address.replace(/"/g, ''), // Remove double quotes
            //   value: item.value
            // }));
            const csv = convertJSONToCSV(results.data);
            console.log(csv, 'csv');
            setText(csv);
          },
          header: true,
        });
      } else {
        Alert.alert('Info', 'Please select a CSV file.');
      }
      // setPickedDocument(result);
    } catch (err) {
      console.log(err, 'ree');
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };
  async function handleNext() {
    const {recipients, amounts} = parseCSV(text);

    console.log(recipients, amounts);
    if (recipients.length != 0 && amounts.length != 0 && activeChain) {
      const nativetotal = amounts.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        0,
      );

      navigation.navigate('MultiSenderPreview', {
        recipients,
        amounts,
        nativetotal,
        activeChain,
      });
    } else {
      setIsError('Entered input is incorrect or empty.');
      setTimeout(() => {
        setIsError('');
      }, 5000);
    }
  }

  function parseCSV(csvData) {
    console.log(csvData);
    const rows = csvData.split('\n');
    const recipients = [];
    const amounts = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].trim();

      if (row === '') {
        continue;
      }

      const values = row.split(/[, ]+/);

      if (values.length === 2) {
        recipients.push(values[0]);
        const decimal =
          activeChain.type == 'coin'
            ? 10 ** Number(activeChain.nativeCurrency.decimals)
            : 10 ** Number(activeChain.decimals);
        const val1 = values[1];
        const value1 = (Number(val1) * decimal)?.toString();
        amounts.push(value1);
      }
    }

    return {
      recipients,
      amounts,
    };
  }

  useEffect(() => {
    async function fetchInitialDetails() {
      try {
        const chainData = await fetchChainData();
        const toKenData = await fetchAssetData();
        const cData = chainData?.map(ele => {
          const obj = {...ele};
          obj.type = 'coin';
          return obj;
        });

        const tData = toKenData?.map((ele, i) => {
          const obj = {...ele};
          obj.type = 'token';

          return obj;
        });

        const combinedList = [...cData, ...tData];
        setAllChain(combinedList);
      } catch (error) {
        console.log(error, 'err::token::fetching::');
        setAllChain([]);
      }
    }
    fetchInitialDetails();
  }, []);

  function openChainSheet() {
    return refChainSteet.current.open();
  }
  function closeChainSheet() {
    return refChainSteet.current.close();
  }
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
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2.2),
            fontWeight: '600',
          }}>
          Multisender
        </Text>

        <View>
          <MaterialCommunityIcons
            name="eye-outline"
            size={22}
            color={'#000'}
            onPress={()=> navigation.navigate(MultisenderWatchScreen)}
            
          />
        </View>
      </View>

      <View
        style={{alignItems: 'center', flex: 0.98, paddingHorizontal: wp(5)}}>
        <View style={styles.Tokenwrapper}>
          <View>
            <Text style={styles.labels}>Token</Text>
          </View>

          <TouchableOpacity style={styles.Tokeninput} onPress={openChainSheet}>
            <View style={styles.boxCoin}>
              <View>
                <Text style={styles.amountlabels}>
                  {' '}
                  {activeChain.type
                    ? activeChain.type == 'coin'
                      ? activeChain?.nativeCurrency?.name
                      : activeChain?.name
                    : 'Select Token'}
                </Text>
              </View>

              <View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color={'#999'}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View>
              <Text style={styles.labels}>Allocations</Text>
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder={`Insert Allocation: separate with breaks line.\nBy format:\naddress,amount\nEx:\n0x0000000000000000000000001,13.45\n0x0000000000000000000000000001,1.049\n0x00000000000000000000000000001,001 `}
                multiline
                numberOfLines={8}
                placeholderTextColor={'#bbb'}
                style={styles.textArea}
                setPickedDocument
                onChangeText={val => {
                  setText(val);
                }}
                value={text}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: wp(2),
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={styles.selectCard}>
            <TouchableOpacity onPress={pickDocument}>
              <Text style={{color: '#999'}}>
                {/* {pickedDocument?.name
                  ? pickedDocument?.name
                  : 'Choose CSV Files'} */}
                Choose CSV Files
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.maxLabels, {marginStart: wp(4)}]}>
              Sample CSV File
            </Text>
          </View>
        </View>
        {pickedDocument && (
          <View style={styles.fileInfo}>
            {/* <Text>URI: {pickedDocument.uri}</Text> */}
            <Text style={{color: '#777', fontWeight: 500}}>
              Name: {pickedDocument.name}
            </Text>
            {/* <Text style={{color:"#000",fontWeight:700}}>Type: {pickedDocument.type}</Text> */}

            {/* <Text>Size (in bytes): {pickedDocument.size}</Text> */}
          </View>
        )}

        <View style={styles.infowrapper}>
          <View style={styles.displayHori}>
            <View style={{width: '95%'}}>
              <Text style={[styles.listItem, {flexwrap: 'wrap'}]}>
                Please exclude 0X46584ddfd55324555435 from fees, rewards, max tx
                amount to start sending tokens.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{paddingHorizontal: wp(5)}}>
        {error && (
          <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
            {error}
          </Text>
        )}
        <TouchableOpacity
          style={styles.send}
          onPress={() => {
            handleNext();
          }}>
          {/* <View > */}
          {loader ? (
            <ActivityIndicator size="10" color="#fff" />
          ) : (
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: '700',
                textAlign: 'center',
                padding: 10,
              }}>
              Next
            </Text>
          )}
          {/* </View> */}
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refChainSteet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={550}
        draggableIcon={false}
        openDuration={10}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            flex: 0.96,
            width: '100%',
            // justifyContent: 'space-between',
            padding: 10,
          }}>
          <ScrollView>
            <View style={styles.sheetContainer}>
              <View style={{alignItems: 'center', paddingBottom: wp(2)}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '600',
                    paddingHorizontal: 10,
                    marginBottom: wp(2),
                  }}>
                  Select Token
                </Text>
              </View>

              <View style={{flex: 1, width: '100%', padding: 10}}>
                <FlatList
                  data={allChain}
                  keyExtractor={(item, id) => id.toString() + 'abc'} // Use a unique key
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.tokenWrapper}
                      onPress={() => {
                        setActiveChain(item);
                        closeChainSheet();
                      }}>
                      <View style={styles.tokenInfo}>
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{
                              uri: item.logo
                                ? item.logo
                                : `https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/Chains-main/Chains-main/resources/${item.slug}/logo.png`,
                            }}
                            style={styles.imageCoin}
                          />
                          {item.logo && (
                            <Image
                              source={{
                                uri:
                                  item.logo &&
                                  `https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/Chains-main/Chains-main/resources/${item.slug}/logo.png`,
                              }}
                              style={{
                                width: 20,
                                height: 20,
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                zIndex: 1,
                                borderRadius: 12,
                              }}
                            />
                          )}
                        </View>
                        <View style={{marginStart: wp(3)}}>
                          <Text style={styles.tokenName}>
                            {item?.type === 'coin'
                              ? item?.nativeCurrency?.symbol
                              : item.symbol}
                          </Text>
                          <Text style={styles.subtoken}>
                            {item?.type === 'coin'
                              ? item?.nativeCurrency?.name
                              : item?.name}
                          </Text>
                        </View>
                      </View>
                      {(activeChain.type === 'coin'
                        ? activeChain?.nativeCurrency?.slug ===
                          item?.nativeCurrency?.slug
                        : item.symbol === activeChain.symbol) && (
                        <View>
                          <MaterialIcons
                            name="check"
                            size={18}
                            color={'#32CD32'}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
    paddingHorizontal: wp(5),
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  wrapper: {
    // paddingVertical: wp(2),
    // backgroundColor: '#fff',
    marginBottom: hp(1),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
  },
  Tokenwrapper: {
    width: '100%',
  },
  Tokeninput: {
    color: '#444',
    fontSize: 12,
    paddingHorizontal: wp(2),
    backgroundColor: '#F3F4F7',
    paddingVertical: wp(3),
    marginBottom: hp(1),
    borderRadius: wp(2),
  },
  amountlabels: {
    color: '#999',
    fontSize: wp(4),
    // fontWeight: '600',
  },

  boxCoin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F7',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
  },
  selectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F7',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
  },
  input: {
    color: '#444',
    fontSize: 12,
  },
  inputTxt: {
    color: '#000',
    fontSize: wp(4),
    height: 40,
    flex: 1,
    // backgroundColor:'red'
  },
  textArea: {
    width: '100%',
    height: 150,
    color: '#000',
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

  fileInfo: {
    paddingHorizontal: wp(2),
    // paddingVertical: wp(2),
    width: '100%',
    borderRadius: wp(3),
    marginTop: wp(3),
    marginHorizontal: wp(4),
  },

  infowrapper: {
    backgroundColor: '#DFECF7',
    // color: '#E0F7E5',
    paddingHorizontal: wp(4),
    paddingVertical: wp(4),
    width: '100%',
    borderRadius: wp(3),
    marginTop: wp(3),
    marginHorizontal: wp(4),
  },
  displayHori: {
    flexDirection: 'row',
  },

  listItem: {
    color: '#003D87',
    fontSize: wp(3.2), // Adjust this for spacing between items
  },
  bullet: {
    fontSize: 13, // Adjust bullet size if needed
    marginRight: 5,
    color: '#003D87',
  },
  sheetContainer: {
    flex: 1,
    // backgroundColor: '#eee',
    marginHorizontal: wp(5),
  },

  send: {
    alignSelf: 'center',
    // padding: 15,
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
  tokenWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: wp(4),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCoin: {
    width: 35,
    height: 35,
    borderRadius: wp(50),
    marginEnd: wp(2),
    backgroundColor: '#eee',
    // borderWidth:0.5,
    // borderColor:'#ccc'
  },

  tokenName: {
    color: '#000',
    fontSize: hp(2),
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  subtoken: {
    color: '#999',
    fontSize: hp(1.5),
  },
});

export default MultisenderScreen;
