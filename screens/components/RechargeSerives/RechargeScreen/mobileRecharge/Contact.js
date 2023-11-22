import React, { useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { keepNumbersOnly } from '../../../../../Utils/web3/helperFunction';
import { useNavigation } from '@react-navigation/native';
const Contact = ({contact}) => {
    const navigation = useNavigation()
    const phone = keepNumbersOnly(contact?.phoneNumbers[0]?.number)
  

   
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate("MobileRecharge",{phone:phone}); }}>
    <View style={styles.contactCon} >
      <View style={styles.imgCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{contact?.givenName[0]}</Text>
        </View>
      </View>
      <View style={styles.contactDat}>
        <Text style={styles.name}>
          {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
          {contact?.familyName}
        </Text>
        <Text style={styles.phoneNumber}>
          {phone}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  contactCon: {
    marginTop:5,
    marginHorizontal:5,
    padding:10,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius:5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    elevation: 1,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05, 
    shadowRadius: 10,
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    color:"#000"
  },
  phoneNumber: {
    color: '#000',
  },
});
export default Contact;