import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation} from '@react-navigation/native';
import Carditems from '../RechargeSerives/RechargeScreen/dth/Carditems';
import HomeHeader from '../HomeScreen/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import { Landline } from '../../../Utils/web3/helperFunction';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LandlineBill = () => {
  const navigation = useNavigation();
  const details = useSelector(store => store.details);
  const {operatorCode, circleCode, circleName} = details;
  const[dthOperatorData,setDthOperatorData] = useState([])

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.Card} onPress={()=>{
      navigation.navigate('DthPlan',{data:item, input:{name:"Customer Id", type:"DTH" }})}}>
        <Carditems
          title={item.operator_name}
          source={{
            uri: Landline[`${item.operator_name}`]
              ? Landline[`${item.operator_name}`]
              : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1694674092/nute/fastag/fastag_cdu2o9.png',
          }}
        />
      </TouchableOpacity>
  );

  useEffect(()=>{


    if(operatorCode?.response){
      const data = [...operatorCode?.response];
    if (data?.length) {
      const dthOp = data?.filter((ele, i) => {
        return ele.service_type === 'Landline' && ele.biller_status == 'on';
      });
      // const dat = dthOp.map(ele => ele.operator_name);
      // console.log(dat, 'data');  
      setDthOperatorData(dthOp);
    }
  }
  }, [operatorCode]);


  //   if(dthOperatorData.length===0){
  //   const resp = JSON.parse(operatorCode)?.response;
  //   const dthOp = resp?.filter((ele,i)=>{
  //     return ele.service_type ==="Landline" && ele.biller_status=="on"
  //   });
  //   // const dat = dthOp.map(ele => ele.operator_name);
  //   // console.log(dat, 'data');
  //   setDthOperatorData(dthOp)
  // }
  // },[operatorCode])


  return (

    <View style={styles.box}>
      <View
        style={{
          // height: hp(10),
          backgroundColor: '#000',
          justifyContent: 'center',
          paddingHorizontal: hp(2),
          paddingVertical: wp(3),
        }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          title={'Landline'}
          TextTitle={true}
          leftIocnsSubScreen={false}
          LeftIconsName={'magnify'}
        />
      </View>
     
     <View style={styles.wrapper}>
      <View style={{marginHorizontal: wp(1), paddingBottom: wp(10)}}>
        <FlatList
          data={dthOperatorData}
          renderItem={renderItem}
          keyExtractor={(item) => item.operator_id.toString()}
        />
      </View>
     </View>

    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: .9,
  },
 
  wrapper: {   
    marginHorizontal: wp(2),
    marginTop: wp(3),  
  },

});

export default LandlineBill;
