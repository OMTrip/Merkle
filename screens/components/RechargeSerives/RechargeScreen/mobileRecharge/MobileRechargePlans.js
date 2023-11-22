import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import HomeHeader from '../../../HomeScreen/HomeHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { fetchPlan } from '../../../../../Utils/apis/api'; 

// import { getCircleCode, getOperatorCode } from '../../../../Store/paymentDetails';
import PlanTabs from './PlanTabs';
import {FlatList} from 'react-native-gesture-handler';


export default function MobileRechargePlans({route}) {
  const [dataPack, setDataPack] = useState([]);
  const navigate = useNavigation();
  const details = useSelector(store => store.details);
  const dispatch = useDispatch();
  const {operatorCode, circleCode, circleName} = details;
  const {
    params: {operatorCircleResponse,simType,mobileNumber},
  } = route;
  const[flag,setFlag] =useState(false);
  const[error,setError] =useState(false)

  

  const DataCards = ({planArr,operator, circle}) => {
    return (
      <FlatList
        style={{height: '100%', width: '100%'}}
        data={planArr ? planArr : ['n']}
        renderItem={({item, index}) => {
          const { desc, Talktime, rs, validity} = item;
          let callDetails="", dataDetails="", smsDetails="";
      

          if(desc!=undefined){
          const parts = desc?.split('|');
          for (const part of parts) {
            if (part.includes("Calls:")) {
              callDetails = part.trim();
            } else if (part.includes("Data :")) {
              dataDetails = part.trim()?.split(":")[1];
            } else if (part.includes("SMS :")) {
              smsDetails = part.trim()?.split(":")[1];
              const data =smsDetails;
            }
          }
        }
          
         
          if (item == 'n') {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  marginVertical: 50,
                }}>
                <Text style={{color: '#000', fontSize: 16, fontWeight: 500}}>
                  No Data Pack found.
                </Text>
              </View>
            );
          } else {
            return (
              <View style={styles.card}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        borderRadius: 20,
                        backgroundColor: '#ccc',
                        padding: 5,
                        fontSize: 15,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: 'green',
                          padding: 10,
                          width: 30,
                          height: 30,
                          borderRadius: 50,
                          justifyContent: 'ceneter',
                          alignItems: 'center',
                        }}>
                        <Icon name="rupee" size={12} color="#fff" />
                      </View>
                      <Text style={{paddingHorizontal: 10, fontWeight: 700}}>
                        {rs}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{color: '#000', fontWeight: 700}}>
                      {validity}
                    </Text>
                  </View>
                  <View>
                    <TouchableWithoutFeedback
                    style={{width:"100%",height:"100%"}}
                      onPress={() => {
                        navigate.navigate('RechargePayment',{data:item,mobileNumber,operatorCircleResponse,circle,operator,type:{display:"Mobile Number",type:"Mobile Recharge", short:"mobile"},details:false});
                      }}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontWeight: '400',
                          textAlign: 'center',
                          color: '#52c234',
                          borderWidth: 2,
                          paddingHorizontal: 15,
                          borderRadius: 5,
                          padding: 5,
                          borderColor: '#52c234',
                        }}>
                        Select
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View style={{padding: 10, flexDirection: 'row'}}>
                  {dataDetails.length>0?<View>
                    <View style={{flexDirection: 'row', paddingRight: 15}}>
                      <Icon
                        name="wifi"
                        size={18}
                        color="grey"
                        style={{paddingRight: 5}}
                      />
                      <Text style={styles.greyColor}>Data</Text>
                    </View>
                    <Text style={styles.greyColor}>{dataDetails}</Text>
                  </View>:null}
                  {smsDetails.length>0?<View>
                    <View style={{flexDirection: 'row', paddingRight: 15}}>
                      <AntIcon
                        name="mail"
                        size={18}
                        color="grey"
                        style={{paddingRight: 5}}
                      />
                      <Text style={styles.greyColor}>Sms</Text>
                    </View>
                    <Text  style={styles.greyColor}>{smsDetails}</Text>
                  </View>:null}
                </View>
                <Text style={styles.greyColor}>{desc}</Text>
              </View>
            );
          }
        }}
        keyExtractor={(item, index) => index + 'planlist'}
      />
    );
  };

  useEffect(() => {
    try {
      if(operatorCode?.response){
      
    
    const stat =
      circleName[operatorCircleResponse?.details?.Circle.toLowerCase()];
    const res = JSON.parse(details?.circleCode);
    const circleOne = JSON.parse(circleCode).response.find(operator => {
      return operator.circle_name === stat;
    });
    if (operatorCode && !dataPack?.allroute) {
      const resp = [...operatorCode?.response];
      const cname = operatorCircleResponse?.details?.operator?.toLowerCase()?.trim(" ");
      const operatorOne = resp?.find(op => {
        const opName = op.operator_name?.toLowerCase()?.trim(" ")
        return opName.substring(0,4) === cname.substring(0,4) && op.service_type.toLowerCase()==simType.toLowerCase();
      });
      setFlag(true)
      setError(false)
      //circleOne?.circle_code
      fetchPlan(5, operatorOne?.operator_id).then(res => {
        console.log(res,"res");
         setDataPack(res.plans);
        setFlag(false)
        var cobj = {};
        var arr = [];
        if(res.success){
        Object.keys(res?.plans)?.map((it, i) => {
          
          const obj = {};
          obj['key'] = it?.toUpperCase();
          obj['title'] = it?.toUpperCase();
          const planArr = res?.plans[it?.toUpperCase()];
          cobj[it.toUpperCase()] = () => <DataCards planArr={planArr} operator={operatorOne} circle={circleOne} />;
          arr.push(obj);
          if (i == Object.keys(res?.plans)?.length - 1) {
            const nobj = {
              allroute: [...arr],
              component: {...cobj},
              
            };
            setDataPack({...nobj});
          }
        });
      }else{
        setFlag(false)
        setError(true)
      }
      }).catch((err)=>{
        setFlag(false)
        setError(true)
      });
    } else {
      console.log('operatorCode undefined');
    }
  }
  } catch (error) {
      console.log(error,"error")
  }
  }, []);

  console.log(flag,error,"MD2Colors");

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
          title={'Plans'}
          TextTitle={true}
        />
      </LinearGradient>
      <View style={{flex: 1}}>
      { flag ? <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
       <ActivityIndicator animating={true} color={MD2Colors.black} />
        </View>:null}
        {error &&<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Text style={{fontSize:16, fontWeight:500,color:"#000"}}> No Plans Found.</Text> 

        </View>}
        
        {dataPack?.allroute && Object.keys(dataPack)?.length > 0 ? (
          <PlanTabs plansData={dataPack} />
        ) : null}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: .91,
  },
  card: {
      marginVertical: 5,
    marginHorizontal:8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    height: 'auto',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor:"rgba(0,0,0,1)",
    shadowOffset:{width:2,height:3},
    shadowOpacity:1,
    shadowRadius:20,
    elevation:20,
  },
greyColor:{
  color:"#535852"
}
});
