import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function DelhiMetro() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Delhi Metro'}
        placeholder={'Smart Card Number'}
        validationText={'Smart Card Number min 1 max 20 digit'}
        ImagePath={require("../../../../assets/DelhiMetro.png")}
        goBack={"MetroRecharge"}
      />
    </View>
  );
}
 