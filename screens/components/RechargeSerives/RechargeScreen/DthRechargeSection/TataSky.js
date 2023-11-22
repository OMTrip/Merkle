import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function TataSky() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Tata Sky'}
        placeholder={'Subscriber ID'}
        validationText={'Subscriber ID min 10 max 10 digit'}
        ImagePath={require("../../../../assets/tatasky.png")}
        goBack={"DthRecharge"}
      />
    </View>
  );
}
 