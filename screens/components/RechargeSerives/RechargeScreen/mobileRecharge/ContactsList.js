import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import Contact from './Contact';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../../../HomeScreen/HomeHeader';
import { useSelector } from 'react-redux';
// import Contacts from 'react-native-contacts';

const ContactsList = () => {
  // const {details} = useSelector((store =>store));
  // const {contacts} = details;
  const [reload, setReload] = useState(false);
  const [data, setData] = React.useState([]);


  // async function fetchContact() {
  //   true;
  //   setReload(true);

  //   await Contacts.requestPermission();
  //   const res = await Contacts.checkPermission();
  //   if(res){
  //    const result = await Contacts.getAll();
  //    setData(result)
  //   //  dispatch(setContacts(result))
  //   setReload(false);
  //   }
  //  };
  //  useEffect(()=>{
  //   if (data.length == 0) {
      // fetchContact();
  //   }

  //  },[])

  
  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  const renderItem = ({item, index}) => {
    return <Contact contact={item}  />;
  };
  return (
    <View style={styles.box}>
        <LinearGradient
          colors={['#000', '#061700']}
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 0}} 
          style={{
            height: hp(10),
            justifyContent: 'center',
            paddingHorizontal: hp(3),
          }}>
          <HomeHeader
            icons={true}
            iconName={'keyboard-backspace'}
            size={wp(8)}
            title={'Contact Lists'}
            TextTitle={true}
            menu={false}
          />
        </LinearGradient>
    {/* <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
      refreshing={reload}
          onRefresh={() => {
            setReload(true);
            fetchContact();
          }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontSize: 18,
                color: '#000',
              }}>
              No Contacts Found.
            </Text>
          </View>
        );
      }}
    /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
export default ContactsList;