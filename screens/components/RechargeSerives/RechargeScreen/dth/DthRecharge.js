import React, {useEffect, useState, memo} from 'react';
import {StyleSheet, View, FlatList, StatusBar, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import Carditems from './Carditems';
import HomeHeader from '../../../HomeScreen/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {DTHOperator} from '../../../../../Utils/web3/helperFunction';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setIcon} from '../../../../../Store/paymentDetails';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DthRecharge = () => {
  const navigation = useNavigation();
  const details = useSelector(store => store.details);
  const {operatorCode, circleCode, circleName} = details;
  const [dthOperatorData, setDthOperatorData] = useState([]);
  const dispatch = useDispatch();
   
    const Card =memo(({item})=>{
      return (
        <TouchableOpacity
          style={styles.Card}
          onPress={() => {
            const url = DTHOperator[`${item.operator_name}`]
              ? DTHOperator[`${item.operator_name}`]
              : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1694598963/nute/dth/all_tzctrd.png';
            dispatch(setIcon(url));
            navigation.navigate('DthPlan', {
              data: item,
              input: {name: 'Customer Id', type: 'DTH'},
            });
          }}>
          <Carditems
            title={item.operator_name}
            source={{
              uri: DTHOperator[`${item.operator_name}`]
                ? DTHOperator[`${item.operator_name}`]
                : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1694598963/nute/dth/all_tzctrd.png',
            }}
          />
        </TouchableOpacity>
      )
    });
 
    const renderItem = ({item}) => (
      <Card item ={item}/>
    );

  useEffect(() => {

    if(operatorCode?.response){
      const data = [...operatorCode?.response];
    if (data?.length) {
      const dthOp = data?.filter((ele, i) => {
        return ele.service_type === 'DTH' && ele.biller_status == 'on';
      });
      setDthOperatorData(dthOp);
    }
  }
  }, [operatorCode]);

  return (
    <>
      <View style={styles.box}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View         
          style={{
            // height: hp(10),
            paddingVertical: wp(3),
            justifyContent: 'center',
            paddingHorizontal: hp(2),
            backgroundColor:'#000'
          }}>
          <HomeHeader
            icons={true}
            iconName={'keyboard-backspace'}
            size={wp(8)}
            title={'DTH Recharge'}
            TextTitle={true}
            leftIocnsSubScreen={false}
            LeftIconsName={'magnify'}
          />
        </View>
        <View style={styles.wrapper}>
        <View style={{marginHorizontal: wp(2), paddingBottom: wp(10)}}>
          <FlatList
            data={dthOperatorData}
            renderItem={renderItem}
            keyExtractor={item => item.operator_id.toString()}
          />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#f3f4f7',
  },
  Card: {   
    // backgroundColor: '#fff',
    // borderBottomWidth: 0.187,
    // borderBottomColor: '#ccc',
  },
 wrapper: {
    // backgroundColor: '#fff',
    // borderRadius: 10,   
    marginHorizontal: wp(2),
    marginTop: wp(3),  
  },
 
 
});

export default DthRecharge;
