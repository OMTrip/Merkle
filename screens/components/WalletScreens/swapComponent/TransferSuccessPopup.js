import React from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TransferSuccessPopup = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <View style={{minHeight:80,minWidth:80,borderRadius:50,backgroundColor:"green",justifyContent:"center",alignItems:"center",marginBottom:10}}>
          <Icon name="check" size={50} color="#fff" />
          </View>
          <Text style={styles.successText}>Transfer Successful!</Text>
          <TouchableOpacity  onPress={onClose} style={{backgroundColor:"#eee",borderRadius:15,paddingHorizontal:15,paddingVertical:10,marginVertical:10}} >
            <Text style={{color:"#000",fontSize:18}}>Close</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    minWidth:"80%",
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, 
    shadowColor: 'black', // Shadow for Android
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom:10
  },
});

export default TransferSuccessPopup;
