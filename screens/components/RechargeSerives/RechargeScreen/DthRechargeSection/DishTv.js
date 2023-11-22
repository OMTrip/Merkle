import {View, Text} from 'react-native';
import React from 'react';
import AllRecharge from '../AllRecharge';

export default function DishTv() {
  return (
    <View style={{flex:1}}>
      <AllRecharge
        OperatorDetails={'Dish TV'}
        placeholder={'Viewing Card Number'}
        validationText={'Viewing Card Number min 11 max 11 digit'}
        ImagePath={require("../../../../assets/dishTV.webp")}
        goBack={"DthRecharge"}
      />
    </View>
  );
}
 