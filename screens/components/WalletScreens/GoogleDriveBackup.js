import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
// import {
//   GDrive,
//   MimeTypes,
//   GoogleDrive,
//   ListQueryBuilder,
// } from '@robinbobin/react-native-google-drive-api-wrapper';
import {useDispatch, useSelector} from 'react-redux';
import {
  pbkdf2Sync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from 'react-native-crypto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setCloudVerified} from '../../../Store/web3';
import {useNavigation} from '@react-navigation/native';

const GoogleDriveBackup = () => {
  const {mnemonic} = useSelector(store => store.wallet);
  const [obj, setObj] = useState({name: 'rajneesh', last: 'singh'});
  const [validationError, setValidationError] = useState('');
  const [status, setVererStatus] = useState('');
  const [password, setPassword] = useState('');
  const salt = randomBytes(16).toString('base64');
  const ivs = randomBytes(16);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [drive, setDrive] = useState(null);
  const [accToken, setAccToken] = useState('');


  GoogleSignin.configure({
    scopes: [
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file',
    ],
    webClientId:
      '228049925155-ndg4a11u7onh0plfkung42qngja11112.apps.googleusercontent.com',
    offlineAccess: true,
  });

  const handlePasswordChange = text => {
    setPassword(text);
    setValidationError(''); // Clear any previous validation errors
  };

  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = (await GoogleSignin.getTokens()).accessToken;
      setAccToken(token);

      return userInfo;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      return false;
    }
  }

  // async function createGoogleDriveFolder() {
  //   try {
  //     const gdrive = new GDrive();
  //     gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
  //     const id = gdrive.createGoogleDriveFolder('Nute');
  //     console.log(id, 'id');
  //     return id;
  //   } catch (error) {}
  // }

  function encryptData(text, key, iv) {
    const cipher = createCipheriv('aes-256-cbc', key, iv);

    const encryptedData = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);
    return encryptedData.toString('base64');
  }

  function decryptData(encryptedData, key, iv) {
    try {
      console.log(encryptedData, key, iv, 'encryptedData, key, iv');
      const decipher = createDecipheriv('aes-256-cbc', key, iv);

      const decryptedData = Buffer.concat([
        decipher.update(encryptedData, 'base64'),
        decipher.final(),
      ]);
      return decryptedData.toString('utf8');
    } catch (error) {
      console.log('err::', error);
      return '';
    }
  }

  function deriveEncryptionKey(password) {
    console.log('Password:', password);
    console.log('Salt:', salt);
    return pbkdf2Sync(password, salt, 10000, 32, 'sha256');
  }

  // async function saveEncryptedObjectToDrive(encryptedObject, fileName) {
  //   try {
  //     const passwordRegex =
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //     if (!passwordRegex.test(password)) {
  //       setValidationError('Invalid Password.');
  //     } else {
  //       const data = await handleGoogleSignIn();
  //       if (data) {
  //         // const folderId = await createGoogleDriveFolder();
  //         // if (folderId) {
  //         // /const accessToken = (await GoogleSignin.getTokens()).accessToken;
  //         // const fileData = JSON.stringify(encryptedObject);
  //         const gdrive = new GDrive();
  //         gdrive.accessToken = accToken;
  //         gdrive.fetchTimeout = 5000;
  //         const mn = mnemonic;
  //         const encryptionKey = deriveEncryptionKey(password, salt);
  //         const encrypted = encryptData(mn, encryptionKey, ivs);
  //         const data = JSON.stringify({data: encrypted});
  //         const per = gdrive.permissions;

  //         if (per?.__accessToken) {
  //           const id = (
  //             await gdrive.files
  //               .newMultipartUploader()
  //               .setData(data, MimeTypes.JSON)
  //               .setRequestBody({
  //                 name: 'nute',
  //               })
  //               .execute()
  //           ).id;
  //           console.log(id, 'id');
  //           if (id) {
  //             setVererStatus(true);
  //             setPassword('');
  //             dispatch(setCloudVerified(true));
  //             setTimeout(() => {
  //               setVererStatus(false);
  //             }, 10000);
  //           } else {
  //             setValidationError('Something went wrong.');
  //           }

  //           console.log(id,"id")
  //           const bin = await gdrive.files.getJson(id);
  //           //  const d = JSON.stringify(bin);
  //            const da = bin?.data;
  //            const decryptionKey = deriveEncryptionKey(password, salt);
  //            const dat = decryptData(da, decryptionKey, ivs);
  //            console.log(dat,"dat")
           
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // }

  return (
    <View style={{flex: 0.89}}>
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
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.box}>
          <Text style={{fontSize: 24, color: '#000'}}>
            Set Encryption Password
          </Text>
          <Text style={{color: '#000', fontSize: 16}}>
            Create a password to encrypt your backup. This should not be your
            google drive password and it cannot be recovered or reset.
          </Text>
          <View>
            <TextInput
              value={password}
              secureTextEntry={true}
              // onBlur={validatePassword}
              onChangeText={val => handlePasswordChange(val)}
              placeholder="Enter Password"
              placeholderTextColor="#000"
              style={[
                styles.passwordText,
                {
                  color: '#000',
                  backgroundColor: '#fff',
                  borderColor: '#000',
                },
              ]}
            />
            <Text style={styles.validationErrorText}>
              Password must{' '}
              <Text style={{color: 'red'}}>contain 8 or more characters </Text>{' '}
              with at least
              <Text style={{color: 'red'}}>
                {' '}
                one lowercase letter, one uppercase letter, one number, and one
                symbol.
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View>
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                fontSize: 16,
                padding: 10,
              }}>
              {validationError}
            </Text>
            <Text
              style={{
                color: 'green',
                textAlign: 'center',
                fontSize: 16,
                padding: 10,
              }}>
              {status ? 'Backed Up Successfully.' : ''}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                borderRadius: 10,
              }}
              // onPress={() => saveEncryptedObjectToDrive(obj, 'nuteFile')}
              >
              <Text style={{color: '#fff'}}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoogleDriveBackup;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: hp(5.5),
    paddingHorizontal: 10,
    backgroundColor: '#F3F4F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    padding: 10,
  },
  passwordText: {
    borderWidth: 1,
    borderColor: '#CFD2D8',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,

    height: 50,
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: '400',
  },
  validationErrorText: {
    color: '#000',
    padding: 10,
    fontSize: 16,

    fontWeight: '900',
  },
});
