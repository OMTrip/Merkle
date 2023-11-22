import {View} from 'react-native';
import React from 'react';
import AllRecharge from '../../../RechargeSerives/RechargeScreen/AllRecharge';

export default function ArunanchalPradesh() {
  return (
    <View style={{flex: 1}}>
      <AllRecharge
        OperatorDetails={'Arunachal Pradesh - Department of Power'}
        placeholder={'Consumer Number'}
        validationText={'Consumer Number min 11 max 11 digit'}
        ImagePath={require('../../../../assets/Arunachal.png')}
        goBack={'ElectricityBill'}
      />
    </View>
  );
}
