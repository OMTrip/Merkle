import React, { useState } from 'react';
import { View, Button, Text, Modal, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const ConfirmationModal = ({status,setStatus,operator,mobileNumber,amount}) => {
  const navigation = useNavigation()
  return (

      <Modal visible={status} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Image source={require('./path_to_your_image.png')} style={styles.image} /> */}
            <View style={{justifyContent:"center"}}>
            <AntIcon
                        name="checkcircleo"
                        size={35}
                        color="green"
                        // style={{paddingRight: 5}}
                      />
            </View>

            <Text style={styles.confirmationText}>
              Recharge For your {operator}  number {mobileNumber} with {amount} INR is Successfull.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={()=>{setStatus(false); navigation.navigate("RecieptPage")}} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
             
            </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding:10
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  confirmationText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color:"#000"
  },
  buttonContainer: {
    justifyContent: 'center',

  },
  cancelButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width:100
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:"center"
  },
});

export default ConfirmationModal;
