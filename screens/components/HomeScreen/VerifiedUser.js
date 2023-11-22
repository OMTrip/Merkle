import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const VerifiedUser = props => {
  const [firebaseUser, setFirebaseUser] = useState();

  const navigation = useNavigation();
  // const {user, login, kyc} = useSelector(state => state.user);
 
  const {
    user,
    isLoggedIn,
    kyc,
    aadhardockyc,
    aadharkyc,
    pankyc,
    user_logo,
    adminKycVerified,
    panNumber,
    adharNumber,
  } = useSelector(state => state.auth);
  console.log(adharNumber, 'lll');

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const userdata = await userCollection.getUser(user?.mobile);
        setFirebaseUser(userdata);
      })();
    }
  }, [
    kyc,
    aadhardockyc,
    aadharkyc,
    pankyc,
    isLoggedIn,
    panNumber,
    adharNumber,
  ]);

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
      style={{flex: 0.99, paddingHorizontal:wp(5)}}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: '#444',
              fontSize: wp(5),
              fontWeight: '600',
              paddingLeft: 15,
            }}>
            QR Code
          </Text>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: 'flex',
              justifyContent: 'center',
              marginTop: wp(25),
            }}>
            <View style={styles.profileCards}>
              <View style={styles.profileCardsInner}>
                <View style={{position: 'relative'}}>
                  <View>
                    {isLoggedIn && user_logo ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: -48,
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={{
                            uri: 'data:image/png;base64,' + user_logo,
                          }}
                          style={{
                            width: wp(18),
                            height: wp(18),
                            borderRadius: wp(50),
                            // margin: wp(1),
                            backgroundColor: '#000',
                            borderColor: '#eee',
                            borderWidth: 2,
                          }}
                        />
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>

                  <View
                    style={{
                      position: 'absolute',
                      bottom: -20,
                      right: -35,
                    }}>
                     <Image
                      source={require('../../assets/approved-shield.png')}
                      style={{
                        width: wp(6),
                        height: wp(6),
                      }}
                    />
                  </View>
                </View>

                <View style={{paddingTop: wp(10)}}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '500',
                      fontSize: wp(4.3),
                    }}>
                    {user?.name ? ' ' + user?.name : null}
                  </Text>
                </View>
                <View>
                  <Text style={{color: '#999', fontSize: wp(3.3)}}>
                  {user?.mobile}
                  </Text>
                </View>

                <View style={{marginVertical: wp(10)}}>
                  <Image
                    source={require('../../assets/simple_qrcode.png')}
                    style={{
                      // width:'100%',
                      height: 200,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>

            <View style={{paddingHorizontal: wp(6)}}>
              <Text
                style={{color: '#999', fontSize: wp(3.3), textAlign: 'center'}}>
                Scan to add Nute Contact, Pay Coin & Token also same for direct
                UCPI payment
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <View>
        <TouchableOpacity
          style={styles.send}
          // disabled={isButtonDisabled}
        >
          {/* {loading ? (
            <ActivityIndicator
              size={20}
              color={'#fff'}
              style={{marginHorizontal: 5}}
            />
          ) : null} */}
          <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
            Share QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.98,
    backgroundColor: '#f3f2f8',
  },

  header: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: '#f3f2f8',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: wp(3),
  },

  profileCards: {
    paddingHorizontal: wp(3),
    marginHorizontal: wp(6),
    paddingVertical: wp(4),
    backgroundColor: '#f3f4f7',
    marginVertical: hp(1),
    color: '#444',
    borderRadius: wp(2),
    // marginTop: wp(10),
    // shadowColor: '#eee',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,
    // elevation: 5,
  },

  profileCardsInner: {
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    borderWidth: 0.5,
    borderColor: '#000',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: wp(5),
    marginTop: wp(2),
    // width: wp(32),
  },
  buttonText: {
    color: '#000',
  },

  title: {
    fontSize: wp(5),
    fontWeight: '500',
  },
  titleBox: {
    marginLeft: wp(7),
  },

  cardItemsWrapper: {
    marginHorizontal: wp(4),
    marginTop: wp(4),
  },

  box: {
    marginBottom: wp(3),
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    paddingVertical: wp(3),
  },
  headingLabel: {
    marginBottom: wp(2),
    paddingStart: wp(4),
    width: '98%',
    alignItems: 'flex-start',
  },
  headingLabelTxt: {
    color: '#888',
    fontSize: wp(3),
  },

  iconBgSquare: {
    // backgroundColor: '#000',
    // height: wp(8),
    // width: wp(8),
    // borderRadius: wp(1),
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    // borderWidth: 0.5,
    // borderColor: '#fff',
    marginHorizontal: wp(3),
    // marginVertical: wp(1),
  },
  iconStyle: {color: '#666'},

  menuWrapper: {
    paddingStart: wp(1),
    // borderBottomWidth: 0.187,
    // borderBottomColor: '#eee',
    flex: 1,
    // paddingVertical: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
  },
  infoIcon: {
    color: '#999',
    paddingEnd: wp(3),
  },

  menuName: {
    color: '#333',
    fontWeight: 'normal',
    fontSize: wp(4.2),
    // fontWeight: '500',
  },
  walletHeading: {
    color: '#999',
    fontSize: wp(3.2),
  },
  walletList: {
    color: '#999',
    fontSize: wp(4),
    marginEnd: wp(2),
  },

  infowrapper: {
    backgroundColor: '#DFECF7',
    // color: '#E0F7E5',
    paddingHorizontal: wp(4),
    paddingVertical: wp(4),
    width: wp(87),
    borderRadius: wp(3),
    marginTop: wp(3),
    marginHorizontal: wp(4),
  },

  listItem: {
    color: '#003D87',
    fontSize: wp(3.2), // Adjust this for spacing between items
  },
  bullet: {
    fontSize: 13, // Adjust bullet size if needed
    marginRight: 5,
    color: '#003D87',
  },
  displayHori: {
    flexDirection: 'row',
  },
  input: {
    color: '#444',
    height: hp(5),
    // width: '85%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 13,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 20,
  },
  tabbody: {
    flex: 1,
    paddingHorizontal: 10,
  },
  send: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default VerifiedUser;
