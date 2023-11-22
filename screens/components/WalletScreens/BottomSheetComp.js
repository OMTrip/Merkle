import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

export default function BottomSheetComp(props) {
  const navigation = useNavigation();
  const {refRBSheet} = props;
  return (
    <ScrollView>
      <RBSheet
        ref={props.refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={530}
        draggableIcon={false}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <Text style={{color: '#443344', fontSize: wp(5), fontWeight: '600'}}>
            Software Wallet
          </Text>
          <Entypo name="cross" size={30} color="#443344" />
        </View>
        <Text style={{color: '#443344', marginLeft: wp(5), fontWeight: '700'}}>
          Create
        </Text>
        <View style={styles.InputView}>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
              navigation.navigate('CreateNewWallet', {add: false});
            }}>
            <Text style={styles.InputText}>Create a New Wallet</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#443344',
            marginLeft: wp(5),
            fontWeight: '700',
            marginTop: 15,
          }}>
          Import
        </Text>
        <View style={styles.InputView}>
          <Text style={styles.InputText}>By Mnemonic Phrse</Text>
        </View>
        <View style={styles.InputView}>
          <Text style={styles.InputText}>By private key</Text>
        </View>
      </RBSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  InputView: {
    marginTop: hp(1),
    marginLeft: wp(4),
    width: wp(90),
    borderWidth: wp(0.3),
    borderColor: '#202020',
    padding: wp(3),
    borderRadius: 3,
  },
  InputText: {
    color: '#202020',
    fontSize: wp(4),
    fontWeight: '500',
  },
});
