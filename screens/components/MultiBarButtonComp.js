// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { BottomTabBarWrapper, MultiBarButton, MultiBarProvider } from 'react-native-multibar';

// import BillPayment from './BillPayment';

// export default function MultiBarButtonComp() {
//   const Tab = React.useRef<ReturnType<typeof createBottomTabNavigator>>(createBottomTabNavigator()).current;

//   return (
//     <NavigationContainer>
//       <MultiBarProvider
//         data={[
//           ({ navigation }) => (
//             <MaterialIcons
//               name="fingerprint"
//               color="#E24E1B"
//               size={20}
//               onPress={() => {
//                 if (navigation.canGoBack()) {
//                   navigation.goBack();
//                 }
//               }}
//             />
//           ),
//           ({ navigation }) => (
//             <MaterialIcons
//               name="fingerprint"
//               color="#E24E1B"
//               size={20}
//               onPress={() => {
//               }}
//             />
//           ),
//           ({ navigation }) => (
//             <MaterialIcons
//               name="fingerprint"
//               color="#E24E1B"
//               size={20}
//               onPress={() => {
//               }}
//             />
//           ),
//           ({ navigation }) => (
//             <MaterialIcons
//               name="fingerprint"
//               color="#E24E1B"
//               size={20}
//               onPress={() => {
//               }}
//             />
//           ),
//           ({ navigation }) => (
//             <MaterialIcons
//               name="fingerprint"
//               color="#E24E1B"
//               size={20}
//               onPress={() => {
//               }}
//             />
//           ),
//           ({ navigation }) => (
//             <MaterialIcons
//               name="fingerprint"
//               color="#E24E1B"
//               size={20}
//               onPress={() => {
//               }}
//             />
//           ),
//         ]}
//         iconSize={40}
//         overlayRadius={100}
//         initialExtrasVisible={false}
//       >
//         <Tab.Navigator
//           tabBar={(props) => (
//             <BottomTabBarWrapper navigation={props.navigation}>
//               <BottomTabBar {...props} />
//             </BottomTabBarWrapper>
//           )}
//         >
//           <Tab.Screen
//             name="Home"
//             component={BillPayment}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialIcons
//                   name="home"
//                   style={{
//                     fontSize: size,
//                     color: color
//                   }}
//                 />
//               )
//             }}
//           />
//           <Tab.Screen
//             name="Likes"
//             component={BillPayment}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialIcons
//                   name="star"
//                   style={{
//                     fontSize: size,
//                     color: color
//                   }}
//                 />
//               )
//             }}
//           />
//           <Tab.Screen
//             name="Center"
//             component={BillPayment}
//             options={{
//               tabBarLabel: '',
//               tabBarButton: () => (
//                 <MultiBarButton
//                   style={{
//                     backgroundColor: '#E24E1B'
//                   }}
//                 >
//                   <MaterialIcons
//                     name="add"
//                     style={{
//                       fontSize: 32,
//                       color: '#EDF2F4'
//                     }}
//                   />
//                 </MultiBarButton>
//               )
//             }}
//           />
//           <Tab.Screen
//             name="Posts"
//             component={BillPayment}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialIcons
//                   name="message"
//                   style={{
//                     fontSize: size,
//                     color: color
//                   }}
//                 />
//               )
//             }}
//           />
//           <Tab.Screen
//             name="Settings"
//             component={BillPayment}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialIcons
//                   name="settings"
//                   style={{
//                     fontSize: size,
//                     color: color
//                   }}
//                 />
//               )
//             }}
//           />
//         </Tab.Navigator>
//       </MultiBarProvider>
//     </NavigationContainer>
//   );
// }