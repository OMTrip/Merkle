import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { cutAfterDecimal } from '../../../Utils/web3/helperFunction';


const SendTransactionDetail = (props) => {
  const navigation = useNavigation();
  const {data,extras,type,recieveAmount,sendAmount} = props.route.params;
  const {wallets, activeWallet} = useSelector(
    state => state.wallet,
  );
  const wallet = wallets[activeWallet];
//   const {blockNumber,chain,from,hash,functionName,methodId,value,txreceipt_status,symbol,timeStamp,gasPrice} = data;
  console.log(data,"data:::::::",extras,"extras:::::::",type,"data,extras",wallet.address);
//   const dat = JSON.parse(data)

function formatDate() {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    const date = new Date();
    return date.toLocaleString('en-US', options);
  }
  const formattedDate = formatDate();
  

  


   
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
           Transfer
          </Text>
        </View>

        <View style={{fontWeight: 'bold'}}>
          <Feather
            name="upload"
            size={25}
            style={{color: '#444', fontWeight: 'bold'}}
            //onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      <View style={{alignItems: 'center', paddingTop: 10}}>
        <View style={[styles.BodyBoxTitle, {marginBottom: 1}]}>
          <Text style={[styles.Icons, {paddingEnd: 3}]}></Text>
          <Text style={styles.valuetxt}>{sendAmount} {extras?.symbol} </Text>
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
          <Text style={styles.BodyBoxText}>${Number(sendAmount)*extras?.current_price}</Text>
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
                <Text style={styles.fromText}>{formattedDate}</Text>
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
                <Text style={styles.fromText}>SuccessFull</Text>
              </View>
            </View>

            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={{}}>
                  <Text style={styles.headText}>Sender </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>{wallet?.address?.slice(0,8)}...{wallet?.address?.slice(-6)}</Text>
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
              {/* <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.fromText}>{cutAfterDecimal(Number(data?.gasUsed)/10**Number(extras?.decimals),5)} {extras?.symbol}</Text>
                <Text style={styles.fromText}>($ {Number(data?.gasUsed) /10**Number(extras?.decimals)*extras?.current_price})</Text>
              </View> */}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginVertical: wp(3),
            }}>
            <Text style={{color: '#999', fontSize: hp(2.2)}}>
              View on block explorer
            </Text>
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
    paddingVertical: 15,
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

export default SendTransactionDetail;
