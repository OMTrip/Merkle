import {View} from 'react-native';
import React from 'react';
import AllRecharge from '../../../RechargeSerives/RechargeScreen/AllRecharge';

export default function AdaniElectricity() {
  return (
    <View style={{flex: 1}}>
      <AllRecharge
        OperatorDetails={'Adani Electricity - Mumbai'}
        placeholder={'Consumer Number'}
        validationText={'Smart Card Number min 9 max 9 digit'}
        ImagePath={require('../../../../assets/Adani.jpg')}
        goBack={'ElectricityBill'}
      />
    </View>
  );
}
