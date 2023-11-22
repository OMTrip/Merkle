import React, { useEffect } from 'react';
import {View, Modal,StyleSheet, Text,TextInput, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SetAmount = ({isVisible, closeModal,setAmm}) => {
  const[am,setAm] = React.useState("")

  useEffect(()=>{
    if(am.length !=0){
      setAm("")
    }

  },[])

    
  return (
    <Modal
    //   animationType="slide"      
      transparent={true}
      backdropOpacity={1}
      visible={isVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}>
        <View
          style={{
            backgroundColor: '#DEDEDE',
            // paddingVertical:wp(5),
            paddingHorizontal: 20,
            paddingVertical:15,
            borderRadius: 10,
            width: '80%',
            color:'#000'
          }}>
          <Text style={{color: '#000', fontSize: wp(4.5), fontWeight:'600', textAlign:'center'}}>Enter Amount</Text>

          <View 
        //   style={{paddingHorizontal:wp(5)}}
          >
            <TextInput isFocused
             style={styles.input}
            //   placeholder="BNB Amount"
            keyboardType='numeric'
              placeholderTextColor={'#bbb'}
              onChangeText={(number)=>{
                setAm(number)
              }}
            />
            </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: wp(2),
            //   borderTopWidth:0.5,
            //     borderTopColor:'#ccc',
              
            //     paddingTop:wp(4),
            //     paddingHorizontal:wp(5)
                
            }}>
            <View >
              <TouchableOpacity onPress={()=>{closeModal();setAmm(am)}}>
                <Text style={{color: '#666', fontWeight:'600'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity onPress={()=>{closeModal();setAmm(am)}}>
                <Text style={{color: '#000', fontWeight:'600'}}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({    
    input: {
      color: '#000',
      backgroundColor:'#fff',
      fontSize: 16,
      paddingVertical:wp(1.5),
      borderWidth:0.5,
      borderColor:'#bbb',
      borderRadius:wp(2) ,
      marginBottom:wp(3),
      marginTop:wp(5)   
    },
    
  });

export default SetAmount;
