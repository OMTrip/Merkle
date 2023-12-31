import React, { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import makeBlockie from 'ethereum-blockies-base64';
import { useDispatch } from 'react-redux';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { createAccount } from '../../../Utils/web3/web3';
import { Colors as colors } from '../../assets/colors';

const Account = (props) => {
  const dispatch = useDispatch();
  

  const [accountName, setAccountName] = useState('');
  const [addAccountLoading, setAddAccountLoading] = useState(false);

  const addAccount = async () => {
    setAddAccountLoading(true);
    let account = await createAccount(accountName, props.index, props.mnemonic);
    dispatch(addWallet(account));
    dispatch(setActiveWallet(props.index));
    setAddAccountLoading(false);
    props.toggleAccountModal();
  };

  return (
    <>
      <Text style={{ textAlign: 'center', color: colors.text_01, fontSize: 16, fontWeight: '600' }}>Create Account</Text>
      <View style={{ backgroundColor: colors.transparent, width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: '10%' }}>
        <Image source={{ uri: makeBlockie('0x0000000000000000000000000000000000000000') }} style={{ width: 64, height: 64, borderRadius: 32 }} />
        <BottomSheetTextInput
          onChangeText={(text) => setAccountName(text)}
          placeholder='Account Name'
          placeholderTextColor={colors.text_02}
          style={{
            color: colors.text_01,
            backgroundColor: colors.ui_01,
            padding: 10,
            borderRadius: 10,
            width: '80%',
            height: 40,
            marginTop: 20,
          }} />
        <TouchableOpacity
          onPress={() => addAccount()}
          style={{
            backgroundColor: colors.interactive_01,
            padding: 10,
            borderRadius: 10,
            width: '60%',
            height: 40,
            marginTop: '10%',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {addAccountLoading ? (
            <ActivityIndicator size="small" color='#ffffff' />
          ) : (<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>Create</Text>)}
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Account;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
});