
import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function BOB() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Bank Of Baroda'}
        placeholder={'Vehicle Registration Number'}
        validationText={'Vehicle Registration Number min 4 max 10 digit'}
        ImagePath={require("../../../../assets/BOB.png")}
        goBack={"FastagRecharge"}
      />
    </View>
  );
}
 