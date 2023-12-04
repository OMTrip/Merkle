import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const MnemonicPhraseList = () => {
  const navigation = useNavigation();
  const {mnemonic} = useSelector(store => store.wallet);

  console.log(mnemonic.split(' '), 'mnemonic');

  return (
    <View style={{flex:.85}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="arrow-back-ios"
            size={18}
            color={'#444'}
            onPress={() => navigation.goBack()}
          />
          <Text
            onPress={() => navigation.goBack()}
            style={{
              color: '#444',
              fontSize: hp(2),
            }}>
            Go Back
          </Text>
        </View>
      </View>
      <Text
        style={{color: '#000', fontSize: 24, textAlign: 'center', padding: 10}}>
        Mnemonic Phrase List
      </Text>
      <View style={{justifyContent:"space-between", flex:1}}>
      <View style={{justifyContent: 'space-between', width: '100%', marginBottom:50}}>
        {/* <FlatList
          numColumns={4}
          data={mnemonic.split(' ')}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{paddingHorizontal: 10}}
        /> */}
         <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent:"center", paddingVertical:10}}>
        {
          mnemonic.split(' ')?.map((item,i)=>{
            return (<View style={styles.itemContainer}>
            <Text style={styles.itemText}>{i+1}. {item}</Text>
          </View>)
          })

        }
        </View>
      </View>
      <View style={{padding: 10}}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#000',
            color: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={()=>{navigation.navigate("VerifyManually")}}
          >
          <Text style={{color: '#fff', fontSize: 20}}> Continue</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default MnemonicPhraseList;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: hp(5.5),
    paddingHorizontal:10,
    backgroundColor: '#F3F4F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
});
