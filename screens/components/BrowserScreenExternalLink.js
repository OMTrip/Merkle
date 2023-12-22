import {Link, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchHistory} from '../../Store/userinfo';

const BrowserScreenExternalLink = (props) => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const {searchhistoryupdate, searchHistory} = useSelector(state => state.user);
  useEffect(()=>{
    if(props?.route?.params?.url){
      setSearchText(props?.route?.params?.url)
      goForSearch(props?.route?.params?.url, 0)
    }

  },[props])

  function goForSearch(text, type) {
    
    try {
      const arr = [...history];
      if (text && text != '' && text.length > 0) {
        if (!arr.find(it => it.text == text?.trim())) {
          if (type == 0) {
            const obj = {
              text: text,
              index: arr.length,
            };
            // arr.push(obj);
            dispatch(setSearchHistory({...obj}));
            // setHistory([...arr]);
          }
        }
        navigation.navigate('Browser', {
          searchdata: {
            text: text,
          },
        });
      }
    } catch (e) {
      console.log(e, 'Error');
    }
  }

  useEffect(() => {
    // console.log(searchHistory,searchhistoryupdate,"searchhistory")
    if (searchHistory) {
      setHistory(searchHistory);
    }
  }, [searchhistoryupdate]);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: wp(4),
              marginTop: hp(5),
              marginBottom: hp(0),
              fontWeight: '600',
            }}>
            Browser
          </Text>
        </View>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={16}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search or enter website URL"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={val => setSearchText(val)}
            onSubmitEditing={e => goForSearch(searchText, 0)}
          />
        </View>

        {/* <View style={styles.TextBox}>
          {history?.length === 0 ? (
            <Text style={styles.numtile}>
              Your Bookmarks and History will Show up Here
            </Text>
          ) : (
            <FlatList
              data={history}
              renderItem={({item, index}) => {
                return (
                  <View
                    key={index + 'searchtext'}
                    style={{
                      display: 'flex',
                      color: '#444',
                      flexDirection: 'row',
                      marginVertical: wp(2),
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderWidth: 0.5,
                      borderColor: '#ccc',
                      backgroundColor: '#F3F4F7',
                      borderRadius: wp(3),
                      alignItems: 'center',
                    }}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Ionicons name="image" color={'#888'} size={18} />
                      <Text style={{color: '#444', paddingLeft: hp(1)}}>
                        {item.text}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        goForSearch(item.text, 1);
                      }}>
                      <Ionicons name="reload" size={18} color={'#888'} />
                    </TouchableOpacity>
                  </View>
                );
              }}
              key={item => item.index}
            />
          )}
        </View> */}
      
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  TextBox: {
    // padding: wp(8),
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
    paddingHorizontal: wp(5),
  },
  numtile: {
    width: wp(100),
    marginTop: hp(15),
    fontSize: wp(4),
    fontWeight: '400',
    color: '#7a9688',
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f7',
    marginBottom: wp(4),
    marginTop: hp(2),
    borderRadius: wp(3),

    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: hp(4.5),
    paddingVertical: 3,
    color: '#444',
  },

  browserCard: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginVertical: hp(2),
    borderRadius: wp(2),
    color: '#444',
  },

  browserCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
  },

  historyCard: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginVertical: hp(2),
    borderRadius: wp(2),
    color: '#444',
  },

  browserhistory: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#fff',
    marginBottom: hp(2),
  },

  typeIcon: {
    backgroundColor: '#eee',
    color: '#bbb',
    height: hp(5),
    width: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginEnd: wp(3),

    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    lineHeight: hp(5),
    textAlign: 'center',
  },
  upperText: {
    color: '#444',
    fontSize: hp(2),
    fontWeight: '600',
  },
  fromText: {
    color: '#888',
    fontSize: hp(1.8),
    flexWrap:'wrap'
    
   
  },
  coinText: {
    color: '#4CD073',
    fontSize: hp(2.2),
    // fontWeight:'600'
  },
});

export default BrowserScreenExternalLink;