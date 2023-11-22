import {View} from 'react-native';
import React from 'react';
import AllRecharge from '../../../RechargeSerives/RechargeScreen/AllRecharge';

export default function SouthernPower() {
  return (
    <View style={{flex: 1}}>
      <AllRecharge
        OperatorDetails={
          'APSPDCL - Southern Power Distribution CO AP Ltd - ANDHRA PRADESH'
        }
        placeholder={'Service Number'}
        validationText={'Service Number min 9 max 13 digit'}
        ImagePath={require('../../../../assets/APSP.jpg')}
        goBack={'ElectricityBill'}
      />
    </View>
  );
}
