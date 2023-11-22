import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { cutAfterDecimal, toPlainString} from '../../../../Utils/web3/helperFunction';
import {estimateGasBridge, toAmount, xchainSwapOut} from '../../../../Utils/web3/xchainHelperFunction';
import Toast from 'react-native-toast-message';




const TransferPopup = ({
  visible,
  onClose,
  xchainFrom,
  xchainTo,
  xchainCoin,
  pairStatus,
  wallet,
  from,to,recieve
}) => {
  console.log(pairStatus,"prs")
  const [btnLoader,setBtnLoader]= useState(false);
  async function handleBridge() {
    setBtnLoader(true)
    try {
    const data = {
      token: xchainCoin.tokenAddress,
      amount: toPlainString(from * 10 ** xchainCoin.tokenDeciamls),
      chainId: xchainTo.chainId?.toString(),
      routerContract: xchainFrom.routerContract,
      underlying:xchainCoin.tokenUnderlyingContract
    };
    console.log(data,"data")
    const response = await xchainSwapOut(data, Toast, wallet);
    console.log(response,"response")
    if(response['status']==true){
      setBtnLoader(false)
    }else{
      setBtnLoader(false)
    }
  } catch (error) {
    setBtnLoader(false)
      console.log(error,"erorr")
  }
  }
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              height: 100,
              minWidth: 100,
              borderRadius: 50,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Icon name="info-with-circle" size={50} color="#000" />
          </View>
          <View style={styles.wrapper}>
            

            <View style={styles.row}>
              <View style={styles.col1}>
                <Text style={styles.boxText}> From Chain</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.boxText}>({pairStatus&&pairStatus.srcTokenContract.slice(0,5)}...{pairStatus&&pairStatus.srcTokenContract.slice(-5)}) {'\n'} {xchainFrom.name}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <MaterialIcons
                name="arrow-downward"
                size={24}
                color={'#444'}
                style={{paddingHorizontal: 10}}
                // onPress={() => navigation.goBack()}
              />
            </View>
            
            <View style={styles.row}>
              <View style={styles.col1}>
                <Text style={styles.boxText}>To Chain</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.boxText}>({pairStatus&&pairStatus.destTokenContract.slice(0,5)}...{pairStatus&&pairStatus.destTokenContract.slice(-5)}) {'\n'} {xchainTo.name}</Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
              
              ]}>
              <View style={styles.col1}>
                <Text style={styles.boxText}> Wallet Address</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.boxText}>{wallet.address.slice(0,5)}...{wallet.address.slice(-5)}</Text>
              </View>
            </View> 
            <View style={styles.row}>
              <View style={styles.col1}>
                <Text style={styles.boxText}>Send Amount</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.boxText}>{from} {xchainCoin.tokenSymbol}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col1}>
                <Text style={styles.boxText}>Recieve Amount</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.boxText}>{to} {xchainCoin.tokenSymbol}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col1}>
                <Text style={styles.boxText}>Estimated Fees</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.boxText}> {recieve} {xchainFrom.symbol}</Text>
              </View>
            </View>
          </View>
          <View style={{display:"flex",flexDirection:"row",}}>
          <TouchableOpacity
            onPress={handleBridge}
            style={{
              backgroundColor: '#000',
              borderRadius: 5,
              paddingHorizontal: 15,
              paddingVertical: 10,
              margin: 10,
              marginVertical:15
            }}>
             { btnLoader? <ActivityIndicator size="small" color="#fff" />:<Text style={{color: '#fff', fontSize: 18}}>Confirm</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{onClose();setBtnLoader(false)}}
            style={{
              backgroundColor: '#000',
              borderRadius: 5,
              paddingHorizontal: 15,
              paddingVertical: 10,
              margin: 10,
              marginVertical:15
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Close</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black', // Shadow for Android
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  wrapper: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingHorizontal:5
  },
  col1: {
    maxWidth: '50%',
    // backgroundColor:"red"
  },
  col2: {
    maxWidth: '50%',
    // backgroundColor:"red"
  },
  boxText: {color: '#000', fontWeight: '400', fontSize: 18},
});

export default TransferPopup;
