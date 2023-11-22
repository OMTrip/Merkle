import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function Videocond2h() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Videocon d2h'}
        placeholder={'Customer ID'}
        validationText={'Customer ID min 4 max 14 digit'}
        ImagePath={require("../../../../assets/d2h.png")}
        goBack={"DthRecharge"}
      />
    </View>
  );
}
 