import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function AirtelTV() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Airtel Digital TV'}
        placeholder={'Customer ID'}
        validationText={'Customer ID min 10 max 10 digit'}
        ImagePath={require("../../../../assets/airtel.jpg")}
        goBack={"DthRecharge"}
      />
    </View>
  );
}
 