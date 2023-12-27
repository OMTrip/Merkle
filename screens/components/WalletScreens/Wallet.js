import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Link, useNavigation} from '@react-navigation/native';
import {deleteWallet, setActiveWallet, setAddIndex} from '../../../Store/web3';
const {height, width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {last} from 'lodash';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const Wallet = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Index, setIndex] = useState();
  const {wallets, activeWallet} = useSelector(state => state.wallet);
  const active = wallets[activeWallet];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const {back} = props.route.params;
  const refTxnSheet = useRef();
  function openSheet() {
    return refTxnSheet.current.open();
  }
  function closeSheet() {
    return refTxnSheet.current.close();
  }
  const handleDelete = async () => {
    // Open the modal
    try {
      // Delete the wallet
      await dispatch(deleteWallet(Index));
      dispatch(setActiveWallet(Index - 1));
      // Close the modal after successful deletion
      setModalVisible(false);
    } catch (error) {
      // Handle error if the deletion fails
      console.error('Error deleting wallet:', error);
      // Close the modal even if there's an error to prevent it from staying open indefinitely
      setModalVisible(false);
    }
  };
  return (
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
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={20} color={'#000'} />
          {/* <Text
            style={{color: '#000', fontSize: hp(2)}}
           >
            Settings
          </Text> */}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp(20),
            alignItems: 'center',
            // backgroundColor:'red'
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: hp(2),
              fontWeight: '600',
            }}>
            Wallets
          </Text>
        </View>

        <TouchableOpacity>
          <AntDesign
            name="plus"
            size={22}
            style={{color: '#000'}}
            onPress={() => openSheet()}
          />
        </TouchableOpacity>
      </View>

      <View>
        <View>
          <Text style={styles.heading}>Multi Coins Wallets</Text>
        </View>
        <View style={styles.card}>
          {wallets &&
            wallets.map((wallet, index) => {
              return (
                <TouchableOpacity
                  style={styles.box}
                  key={index + 'wallet'}
                  onPress={() => {
                    console.log(wallet, 'active');
                    dispatch(setActiveWallet(index));
                    navigation.goBack();
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.ImageShield}>
                      <Feather
                        name="shield"
                        size={30}
                        style={{color: '#999', fontWeight: '800'}}
                      />
                      {wallet.address == active?.address && (
                        <View style={styles.checkIconbg}>
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            style={{color: '#14b7af', fontWeight: '800'}}
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.walletWrapper}>
                      <View>
                        <Text style={styles.walletName}>{wallet?.name}</Text>
                        <Text style={styles.walletAddress}>
                          {wallet?.address?.slice(0, 7) +
                            '...' +
                            wallet?.address?.slice(-7)}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('WalletInfo', {
                              selectedWallet: wallet,
                            });
                            dispatch(setAddIndex(index))
                          }}>
                          <Ionicons
                            name="information-circle-outline"
                            size={20}
                            style={[
                              styles.infoIcon,
                              {marginRight: index == 0 ? wp(7.5) : 0},
                            ]}
                          />
                        </TouchableOpacity>
                        {index == 0 ? (
                          ''
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setIndex(index);
                              setModalVisible(true);

                              // navigation.navigate('wallets');
                              // Dispatch an action or call a function to delete the wallet
                            }}>
                            <Ionicons
                              name="trash-bin-outline"
                              size={20}
                              style={{marginLeft: 10, color: 'red'}}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.closeIconContainer}
                onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="close" size={20} style={{color: 'black'}} />
              </Pressable>
              <Text style={styles.modalText}>Are You Sure</Text>
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleDelete()}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>    setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>No</Text>
            </Pressable> */}
              </View>
            </View>
          </View>
        </Modal>
        {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      </View>
      <RBSheet
        ref={refTxnSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={430}
        draggableIcon={false}
        openDuration={400}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View style={styles.sheetContainer}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: '600',
                paddingHorizontal: 10,
              }}>
              Connect Wallet
            </Text>

            <View>
              <Image
                source={require('../../assets/connectwallet.png')}
                style={{
                  width: wp(25),
                  height: wp(25),
                  margin: wp(8),
                }}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              style={styles.selectWallet}
              onPress={() => {
                navigation.navigate('CreateMywallet', {add: true});
              }}>
              <View style={styles.selectWalletInner}>
                <View style={styles.arrowBg}>
                  <Entypo name="circle-with-plus" size={22} color={'#000'} />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: wp(3),
                  }}>
                  <Text style={{color: '#000', fontWeight: '600'}}>
                    I don't have a wallet
                  </Text>
                  <Text style={{color: '#999'}}>Create a new wallet</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.selectWallet}
              onPress={() => {
                navigation.navigate('ImportAccountByPrivateKey');
              }}>
              <View style={styles.selectWalletInner}>
                <View style={styles.arrowBg}>
                  <MaterialCommunityIcons
                    name="arrow-down-circle"
                    size={22}
                    color={'#000'}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: wp(3),
                  }}>
                  <Text style={{color: '#000', fontWeight: '600'}}>
                    I already have a wallet
                  </Text>
                  <Text style={{color: '#999'}}>Import a wallet</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F7',

    alignItems: 'center',
  },
  header: {
    paddingVertical: hp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heading: {
    color: '#999',
    fontSize: hp(1.5),
    marginTop: hp(2),
    textTransform: 'uppercase',
    // paddingHorizontal: wp(3),
    marginHorizontal: wp(5),
  },

  card: {
    marginBottom: hp(2),
    marginTop: wp(1),
    borderRadius: wp(2),
    color: '#888',
    // backgroundColor: '#fff',
    marginHorizontal: wp(5),
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ImageShield: {
    paddingHorizontal: wp(4),
    marginEnd: wp(3),
    position: 'relative',
  },

  checkIconbg: {
    position: 'absolute',
    top: -7,
    right: 0,
  },

  walletWrapper: {
    paddingStart: wp(1),
    borderBottomWidth: 0.3,
    borderBottomColor: '#ccc',
    flex: 1,
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
  },
  infoIcon: {
    color: '#666',
    paddingEnd: wp(3),
  },

  walletName: {
    color: '#000',
    fontWeight: '400',
    fontSize: wp(4),
    textTransform: 'capitalize',
  },
  walletAddress: {
    color: '#666',
    fontSize: wp(3.2),
  },

  sheetContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: wp(5),
    alignItems: 'center',
  },

  selectWallet: {
    backgroundColor: '#f3f2f7',
    width: wp(90),
    borderRadius: wp(4),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f4f3f7',
    marginBottom: wp(3),
    marginHorizontal: wp(3),
  },
  selectWalletInner: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  arrowBg: {
    backgroundColor: '#e2e3f5',
    height: wp(8),
    width: wp(8),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#eee',
    marginStart: wp(3),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    marginTop: hp(2),
  },
});

export default Wallet;
