
import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function BankMaharshtra() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Bank Of Maharshtra FASTag'}
        placeholder={'Vehicle Registration Number'}
        validationText={'Vehicle Registration Number min 4 max 15 digit'}
        ImagePath={require("../../../../assets/BOM.png")}
        goBack={"FastagRecharge"}
      />
    </View>
  );
}
 