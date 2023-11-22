// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   TouchableWithoutFeedback,
//   FlatList,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import {Link, useNavigation} from '@react-navigation/native';
// import Carditems from './dth/Carditems';
// import HomeHeader from '../HomeScreen/HomeHeader';
// import LinearGradient from 'react-native-linear-gradient';

// const FastagRecharge = () => {
//   const navigation = useNavigation();
//   return (
//     <>
//       <LinearGradient
//         colors={['#52c234', '#061700']}
//         start={{x: 0, y: 0}} // Start point of the gradient (top-left)
//         end={{x: 1, y: 0}} // End point of the gradient (top-right)
//         style={{
//           height: hp(10),
//           justifyContent: 'center',
//           paddingHorizontal: hp(3),
//         }}>
//         <HomeHeader
//           icons={true}
//           iconName={'keyboard-backspace'}
//           size={wp(8)}
//           title={'Fastag'}
//           TextTitle={true}
//           leftIocnsSubScreen={true}
//           LeftIconsName={'magnify'}
//         />
//       </LinearGradient>
//       <Link to="/AirtelPaymentBank" style={styles.Card}>
//         <Carditems
//           title={'Airtel Payments Bank NETC FASTag'}
//           source={require('../../assets/airtel.jpg')}
//           onPress={() => navigation.navigate('Airteltv')}
//         />
//       </Link>
//       <Link to="/AxisBank" style={styles.Card}>
//         <Carditems
//           title={'Axis Bank'}
//           source={require('../../assets/Axisbank.jpg')}
//         />
//       </Link>
//       <Link to="/BOB" style={styles.Card}>
//         <Carditems
//           title={'Bank of Baroda'}
//           source={require('../../assets/BOB.png')}
//         />
//       </Link>
//       <Link to="/BankMaharshtra" style={styles.Card}>
//         <Carditems
//           title={'Bank of Maharashtra FASTag'}
//           source={require('../../assets/BOM.png')}
//         />
//       </Link>
//       <Link to="/EquitasFASTag" style={styles.Card}>
//         <Carditems
//           title={'Equitas FASTag Recharege'}
//           source={require('../../assets/EQE.jpg')}
//         />
//       </Link>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   box: {
//     flex: 1,
//   },
//   Card: {
//     margin: wp(1),
//     backgroundColor: '#fff',
//     // width:"100%",
//   },
// });

// export default FastagRecharge;

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Link, useNavigation} from '@react-navigation/native';
import Carditems from '../dth/Carditems';
import HomeHeader from '../../../HomeScreen/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {fastag} from '../../../../../Utils/web3/helperFunction';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setIcon} from '../../../../../Store/paymentDetails';

const FastagRecharge = () => {
  const navigation = useNavigation();
  const details = useSelector(store => store.details);
  const {operatorCode, circleCode, circleName} = details;
  const [dthOperatorData, setDthOperatorData] = useState([]);
  const dispatch = useDispatch();

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.Card}
      onPress={() => {
        const url = fastag[`${item.operator_name}`]
          ? fastag[`${item.operator_name}`]
          : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1694674092/nute/fastag/fastag_cdu2o9.png';
        dispatch(setIcon(url));
        navigation.navigate('DthPlan', {
          data: item,
          input: {name: 'Vehicle Registeration Number', type: 'Fastag'},
        });
      }}>
      <Carditems
        title={item.operator_name}
        source={{
          uri: fastag[`${item.operator_name}`]
            ? fastag[`${item.operator_name}`]
            : 'https://res.cloudinary.com/dpe8nipmq/image/upload/v1694674092/nute/fastag/fastag_cdu2o9.png',
        }}
      />
    </TouchableOpacity>
  );

  // useEffect(() => {
  //   if (dthOperatorData.length === 0) {
  //     const dthOp = resp?.filter((ele, i) => {
  //       return ele.service_type === 'Fastag' && ele.biller_status == 'on';
  //     });
  //     const dat = dthOp.map(ele => ele.operator_name);
  //     console.log(dat, 'data');
  //     setDthOperatorData(dthOp);
  //   }
  // }, [operatorCode]);

  useEffect(() => {
    if (operatorCode?.response) {
      const data = [...operatorCode?.response];
      if (data?.length) {
        const dthOp = data?.filter((ele, i) => {
          return ele.service_type === 'Fastag' && ele.biller_status == 'on';
        });
        const dat = dthOp.map(ele => ele.operator_name);
        // console.log(dat, 'data');
        setDthOperatorData(dthOp);
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
            backgroundColor: '#000',
          }}>
          <HomeHeader
            icons={true}
            iconName={'keyboard-backspace'}
            size={wp(8)}
            title={'Fastag'}
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
    marginBottom: 20,
  },
  Card: {
    // margin: wp(1),
    // backgroundColor: '#fff',
  },
  wrapper: {
    // backgroundColor: '#fff',
    // borderRadius: 10,
    marginHorizontal: wp(2),
    marginTop: wp(3),
  },
});

export default FastagRecharge;
