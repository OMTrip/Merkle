import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function SunDirect() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Sun Direct'}
        placeholder={'Smart Card Number'}
        validationText={'Smart Card Number min 11 max 11 digit'}
        ImagePath={require("../../../../assets/Sun.png")}
        goBack={"DthRecharge"}
      />
    </View>
  );
}
 