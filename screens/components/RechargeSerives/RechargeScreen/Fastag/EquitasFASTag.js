
import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function EquitasFASTag() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Equitas FASTag Recharge'}
        placeholder={'Vehicle Registration Number'}
        validationText={'Vehicle Registration Number min 4 max 15 digit'}
        ImagePath={require("../../../../assets/EQE.jpg")}
        goBack={"FastagRecharge"}
      />
    </View>
  );
}
 