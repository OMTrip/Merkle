import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../HomeScreen/HomeHeader';
import { validateBankAccount } from '../../../Utils/apis/api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const FundTransfer = () => {
  const navigation = useNavigation()
  const [accountNo, setAccountNo] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount ] = useState('') 
  const[validateResp,setValidateResp] = useState({});
  const [loading,setLoading] = useState(false)
  const [show,setShow] = useState(false);
  
  return (
    <View style={styles.box}>
      <LinearGradient
        colors={['#52c234', '#061700']}
        start={{x: 0, y: 0}} // Start point of the gradient (top-left)
        end={{x: 1, y: 0}} // End point of the gradient (top-right)
        style={{
          height: hp(10),
          justifyContent: 'center',
          paddingHorizontal: hp(3),
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          title={'Fund Transfers'}
          TextTitle={true}
          menu={false}
        />
      </LinearGradient>
      <View style={styles.innerBox}>
        <View>
          <TextInput
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            label="Account Number"
            onChangeText={number => {
              const trimmedNumber = number.trim();
              setAccountNo(trimmedNumber);
            }}
            outlineColor="green"
            activeOutlineColor="green"
            theme={{
              colors: {
                surfaceVariant: 'transparent',
              },
            }}
          />

          <TextInput
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            label="Moblie Number"
            onChangeText={number => {
              const trimmedNumber = number.trim();
              setMobileNumber(trimmedNumber);
            }}
            theme={{
              colors: {
                surfaceVariant: 'transparent',
              },
            }}
            outlineColor="green"
            activeOutlineColor="green"
            textColor="#000"
          />
          <TextInput
            mode="outlined"
            style={styles.input}
            value={ifscCode}
            keyboardType="text"
            label="IFSC Code"
            onChangeText={text => {
              const trimmedText = text.trim();
              setIfscCode(trimmedText);
            }}
            //   underlineColor="#52c234"
            textColor="#000"
            outlineColor="green"
            activeOutlineColor="green"
            theme={{
              colors: {
                surfaceVariant: 'transparent',
              },
            }}
          />
          {show &&(
            <View>
          <TextInput
            mode="outlined"
            style={styles.input}
            keyboardType="text"
            label="Account Holder Name"
            value={validateResp?.ben_name}
            editable={false}
           
            textColor="#000"
            outlineColor="green"
            activeOutlineColor="green"
            theme={{
              colors: {
                surfaceVariant: 'transparent',
              },
            }}
          />
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            label="Amount"
            onChangeText={(number)=>{setAmount(number)}}
            
           
            //   underlineColor="#52c234"
            textColor="#000"
            outlineColor="green"
            activeOutlineColor="green"
            theme={{
              colors: {
                surfaceVariant: 'transparent',
              },
            }}
          />
          </View>
          )}



          <Text style={validateResp.status == "SUCCESS"?{color:"#52c234"}:{color:"red",textAlign:"center"}}> 
          {validateResp.status == "SUCCESS"&&<FontAwesome
            name="check"
            size={13}
            color="#52c234"
            style={{marginRight: 10}}
          />}
          {validateResp.status == "SUCCESS"?validateResp?.verify_status:validateResp?.message}</Text>
        </View>

        <View style={styles.btn}>
         
            <TouchableOpacity
              onPress={async () => {
                // navigation.navigate('RechargePayment',{data:{rs:10,type:{name:"transfer"}},details:{ifscCode:"fbdabsjv1234254",mobileNumber:'743658784358',name:"respdkjsvbj",accountNo:"764736787"}});
                if(!show){
                if(!mobileNumber || !accountNo || !ifscCode ){
                    console.log("empty Data")

                }else{
                    setLoading(true)
                  const res = await validateBankAccount(accountNo,mobileNumber,ifscCode?.toUpperCase())
                  console.log(res,"resp")
                  setValidateResp(res)
                  if(res.status=="SUCCESS"){
                    setTimeout(()=>{
                    setLoading(false)
                    setShow(true)
                    },5000)
                  }else{
                    setLoading(false)
                  }
                }
              }else{
                navigation.navigate('RechargePayment',{data:{rs:amount,type:{name:"transfer"}},details:{ifscCode:ifscCode?.toUpperCase(),mobileNumber,name:validateResp.ben_name,accountNo}});
              }

              }}
              style={styles.buttonCircle}
              >

              {loading ? (
                <ActivityIndicator animating={true} color={MD2Colors.white} />
              ) :<Text
                style={{
                  fontSize: wp(4),
                  
                  fontWeight: '400',
                  textAlign: 'center',
                  color: (mobileNumber.length == 10  && accountNo && ifscCode) ? '#fff' : '#000',
                }}>
                <AntDesign
            name="arrowright"
            size={24}
            color="#fff"
            style={{marginRight: 10}}
          />
              </Text>}

            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FundTransfer;

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  innerBox: {
    flex: 0.86  ,
    padding: 10,
    justifyContent: 'space-between',
  },
  input: {
    // borderBottomWidth: 1,
    // color: '#000',
    width: wp(95),
    // borderBottomWidth: wp(0.4),
    // paddingBottom: hp(1.5),
    // borderBottomColor: 'grey',
    marginVertical: 10,
    textTransform:'uppercase',
    // fontSize: wp(5),
  },
  btn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight:150,
  },
  buttonCircle:{
    borderRadius:50,
    minWidth:60,
    minHeight:60,
    backgroundColor:"#000",
    alignItems:"center",
    justifyContent:"center"
  }
});
