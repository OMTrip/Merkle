import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const QRCodeScannerComponent = props => {
  const {type, data} = props.route.params;
  const path = type == 'send' ? type : 'alltoken';
  const navigation = useNavigation();
  const [torchon, setTorchOn] = useState(false);
  const onSuccess = e => {
    const pobj = {...data};
    console.log(pobj, 'pobj:::::::');
    const addr = e?.data;
    const fad = addr;
    const obj = {
      ...pobj,
      qr: true,
      type: 'send',
      address: fad,
    };
    navigation.navigate(path, {...obj});
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Ionicons
          name="close"
          size={22}
          color={'#444'}
          onPress={() => navigation.goBack()}
        />
        <Ionicons
          name="flashlight"
          size={22}
          color={'#444'}
          onPress={() => {
            setTorchOn(!torchon);
            console.log(RNCamera.Constants.FlashMode.torch);
          }}
        />
      </View>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={
          torchon
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        showMarker={true}
        markerStyle={{
          borderRadius: 10,
          borderColor: '#fff',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
        vibrate={true}
        reactivate={true}
        reactivateTimeout={5000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  header: {
    width: '100%',
    paddingVertical: hp(5.5),
    // backgroundColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRCodeScannerComponent;
