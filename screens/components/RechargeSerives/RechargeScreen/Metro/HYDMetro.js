import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function HYDMetro() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Hyderabad Metro'}
        placeholder={'Smart Card Number'}
        validationText={'Smart Card Number min 14 max 14 digit'}
        ImagePath={require("../../../../assets/HYDMetro.png")}
        goBack={"MetroRecharge"}
      />
    </View>
  );
}
 