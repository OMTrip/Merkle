
import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function AxisBank() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Axis Bank'}
        placeholder={'Vehicle Registration Number'}
        validationText={'Vehicle Registration Number min 4 max 15 digit'}
        ImagePath={require("../../../../assets/Axisbank.jpg")}
        goBack={"FastagRecharge"}
      />
    </View>
  );
}
 