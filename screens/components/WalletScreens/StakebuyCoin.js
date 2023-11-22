import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
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
import {useSelector} from 'react-redux';

const StakebuyCoin = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={'#444'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{color: '#444', fontSize: hp(2)}}
            onPress={() => navigation.goBack()}>
            Stake TRX
          </Text>
        </View>
        <View style={{width:wp(53)}}>
          <Text
            style={{
              color: '#444',
              fontSize: hp(2.1),
              fontWeight: '600',
            }}>
            Stake
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center', paddingTop: 10}}>
        <View style={[styles.BodyBoxTitle, {marginBottom: 1}]}>
          <Text style={[styles.Icons, {paddingEnd: 3}]}></Text>
          <Text style={styles.valuetxt}> 1 TRX</Text>
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
          <Text style={styles.BodyBoxText}>INR 0.08</Text>
        </View>
      </View>
      <View style={{flex: 0.95, alignItems: 'center'}}>
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
                  <Text style={styles.headText}>Assets </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>Tron (TRX)</Text>
              </View>
            </View>
            <View style={styles.colTranx}>
              <View style={styles.transactionCardsInner}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headText}>From </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>
                  {' '}
                  Main Wallet (TPGdwnD...hnBG8gM)
                </Text>
              </View>
            </View>
            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={{}}>
                  <Text style={styles.headText}>Validator </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromText}>TRONScan</Text>
              </View>
            </View>
          </View>
          <View style={styles.transactionCards}>
            <View style={styles.colTranx}>
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
              <View>
                <Text style={styles.fromText}>0 TRX ($0.00)</Text>
              </View>
            </View>

            <View style={styles.colTranxLast}>
              <View style={styles.transactionCardsInner}>
                <View style={{}}>
                  <Text style={styles.headText}>Max Total </Text>
                </View>
              </View>
              <View>
                <Text style={styles.fromTextBold}>$0.08</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.send}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Confirm
        </Text>
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
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
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

  transactionCards: {
    paddingHorizontal: wp(4),
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
    paddingVertical: wp(3),
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

  fromTextBold: {
    color: '#000',
    fontSize: hp(1.8),
    fontWeight: '600',
  },
  valuetxt: {
    color: '#000',
    fontSize: hp(4),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
});

export default StakebuyCoin;
