import {View} from 'react-native';
import React from 'react';
import AllRecharge from '../../RechargeSerives/RechargeScreen/AllRecharge';

export default function AjmerElectricity() {
  return (
    <View style={{flex: 1}}>
      <AllRecharge
        OperatorDetails={'Ajmer Vidyut Vitran Nigam - RAJASTHAN'}
        placeholder={'K Number'}
        validationText={'K Number min 12 max 12 digit'}
        ImagePath={require('../../../assets/Ajmer.png')}
        goBack={'ElectricityBill'}
      />
    </View>
  );
}
