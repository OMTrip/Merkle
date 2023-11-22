import { StyleSheet, Text, View, FlatList, TouchableOpacity,Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { setManuallyVerified } from '../../../Store/web3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  pbkdf2Sync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from 'react-native-crypto';

const VerifyManually = () => {
  const navigation = useNavigation();
  const { mnemonic } = useSelector(store => store.wallet);
  const [shuffle, setShuffle] = useState([]);
  const [arr, setArr] = useState([]);
  const [err,setErr] = useState(false);
  const [succ,setSucc] = useState(false)
  const dispatch = useDispatch()
  const salt = randomBytes(16).toString('base64');

   // Use state to store the selected items
   

  function encryptData(text, key, iv) {
    const cipher = createCipheriv('aes-256-cbc', key, iv);

    const encryptedData = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);
    return encryptedData.toString('base64');
  }

  // Decryption function
  function decryptData(encryptedData, key, iv) {
    const decipher = createDecipheriv('aes-256-cbc', key, iv);

    const decryptedData = Buffer.concat([
      decipher.update(encryptedData, 'base64'),
      decipher.final(),
    ]);
    return decryptedData.toString('utf8');
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('nute');
      if (value !== null) {
        console.log(value,"value")
      }
    } catch (e) {
      // error reading value
    }
  };

  function deriveEncryptionKey(password) {
    return pbkdf2Sync(password, salt, 10000, 32, 'sha256');
  }

  const storeData = async (value) => {
    try {
      const pass = await deriveEncryptionKey("nute");
      const en = await encryptData(mnemonic,pass,randomBytes(16))
      
      await AsyncStorage.setItem('nute', en);
    } catch (e) {
      console.log(e,"eee")
      Alert.alert("Error","Something Went wrong.")
    }
  };

  function shuffleArray(array) {
    const shuffledArray = [...array]; // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const getActualArray = useCallback((item) => {
    if (arr.length < 12) {
      setArr(prevArr => [...prevArr, item]);
    }
  }, [arr]);

  async function checkArraysAtSameIndex(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      setErr(true)
      setTimeout(()=>{
        setErr(false)
      },5000)
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        setErr(true)
        setTimeout(()=>{
          setErr(false)
        },5000)
        return false; 
      }
    }
   await storeData()
    dispatch(setManuallyVerified(true))
    setSucc(true);
    setTimeout(()=>{
      setSucc(true)
    },5000)
  
    return true; // All elements at the same index are the same
  }

  useEffect(() => {
    const shuffl = shuffleArray(mnemonic.split(' '));
    console.log(shuffle, "shuffle");
    setShuffle(shuffl);
    getData()

  }, [mnemonic]);

  return (
    <View style={{ flex: .9}}>
      <Text style={{ textAlign: "center", color: "#000", fontSize: 26, padding: 10 }}>Verify Secret Phrase</Text>
      <View style={{ padding: 10, flex: 1 }}>
        <View style={{ minHeight: 180, borderWidth: 1, borderColor: "#000", borderRadius: 10 }}>
          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {arr.length > 0 && arr.map((ele,i) => {
              return (
                <View style={styles.itemContainer} key={i+ele}>
                  <Text style={styles.itemText}>{i+1}. {ele}</Text>
                </View >

              )
            })}
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent:"center", paddingVertical:10}}>
      {
       shuffle.length > 0 && shuffle.map((item,i) => {
        return (
          <TouchableOpacity style={styles.itemContainer} onPress={() => { getActualArray(item) }} key={i+item}>
            <Text style={styles.itemText}>{i+1}. {item}</Text>
            </TouchableOpacity>

        )
      })
      }
      </View>
      </View>
     
     
      <View style={{ padding: 10 }}>
        {err?<Text style={{color:"red",fontSize:16,textAlign:"center", padding:10}}>Phrase does not match.</Text>:""}
        {succ?<Text style={{color:"green",fontSize:16,textAlign:"center", padding:10}}>Phrase Verified.</Text>:""}
      <TouchableOpacity
  style={{
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }}
  onPress={()=>{checkArraysAtSameIndex(mnemonic.split(" "),arr)}}>
  <Text style={{ color: '#fff', fontSize: 20 }}>Continue</Text>
</TouchableOpacity>
      </View>
    </View>
  )
}

export default VerifyManually;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: wp(5),
    backgroundColor: '#F3F4F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
});
