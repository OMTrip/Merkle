import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const AllRecharge = props => {
  const navigation = useNavigation();
  return (
    <>
    {/* <ScrollView> */}
      <View style={styles.box}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(props.goBack)}>
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={wp(8)}
              color={'black'}
            />
          </TouchableWithoutFeedback>
          <Image
            style={styles.imagedefault}
            source={require('../../../assets/app_logo.png')}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.body}>
          <View style={styles.textbox}>
            <Text
              style={{
                marginBottom: hp(2),
                fontSize: wp(4),
                fontWeight: "400",
                color: 'grey',
              }}>
              Operator Details
            </Text>
            <Text style={{fontSize: wp(3.5), color: 'black'}}>
              {props.OperatorDetails}
            </Text>
          </View>
          <Image
            style={styles.airtelicon}
            source={props.ImagePath}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.input} placeholder={props.placeholder} />
          <Text style={{fontSize: wp(3), padding: wp(2), color: 'grey'}}>
            {props.validationText}
          </Text>
        </View>
      </View>
      <LinearGradient
        colors={['#52c234', '#061700']}
        start={{x: 0, y: 0}} // Start point of the gradient (top-left)
        end={{x: 1, y: 0}} // End point of the gradient (top-right)
        style={styles.btn}>
        <TouchableWithoutFeedback
          onPress={() => console.log('>>>>>>>>Continue')}>
          <Text style={{fontSize: wp(4), fontWeight: "400"}}>Continue</Text>
        </TouchableWithoutFeedback>
      </LinearGradient>
      {/* </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  }, 
  header: {
    marginTop: hp(5),
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagedefault: {
    width: wp(25),
    height: hp(5),
  },
  body: {
    //   backgroundColor:"red",
    marginTop: hp(5),
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textbox: {
    flexDirection: 'column',
  },
  airtelicon: {
    width: wp(13),
    height: hp(6),
    marginRight: wp(2),
    borderRadius: 30,
  },
  inputbox: {
    marginTop: hp(10),
    marginHorizontal: wp(3),
  },
  input: {
    borderRadius: wp(1),
    height: hp(7),
    borderWidth: wp(0.2),
    padding: hp(2),
    borderColor: 'grey',
    fontSize: wp(5),
  },
  btn: {
    marginTop: hp(50),
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(7),
  },
});

export default AllRecharge;
