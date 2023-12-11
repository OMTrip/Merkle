import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Link, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ceil} from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { updateWallets } from '../../../Store/web3';

const WalletInfo = (props) => {
  const navigation = useNavigation();
  const {mnemonic, wallets,manuallyVerified,cloudVerified} = useSelector((store)=>store.wallet)
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
   
    const inputRef = useRef(null);

    const handleEdit = () => {
        setIsEditing(true);
        setTimeout(() => {
          inputRef.current.focus();
        }, 0);
      };
      // console.log(props.route.params,"walletInfo",mnemonic)

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = text => {
    setInputValue(text);
  };
  const handleSubmit = (e)=>{
    const {selectedWallet} = props.route.params;
    const d = {...selectedWallet}
    d.name = inputValue;
    const arr = wallets.map((item)=>{
      if(d.address?.toLowerCase()==item.address?.toLowerCase()){
        return d

      }
      return item;
      
    })
    dispatch(updateWallets([...arr]));
    navigation.navigate('WalletScreen');
    console.log(arr,"inputValueinputValue")
  }
  useEffect(()=>{
    if(inputValue?.length == 0){
    setInputValue(props?.route?.params?.selectedWallet?.name);
    }
  },[props])

  return (
    <View style={styles.container}>
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
            Wallets
          </Text>
        </View>

        <View style={{width: wp(50)}}>
          <Text
            style={{
              color: '#000',
              fontSize: hp(2),
              fontWeight: '600',
            }}>
            Wallet
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.walletsCards}>
          <View style={styles.walletsCardsInner}>
            <View>
              <Text style={styles.walletHeading}>Name</Text>
              <TouchableOpacity onPress={handleEdit}>
                <TextInput
                     ref={inputRef}
                  style={[
                    styles.walletName,
                    {
                      height: 40,
                      color: isEditing ? '#444' : '#000',
                    //   borderColor: isEditing ? '#eee' : 'transparent',
                      // borderWidth: 0.5,
                      //   textTransform: isEditing ? 'lowercase' : 'capitalize',
                      borderRadius: 3,
                    },
                  ]}
                  placeholder="Type something..."
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  onSubmitEditing={(e)=>handleSubmit(e)}
                  editable={isEditing}
                
                  value={inputValue}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity >
                <Entypo
                  name="circle-with-cross"
                  size={20}
                  style={styles.infoIcon}
                />
              </TouchableOpacity>

              {/* <MaterialCommunityIcons
                name="pencil-box-outline"
                size={20}
                style={styles.infoIcon}
              /> */}
            </View>
          </View>
        </View>

        <View style={{marginTop: wp(5)}}>
          <View>
            <Text style={styles.heading}>Backup Options</Text>
          </View>
          <View style={styles.card}>
            <TouchableOpacity style={styles.box} onPress={()=>{navigation.navigate("GoogleDriveBackup")}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconBgSquare}>
                  <MaterialCommunityIcons
                    name="cloud-download"
                    size={19}
                    style={{color: '#fff', fontWeight: '800'}}
                  />
                </View>
                <View style={styles.walletWrapper}>
                  <View>
                    <Text style={styles.walletName}>iCloud Backup</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.stausTxt, {color: cloudVerified?'green':'#999',}]}>
                    {cloudVerified?"Active":"Not Active"}
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={20}
                      style={styles.infoIcon}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={()=>{navigation.navigate("ManualBackup",{selectedWallet:props?.route?.params?.selectedWallet})}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconBgSquare}>
                  <MaterialCommunityIcons
                    name="file-document"
                    size={20}
                    style={{color: '#fff', fontWeight: '800'}}
                  />
                </View>
                <View style={styles.walletWrapper}>
                  <View>
                    <Text style={styles.walletName}>Manual Backup</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.stausTxt,{ color: manuallyVerified?'green':'#999',}]}>{manuallyVerified?"Active":"Not Active"}</Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={20}
                      style={styles.infoIcon}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.infowrapper}>
        <Text style={styles.listItem}>
          We Highly recommend completing both backup options to help prevent the
          loss of your crypto.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F7',
    marginHorizontal: wp(5),
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: hp(5.5),
    backgroundColor: '#F3F4F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  heading: {
    color: '#999',
    fontSize: hp(1.5),
    marginTop: hp(2),
    textTransform: 'uppercase',
    paddingHorizontal: wp(3),
  },

  walletsCards: {
    paddingHorizontal: wp(3),
    // paddingVertical: wp(1),
    backgroundColor: '#fff',
    marginVertical: hp(1),
    color: '#444',
    borderRadius: 6,
  },

  walletsCardsInner: {
    paddingTop: wp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    marginBottom: hp(2),
    marginTop: wp(1),
    borderRadius: wp(2),
    color: '#888',
    width: '100%',
    backgroundColor: '#fff',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconBgSquare: {
    backgroundColor: '#000',
    height: wp(9),
    width: wp(9),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#eee',
    marginHorizontal: wp(3),
  },

  walletWrapper: {
    paddingStart: wp(1),
    borderBottomWidth: 0.187,
    borderBottomColor: '#eee',
    flex: 1,
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius:wp(1),
    // backgroundColor:'#eee'
  },
  infoIcon: {
    color: '#ccc',
    paddingEnd: wp(3),
  },

  walletName: {
    color: '#000',
    fontWeight: '400',
    fontSize: wp(4),
  },
  walletHeading: {
    color: '#999',
    fontSize: wp(3.2),
  },
  stausTxt: {
   
    fontSize: wp(3.5),
    marginEnd: wp(2),
  },
  infowrapper: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(0),
    borderRadius: wp(3),
  },

  listItem: {
    color: '#999',
    fontSize: wp(3.2),
  },
});

export default WalletInfo;
