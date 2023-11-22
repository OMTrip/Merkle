import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
export default class OtpBox extends Component {
  state = {
    otpInput: '',
    inputText: '',
    showError:"",
    
  };
  alertText = () => {
    const {otpInput = ''} = this.state;
    if (otpInput) {
      Alert.alert(otpInput);
    }
  };

  clear = () => {
    this.input1.clear();
  };

  updateOtpText = e => {
    this.props.checkOtp(e);
    // will automatically trigger handleOnTextChange callback passed
    // this.input1.setValue(this.state.inputText);
    // const { showError } = this.props;
    // this.setState({showError})
    // console.log('this.state.inputText', showError);
  };

  render() {
    
    return (
      <View style={styles.container}>
        <OTPTextView
          handleTextChange={e => {
            this.updateOtpText(e);
          }}
         containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          tintColor={this.props.showError ? 'red':'#3CB371'}          
          offTintColor={this.props.showError ? 'red':'#f3f2f7'}
          inputCount={6}
          autoFocus={false}
          
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    justifyContent: 'center',
    alignItems: 'center',   
  },
  textInputContainer:{
    flexDirection: 'row',
  },
  
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 0.6,
    backgroundColor: '#f3f2f8',
    width: 45,
    height: 45,
    borderColor: '#333',
    borderBottomWidth:0.6,
    borderColor:'#333'
  },
});
