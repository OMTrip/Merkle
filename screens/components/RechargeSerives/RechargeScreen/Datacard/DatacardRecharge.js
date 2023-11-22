import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar
  
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import Carditems from '../dth/Carditems';
import HomeHeader from '../../../HomeScreen/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector} from 'react-redux';
import { DTHOperator } from '../../../../../Utils/web3/helperFunction';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DatacardRecharge = () => {
  const navigation = useNavigation();
  const details = useSelector(store => store.details);
  const {operatorCode, circleCode, circleName} = details;
  const[datacardData,setDatacardData] = useState([])

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.Card} onPress={()=>{navigation.navigate('DthPlan',{data:item,input:{name:"Vehicle Registeration Number", type:"Fastag" }})}}>
        <Carditems
          title={item.operator_name}
          source={{ uri: DTHOperator[`${item.operator_name}`]?DTHOperator[`${item.operator_name}`]:"https://res.cloudinary.com/dpe8nipmq/image/upload/v1694674092/nute/fastag/fastag_cdu2o9.png"}}
        />
      </TouchableOpacity>
  );

 
  useEffect(() => {

    if(operatorCode?.response){
      const data = [...operatorCode?.response];
    if (data?.length) {
      const dthOp = data?.filter((ele, i) => {
        return ele.service_type === 'DATACARD' && ele.biller_status == 'on';
      });
      const dat = dthOp.map(ele => ele.operator_name);
      // console.log(dat, 'data');  
      setDatacardData(dthOp);
    }
  }
  }, [operatorCode]);


  return (
    <>
    <StatusBar backgroundColor="#000" barStyle="light-content" />
    
    <View style={styles.box}>
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
          title={'DATACARD'}
          TextTitle={true}
          leftIocnsSubScreen={false}
          LeftIconsName={'magnify'}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={{marginHorizontal: wp(2), paddingBottom: wp(10)}}>
            <FlatList
            data={datacardData}
            renderItem={renderItem}
            keyExtractor={(item) => item.operator_id.toString()}
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
  }, 
  wrapper: {    
    marginHorizontal: wp(2),
    marginTop: wp(3),  
  },
});

export default DatacardRecharge;

