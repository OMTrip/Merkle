import {Link, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
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

const BrowserScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const {searchhistoryupdate, searchHistory} = useSelector(state => state.user);
  // useEffect(()=>{
  //   if(props?.route?.params?.url){
  //     setSearchText(props?.route?.params?.url)
  //     goForSearch(props?.route?.params?.url, 0)
  //   }

  // },[props])

  function goForSearch(text, type) {
    try {
      const arr = [...history];
      if (text && text != '' && text.length > 0) {
        if (!arr?.find(it => it.text == text?.trim())) {
          if (type == 0) {
            const obj = {
              text: text?.toLowerCase(),
              index: arr.length,
            };
            // arr.push(obj);
            dispatch(setSearchHistory({...obj}));
            // setHistory([...arr]);
          }
        }
        navigation.navigate('Browser', {
          searchdata: {
            text: text?.toLowerCase(),
          },
        });
      }
    } catch (e) {
      console.log(e, 'Error=========');
    }
  }

  useEffect(() => {
    //  console.log(searchHistory,searchhistoryupdate,"searchhistory")

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
              fontSize: wp(8),
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
        <ScrollView>
          <Text
            onPress={() => {
              // console.log('clicked for navigate')
              navigation.navigate('SwapScreen', {
                searchdata: {
                  text: 'nute.io',
                },
              });
            }}>
            Search
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(5),
              }}>
              <View>
                <Text style={{color: '#888', fontWeight: '600'}}>
                  Merkle Project
                </Text>
              </View>
              {/* <View>
              <Text style={{color: '#50AFFF'}}>See All</Text>
            </View> */}
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Browser', {
                  searchdata: {
                    text: 'https://bigtycoon.co/',
                  },
                });
              }}>
              <View style={styles.browserCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={styles.browserCardInner}>
                    {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                    <Image
                      source={require('../assets/logo.png')}
                      style={styles.typeIcon}
                    />
                    {/* <Link to="/TranscationDetails"> */}

                    <View style={{}}>
                      <Text style={styles.upperText}>Big Tycoon </Text>
                      <Text style={styles.fromText}>https://bigtycoon.co/</Text>
                    </View>

                    {/* </Link> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://xtring.network/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/string.png')}
                    style={[styles.typeIcon, {height: hp(4.4), width: wp(12)}]}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>
                        Xtring Network : Cross Chain Transction
                      </Text>
                      <Text style={styles.fromText}>
                        https://xtring.network/
                      </Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://merklescan.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/KB.png')}
                    style={[styles.typeIcon, {height: hp(5), width: wp(8.5)}]}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>Blockchain Explorer </Text>
                      <Text style={styles.fromText}>
                        https://merklescan.com/
                      </Text>
                    </View>
               
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://bigshot.games/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/bigshot.png')}
                    style={[styles.typeIcon, {height: hp(5), width: wp(10)}]}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>Big Shot </Text>
                      <Text style={styles.fromText}>
                        https://bigshot.games/
                      </Text>
                    </View>
              
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(5),
              }}>
              <View>
                <Text style={{color: '#888', fontWeight: '600'}}>
                  New DApps
                </Text>
              </View>
              {/* <View>
              <Text style={{color: '#50AFFF'}}>See All</Text>
            </View> */}
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://surnft.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/surnft.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>SURNFT </Text>
                      <Text style={styles.fromText}>https://surnft.com/</Text>
                    </View>
              
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://looksrare.org/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/Looksrare.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>LooksRare </Text>
                      <Text style={styles.fromText}>
                        https://looksrare.org/
                      </Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://www.apollox.finance/en',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/APOLLOX.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>ApolloX </Text>
                      <Text style={styles.fromText}>
                        https://www.apollox.finance/en
                      </Text>
                    </View>
               
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                DeFi
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://venus.io/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/venus.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>Venus </Text>
                      <Text style={styles.fromText}>https://venus.io/</Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.beefy.finance/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/BEEFY.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>Beefy </Text>
                      <Text style={styles.fromText}>
                        https://app.beefy.finance/
                      </Text>
                    </View>
         
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://pancakeswap.finance/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/pancakeswap.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
              
                    <View style={{}}>
                      <Text style={styles.upperText}>PancakeSwap </Text>
                      <Text style={styles.fromText}>
                        https://pancakeswap.finance/
                      </Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(5),
              }}>
              <View>
                <Text style={{color: '#888', fontWeight: '600'}}>
                  Smart Chain
                </Text>
              </View>
              {/* <View>
              <Text style={{color: '#50AFFF'}}>See All</Text>
            </View> */}
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://surnft.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/surnft.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
               
                    <View style={{}}>
                      <Text style={styles.upperText}>SURNFT </Text>
                      <Text style={styles.fromText}>https://surnft.com/</Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://www.apollox.finance/en',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/APOLLOX.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>ApolloX </Text>
                      <Text style={styles.fromText}>
                        https://www.apollox.finance/en
                      </Text>
                    </View>
                  
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://powerpool.finance/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/POWERPOOL.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>PowerPool </Text>
                      <Text style={styles.fromText}>
                        https://powerpool.finance/
                      </Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(5),
              }}>
              <View>
                <Text style={{color: '#888', fontWeight: '600'}}>Popular</Text>
              </View>
              {/* <View>
              <Text style={{color: '#50AFFF'}}>See All</Text>
            </View> */}
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://pancakeswap.finance/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/pancakeswap.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>PancakeSwap </Text>
                      <Text style={styles.fromText}>
                        https://pancakeswap.finance/
                      </Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.uniswap.org/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/uniswap.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                  
                    <View style={{}}>
                      <Text style={styles.upperText}>Uniswap Exchange </Text>
                      <Text style={styles.fromText}>
                        https://app.uniswap.org/
                      </Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://compound.finance/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/compound.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
               
                    <View style={{}}>
                      <Text style={styles.upperText}>Compound </Text>
                      <Text style={styles.fromText}>
                        https://compound.finance/
                      </Text>
                    </View>
              
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                Yield Farming
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://lido.fi/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/LIDOSTACKING.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>Ludo Staking </Text>
                      <Text style={styles.fromText}>https://lido.fi/</Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://venus.io/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/venus.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
               
                    <View style={{}}>
                      <Text style={styles.upperText}>Venus </Text>
                      <Text style={styles.fromText}>https://venus.io/</Text>
                    </View>
                  
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.beefy.finance/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/BEEFY.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>Beefy </Text>
                      <Text style={styles.fromText}>
                        https://app.beefy.finance/
                      </Text>
                    </View>
               
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                Games
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://axieinfinity.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/AXIEINFINTY.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                  
                    <View style={{}}>
                      <Text style={styles.upperText}>Axie Infinity </Text>
                      <Text style={styles.fromText}>
                        https://axieinfinity.com/
                      </Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                Exchanges
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://biswap.org/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/BiswapToken.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
              
                    <View style={{}}>
                      <Text style={styles.upperText}>Biswap</Text>
                      <Text style={styles.fromText}>https://biswap.org/</Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://www.apollox.finance/en',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/APOLLOX.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>ApolloX </Text>
                      <Text style={styles.fromText}>
                        https://www.apollox.finance/en
                      </Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
              
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.openocean.finance/classic',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/OpenOcean.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>OpenOcean </Text>
                      <Text style={styles.fromText}>
                        https://app.openocean.finance/classic
                      </Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                Security
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://everrise.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/EVERRISE.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>Everrise</Text>
                      <Text style={styles.fromText}>https://everrise.com/</Text>
                    </View>
             
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.unrekt.net/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/unrekt.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>Unrekt </Text>
                      <Text style={styles.fromText}>
                        https://app.unrekt.net/
                      </Text>
                    </View>
               
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                Marketplaces
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://looksrare.org/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/Looksrare.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>LooksRare</Text>
                      <Text style={styles.fromText}>
                        https://looksrare.org/
                      </Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.unrekt.net/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/AIRNFTS.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                  
                    <View style={{}}>
                      <Text style={styles.upperText}>AirNFTs </Text>
                      <Text style={styles.fromText}>
                        https://app.unrekt.net/
                      </Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://rarible.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/Rarible.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>Rarible </Text>
                      <Text style={styles.fromText}>https://rarible.com/</Text>
                    </View>
                 
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                Social
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.unrekt.net/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/AIRNFTS.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>AirNFTs </Text>
                      <Text style={styles.fromText}>
                        https://app.unrekt.net/
                      </Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://rarible.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/Rarible.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>Rarible </Text>
                      <Text style={styles.fromText}>https://rarible.com/</Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                Utility
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://lido.fi/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/LIDOSTACKING.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>Ludo Staking </Text>
                      <Text style={styles.fromText}>https://lido.fi/</Text>
                    </View>
              
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://governance.trustwallet.com/#/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/TRUST.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                
                    <View style={{}}>
                      <Text style={styles.upperText}>
                        Trust Wallet Governance{' '}
                      </Text>
                      <Text style={styles.fromText}>
                        https://governance.trustwallet.com/#/
                      </Text>
                    </View>
               
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.aave.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/aave.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                  
                    <View style={{}}>
                      <Text style={styles.upperText}>Aave </Text>
                      <Text style={styles.fromText}>https://app.aave.com/</Text>
                    </View>
              
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{color: '#888', fontWeight: '600', marginTop: hp(2)}}>
                Staking
              </Text>
            </View>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://lido.fi/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/LIDOSTACKING.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>Ludo Staking </Text>
                      <Text style={styles.fromText}>https://lido.fi/</Text>
                    </View>
                  
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://pancakeswap.finance/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/pancakeswap.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>PancakeSwap </Text>
                      <Text style={styles.fromText}>
                        https://pancakeswap.finance/
                      </Text>
                    </View>
                
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Browser', {
                        searchdata: {
                          text: 'https://app.aave.com/',
                        },
                      });
                    }}>
            <View style={styles.browserCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.browserCardInner}>
                  {/* <Octicons name="image" size={20} style={styles.typeIcon} /> */}
                  <Image
                    source={require('../assets/aave.png')}
                    style={styles.typeIcon}
                  />
                  {/* <Link to="/TranscationDetails"> */}
                 
                    <View style={{}}>
                      <Text style={styles.upperText}>Aave </Text>
                      <Text style={styles.fromText}>https://app.aave.com/</Text>
                    </View>
               
                  {/* </Link> */}
                </View>
              </View>
            </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: '#e3e3e8',
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
    marginVertical: hp(1.2),
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
    // backgroundColor: '#eee',
    color: '#bbb',
    height: hp(5.2),
    width: hp(5.2),
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
    fontSize: hp(1.87),
    fontWeight: '600',
    alignItems: 'center',
  },
  fromText: {
    color: '#888',
    fontSize: hp(1.8),
    flexWrap: 'wrap',
  },
  coinText: {
    color: '#4CD073',
    fontSize: hp(2.2),
    // fontWeight:'600'
  },
});

export default BrowserScreen;
