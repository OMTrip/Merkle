import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomePage from './components/HomeScreen/HomePage';
import QRCodeScannerComponent from './components/QRCodeScannerComponent';
import ServicesOffer from './components/ServicesOffer';
import MobileRecharge from './components/RechargeSerives/RechargeScreen/mobileRecharge/MobileRecharge';
import DthRecharge from './components/RechargeSerives/RechargeScreen/dth/DthRecharge';
import DthPlan from './components/RechargeSerives/RechargeScreen/dth/DthPlan';
// import FastagRecharge from './components/RechargeSerives/RechargeScreen/Fastag/FastagRecharge';
// import MetroRecharge from './components/RechargeSerives/MetroRecharge';
// import ElectricityBill from './components/BillPayments/ElectricityBill';
// import GasBill from './components/BillPayments/GasBill';
// import BroadbandBill from './components/BillPayments/BroadbandBill';
// import LPGCylinderBill from './components/BillPayments/LPGCylinderBill';
// import LandlineBill from './components/BillPayments/LandlineBill';
// import PipeGasBill from './components/BillPayments/PipeGasBill';
// import MunicipalTaxes from './components/BillPayments/MuncipalTaxes';
// import CableTvBill from './components/BillPayments/CableTvBill';
// import PropertyTaxes from './components/BillPayments/PropertyTaxes';
// import HospitalsBill from './components/BillPayments/HospitalsBill';
// import FeePayments from './components/BillPayments/FeePayments';
// import LicInsurance from './components/FinancialServices/LicInsurance';
// import LoanRepayment from './components/FinancialServices/LoanRepayment';
// import CreditCard from './components/FinancialServices/CreditCard';
// import EMIPayments from './components/FinancialServices/EMIPayments';
import AirtelTV from './components/RechargeSerives/RechargeScreen/DthRechargeSection/AirtelTV';
import DishTv from './components/RechargeSerives/RechargeScreen/DthRechargeSection/DishTv';
import SunDirect from './components/RechargeSerives/RechargeScreen/DthRechargeSection/SunDirect';
import TataSky from './components/RechargeSerives/RechargeScreen/DthRechargeSection/TataSky';
import Videocond2h from './components/RechargeSerives/RechargeScreen/DthRechargeSection/Videocond2h';
import AirtelPaymentBank from './components/RechargeSerives/RechargeScreen/Fastag/AirtelPaymentBank';
import AxisBank from './components/RechargeSerives/RechargeScreen/Fastag/AxisBank';
import BOB from './components/RechargeSerives/RechargeScreen/Fastag/BOB';
import BankMaharshtra from './components/RechargeSerives/RechargeScreen/Fastag/BankMaharshtra';
import EquitasFASTag from './components/RechargeSerives/RechargeScreen/Fastag/EquitasFASTag';
import DelhiMetro from './components/RechargeSerives/RechargeScreen/Metro/DelhiMetro';
import HYDMetro from './components/RechargeSerives/RechargeScreen/Metro/HYDMetro';
import MumbaiMetro from './components/RechargeSerives/RechargeScreen/Metro/MumbaiMetro';
import DatacardRecharge from './components/RechargeSerives/RechargeScreen/Datacard/DatacardRecharge';
import AdaniElectricity from './components/BillPayments/SubScreen/ElectricitySection/AdaniElectricity';
import AjmerElectricity from './components/BillPayments/SubScreen/AjmerElectricity';
import EasternPower from './components/BillPayments/SubScreen/ElectricitySection/EasternPower';
import SouthernPower from './components/BillPayments/SubScreen/ElectricitySection/SouthernPower';
import ArunanchalPradesh from './components/BillPayments/SubScreen/ElectricitySection/ArunanchalPradesh';
import FlightSearch from './components/TravelServices/FlightSearch';
import CardInner from './components/MoreComponents/CardInner';
import WalletScreen from './components/WalletScreens/WalletScreen';
import WalletCard from './components/WalletScreens/WalletCard';
import BrowserScreen from './components/BrowserScreen';
import Browser from './components/browser/Browser';
import Wallet from './components/WalletScreens/Wallet';
import NetworksScreen from './components/WalletScreens/NetworksScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Datacard from './components/RechargeSerives/Datacard';
import WaterBill from './components/BillPayments/WaterBill';
import CreateNewWallet from './components/WalletScreens/CreateNewWallet';
import AllTokensScreen from './components/WalletScreens/AllTokensScreen';
// import RecieveScreen from './components/WalletScreens/RecieveScreen';
// import SendScreen from './components/WalletScreens/SendScreen';
import TokenScreen from './components/WalletScreens/TokenScreen';
// import ImportToken from './components/WalletScreens/ImportToken';
// import KycScreen from './components/KycVerify';
import MobileRechargePlans from './components/RechargeSerives/RechargeScreen/mobileRecharge/MobileRechargePlans';
// import RechargePayment from './components/RechargeSerives/RechargeScreen/mobileRecharge/RechargePayment';
// import ReceiptPage from './components/RechargeSerives/RechargeScreen/receipt/RecieptPage';
// import FundTransfer from './components/FinancialServices/FundTransfer';
import TranscationDetails from './components/WalletScreens/TranscationDetails';
// import AlltokenList from './components/WalletScreens/AlltokenList';
// import Payment from './components/FinancialServices/UtilityPaymentScreen/Payment';
import ConfirmTransfer from './components/WalletScreens/ConfirmTransfer';
// import PaymentHistory from './components/History/PaymentHistory';
import ContactsList from './components/RechargeSerives/RechargeScreen/mobileRecharge/ContactsList';
import SelectNetworksNew from './components/modals/SelectNetworks';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import QrImportToken from './components/QrImportToken';
import SendTransactionDetail from './components/WalletScreens/SendTransacfionDetail';
import BrowserScreenExternalLink from './components/BrowserScreenExternalLink';
import BrowserExternal from './components/browser/BrowserExternal';
import ImportAccountByPrivateKey from './components/WalletScreens/ImportAccountByPrivateKey';
import ManualBackup from './components/WalletScreens/ManualBackup';
import GoogleDriveBackup from './components/WalletScreens/GoogleDriveBackup';
import MnemonicPhraseList from './components/WalletScreens/MnemonicPhraseList';
import VerifyManually from './components/WalletScreens/VerifyManually';
import OnMeta from './components/WalletScreens/OnMeta';
// import EmailVerify from './components/EmailVerify';
// import BankVerification from './components/BankVerification';
import ContactsScreen from './components/WalletScreens/ContactsScreen';
import WalletConnect from './components/WalletScreens/WalletConnect';
import Security from './components/WalletScreens/Security';
import AutoLock from './components/WalletScreens/AutoLock';
import LockMethod from './components/WalletScreens/LockMethod';
import Preferences from './components/WalletScreens/Preferences';
import Notification from './components/WalletScreens/Notification';
import CreateMywallet from './components/WalletScreens/CreateMywallet';
// import SwapScreen from './components/WalletScreens/SwapScreen';
// import BuyTokenlist from './components/WalletScreens/BuyTokenlist';
// import StakingScreen from './components/WalletScreens/StakingScreen';
// import StakeCoin from './components/WalletScreens/StakeCoin';
// import StakebuyCoin from './components/WalletScreens/StakebuyCoin';

const MainStack = createNativeStackNavigator();

export const BrowserRoutes = () => {
  return (
    <MainStack.Navigator
      initialRouteName={'BrowserScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name="BrowserScreen"
        component={BrowserScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

export const WalletRoute = () => {
  return (
    <MainStack.Navigator initialRouteName="WalletScreen">
      <MainStack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{headerShown: false}}
      />
       <MainStack.Screen
        name="QRCodeScannerComponent"
        component={QRCodeScannerComponent}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="WalletConnect"
        component={WalletConnect}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Security"
        component={Security}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="AutoLock"
        component={AutoLock}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />

      <MainStack.Screen
        name="LockMethod"
        component={LockMethod}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <MainStack.Screen
        name="Preferences"
        component={Preferences}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="VerifyManually"
        component={VerifyManually}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="ImportAccountByPrivateKey"
        component={ImportAccountByPrivateKey}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="ManualBackup"
        component={ManualBackup}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="MnemonicPhraseList"
        component={MnemonicPhraseList}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="GoogleDriveBackup"
        component={GoogleDriveBackup}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="TranscationDetails"
        component={TranscationDetails}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <MainStack.Screen
        name="SendTransactionDetail"
        component={SendTransactionDetail}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />

      <MainStack.Screen
        name="CreateMywallet"
        component={CreateMywallet}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <MainStack.Screen
        name="OnMeta"
        component={OnMeta}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="ConfirmTransfer"
        component={ConfirmTransfer}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />

      <MainStack.Screen
        name="WalletCard"
        component={WalletCard}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="wallets"
        component={Wallet}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />

      <MainStack.Screen
        name="networks"
        component={NetworksScreen}
        options={props => {
          return {
            headerTitle: 'Select Networks',
            animation: 'slide_from_bottom',
            headerLeft: () => (
              <Icon
                name="chevron-down"
                size={25}
                style={{color: 'black', paddingRight: 15}}
                onPress={() => props.navigation.goBack()}
              />
            ),
            headerTitleStyle: {fontSize: 18},
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#e8eaed'},
          };
        }}
      />

      <MainStack.Screen
        name="selectnetworks"
        component={SelectNetworksNew}
        options={({route, navigation}) => {
          return {
            headerTitle: '',
            animation: 'slide_from_bottom',
            headerLeft: () => (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.goBack();
                  console.log('hello');
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    style={{marginStart: -5}}
                    name="chevron-back"
                    size={25}
                    color={'#444'}
                    // onPress={() => props.navigation.goBack()}
                  />
                  <Text
                    style={{color: '#444', fontSize: wp(4)}}
                    //  onPress={() => props.navigation.goBack()}
                  >
                    Back
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ),
            headerRight: () => {
              return (
                <Text
                  style={{
                    color: '#000',
                    fontSize: wp(4),
                    fontWeight: '600',
                    marginHorizontal: '38%',
                  }}>
                  Networks
                </Text>
              );
            },
            headerTitleStyle: {fontSize: wp(4)},
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#f3f4f7'},
          };
        }}
      />

      <MainStack.Screen
        name="CreateNewWallet1"
        component={CreateNewWallet}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="alltoken"
        component={AllTokensScreen}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />

      {/* <MainStack.Screen
        name="send"
        component={SendScreen}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      /> */}

      {/* <MainStack.Screen
        name="recieve"
        component={RecieveScreen}
        options={{headerShown: false, animation: 'slide_from_left'}}
      /> */}

      <MainStack.Screen
        name="token"
        component={TokenScreen}
        options={{headerShown: false}}
      />

      {/* <MainStack.Screen
        name="importtoken"
        component={ImportToken}
        options={{headerShown: false}}
      /> */}
    </MainStack.Navigator>
  );
};
