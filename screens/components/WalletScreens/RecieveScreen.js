import {View, Text, StyleSheet, Share, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {Colors as colors} from '../../assets/colors';
import Clipboard from '@react-native-clipboard/clipboard';
import {addressAbbreviate} from '../../../Utils/web3/web3';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import SetAmount from './SetAmount';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RecieveScreen = props => {
  const [amm, setAmm] = useState('');
  console.log(amm, 'ammmmmm');

  const shareText = async () => {
    try {
      await Share.share({
        message: address ,
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  // const qrValue = 'https://example.com'; // Replace with your QR code value

  // const shareQRCode = async () => {
  //   try {
  //     const base64Data = `data:image/png;base64,${await QRCode.toDataURL(qrValue)}`;
  //     const shareOptions = {
  //       title: 'Share QR Code',
  //       url: base64Data,
  //       type: 'image/png',
  //     };

  //     await Share.open(shareOptions);
  //   } catch (error) {
  //     console.error('Error sharing QR Code:', error.message);
  //   }
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function createJSONString(address, amount) {
    const data = {address};
    if (amount !== '' && Number(amount) !== 0) {
      data.amount = amount;
    }
    return JSON.stringify(data);
  }

  const {address, image, symbol} = props.route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={25}
          color={'#000'}
          onPress={() => navigation.goBack()}
          style={{padding: 10}}
        />
        <Text
          style={{
            color: '#000',
            fontSize: hp(2.5),
          }}>
          Recieve {symbol}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.qrcont}>
          <QRCode
            size={180}
            value={createJSONString(address, amm)}
            logoSize={30}
            logoBackgroundColor={colors.ui_background}
            logoBorderRadius={50}
            // logoMargin={10}
            backgroundColor={colors.ui_background}
            color={colors.text_01}
            logo={
              address.startsWith('0x')
                ? {uri: image}
                : require('../../assets/coins/questions.jpeg')
            }
          />
          <View style={{width: wp(50), marginVertical: wp(2)}}>
            <Text style={{color: '#000', textAlign: 'center'}}> {address}</Text>
          </View>
        </View>

        <View style={styles.infowrapper}>
          <View
            style={{
              color: colors.text_01,
              flexDirection: 'row', //width (according to its parent)
              //its children will be in a column
            }}>
            <Feather
              name="info"
              size={25}
              color={'#000'}
              onPress={() => navigation.goBack()}
              style={{padding: 10}}
            />
            <View
              style={{
                width: wp(70),
              }}>
              <Text style={{color: '#124e88'}}>
                {' '}
                Send Only {symbol} (BEP20) to this address.
              </Text>
              <Text style={{color: '#124e88'}}>
                Sending any other coins may result in permanent loss.{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.iconWrapper}>
          <View style={styles.iconWithWrapper}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(address);
                Toast.show({
                  type: 'success',
                  text1: 'Copied to clipboard',
                  text2: address,
                });
              }}
              style={styles.circleIconBg}>
              <Ionicons name="copy-outline" size={16} color={'white'} />
            </TouchableOpacity>
            <Text
              style={{
                color: '#444',
                fontSize: 13,
              }}>
              Copy
            </Text>
          </View>
          <View style={styles.iconWithWrapper}>
            <TouchableOpacity onPress={openModal} style={styles.circleIconBg}>
              <View>
                <AntDesign name="tago" size={16} color={'#fff'} />
              </View>
            </TouchableOpacity>
            <SetAmount
              isVisible={modalVisible}
              closeModal={closeModal}
              setAmm={setAmm}
            />
            <Text
              style={{
                color: '#444',
                fontSize: 13,
              }}>
              Set Amount
            </Text>
          </View>

          <View style={styles.iconWithWrapper}>
            {/* <QRCode value={qrValue} size={20} /> */}
            <TouchableOpacity onPress={shareText} style={styles.circleIconBg}>
              <Ionicons name="md-share-social-sharp" size={16} color={'#fff'} />
            </TouchableOpacity>
            <Text
              style={{
                color: '#444',
                fontSize: 13,
              }}>
              Share
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.arrowBg}>
            <Feather
              name="arrow-down-left"
              size={20}
              color={'#000'}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={{
              width: wp(56),
              marginHorizontal: wp(3),
            }}>
            <Text style={{color: '#000', fontWeight: '600'}}>
              Deposit From Exchange
            </Text>
            <Text style={{color: '#444'}}>
              By direct transfer from your account
            </Text>
          </View>
          <Feather
            name="arrow-right"
            size={25}
            color={'#000'}
            onPress={() => navigation.goBack()}
            style={{paddingEnd: 15}}
          />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
    padding: wp(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',

    // justifyContent: 'center'
  },
  qrcont: {
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    marginBottom: wp(8),
    marginTop:wp(5),
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },

  infowrapper: {
    backgroundColor: '#D3E4FE',
    color: '#7085A2',
    padding: wp(5),
    width: wp(90),
    borderRadius: wp(3),
  },

  iconWrapper: {
    flexDirection: 'row',
    // backgroundColor:'#ccc',
    // width: '100%',
    // paddingHorizontal: 10,
    marginTop: wp(15),
    justifyContent: 'space-between',
    // alignItems: 'center',
    // textAlign:'center'
  },
  iconWithWrapper: {
    width: wp(25),
    alignItems: 'center',
    textAlign: 'center',
    // backgroundColor:'#fff',
  },

  circleIconBg: {
    backgroundColor: '#000',
    height: wp(12),
    width: wp(12),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border_02,
  },

  card: {
    backgroundColor: '#fff',
    width: wp(90),
    borderRadius: wp(4),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border_02,
    marginBottom: wp(3),
    marginHorizontal: wp(3),
  },
  cardInner: {
    // backgroundColor: '#eee',
    // height: wp(12),
    // width: wp(90),
    // borderRadius: wp(50),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    // borderWidth: 1,
    // borderColor: colors.border_02,
  },
  arrowBg: {
    backgroundColor: '#eee',
    height: wp(12),
    width: wp(12),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border_02,
    marginStart: wp(3),
  },
});

export default RecieveScreen;
