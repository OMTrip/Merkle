import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function MumbaiMetro() {
  return (
    <View style={{flex: 1}}>
      <AllRecharge
        OperatorDetails={'Mumbaie Metro'}
        placeholder={'Smart Card Number'}
        validationText={'Smart Card Number min 1 max 20 digit'}
        ImagePath={require('../../../../assets/MMRC_Logo.jpg')}
        goBack={'MetroRecharge'}
      />
    </View>
  );
}
