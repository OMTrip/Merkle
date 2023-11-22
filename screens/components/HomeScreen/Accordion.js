import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Accordion = ({title, content}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={{borderBottomWidth: 0.5, borderColor: '#ccc', marginBottom: 0, 
    padding:wp(4),  borderRadius: 0, marginStart:wp(3)}}>
      <TouchableWithoutFeedback onPress={() => setCollapsed(!collapsed)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingHorizontal: 10,
          }}>
          <Text style={{color: '#444', lineHeight:wp(5.5), fontSize:wp(3.6)}}>{title}</Text>
          <SimpleLineIcons
            style={{color: '#444'}}
            name={collapsed ? 'arrow-right' : 'arrow-down'}
            size={13}
          />
        </View>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={collapsed}>
        <View style={{paddingVertical: 10, color:'#000'}}>{content}</View>
      </Collapsible>
    </View>
  );
};

export default Accordion;
