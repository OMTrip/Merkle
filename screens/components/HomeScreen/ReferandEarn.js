import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {blue} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {wrap} from 'lodash';
import Share from 'react-native-share';
import {Linking} from 'react-native';

import QRCode from 'react-native-qrcode-svg'; // You'll need a package to generate QR codes
import Modal from 'react-native-modal';
import ProfileScreen from './ProfileScreen';
import LinearGradient from 'react-native-linear-gradient';

const ReferandEarn = props => {
  const navigation = useNavigation();

  const sendSMS = () => {
    const phoneNumber = '7905003693'; // Replace with recipient's phone number
    const message =
      'Use my referral code <7895651> or click the link below. You can also win Rs 700 if you refer 7 people.Visit  https://nute.io for more details'; // Replace with your message

    const url = `sms:${phoneNumber}${
      Platform.OS === 'ios' ? '&' : '?'
    }body=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const shareOptions = {
    // title: 'Share via',
    message: `Share Via\n`,
    // message: `Use my referral code or click the link below. You can also win Rs 700 if you refer 7 people.Visit  for more details`,
    url: 'https://nute.io',
    // social: Share.Social.WHATSAPP,
  };

  const handleShare = async () => {
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };

  // const [referralCode, setReferralCode] = useState(''); // Initialize with an empty string

  // Function to generate a random referral code
  // const generateReferralCode = () => {
  //   const randomCode = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  //   setReferralCode(randomCode.toString());
  // };

  const sendWhatsAppMessage = () => {
    // const referralCode = '124A55656AA';
    const heading = `Hi! I'm invitng you to use Nute.`;
    const linkUrl = 'http://nute.io/referral';

    const message = `${heading}%0A%0AUse my referral code <801881> or click the link below. You can also win Rs 700 if you refer 7 people.\nVisit ${linkUrl} for more details.`;

    Linking.openURL(`whatsapp://send?text=${message}`);
  };

  // const openWhatsApp = () => {
  //   Linking.openURL('whatsapp://send?text=your referral code is 124A55656AA');
  // };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            // flex:0.5,
            backgroundColor: '#fff',
            borderRadius: wp(3),
          }}>
          <View
            style={{
              margin: wp(3),
              padding: wp(3),
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity onPress={toggleModal}>
              <MaterialIcons
                name="close"
                size={25}
                color={'#000'}
                style={{alignItems: 'flex-end', textAlign: 'right'}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: wp(5),
                fontWeight: '600',
              }}>
              This is your referral QR
            </Text>

            <Text
              style={{
                color: '#666',
                fontSize: wp(3.5),
              }}>
              Your referral code: 85653656543
            </Text>

            <Text
              style={{
                color: '#666',
                fontSize: wp(4),
                lineHeight: 24,
                marginVertical: wp(4),
                marginHorizontal: wp(4),
                textAlign: 'center',
              }}>
              Refer your friends to Nute with this QR code & win Cashback!
            </Text>

            <QRCode value="Your QR Code Data" size={200} />

            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  color: '#fff',
                  marginVertical: wp(5),
                  paddingHorizontal: wp(3),
                  paddingVertical: wp(2),
                  borderRadius: wp(3),
                }}>
                <MaterialCommunityIcons
                  name="share-variant"
                  size={20}
                  color={'#fff'}
                />
                <Text
                  style={{
                    color: '#fff',
                    marginStart: wp(2),
                  }}>
                  Share QR Code
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
          <MaterialIcons
            name="arrow-back"
            size={25}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: '#000',
              fontSize: wp(5),
              fontWeight: '600',
              paddingLeft: 15,
            }}>
            Refer and Earn
          </Text>
        </View>

        <View style={styles.box}>
          <View>
            <Image
              source={require('../../assets/invitefriends.png')}
              resizeMode="contain"
              style={styles.referBanner}
            />
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.row}>
              <View style={styles.shareBox}>
                <View style={styles.imageBg}>
                  <MaterialIcons
                    name="arrow-forward"
                    size={30}
                    color={'#333'}
                  />
                </View>
                <View>
                  <Text style={styles.imageText}>Share Via</Text>
                </View>
              </View>
              <View style={styles.shareBox}>
                <TouchableOpacity onPress={sendWhatsAppMessage}>
                  <View style={styles.imageBg}>
                    <Image
                      source={require('../../assets/whatsapp-11.png')}
                      style={styles.logo}
                    />
                  </View>
                </TouchableOpacity>
                <View>
                  <Text style={styles.imageText}>WhatsApp</Text>
                </View>
              </View>
              <TouchableOpacity onPress={toggleModal}>
                <View style={styles.shareBox}>
                  <View style={styles.imageBg}>
                    <Image
                      source={require('../../assets/qr.png')}
                      style={styles.logo}
                    />
                  </View>
                  <View>
                    <Text style={styles.imageText}>Referral QR</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={sendSMS}>
                <View style={styles.shareBox}>
                  <View style={styles.imageBg}>
                    <Image
                      source={require('../../assets/sms2.png')}
                      style={styles.logo}
                    />
                  </View>
                  <View>
                    <Text style={styles.imageText}>SMS</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleShare}>
                <View style={styles.shareBox}>
                  <View style={styles.imageBg}>
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      size={43}
                      style={{color: '#444', fontWeight: '800'}}
                    />
                  </View>
                  <View>
                    <Text style={styles.imageText}>More Options </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.infowrapper}>
            <View style={styles.displayHori}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.listItem}>
                  View all your Referrals & Rewards here
                </Text>

                <MaterialIcons
                  name="arrow-forward"
                  size={15}
                  color={'#fff'}
                  style={styles.iconArrow}
                />
              </View>

              <View>
                <Image
                  source={require('../../assets/gifts-icons.png')}
                  resizeMode="contain"
                  style={styles.gifts}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fffaff',
            // borderColor:'#d6c7ef',
            // borderWidth:0.5,
            borderTopLeftRadius: wp(8),
            borderTopRightRadius: wp(8),
            marginTop: wp(6),
            alignItems: 'center',
            paddingTop: wp(4),
            flex: 1,
            elevation:25,
            shadowColor:'#000'
          }}>
          <View style={styles.infowrapperoutline}>
            <View style={styles.displayHori}>
              <MaterialCommunityIcons
                name="trophy-variant"
                size={18}
                color={'#000'}
                style={styles.iconArrow}
              />

              <Text style={styles.listItem2}>
                View all your Referrals & Rewards here
              </Text>

              <MaterialIcons
                name="arrow-forward"
                size={18}
                color={'#000'}
                style={styles.iconArrow}
              />
            </View>
          </View>

          <View style={{marginVertical: wp(4)}}>
            <Text style={{color: '#666', fontSize: wp(3.2)}}>
              Swipe upto see 576 friends you can invite to Paytm
            </Text>
          </View>

          <View
            style={[
              styles.Input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                width: '92%',
              },
            ]}>
            <MaterialIcons name="search" size={18} color={'#999'} />
            <TextInput
              placeholder="Search Contacts"
              placeholderTextColor="#999"
            />
          </View>

          <View style={{marginTop: wp(3)}}>
            <View style={styles.contactWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.iconBgSquare}>
                  <MaterialIcons
                    name="supervised-user-circle"
                    size={16}
                    style={{color: '#999', fontWeight: '800'}}
                  />
                </View>
                <View style={styles.menuWrapper}>
                  <View>
                    <Text style={styles.menuName}>Mr. Bean</Text>
                    <Text style={styles.phone}>8124568152</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons
                      name="whatsapp"
                      size={20}
                      style={styles.infoIcon}
                    />
                    <MaterialIcons
                      name="sms"
                      size={20}
                      style={styles.infoIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.contactWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.iconBgSquare}>
                  <MaterialIcons
                    name="supervised-user-circle"
                    size={16}
                    style={{color: '#999', fontWeight: '800'}}
                  />
                </View>
                <View style={styles.menuWrapper}>
                  <View>
                    <Text style={styles.menuName}>Mr. Beast</Text>
                    <Text style={styles.phone}>926168152</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons
                      name="whatsapp"
                      size={20}
                      style={styles.infoIcon}
                    />
                    <MaterialIcons
                      name="sms"
                      size={20}
                      style={styles.infoIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
   
  //   backgroundColor: '#f2f4f8',
  // },
  header: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },

  tabsInner: {
    backgroundColor: '#eee',
    marginHorizontal: wp(2),
  },

  referBanner: {
    width: '100%',
    height: 130,
    borderRadius: wp(2),
    marginVertical: wp(2),
  },

  gifts: {
    width: 42,
    height: 42,
    position: 'absolute',
    top: -20,
    right: -20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    // width: '100%',
    // margin: 15,
  },
  shareBox: {
    marginVertical: wp(3),
    marginHorizontal: wp(3),
    // width: '18%',
    // borderWidth: 1,
    // borderColor: '#ccc',
    // backgroundColor: '#eee',
    alignItems: 'center',
  },
  imageBg: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(50),
    borderColor: '#ccc',
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // flex: 1,
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius:50,
    // backgroundColor:'#eee'
  },
  imageText: {
    color: '#666',
    // fontWeight: '600',
    fontSize: wp(3.2),
    marginVertical: wp(2),
    textAlign: 'center',
  },

  box: {
    width: '95%',
    marginHorizontal: wp(3),
  },

  infowrapper: {
    backgroundColor: '#000',
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    width: wp(93),
    borderRadius: wp(3),
    marginTop: wp(3),
  },

  infowrapperoutline: {
    backgroundColor: '#f1e9fe',
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    width: wp(93),
    borderRadius: wp(3),
    marginTop: wp(3),
    borderColor: '#ccc',
    borderWidth: 0.5,
  },

  displayHori: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },

  listItem: {
    color: '#fff',
    fontSize: wp(3.8),
    fontWeight: '500',
  },
  listItem2: {
    color: '#222',
    fontSize: wp(3.8),
    fontWeight: '500',
  },
  iconArrow: {
    marginStart: wp(2),
  },

  Input: {
    color: '#444',
    height: hp(5),
    borderWidth: 0.5,
    borderColor: '#d6c7ef',
    paddingHorizontal: 10,
    fontSize: 13,
    borderRadius: wp(3),
    backgroundColor: '#f3f2f8',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    color: '#000',
  },

  contactWrapper: {flexDirection: 'row', alignItems: 'center', width: '92%'},

  iconBgSquare: {
    backgroundColor: '#f3f2f8',
    height: wp(8),
    width: wp(8),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#eee',
    marginEnd: wp(3),
    // marginVertical: wp(1),
  },

  menuWrapper: {
    paddingStart: wp(1),
    borderBottomWidth: 0.187,
    borderBottomColor: '#d6c7ef',
    flex: 1,
    paddingVertical: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor: '#000',
  },
  infoIcon: {
    color: '#000',
    paddingEnd: wp(3),
  },
  infoContainer: {
    flex: 1,
  },
  menuName: {
    color: '#000',
    fontWeight: '400',
    fontSize: wp(4.2),
  },

  infoItem: {
    color: '#777',
    fontWeight: 'normal',
    fontSize: wp(4),
    flexWrap: 'wrap',
    // fontWeight: '500',
  },
  walletHeading: {
    color: '#999',
    fontSize: wp(3.2),
  },
  phone: {
    color: '#444',
    fontSize: wp(3.5),
    marginEnd: wp(2),
  },
});

export default ReferandEarn;
