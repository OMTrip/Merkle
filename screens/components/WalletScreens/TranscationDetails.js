import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Link, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  cutAfterDecimal,
  formatDateFromTimestamp,
} from '../../../Utils/web3/helperFunction';
import {useDispatch, useSelector} from 'react-redux';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {ConfirmTransactionHtml} from './ConfirmTransactionHtml';
import Share from 'react-native-share';
import {setTransferAllPrice} from '../../../Store/userinfo';

const TranscationDetails = props => {
  const {networks, wallets, activeWallet, chainInfo} = useSelector(
    state => state.wallet,
  );
  const MerklePrice = useSelector(state => state.user?.merklePrice);
  const BtycPrice = useSelector(state => state.user?.BtycPrice);
  const BsbtPrice = useSelector(state => state.user?.BsbtPrice);
  const BubtPrice = useSelector(state => state.user?.BubtPrice);
  const MBtycPrice = useSelector(state => state.user?.MBtycPrice);
  const dispatch = useDispatch();
  const mynetwork = wallets[activeWallet].assets;
  const navigation = useNavigation();
  const {data, extras} = props.route.params;

  const {
    blockNumber,
    chain,
    from,
    hash,
    functionName,
    methodId,
    value,
    txreceipt_status,
    symbol,
    timeStamp,
    gasPrice,
  } = data;
  console.log(extras.symbol, 'data----');
  useEffect(() => {
    dispatch(
      setTransferAllPrice(
        cutAfterDecimal(
          Number(data?.logs?.value) / 10 ** Number(extras?.decimals),
          5,
        ),
      ),
    );
  }, []);
  // const generatePDF = async (data, extras) => {
  //   const options = {
  //     html: `${ConfirmTransactionHtml(data,extras)}`,
  //     fileName: 'transaction_details',
  //     directory: 'Documents',
  //   };
  //   try {
  //     const pdf = await RNHTMLtoPDF.convert(options);
  //     const pdfFilePath = pdf.filePath;
  //     const publicDir = RNFS.ExternalDirectoryPath;
  //     const publicFilePath = `${publicDir}/transaction_details.pdf`;

  //     await RNFS.copyFile(pdfFilePath, publicFilePath);

  //     return publicFilePath;
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     return null;
  //   }
  // };

  // const handleDownloadPDF = async () => {
  //   const url = await generatePDF(data, extras);;
  //   const filePath = RNFS.DocumentDirectoryPath + '/transaction_details.pdf';
  //   console.log(filePath,"filePathfilePath")

  //   RNFS.downloadFile({
  //     fromUrl:`file://${url}`,
  //     toFile: filePath,
  //     background: true, // Enable downloading in the background (iOS only)
  //     discretionary: true, // Allow the OS to control the timing and speed (iOS only)
  //     progress: (res) => {
  //       // Handle download progress updates if needed
  //       const progress = (res.bytesWritten / res.contentLength) * 100;
  //       console.log(`Progress: ${progress.toFixed(2)}%`);
  //     },
  //   })
  //     .promise.then((response) => {
  //       console.log('File downloaded!', response);
  //     })
  //     .catch((err) => {
  //       console.log('Download error:', err);
  //     });
  // };

  // const handleDownloadPDF = async () => {
  //   try {
  //     const pdfFilePath = await generatePDF(data, extras);

  //     console.log(pdfFilePath,"pdfFilePathpdfFilePath")

  //     if (pdfFilePath) {
  //       const supported = await Linking.canOpenURL(`file://${pdfFilePath}`);

  //       if (supported) {
  //         await Linking.openURL(`file://${pdfFilePath}`);
  //       } else {
  //         Alert.alert('Info',"This device does not support viewing PDF files.");
  //       }
  //     } else {
  //       console.warn("PDF file not found.");
  //     }
  //   } catch (error) {
  //     console.error('Error handling PDF download:', error);
  //   }
  // };

  const generatePDF = async () => {
    try {
      const options = {
        html: `${ConfirmTransactionHtml(
          data,
          extras,
          MerklePrice,
          BsbtPrice,
          BubtPrice,
          BtycPrice,
          MBtycPrice,
        )}`,
        fileName: 'transaction_details',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);

      const shareOptions = {
        title: 'Share PDF',
        url: `file://${pdf.filePath}`,
        type: 'application/pdf',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error generating and sharing PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent:'center'
          }}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={'#444'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{color: '#444', fontSize: hp(2.3)}}
            onPress={() => navigation.goBack()}>
            Back
          </Text>
        </View>
        <View style={{textAlign: 'center'}}>
          <Text
            style={{
              color: '#444',
              fontSize: hp(2.1),
              fontWeight: '600',
            }}>
            {/* { functionName?.length>0?functionName:methodId=="0x"?"Transfer":"Contract Call"} */}
          </Text>
        </View>

        <View style={{fontWeight: 'bold'}}>
          <Feather
            name="upload"
            size={25}
            style={{color: '#444', fontWeight: 'bold'}}
            onPress={generatePDF}
          />
        </View>
      </View>

      <View style={{alignItems: 'center', paddingTop: 10}}>
        <View style={[styles.BodyBoxTitle, {marginBottom: 1}]}>
          <Text style={[styles.Icons, {paddingEnd: 3}]}></Text>
          <Text style={styles.valuetxt}>
            {data.is_erc20
              ? cutAfterDecimal(
                  Number(data?.logs?.value) / 10 ** Number(extras?.decimals),
                  5,
                )
              : cutAfterDecimal(
                  Number(data.value) / 10 ** Number(extras?.decimals),
                  5,
                )}{' '}
            {extras.symbol}
          </Text>
        </View>
        <View
          style={[
            styles.BodyBoxTitle,
            {marginBottom: 10, flexDirection: 'row', alignItems: 'center'},
          ]}>
          <MaterialCommunityIcons
            name={'approximately-equal'}
            size={wp(6)}
            style={{marginTop: hp(0.5), color: '#ccc'}}
          />
          <Text style={styles.BodyBoxText}>
            $
            {extras.symbol === 'mBTYC'
              ? data.is_erc20
                ? cutAfterDecimal(
                    (Number(data?.logs?.value) /
                      10 ** Number(extras?.decimals)) *
                      MBtycPrice,
                    5,
                  )
                : (Number(data?.value) / 10 ** Number(extras?.decimals)) *
                  MBtycPrice
              : extras.symbol === 'BUBT'
              ? data.is_erc20
                ? cutAfterDecimal(
                    (Number(data?.logs?.value) /
                      10 ** Number(extras?.decimals)) *
                      BubtPrice,
                    5,
                  )
                : (Number(data?.value) / 10 ** Number(extras?.decimals)) *
                  BubtPrice
              : extras.symbol === 'BSBT'
              ? data.is_erc20
                ? cutAfterDecimal(
                    (Number(data?.logs?.value) /
                      10 ** Number(extras?.decimals)) *
                      BsbtPrice,
                    5,
                  )
                : (Number(data?.value) / 10 ** Number(extras?.decimals)) *
                  BsbtPrice
              : extras.symbol === 'BTYC'
              ? data.is_erc20
                ? cutAfterDecimal(
                    (Number(data?.logs?.value) /
                      10 ** Number(extras?.decimals)) *
                      BtycPrice,
                    5,
                  )
                : (Number(data?.value) / 10 ** Number(extras?.decimals)) *
                  BtycPrice
              : extras.symbol === 'MRK'
              ? data.is_erc20
                ? cutAfterDecimal(
                    (Number(data?.logs?.value) /
                      10 ** Number(extras?.decimals)) *
                      MerklePrice,
                    5,
                  )
                : (Number(data?.value) / 10 ** Number(extras?.decimals)) *
                  MerklePrice
              : data.is_erc20
              ? cutAfterDecimal(
                  (Number(data?.logs?.value) / 10 ** Number(extras?.decimals)) *
                    extras?.current_price,
                  5,
                )
              : (Number(data?.value) / 10 ** Number(extras?.decimals)) *
                extras?.current_price}
          </Text>
        </View>
      </View>

      <View style={{flex: 0.98, alignItems: 'center'}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#F3F4F7',
            // flex: 1,
            marginTop: hp(2),
          }}>
          <View style={styles.transactionCards}>
            <View style={styles.colTranx}>
              <View style={styles.transactionCardsInner}>
                <View style={{}}>
                  <Text style={styles.headText}>Date </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>
                  {formatDateFromTimestamp(timeStamp)}
                </Text>
              </View>
            </View>

            <View style={styles.colTranx}>
              <View style={styles.transactionCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>Status </Text>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    style={{color: '#bbb', fontWeight: '600'}}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>
                  {txreceipt_status == '1' ? 'Completed' : 'Failed'}
                </Text>
              </View>
            </View>

            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={{}}>
                  <Text style={styles.headText}>Sender </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>
                  {from?.slice(0, 8)}...{from?.slice(-6)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.transactionCards}>
            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>Network Fee </Text>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    style={{color: '#bbb', fontWeight: '600'}}
                  />
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.fromText}>
                  {cutAfterDecimal(Number(data.gas) / 10 ** Number(9), 6)}{' '}
                  {extras.symbol}
                </Text>
                <Text style={styles.fromText}>
                  (${' '}
                  {extras.symbol === 'mBTYC'
                    ? cutAfterDecimal(
                        (Number(data.gas) / 10 ** Number(9)) * MBtycPrice,
                        6,
                      )
                    : extras.symbol === 'BUBT'
                    ? cutAfterDecimal(
                        (Number(data.gas) / 10 ** Number(9)) * BubtPrice,
                        6,
                      )
                    : extras.symbol === 'BSBT'
                    ? cutAfterDecimal(
                        (Number(data.gas) / 10 ** Number(9)) * BsbtPrice,
                        6,
                      )
                    : extras.symbol === 'BTYC'
                    ? cutAfterDecimal(
                        (Number(data.gas) / 10 ** Number(9)) * BtycPrice,
                        6,
                      )
                    : extras.symbol === 'MRK'
                    ? cutAfterDecimal(
                        (Number(data.gas) / 10 ** Number(9)) * MerklePrice,
                        6,
                      )
                    : cutAfterDecimal(
                        (Number(data.gas) / 10 ** Number(9)) *
                          extras.current_price,
                        6,
                      )}
                  )
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginVertical: wp(3),
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BrowserScreenExternalLink', {
                  url: `${chainInfo[data?.chain]?.blockExplorerUrl}/tx/${hash}`,
                })
              }>
              <Text style={{color: '#999', fontSize: hp(2.2)}}>
                View on block explorer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
  },
  header: {
    width: '100%',
    paddingVertical: hp(5),
    backgroundColor: '#F3F4F7',
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },

  optext: {
    color: '#444',
    fontSize: hp(1.7),
    fontWeight: '400',
    textAlign: 'center',
  },
  BodyBoxTitle: {
    flexDirection: 'row',
  },
  BodyBoxText: {
    fontWeight: '400',
    color: '#888',
  },
  Icons: {
    fontSize: wp(6),
    color: '#000',
    fontWeight: '500',
    // paddingHorizontal: 3,
  },

  colTranx: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  colTranxLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 0,
  },

  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#080',
    borderRadius: 7,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },

  transactionCards: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: hp(2),
    marginVertical: hp(1),
    color: '#444',
    borderRadius: 6,
  },

  transactionCardsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingVertical: wp(4),
  },

  headText: {
    color: '#444',
    fontSize: hp(1.8),
    fontWeight: '600',
  },
  infoIcon: {
    color: '#666',
    fontSize: hp(1.8),
  },

  fromText: {
    color: '#888',
    fontSize: hp(1.8),
  },
  valuetxt: {
    color: '#000',
    fontSize: hp(4),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default TranscationDetails;
