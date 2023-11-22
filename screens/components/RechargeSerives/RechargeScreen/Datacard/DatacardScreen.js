import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function DatacardScreen() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Jio Fi'}
        placeholder={'Mobile Number (+91)'}
        validationText={'Smart Card Number min 14 max 14 digit'}
        ImagePath={require("../../../../assets/Jio-Logo.png")}
        goBack={"Datacard"}
      />
    </View>
  );
}
 