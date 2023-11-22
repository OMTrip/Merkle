import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-ui-lib';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

const CashbackOffers = props => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isScratched, setIsScratched] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: evt => {
      if (!isScratched) {
        const {locationX, locationY} = evt.nativeEvent;
        if (locationX >= 0 && locationY >= 0) {
          setIsScratched(true);
        }
      }
    },
  });

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
            {/* <Text
              style={{
                color: '#666',
                fontSize: wp(3.5),
                marginBottom: wp(4),
              }}>
              Congratulations ! You have won.
            </Text> */}

            {/* <Text
              style={{
                color: '#000',
                fontSize: wp(5),
                fontWeight: '600',
                marginBottom: wp(4),
              }}>
              Reveal Your Prize
            </Text> */}

            {/* <View style={styles.scratCardBg}>
                <Image
                  source={require('../../assets/google-scratch-card.jpg')}
                  style={styles.scratCardImage}
                />
              </View> */}

            <View
              {...panResponder.panHandlers}
              style={styles.rewardCardForScratch}>
              {isScratched ? null : (
                <Image
                  source={require('../../assets/google-scratch-card.jpg')}
                  style={styles.scratchCardImage2}
                />
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: '#000',
                // color: '#fff',
                marginVertical: wp(5),
                // paddingHorizontal: wp(3),
                paddingVertical: wp(2),
                borderRadius: wp(3),
              }}>
              <Text style={styles.message}>
                {isScratched
                  ? 'Congratulations! You won!'
                  : 'Scratch here to reveal your prize'}
              </Text>
            </View>
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
            color={'#444'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: '#444',
              fontSize: wp(5),
              fontWeight: '600',
              paddingLeft: 15,
            }}>
            Cashback & Offers
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.box}>
            <View>
              <Image
                source={require('../../assets/cashback-banner.png')}
                resizeMode="contain"
                style={styles.referBanner}
              />
            </View>

            <View style={{marginHorizontal: wp(3), marginBottom: wp(8)}}>
              <View style={{marginBottom: wp(3)}}>
                <Text style={styles.heading} onPress={toggleModal}>
                  Your Rewards
                </Text>
              </View>

              <View>
                <View style={styles.row}>
                  <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={styles.rewardCard}>
                      <View style={styles.scratCardBg}>
                        <Image
                          source={require('../../assets/google-scratch-card.jpg')}
                          style={styles.scratCardImage}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                  <View style={styles.rewardCard}>
                    <Image
                      source={require('../../assets/testing.png')}
                      style={styles.halfBanner}
                    />

                    <View style={styles.countValue}>
                      <Text style={styles.countTxt}>8d left</Text>
                    </View>

                    <View style={styles.logoContainer}>
                      <View style={styles.logoIcon}>
                        <Image
                          source={require('../../assets/d2h.png')}
                          style={styles.logoImage}
                        />
                      </View>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.title}>Flat ₹7,350 off</Text>
                      <Text style={styles.points}>
                        on skullcandy Jib True-2 TWS Wireless Earbuds
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.rewardCard}>
                    <View style={styles.expireLabel}>
                      <Text style={{color: '#3c3c46'}}>Expired</Text>
                    </View>
                    <Image
                      source={require('../../assets/testing-black-white.png')}
                      style={styles.halfBanner}
                    />

                    {/* <View style={styles.countValue}>
                      <Text style={styles.countTxt}>8d left</Text>
                    </View> */}

                    <View style={styles.logoContainer}>
                      <View style={styles.logoIcon}>
                        <Image
                          source={require('../../assets/electric.jpg')}
                          style={styles.logoImage}
                        />
                      </View>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.title}>Flat $7,350 off</Text>
                      {/* <Text style={styles.points}>
                        on skullcandy Jib True-2 TWS Wireless Earbuds
                      </Text> */}
                    </View>
                  </View>
                  <View style={styles.rewardCard}>
                    <Image
                      source={require('../../assets/testing.png')}
                      style={styles.halfBanner}
                    />

                    {/* <View style={styles.countValue}>
                      <Text style={styles.countTxt}>8d left</Text>
                    </View> */}

                    {/* <View style={styles.logoContainer}>
                      <View style={styles.logoIcon}>
                        <Image
                          source={require('../../assets/d2h.png')}
                          style={styles.logoImage}
                        />
                      </View>
                    </View> */}

                    <View style={styles.infoContainer}>
                      <Text style={styles.title}>₹ 5</Text>
                      <Text style={styles.points}>Cashback</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.rewardCard}>
                    <Image
                      source={require('../../assets/testing.png')}
                      style={styles.halfBanner}
                    />

                    {/* <View style={styles.countValue}>
                      <Text style={styles.countTxt}>8d left</Text>
                    </View> */}

                    {/* <View style={styles.logoContainer}>
                      <View style={styles.logoIcon}>
                        <Image
                          source={require('../../assets/d2h.png')}
                          style={styles.logoImage}
                        />
                      </View>
                    </View> */}

                    <View style={styles.infoContainer}>
                      <Text style={styles.title}>₹ 5</Text>
                      <Text style={styles.points}>Cashback</Text>
                    </View>
                  </View>
                  <View style={styles.rewardCard}>
                    <Image
                      source={require('../../assets/testing.png')}
                      style={styles.halfBanner}
                    />

                    {/* <View style={styles.countValue}>
                      <Text style={styles.countTxt}>8d left</Text>
                    </View> */}

                    {/* <View style={styles.logoContainer}>
                      <View style={styles.logoIcon}>
                        <Image
                          source={require('../../assets/d2h.png')}
                          style={styles.logoImage}
                        />
                      </View>
                    </View> */}

                    <View style={styles.infoContainer}>
                      <Text style={styles.title}>₹ 5</Text>
                      <Text style={styles.points}>Cashback</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  header: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },

  rewardCard: {
    marginVertical: wp(3),
    marginEnd: wp(2),
    width: '47%',
    height: 150,
    borderWidth: 0.5,
    borderColor: '#d6c7ef',
    backgroundColor: '#e0eefc2b',
    borderRadius: 15,
  },
  rewardCardForScratch: {
    width: '70%',
    height: 200,
    borderRadius: 15,
  },
  scratCardBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',    
    borderRadius: 15,
  },
  scratCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 2,
    borderRadius: 15,
  },
  halfBanner: {
    width: '100%',
    height: 45,
    resizeMode: 'contain',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'relative',
  },

  countValue: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#fff3cd',
    borderRadius: 10,
    paddingHorizontal: wp(2),
    margin: 5,
  },

  countTxt: {
    color: '#975313',
    fontSize: wp(3),
    fontWeight: '600',
  },

  logoContainer: {
    position: 'relative',
    height: 32,
    // backgroundColor: '#eee',
  },

  logoIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(50),
    // backgroundColor: '#eee',
    bordercolor: '#eee',
    borderWidth: 0.1,
    position: 'absolute',
    top: -10,
    left: 10,
  },

  logoImage: {
    width: 38,
    height: 38,
    borderRadius: wp(50),
  },

  infoContainer: {
    marginVertical: wp(1),
    paddingHorizontal: wp(3),
    // backgroundColor:'#ccc'
  },

  title: {
    color: '#000',
    fontSize: wp(4.5),
    // fontWeight: 'bold',
  },
  points: {
    color: '#000',
    fontSize: wp(3.2),
  },

  expireLabel: {
    width: '100%',
    // height:50,
    backgroundColor: '#e2e2ec',
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '40%',
    zIndex: 2,
  },

  referBanner: {
    width: '100%',
    height: 110,
    borderRadius: wp(2),
    marginTop: wp(2),
    marginBottom:wp(5)
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
    // flex: 1,
    // width: '100%',
    // margin: 15,
  },

  box: {
    width: '95%',
    marginHorizontal: wp(3),
  },

  contactWrapper: {flexDirection: 'row', alignItems: 'center', width: '92%'},

  iconBgSquare: {
    backgroundColor: '#666',
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
    borderBottomColor: '#ccc',
    flex: 1,
    paddingVertical: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor: '#000',
  },
  infoIcon: {
    color: '#444',
    paddingEnd: wp(3),
  },
  // infoContainer: {
  //   flex: 1,
  // },
  heading: {
    color: '#000',
    fontWeight: '500',
    fontSize: wp(4.5),
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

  scratchCard2: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc', // Color of the scratch card
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scratchCardImage2: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  message: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: '#000',
    marginVertical: wp(4),
    marginHorizontal: wp(4),
  },
});

export default CashbackOffers;
