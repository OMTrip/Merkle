import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  StatusBar,
  ActivityIndicator,
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

const ManualKycUploadDoc = ({route}) => {
  const [frontPhoto, setFrontPhoto] = useState();
  const [backPhoto, setBackPhoto] = useState();
  const [visible, setVisible] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [loader, setLoader] = useState(false);
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {documentType} = route.params;
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
      setFrontPhoto(result.assets[0].uri);
      // console.log(result.assets[0].uri, 'opencamera pic path');
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setFrontPhoto(result.assets[0].uri);
    // console.log(result.assets[0].uri, 'gallery ui 1');
  };

  const openCamera2 = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setBackPhoto(result.assets[0].uri);
      // console.log(result.assets[0].uri, 'opencamera222 pic path');
    }
  };

  const openGallery2 = async () => {
    const result = await launchImageLibrary(options);
    setBackPhoto(result.assets[0].uri);
    // console.log(result.assets[0].uri, 'gallery ui 2');
  };

  const uploadFrontAdharCardHandler = () => {
    setUploadType('front');
    setVisible(true);
    setIsButtonDisabled(true);
  };

  const uploadBackAdharCardHandler = () => {
    setUploadType('back');
    setVisible(true);
    setIsButtonDisabled(true);
  };

  const submitDocument = async () => {
    if (frontPhoto && backPhoto) {
      // Toast.show({
      //   type: 'success',
      //   text1: 'Your Documents are Uploded',
      //   // text2: 'You will be updated soon',
      // });
      setLoader(true);
      const userNumber = user.mobile;
      const userName = user.name;

      // Remove the local file path prefix (e.g., file:///data/user/0/com.nute/cache/)
      const frontPhotoName = frontPhoto.replace(/^.*[\\\/]/, '');
      const backPhotoName = backPhoto.replace(/^.*[\\\/]/, '');

      // Construct the custom Firebase Storage paths
      const pathToFile1 = `documentsImg/${userName}_${userNumber}/${frontPhotoName}`;
      const pathToFile2 = `documentsImg/${userName}_${userNumber}/${backPhotoName}`;

      // Reference for Firebase Storage
      const reference1 = storage().ref(pathToFile1);
      const reference2 = storage().ref(pathToFile2);

      try {
        // Upload the files to Firebase Storage
        await reference1.putFile(frontPhoto);
        await reference2.putFile(backPhoto);

        const userdata = await userCollection.getUser(userNumber);
        const uobj = {...userdata};
        uobj.aadharDocKyc = 1;
        await userCollection.updateUser({...uobj});

        const user_kyc_status = {
          aadharkyc: 1,
          pankyc: 1,
          aadhardockyc: 1,
        };
        setLoader(true);
        dispatch(setUserKycStatus(user_kyc_status));
        setLoader(false);
        navigation.navigate('UploadDocumentSingle');
      } catch (error) {
        console.error('Error uploading files:', error);
        setLoader(false);
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
    if (frontPhoto && backPhoto) {
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
        </View>
        <ScrollView>
          <>
            <View style={styles.pageWrapper}>
              <Text
                style={{
                  color: '#444',
                  fontSize: wp(5),
                  fontWeight: '600',
                  marginBottom: wp(1),
                }}>
                Upload Documents
              </Text>
              <Text style={{color: '#666', fontSize: wp(3.5)}}>
                Upload a color image of the entire document. Screenshot are not
                allowed. JPG, JPEG, or PNG format only
              </Text>

              <View style={{marginBottom: wp(6)}}>
                <View style={styles.adharImg}>
                  {frontPhoto ? (
                    <Image
                      style={styles.imageStyle}
                      source={{uri: frontPhoto}}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      style={styles.imageStyle}
                      source={{uri: frontPhoto}}
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
                    backgroundColor: '#dedede',
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
                    Upload Front of {documentType}
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <View style={styles.adharImg}>
                  {backPhoto ? (
                    <Image
                      style={styles.imageStyle}
                      source={{uri: backPhoto}}
                    />
                  ) : (
                    <Image
                      style={styles.imageStyle}
                      source={{uri: backPhoto}}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: '99%',
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#dedede',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: wp(1),
                }}
                onPress={uploadBackAdharCardHandler}>
                <Feather name="upload" size={20} color="#333" />
                <Text
                  style={{
                    color: '#333',
                    marginLeft: 15,
                    fontSize: wp(4),
                  }}>
                  Upload Back of {documentType}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </ScrollView>

        <View style={styles.pageWrapper}>
          <TouchableOpacity
            style={[styles.send, isButtonDisabled ? styles.sendDisabled : null]}
            disabled={isButtonDisabled}
            // style={styles.send}
            onPress={submitDocument}>
            <Text 
               style={[styles.sendBtnTxt, isButtonDisabled ? styles.sendBtnTxtDisabled : null]}
            >
              Upload Documents and Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {loader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loaderText}>Uploading Documents...</Text>
        </View>
      ) : null}

     

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
                  } else if (uploadType === 'back') {
                    openCamera2();
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
                    fontWeight: '500',
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
                  } else if (uploadType === 'back') {
                    openGallery2();
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
                    fontWeight: '500',
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
                    fontWeight: '500',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ManualKycUploadDoc;

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
    padding: 15,
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor:'#000',
  },

  sendBtnTxt: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 15,
  },
  sendBtnTxtDisabled: {
    color: '#000',
    fontWeight: 'normal',
  },
  loaderContainer: {
    // flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: wp(4),
    fontWeight: '600',
    color: '#000',
  },
});
