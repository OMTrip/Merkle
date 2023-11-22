import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icons from '../Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';

const DecentralisedTools = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.box}>
        {/* <View style={styles.heading}>
          <Text style={styles.headingTxt}>Decentralised Tools</Text>
        </View> */}

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.iconsBox}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateTokenScreen');
              }}>
              <Icons
                imagePath={require('../../assets/services/token.png')}
                Text={'Create Token'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MultisenderScreen');
              }}>
              <Icons
                imagePath={require('../../assets/services/multisend.png')}
                Text={'Multisender'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AuditReport',{qr:false});
              }}>
              <Icons
                imagePath={require('../../assets/services/audit.png')}
                Text={'Audit Report'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LockScreen');
              }}>
              <Icons
                imagePath={require('../../assets/services/lock.png')}
                Text={'Lock'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LockScreen');
              }}>
              <Icons
                imagePath={require('../../assets/services/lock.png')}
                Text={'Pump'}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // display: 'flex',
    paddingBottom: 20,
  },
  title: {
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: '600',
    fontSize: wp(3.5),
    // backgroundColor:'#fff',
    marginBottom: wp(3),
  },
  iconsBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  heading: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderRadius: wp(2),
    backgroundColor: '#F2EDFC',
    padding: wp(2),
    color: '#000',
    width: '100%',
    marginBottom: wp(4),
  },
  headingTxt: {
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: '600',
  },
});

export default DecentralisedTools;
