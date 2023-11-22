import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Checkbox} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ManualBackup = (props) => {
    const[checked1,setChecked1] = useState(false);
    const[checked2,setChecked2] = useState(false)
    const[checked3,setChecked3] = useState(false);
    const navigation = useNavigation()
    function nextStep(){
        if(checked1&&checked2&&checked3){

            navigation.navigate("MnemonicPhraseList",{selectedWallet:props.route.params.selectedWallet})
        }
    }
  return (
    <View style={styles.box}>
      <View style={{padding: 10}}>
        <Text style={styles.heading}>Secret Phrases</Text>
        <Text style={{color: '#000'}}>
          In the Next Step you will see secret phrase (12 words) that allows you
          to recover your wallet.
        </Text>
      </View>
      <View style={{flex:.84, justifyContent:"space-between"}}>
      <View style={styles.mainBox}>
        <View style={styles.innerBox}>
          <Text style={styles.caption}>
            IF I Lost my secret phrase, my funds will be lost forever.
          </Text>
          <View style={styles.checkBox}>
            <Checkbox
              status={checked1 ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked1(!checked1);
              }}
            />
          </View>
        </View>
        <View style={styles.innerBox}>
          <Text style={styles.caption}>
            IF I expose or share my secret phrase to anybody,my fund can get stolen.
          </Text>
          <View style={styles.checkBox}>
            <Checkbox
              status={checked2 ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked2(!checked2);
              }}
            />
          </View>
        </View>
        <View style={styles.innerBox}>
          <Text style={styles.caption}>
            Nute wallet support will never ask for it.
          </Text>
          <View style={styles.checkBox}>
            <Checkbox
              status={checked3 ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked3(!checked3);
              }}
            />
          </View>
        </View>
      </View>
      <View  style={{padding:10}}>
      <TouchableOpacity style={{width:"100%",height:50,backgroundColor:"#000",color:"#fff",justifyContent:"center",alignItems:"center"}} onPress={()=>{nextStep()}}>
        <Text style={{color:"#fff",fontSize:20}} > Continue</Text>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default ManualBackup;

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 20,
  },
  mainBox: {
    padding: 10,
  },
  innerBox: {
    borderWidth: 1,
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  checkBox: {
    borderColor: '#000',
    width: 25,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#000', // Change the color to your desired color
    fontWeight: '900',
  },
  caption: {color: '#000', width: '90%', fontSize: 14},
  infoIcon: {
    color: '#000',
    lineHeight: 25,
    // textAlign: 'center',
    // fontWeight: '900',
    // alignItems: 'center',
    position: 'relative',
    top: 2,
  },
});
