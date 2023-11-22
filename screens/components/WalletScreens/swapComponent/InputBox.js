import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import {Link, useNavigation} from '@react-navigation/native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import {ceil} from 'lodash';
  import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
  import { useDispatch, useSelector } from 'react-redux';
  import { initializeSwapTokens } from '../../../Store/web3';
  import { useState,memo, useEffect } from 'react';
import { cutAfterDecimal } from '../../../../Utils/web3/helperFunction';
  
const InputBox = (props)=>{
    const{title,type,token,setInput,input, handleChange,initialLoader,tokenList}= props
    const[linput,setlInput] = useState("");
    // const[to,setTo] = useState("")
    const navigation = useNavigation();
    // useEffect(()=>{
    //   console.log(input,"input12")
    //   setlInput(input)
    // },[input])
    return (
      <View style={styles.input}>
              <View>
                <Text style={styles.labels}>{title}</Text>
              </View>
              <View style={styles.box}>
                <TextInput
                  placeholder="0"
                  placeholderTextColor={'#444'}
                  editable={initialLoader?false:true}
                  style={{
                    flex: 0.7,
                    color: '#000',
                    fontSize: wp(6),
                    fontWeight: '600',
                  }}
                  keyboardType="numeric"
                  value={input?.toString()?cutAfterDecimal(input?.toString(),6):0}
                  onChangeText={(val)=>{handleChange(val)}}
                />

  
                <TouchableWithoutFeedback
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: '#fff',
                    // flex: 0.4,
                  }}
                  onPress={()=>{navigation.navigate(tokenList,{type})}}
                  >
                  <View>
                    <Image
                      source={{uri:token?.logo}}
                      style={{
                        width: 25,
                        height: 25,
                        //  borderRadius: wp(50),
  
                        marginEnd: wp(2),
                      }}
                      resizeMode='contain'
                    />
                  </View>
                  <View>
                    <Text style={styles.tokenName}>{token?.symbol}</Text>
                  </View>
                  <View>
                    <MaterialIcons
                      style={{
                        marginEnd: wp(4),
                        paddingTop: wp(0.5),
                        marginStart: wp(1),
                      }}
                      name="keyboard-arrow-right"
                      size={19}
                      color={'#999'}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <Text style={styles.labels2}>Balance:{token?.balance?cutAfterDecimal(token.balance,6):0}</Text>
              </View>
            </View>
    )
  }

  export default InputBox

  const styles = StyleSheet.create({
   
    header: {
      width: '100%',
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    wrapper: {
      paddingVertical: 10,
      backgroundColor: '#fff',
      marginVertical: hp(2),
      borderRadius: wp(2),
      color: '#888',
      width: '100%',
    },
  
    box: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      color: '#444',
      fontSize: 13,
      paddingHorizontal: wp(4),
      // marginVertical: 0,
    },
    border: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#ddd',
      marginVertical: wp(3),
    },
  
    transactionCards: {
      paddingHorizontal: wp(3),
      paddingVertical: wp(3),
      backgroundColor: '#fff',
      // marginHorizontal: hp(2),
      marginVertical: hp(1),
      color: '#444',
      borderRadius: 6,
    },
  
    transactionCardsInner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    headText: {
      color: '#444',
      fontSize: hp(1.8),
      fontWeight: '600',
    },
  
    fromText: {
      color: '#888',
      fontSize: hp(1.5),
    },
    tokenName: {
      color: '#000',
      fontSize: hp(1.8),
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    subtoken: {
      color: '#888',
      fontSize: hp(1.2),
    },
    labels: {
      color: '#444',
      fontSize: hp(1.5),
    },
  
    labels2: {
      color: '#999',
      fontSize: hp(1.5),
    },
    arrowBg: {
      backgroundColor: '#fff',
      height: wp(10),
      width: wp(10),
      borderRadius: wp(50),
      borderWidth: 1,
      borderColor: '#eee',
      textAlign: 'center',
      lineHeight: wp(10),
      position: 'absolute',
      top: -wp(8),
      right: wp(4),
    },
  
    exchnageICon: {
      color: '#10CF7F',
      fontSize: wp(8),
    },
  
    send: {
      alignSelf: 'center',
      padding: 15,
      // backgroundColor: '#10CF7F',
      backgroundColor: '#000',
      borderRadius: 7,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: wp(5),
      flexDirection: 'row',
      textAlign: 'center',
    },
    disabledBtn: {
      alignSelf: 'center',
      padding: 15,
      // backgroundColor: '#10CF7F',
      backgroundColor: '#000',
      borderRadius: 7,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: wp(5),
      flexDirection: 'row',
      textAlign: 'center',
      opacity: 1,
    },
  });