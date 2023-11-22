import {View} from 'react-native';
import React from 'react';
import AllRecharge from '../../../RechargeSerives/RechargeScreen/AllRecharge';

export default function EasternPower() {
  return (
    <View style={{flex: 1}}>
      <AllRecharge
        OperatorDetails={
          'APEPDCL - Eastern Power Distribution CO AP Ltd - ANDHRA PRADESH'
        }
        placeholder={'Service Number'}
        validationText={'Service Number min 8 max 20 digit'}
        ImagePath={require('../../../../assets/APEP.jpg')}
        goBack={'ElectricityBill'}
      />
    </View>
  );
}
