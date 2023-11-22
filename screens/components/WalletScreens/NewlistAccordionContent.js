import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const NewlistAccordionContent = ({title, content}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={{ backgroundColor:'#f3f4f7', marginBottom: 10, borderRadius:wp(3),
    padding:wp(3), marginHorizontal:wp(4)}}>
      <TouchableWithoutFeedback onPress={() => setCollapsed(!collapsed)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center'
            // paddingHorizontal: 10,
          }}>
          <View style={{flexDirection:'row',  alignItems:'center'}}>
            <Image
            source={require('../../assets/coins/ethereum.png')}
            style={{
              height: 30,
              width: 30,
            }}
            resizeMode="contain"
          />
          <Text style={{color: '#000', fontSize:wp(3.6), marginStart:wp(2)}}>{title}</Text>
          </View>
          <SimpleLineIcons
            style={{color: '#000'}}
            name={collapsed ? 'arrow-right' : 'arrow-down'}
            size={13}
          />
        </View>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={collapsed}>
        <View style={{padding:8, color:'#000'}}>{content}</View>
      </Collapsible>
    </View>
  );
};

export default NewlistAccordionContent;
