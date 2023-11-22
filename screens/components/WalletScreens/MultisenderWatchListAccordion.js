import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const MultisenderWatchListAccordion = ({title, content}) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleAccordion = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View
      style={{
        backgroundColor: '#f3f4f7',
        marginBottom: 10,
        borderRadius: wp(3),
        padding: wp(2),
        marginHorizontal: wp(4),
      }}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width:60}}>
            <Text style={styles.ColumnTxt}>{title.column1}</Text>
          </View>
          <View style={{width:60}}>
            <Text style={styles.ColumnTxt}>{title.column2}</Text>
          </View>
          <View style={{width:90,}}>
            <Text style={styles.ColumnTxt}>{title.column3}</Text>
          </View>
          <View style={{width:60, flex:1}}>
            <Text style={styles.ColumnTxt}>{title.column4}</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              style={{color: '#000'}}
              name={collapsed ? 'eye-off-outline' : 'eye-outline'}
              size={13}
            />
          </View>
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>
        <View style={{paddingTop:8,  color: '#000'}}>{content}</View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  ColumnTxt: {color: '#666', fontSize: wp(3.2), fontWeight: '500'},
});

export default MultisenderWatchListAccordion;
