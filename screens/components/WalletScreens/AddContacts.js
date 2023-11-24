import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  Switch,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {Link, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const AddContacts = props => {
  const navigation = useNavigation();
  // const {back} = props.route.params;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <LinearGradient
        colors={[
          '#d6fffd',
          '#f2fffe',
          '#ffff',
          '#fff',
          '#fffaff',
          '#fef8ff',
          '#faf4ff',
          '#fcf5fe',
          '#f5eefe',
          '#f1e9fe',
        ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
        <View style={styles.header}>
          <Pressable
            style={{
              // backgroundColor:'#ccc',
            }}
            onPress={() => navigation.goBack()}>
           <MaterialIcons
              name="arrow-back"
              size={25}
              color={'#000'}
              onPress={() => navigation.goBack()}
            />
          </Pressable>
          <Text
              style={{
                color: '#444',
                fontSize: hp(2.2),
                fontWeight: '600',
                marginStart:wp(3)
              }}>
              Contact
            </Text> 
        </View>

        <View style={styles.Wrapper}>
          <TextInput
            placeholder="SnS ID"
            placeholderTextColor={'#999'}
            style={styles.inputTxt}
          />
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#F3F2F7',
  //   marginHorizontal: wp(5),
  // },
  header: {
    paddingVertical: hp(5),
    flexDirection: 'row',
    marginHorizontal: wp(5),
    alignItems:'center'
  },

  btn: {
    alignSelf: 'center',
    paddingHorizontal: wp(8),
    paddingVertical: wp(3),
    backgroundColor: '#000',
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
  },
  Wrapper: {
    backgroundColor: '#f3f2f8',
    borderRadius: wp(2),
    marginVertical: wp(5),
    marginHorizontal: wp(4),
  },
  inputTxt: {
    color: '#000',
    fontSize: wp(4),
    paddingHorizontal: wp(3),
  },

});

export default AddContacts;
