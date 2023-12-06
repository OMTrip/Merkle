import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BrowserRoutes, HomeRoutes, WalletRoute} from '../../MainRoutes';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveWallet, setRefresh} from '../../../Store/web3';
import WalletScreen from '../WalletScreens/WalletScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwapScreen from '../WalletScreens/SwapScreen';
import BrowserScreen from '../BrowserScreen';
// import { Ionicons } from '@expo/vector-icons'; // Expo ka example hai, agar aap Expo ka istemal nahi kar rahe hain to is line ko hata dein

// const Screen1 = () => {
//   return <View style={styles.screen1} />;
// };

// const Screen2 = () => {
//   return <View style={styles.screen2} />;
// };

// export default function BottomTab() {
//   const _renderIcon = (routeName, selectedTab) => {
//     let icon = '';

//     switch (routeName) {
//       case 'title1':
//         icon = 'home';
//         break;
//       case 'title2':
//         icon = 'search';
//         break;
//       case 'title3':
//         icon = 'briefcase';
//         break;
//       case 'title4':
//         icon = 'reorder';
//         break;
//     }
//     if (routeName == 'title1') {
//       return (
//         <Image
//           source={require('../../assets/WalletIcon.png')}
//           style={{
//             height: hp(6),
//             width: wp(6),
//           }}
//           resizeMode="contain"
//         />
//       );
//     }
//     if (routeName == 'title4') {
//       return (
//         <Image
//           source={require('../../assets/WalletIcon.png')}
//           style={{
//             height: hp(6),
//             width: wp(6),
//           }}
//           resizeMode="contain"
//         />
//       );
//     }
//     return (
//       <Icon
//         name={icon}
//         size={25}
//         color={routeName === selectedTab ? 'black' : 'gray'}
//       />
//     );
//   };
//   const navigation = useNavigation();
//   const {activeWallet,refresh} = useSelector((state)=>state.wallet)
//   const dispatch = useDispatch();
//   const renderTabBar = props => {
//     const {routeName, selectedTab, navigate} = props;

//     return (
//       <TouchableOpacity
//         onPress={() => {
//           navigate(routeName);
//           if (routeName == 'title1') {
//             navigation.navigate('WalletScreen');
//           }
//           if (routeName == 'title4') {
//             navigation.navigate('WalletScreen');
//             dispatch(setActiveWallet(activeWallet))
//             dispatch(setRefresh(!refresh))
//           }
//         }}
//         style={styles.tabbarItem}>
//         {_renderIcon(routeName, selectedTab)}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <CurvedBottomBar.Navigator
//       type="DOWN"
//       style={styles.bottomBar}
//       shadowStyle={styles.shawdow}
//       screenOptions={{
//         headerShown: false,
//         tabBarHideOnKeyboard:true,
//       }}
//       height={55}
//       circleWidth={50}
//       bgColor="white"
//       initialRouteName="title1"
//       borderTopLeftRight
//       renderCircle={({selectedTab, navigate}) => {
//         return (
//           <Animated.View style={styles.btnCircleUp}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => {
//                 navigate('BrowserScreen',{url:""});
//               }}>
//               <Image
//                 source={require('../../assets/BROWSERICON.png')}
//                 style={{width: 50, height: 50, borderRadius: 40}}
//                 resizeMode="contain"
//               />
//               {/* <MaterialIcons name="open-in-browser" color="white" size={25} /> */}
//             </TouchableOpacity>
//           </Animated.View>
//         );
//       }}
//       tabBar={renderTabBar}>
//       <CurvedBottomBar.Screen
//         name="title1"
//         position="LEFT"
//         component={WalletRoute}
//       />
//       {/* <CurvedBottomBar.Screen
//         name=""
//         position="LEFT"
//         component={props => <More {...props} />}
//       /> */}

//       <CurvedBottomBar.Screen
//         name="title4"
//         component={WalletRoute}
//         position="RIGHT"
//       />
//          {/* <CurvedBottomBar.Screen
//         name="title4"
//         component={Screen1}
//         position="RIGHT"
//       /> */}
//     </CurvedBottomBar.Navigator>
//   );
// }

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   shawdow: {
//     shadowColor: '#ccc',
//     shadowOffset: {
//       width: 70,
//       height: 8,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 10,
//   },
//   button: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   bottomBar: {},
//   btnCircleUp: {
//     width: 50,
//     height: 50,
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#000',
//     bottom: 20,
//     shadowColor: 'white',
//     shadowOffset: {
//       width: 1,
//       height: 0,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 4,
//   },
//   imgCircle: {
//     width: 30,
//     height: 30,
//     // tintColor: 'gray',
//   },
//   tabbarItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   img: {
//     width: 30,
//     height: 30,
//   },
//   screen1: {
//     flex: 1,
//     backgroundColor: '#BFEFFF',
//   },
//   screen2: {
//     flex: 1,
//     backgroundColor: '#FFEBCD',
//   },
// });

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../../assets/HomeIcon.png')
              : require('../../assets/HomeIcon.png');
          }else if (route.name === 'BrowserTab') {
            iconSource = focused
              ? require('../../assets/browsericonnew.png')
              : require('../../assets/browsericonnew.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconSource}
              style={{width: wp(6.4), height: hp(3.2)}}
            />
          );
        },
        tabBarStyle: {backgroundColor: '#faf4ff'},
      })}>
      <Tab.Screen
        name="Home"
        component={WalletRoute}
        options={{
          
          headerShown: false,
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          tabBarLabelStyle: {fontSize: wp(3.2), fontWeight: '700'},
        }}
      />
      {/* <Tab.Screen
        name="Swap"
        component={SwapScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: {fontSize: wp(3.2), fontWeight: '700'},
        }}
      /> */}
      <Tab.Screen
        name="BrowserTab"
        component={BrowserRoutes}
        options={{
          tabBarLabel:"Browser",
          headerShown: false,
          tabBarLabelStyle: {fontSize: wp(3.2), fontWeight: '700'},
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
