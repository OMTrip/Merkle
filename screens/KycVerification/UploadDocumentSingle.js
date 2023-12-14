import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import userCollection from '../../Store/firebase/user';
// import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {setUserKycStatus} from '../../Store/authSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';

const UploadDocumentSingle = () => {
  const [photo, setPhoto] = useState();
  const [visible, setVisible] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const refDocSheet = useRef();

  function openDocSheet() {
    return refDocSheet.current.open();
  }
  function closeDocSheet() {
    return refDocSheet.current.close();
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setPhoto(result.assets[0].uri);
  };
  const uploadFrontAdharCardHandler = () => {
    setUploadType('front');
    setVisible(true);
    setIsButtonDisabled(true);
  }
  const submitDocument = async () => {
    if (photo) {
      Toast.show({
        type: 'success',
        text1: 'Your Document is sent for Verification',
        text2: 'You will be updated soon',
      });
      const userNumber = user.mobile;
      const userName = user.name;
      const PhotoName = photo.replace(/^.*[\\\/]/, '');
      const pathToFile1 = `user/${userName}_${userNumber}/${PhotoName}`;
      const reference1 = storage().ref(pathToFile1);
      try {
        await reference1.putFile(photo);
        const userdata = await userCollection.getUser(userNumber);
        const uobj = {...userdata};
        uobj.aadharDocKyc = 1;
        await userCollection.updateUser({...uobj});

        const user_kyc_status = {
          aadharkyc: 1,
          pankyc: 1,
          aadhardockyc: 1,
        };
        dispatch(setUserKycStatus(user_kyc_status));
        navigation.navigate('HomeScreen');
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Upload Both Side Image',
        text2: 'Please select all required photos.',
      });
      console.log('Please select all required photos.');
    }
  };

  useEffect(() => {
    if (photo) {
      setIsButtonDisabled(false);
    }
  }, [submitDocument]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#f3f4f8" barStyle="dark-content" />
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: '#000',
              fontSize: hp(2.2),
              fontWeight: '600',
              marginStart: wp(2),
            }}>
            Upload Selfie with identity
          </Text>
        </View>

        <ScrollView>
          <>
            <View style={styles.pageWrapper}>
              <View style={{marginBottom: wp(6)}}>
                <Text
                  style={{color: '#000', fontSize: wp(3.6)}}>
                Please upload a selfie holding your identity card
                </Text>
                <View style={styles.adharImg}>
                  {photo ? (
                    <Image
                      style={styles.imageStyle}
                      source={{uri: photo}}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      style={styles.imageStyle}
                      source={{uri: photo}}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    width: '99%',
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#ddd',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderRadius: wp(1),
                  }}
                  onPress={uploadFrontAdharCardHandler}>
                  <Feather name="upload" size={20} color="#333" />
                  <Text
                    style={{
                      color: '#333',
                      marginLeft: 10,
                      fontSize: wp(4),
                      // fontWeight: '600',
                    }}>
                    Choose File
                  </Text>
                </TouchableOpacity>
                <View>
                <Text style={{color: '#666', fontSize: wp(3.5), marginVertical:wp(1)}}>
                JPG, JPEG, or PNG format only
                </Text>
                </View>
              </View>

            
            </View>
          </>
        </ScrollView>
      </View>
      <View style={styles.pageWrapper}>
        <TouchableOpacity
          style={[styles.send, isButtonDisabled ? styles.sendDisabled : null]}
          disabled={isButtonDisabled}
          // style={styles.send}
          onPress={submitDocument}>
          <Text
            style={[
              styles.sendBtnTxt,
              isButtonDisabled ? styles.sendBtnTxtDisabled : null,
            ]}>
            Submit Document
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={visible}
        style={{width: '100%', marginLeft: 0, marginBottom: 0}}
        onBackButtonPress={() => {
          setVisible(false);
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'white',
            width: '100%',
          }}>
             <View style={{padding:20}}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setVisible(false);
                    if (uploadType === 'front') {
                      openCamera();
                    }
                  }}>
                  <Feather
                    name="camera"
                    size={20}
                    color="#999"
                    style={{marginLeft: 10}}
                  />
                  <Text
                    style={{
                      color: '#000',
                      marginLeft: 15,
                      fontSize: 18,
                      fontWeight: '600',
                    }}>
                    Take Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setVisible(false);
                    if (uploadType === 'front') {
                      openGallery();
                    }
                  }}>
                  <Feather
                    name="image"
                    size={20}
                    color="#999"
                    style={{marginLeft: 10}}
                  />
                  <Text
                    style={{
                      color: '#000',
                      marginLeft: 15,
                      fontSize: 18,
                      fontWeight: '600',
                    }}>
                    Choose Image
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}
                  style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <Entypo
                    name="circle-with-cross"
                    size={22}
                    color="#999"
                    style={{marginLeft: 10}}
                  />
                 
                  <Text
                    style={{
                      color: '#000',
                      marginLeft: 15,
                      fontSize: 18,
                      fontWeight: '600',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      <RBSheet
        ref={refDocSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={450}
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
            padding: 10,
          }}>
          <View style={{alignItems: 'center', paddingVertical: wp(2)}}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: '600',
                paddingHorizontal: 10,
                marginBottom: wp(2),
                textTransform: 'uppercase',
              }}>
              Select Document
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginHorizontal: wp(4),
              marginTop: wp(4),
            }}>
            <View style={styles.wrapper}>
              <TouchableOpacity style={styles.sheetCard}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/passport.png')}
                    style={{
                      width: wp(9),
                      height: wp(9),
                      marginEnd: wp(2),
                    }}
                  />
                  <Text style={styles.headinglabels}>Passport</Text>
                </View>

                <View>
                  <MaterialIcons
                    style={styles.arrowIcon}
                    name="keyboard-arrow-right"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sheetCard}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/adhara-card.png')}
                    style={{
                      width: wp(9),
                      height: wp(9),
                      marginEnd: wp(2),
                    }}
                  />
                  <Text style={styles.headinglabels}>Voter ID</Text>
                </View>

                <View>
                  <MaterialIcons
                    style={styles.arrowIcon}
                    name="keyboard-arrow-right"
                    size={20}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sheetCard}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/id-card.png')}
                    style={{
                      width: wp(9),
                      height: wp(9),
                      marginEnd: wp(2),
                    }}
                  />
                  <Text style={styles.headinglabels}>Adhaar Card ID</Text>
                </View>

                <View>
                  <MaterialIcons
                    style={styles.arrowIcon}
                    name="keyboard-arrow-right"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </>
  );
};

export default UploadDocumentSingle;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 0.98,
  },

  header: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  pageWrapper: {
    marginHorizontal: wp(6),
    // flex: 1,
    // backgroundColor: '#ccc',
  },

  adharImg: {
    backgroundColor: '#fff',
    marginTop: wp(4),
    marginBottom: wp(2),
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: wp(3),
  },
  imageStyle: {
    height: 145,
    width: '98%',
    // margin: 10,
    borderRadius: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  send: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    // marginTop: wp(10),
  },
  sendDisabled: {
    BorderColor: '#444', // Change the background color for the disabled button
    backgroundColor: 'transparent',
    borderWidth: 0.5,
  },

  sendBtnTxt: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 15,
  },
  sendBtnTxtDisabled: {
    color: '#666',
    fontWeight: 'normal',
  },

  selectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
  },
  wrapper: {
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
    // paddingHorizontal: wp(2),
    marginVertical: hp(1),
  },
  labels: {
    color: '#666',
    fontSize: hp(1.6),
    paddingBottom: wp(1.5),
  },

  sheetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f8',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    marginVertical: wp(2),
  },
});
