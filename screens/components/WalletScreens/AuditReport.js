import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ceil} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Checkbox} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {red} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import {fetchChainData} from '../../../Utils/apis/api';
import Clipboard from '@react-native-clipboard/clipboard';
import {auditTemplate} from './tokenComponent/audit';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import {bscscan} from '../../../Services/history';
import AuditToken from './tokenComponent/AuditToken';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const LockScreen = props => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [allChain, setAllChain] = useState([]);
  const [activeChain, setActiveChain] = useState({
    blockExplorerUrl: 'https://testnet.bscscan.com',
    rpcUrl: 'https://data-seed-prebsc-2-s1.bnbchain.org:8545',
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
  });
  const [loader, setLoader] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [scanReportHTML, setScanReportHTML] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [errStatus, setErrStatus] = useState(false);

  const [tokenAddress, setTokenAddress] = React.useState('');

  const refChainSteet = useRef();

  const generatePDF = async (address, platform, type) => {
    try {
      setLoader(true);
      const options = {
        html: `${await auditTemplate(address, platform, type, jsonData)}`,
        fileName: 'AuditReport',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);

      const shareOptions = {
        title: 'Share PDF',
        url: `file://${pdf.filePath}`,
        type: 'application/pdf',
      };

      await Share.open(shareOptions);
      setLoader(false);
      setTokenAddress('');
    } catch (error) {
      setLoader(false);
      setTokenAddress('');
      console.error('Error generating and sharing PDF:', error);
    }
  };

  const loadScanReport = async (address, platform, type) => {
    setErrStatus(false);
    setisLoader(true);
    try {
      const apiEndpoint = `https://solidityscan.com/app/api-quick-scan-sse/?contract_address=${address}&contract_platform=${
        platform === 'bsc_testnet' ? 'bscscan' : platform
      }&contract_chain=${type}`;
      const response = await axios.get(apiEndpoint);
      const jsonDat = await response.data;
      console.log(jsonDat, 'jsonDat');
      setJsonData(jsonDat);
      setisLoader(false);
    } catch (error) {
      setErrStatus(true);
      setisLoader(false);
    }
  };

  function openChainSheet() {
    return refChainSteet.current.open();
  }
  function closeChainSheet() {
    return refChainSteet.current.close();
  }

  useEffect(() => {
    (async () => {
      const chainData = await fetchChainData();
      const ch = [...chainData];
      console.log(ch);
      setAllChain([...ch]);
    })();
  }, []);

  useEffect(() => {
    if (props?.route?.params?.qr) {
      setTokenAddress(props?.route?.params?.address);
    }
  }, [props?.route?.params?.qr]);

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
      style={{flex: 1, paddingHorizontal: wp(5)}}>
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
        </View>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2),
            fontWeight: '600',
          }}>
          Audit Report
        </Text>

        <Text
          style={{
            color: '#000',
            fontSize: hp(2),
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          Done
        </Text>
      </View>
    
      <View>
        <Text style={styles.labels}>Chain Type</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.input}>
          <TouchableOpacity
            onPress={() => {
              openChainSheet();
            }}
            style={styles.selectCard}>
            <Text style={styles.headinglabels}>{activeChain.name}</Text>

            <View>
              <MaterialIcons
                // onPress={() => openSheet()}
                style={{color:'#999'}}
                name="keyboard-arrow-right"
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <View style={styles.box}>
              <TextInput
                placeholder="Contract Addresss"
                placeholderTextColor={'#999'}
                style={styles.inputTxt}
                value={tokenAddress}
                onChangeText={val => {
                  setTokenAddress(val);
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    borderRadius: wp(2),
                    alignItems: 'center',
                    marginRight: wp(2),
                  }}>
                  <Ionicons
                    name="scan"
                    size={20}
                    color={'#444'}
                    onPress={() =>
                      navigation.navigate('QRImportToken', {
                        type: 'AuditReport',
                        data: {...props.route.params},
                      })
                    }
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#14b7af',
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    borderRadius: wp(2),
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="search"
                    size={20}
                    color={'#fff'}
                    onPress={() => {
                      loadScanReport(
                        tokenAddress,
                        activeChain.nativeCurrency.slug == 'bsc_testnet'
                          ? 'bscscan'
                          : activeChain.nativeCurrency.slug == 'bsc'
                          ? 'bscscan'
                          : activeChain.nativeCurrency.slug,
                        activeChain.mainnet ? 'mainnet' : 'testnet',
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1, marginTop:wp(2)}}>
        {/* <WebView
              originWhitelist={['*']}
              source={{html: scanReportHTML?scanReportHTML:`<h1 style="color: #000; text-align: center;">Your Report will be shown here.</h1>
              `}}
            /> */}
        {jsonData ? (
          <AuditToken jsonData={jsonData} />
        ) : errStatus ? (
          <Text style={{color: 'red', textAlign: 'center'}}>
            Something Went Wrong.
          </Text>
        ) : (
          <Text style={{color: '#999', textAlign: 'center'}}>
            Your Report will be shown here.
          </Text>
        )}
        {
          isLoader && (
            <ActivityIndicator size="20" color="#000" />)
        }
      </View>
      {/* </View> */}
      {jsonData && (
        <TouchableOpacity
          style={styles.send}
          onPress={() => {
            generatePDF(
              tokenAddress,
              activeChain.nativeCurrency.slug == 'bsc_testnet'
                ? 'bscscan'
                : activeChain.nativeCurrency.slug == 'bsc'
                ? 'bscscan'
                : activeChain.nativeCurrency.slug,
              activeChain.mainnet ? 'mainnet' : 'testnet',
            );
          }}>
          {loader ? (
            <ActivityIndicator size="10" color="#fff" />
          ) : (
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                padding: 10,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Share Report{' '}
              <Ionicons name="share-outline" size={20} color={'#fff'} />
            </Text>
          )}
        </TouchableOpacity>
      )}
      {/* </View> */}

      {/* <View>
        <TouchableOpacity>
          <View style={styles.send}>
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              View Audit Report
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
      <RBSheet
        ref={refChainSteet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={480}
        draggableIcon={false}
        openDuration={400}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            flex: 1,
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
                  Select Chain
                </Text>
              </View>

              {allChain?.map((item, i) => {
                return (
                  <TouchableOpacity
                    style={styles.tokenWrapper}
                    onPress={() => {
                      setActiveChain(item);
                      // setErrors({});
                      closeChainSheet();
                    }}
                    key={i + 'abc'}>
                    <View style={styles.tokenInfo}>
                      <Image
                        source={{
                          uri:
                            item?.slug &&
                            `https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item?.slug}/logo.png`,
                        }}
                        style={styles.flatImage}
                      />
                      <Text style={[styles.tokenName,{marginLeft:5}]}>{item.name}</Text>
                    </View>
                    {activeChain.chainId === item.chainId && (
                      <View>
                        <MaterialIcons
                          name="check"
                          size={18}
                          color={'#32CD32'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
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
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    MarginHorizontal: 10,
    paddingHorizontal: 10,
  },
  selectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#f3f4f8',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
  },

  wrapper: {
    // paddingVertical: wp(2),
    backgroundColor:'#f3f4f8',
    marginBottom: hp(2),
    borderRadius: wp(2),
    width: '100%',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  
    paddingHorizontal: wp(3),
  },

  input: {
    color: '#444',
    fontSize: 12,
  },

  inputTxt: {
    color: '#000',
    fontSize: wp(4),
    flex: 0.95,
    
  },



  maxLabels: {
    color: '#dd2e40',
    fontSize: hp(1.7),
    paddingVertical: wp(1),
  },

  labels: {
    color: '#444',
    fontSize: hp(1.5),
    paddingVertical: wp(1),
  },

  headinglabels: {
    color: '#999',
    fontSize: wp(4),
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
  tokenWrapper: {
    // backgroundColor: '#f3f4f7',
    paddingVertical: wp(2),
    // borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    // marginBottom: wp(2),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenName: {
    color: '#000',
    fontSize: hp(2),
  },


  sheetContainer: {
    flex: 1,
    // backgroundColor: '#eee',
    marginHorizontal: wp(5),
  },

  send: {
    alignSelf: 'center',
    padding: 5,
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

  flatImage: {
    width: 30, // Adjust width to your preference
    height: 30,
    borderRadius:wp(50),
    marginRight:wp(3)
  },
});

export default LockScreen;
