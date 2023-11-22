import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function AirtelPaymentBank() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Airtel Payment Bank NETC FASTag'}
        placeholder={'Vehicle Registration Number'}
        validationText={'Vehicle Registration Number min 4 max 15 digit'}
        ImagePath={require("../../../../assets/airtel.jpg")}
        goBack={"FastagRecharge"}
      />
    </View>
  );
}
 