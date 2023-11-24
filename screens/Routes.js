import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Instruction from './components/Instruction';
import LoginScreen from './Login/LoginScreen';
import OtpScreen from './OtpScreen/OtpScreen';
import BottomTab from './components/BottomNavigator/BottomTab';
import ConnetWallet from './components/WalletScreens/ConnetWallet';
import CreateNewWallet from './components/WalletScreens/CreateNewWallet';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
  UpdateAssets,
  initializeSwapTokens,
  setAllToken,
  setPriceQuotes,
  setSelectChain,
  updateChainInfo,
} from '../Store/web3';
import userCollection from '../Store/firebase/user';
import {setKYCStatus, setLogin, setUser} from '../Store/userinfo';
import {
  circleCode,
  fetchAllCryptos,
  fetchAssetData,
  fetchChainData,
  fetchJsonData,
  operatorCode,
} from '../Utils/apis/api';
import {
  setCircleCode,
  setCircleName,
  setContacts,
} from '../Store/paymentDetails';
import TranscationDetails from './components/WalletScreens/TranscationDetails';
import {PermissionsAndroid, Platform} from 'react-native';
// import Contacts from 'react-native-contacts';
import RecieveScreen from './components/WalletScreens/RecieveScreen';
import StakingScreen from './components/WalletScreens/StakingScreen';
import StakebuyCoin from './components/WalletScreens/StakebuyCoin';
import StakeCoin from './components/WalletScreens/StakeCoin';
import BuyTokenlist from './components/WalletScreens/BuyTokenlist';
import ImportToken from './components/WalletScreens/ImportToken';
import AlltokenList from './components/WalletScreens/AlltokenList';
import SwapScreen from './components/WalletScreens/SwapScreen';
import SendScreen from './components/WalletScreens/SendScreen';
import WalletInfo from './components/WalletScreens/WalletInfo';
import RechargePayment from './components/RechargeSerives/RechargeScreen/mobileRecharge/RechargePayment';
import DthRecharge from './components/RechargeSerives/RechargeScreen/dth/DthRecharge';
import DthPlan from './components/RechargeSerives/RechargeScreen/dth/DthPlan';
import FastagRecharge from './components/RechargeSerives/RechargeScreen/Fastag/FastagRecharge';
import MetroRecharge from './components/RechargeSerives/MetroRecharge';
import ElectricityBill from './components/BillPayments/ElectricityBill';
import GasBill from './components/BillPayments/GasBill';
import BroadbandBill from './components/BillPayments/BroadbandBill';
import LPGCylinderBill from './components/BillPayments/LPGCylinderBill';
import LandlineBill from './components/BillPayments/LandlineBill';
import PipeGasBill from './components/BillPayments/PipeGasBill';
import MunicipalTaxes from './components/BillPayments/MuncipalTaxes';
import CableTvBill from './components/BillPayments/CableTvBill';
import PropertyTaxes from './components/BillPayments/PropertyTaxes';
import HospitalsBill from './components/BillPayments/HospitalsBill';
import FeePayments from './components/BillPayments/FeePayments';
import LicInsurance from './components/FinancialServices/LicInsurance';
import LoanRepayment from './components/FinancialServices/LoanRepayment';
import CreditCard from './components/FinancialServices/CreditCard';
import EMIPayments from './components/FinancialServices/EMIPayments';
import Datacard from './components/RechargeSerives/Datacard';
import WaterBill from './components/BillPayments/WaterBill';
import ZeroXLiquidity from './components/WalletScreens/ZeroXLiquidity';
import Xchain from './components/WalletScreens/Xchain';
import CreateTokenScreen from './components/WalletScreens/CreateTokenScreen';
import LockScreen from './components/WalletScreens/LockScreen';
import MultisenderScreen from './components/WalletScreens/MultisenderScreen';
import AuditReport from './components/WalletScreens/AuditReport';
import BankScreen from './components/HomeScreen/BankScreen';
import ProfileScreen from './components/HomeScreen/ProfileScreen';
import ReferandEarn from './components/HomeScreen/ReferandEarn';
import AddBank from './components/HomeScreen/AddBank';
import UcpiSettings from './components/HomeScreen/UcpiSettings';
import SwapTokensList from './components/WalletScreens/SwapTokensList';
import CashbackOffers from './components/HomeScreen/CashbackOffers';
import PaymentHistory from './components/History/PaymentHistory';
import TrustScore from './components/HomeScreen/TrustScore';
import Browser from './components/browser/Browser';
import PriceAlert from './components/WalletScreens/PriceAlert';
import MultisenderPreview from './components/WalletScreens/MultisenderPreview';
import AddContacts from './components/WalletScreens/AddContacts';
import LanguagePreference from './components/WalletScreens/LanguagePreference';
import CurrencyPreference from './components/WalletScreens/CurrencyPreference';
import TypewriterComponent from './components/WalletScreens/TypewriterComponent';
import ImportAccountByPrivateKey from './components/WalletScreens/ImportAccountByPrivateKey';
import CreateMywallet from './components/WalletScreens/CreateMywallet';
import DocumentVerificationScreen from './KycVerification/DocumentVerificationScreen';
import PanCardVerificationScreen from './KycVerification/PanCardVerificationScreen';
import KycScreen from './components/KycVerify';
import {
  setIsLoggedIn,
  setUserData,
  setUserKycStatus,
  setUserLogo,
  setPanNumber,
  setAdharNumber,
  setFullName,
  setEmail,
  setPanHolderName,
} from '../Store/authSlice';
import PendingStatus from './KycVerification/PendingStatus';
import VerifiedUser from './components/HomeScreen/VerifiedUser';
import TransactionDEtail from './components/WalletScreens/swapComponent/TransactionDetail';
import TransactionDetail from './components/WalletScreens/swapComponent/TransactionDetail';
import AadharOtpVerificationScreen from './KycVerification/AadharOtpVerificationScreen';
import UploadDocumentSingle from './KycVerification/UploadDocumentSingle';
import ManualKycUploadDoc from './KycVerification/ManualKycUploadDoc';
import Chains from './components/WalletScreens/xchainComponent/Chains';
import Pairs from './components/WalletScreens/xchainComponent/Pairs';
import {
  setXChain,
  setXChainFrom,
  setXPair,
  setXToken,
} from '../Store/xchainSlice';
import {getAllChain, getAllPair, getAllTokens} from '../Utils/apis/xchainApi';
import NewlistScreen from './components/WalletScreens/NewlistScreen';
import MultisenderWatchScreen from './components/WalletScreens/MultisenderWatchScreen';
import Notification from './components/WalletScreens/Notification';
import Preferences from './components/WalletScreens/Preferences';
import LockMethod from './components/WalletScreens/LockMethod';
import AutoLock from './components/WalletScreens/AutoLock';
import Security from './components/WalletScreens/Security';
import WalletConnect from './components/WalletScreens/WalletConnect';
import ContactsScreen from './components/WalletScreens/ContactsScreen';
import ServicesOffer from './components/ServicesOffer';
import V2TokenList from './components/WalletScreens/swapComponent/V2TokenList';
import TransactionDetailV2Router from './components/WalletScreens/swapComponent/TransactionDetailV2Router';

const coingeekourl =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {onboarding} = useSelector(state => state.wallet);
  const {user, isLoggedIn, panNumber, adharNumber} = useSelector(
    state => state.auth,
  );
  const {networks} = useSelector(state => state.wallet);
  const dispatch = useDispatch();

  // console.error('isLoggedIn: ', isLoggedIn);
  // async function requestContactsPermission() {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //         {
  //           title: 'Contacts Permission',
  //           message: 'This app needs access to your contacts.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         }
  //       );
  //       console.log(granted)
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         getAllContacts()
  //       } else {
  //         console.log('Contacts permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  // }

  async function initializeXChain() {
    try {
      const chains = await getAllChain();
      dispatch(setXChain(chains.data));
      const pairs = await getAllPair();
      dispatch(setXPair(pairs.data));
      const tokens = await getAllTokens();
      dispatch(setXToken(tokens.data));

      const updatedChain = networks
        ?.map((ele, i) => {
          const elem = {...ele};
          const ch = chains?.data.find((ite, i) => {
            return (
              elem.nativeCurrency.symbol.toLowerCase() ===
              ite.symbol.toLowerCase()
            );
          });
          if (ch) {
            ch['slug'] = elem.nativeCurrency.slug;
            return ch;
          }
        })
        .filter(Boolean);

      dispatch(setXChainFrom(updatedChain[0]));
    } catch (error) {
      console.log(error, 'err bridge innit');
    }
  }

  useEffect(() => {
    fetchAllCryptos()
      .then(res => {
        // console.log(res,"data123")
        dispatch(setPriceQuotes(res));
      })
      .catch(err => {
        dispatch(setPriceQuotes([]));
        console.log(err, 'err');
      });

    // axios
    //   .get(coingeekourl)
    //   .then(result => {
    //     //  console.log(result.data,"result of coingeeko")
    //     dispatch(setPriceQuotes(result.data));
    //   })
    //   .catch(err => {
    //     console.log('coingecko error');
    //     console.log(err);
    //   });

    const chainInfo = {
      bsc: {
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        blockExplorerUrl: 'https://bscscan.com',
      },
      ethereum: {
        rpcUrl: 'https://rpc.builder0x69.io',
        blockExplorerUrl: 'https://etherscan.io',
      },
      bsc: {
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        blockExplorerUrl: 'https://bscscan.com',
      },
      matic: {
        rpcUrl: 'https://polygon.llamarpc.com',
        blockExplorerUrl: 'https://polygonscan.com',
      },
      bsc_testnet: {
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        blockExplorerUrl: 'https://testnet.bscscan.com',
      },
      fantom: {
        rpcUrl: 'https://rpcapi.fantom.network',
        blockExplorerUrl: 'https://ftmscan.com',
      },
      arbitrum: {
        rpcUrl: 'https://arbitrum.llamarpc.com',
        blockExplorerUrl: 'https://arbiscan.io',
      },
      solana: {
        rpcUrl: 'https://solana-mainnet.g.alchemy.com/v2/demo',
        blockExplorerUrl: 'https://solscan.io/',
      },
    };
    dispatch(updateChainInfo(chainInfo));
    // const token0 = {...testnet_token[0]};
    // const token1 = {...testnet_token[0]}
    dispatch(
      initializeSwapTokens({
        swapFrom: {
          chainId: '0x60',
          symbol: 'INRx',
          name: 'INRx Token',
          token_address: '0xDD9a71c92bBf35A2546321A82C88C02a00E27B44',
          logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/25903.png',
          decimals: 2,
          isQuote: true,
        },
        swapTo: {
          chainId: '0x60',
          symbol: 'BUSD',
          name: 'Binance USD',
          token_address: '0xEa773012280e90BeD2789C3045E765E1Cf788678',
          logo: 'https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=024',
          decimals: 18,
          isQuote: true,
        },
      }),
    );
    initializeXChain();

    // fetchChainData()
    //   .then((jsonData) => {
    //     if (jsonData) {
    //       // dispatch(setAllToken(jsonData));
    //       console.log(jsonData,"jsonDaata:::123")
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error:1233', error);
    //   });

    // const cobj = {
    //   "delhi": 'DELHI (DL)',
    //   "maharashtra": 'Maharashtra (MH)',
    //   'andhra pradesh': 'Andhra Pradesh (AP)',
    //   'tamil nadu': 'TAMIL NADU (TN)',
    //   "karnataka": 'Karnataka (KA)',
    //   'gujrat': 'Gujarat (GJ)',
    //   'up east': 'UTTAR PRADESH East (UPE)',
    //   'madhya pradesh': 'Madhya Pradesh (MP)',
    //   'west bengal': 'West Bengal (WB)',
    //   'rajasthan': 'Rajasthan (RJ)',
    //   'kerala': 'Kerala (KL)',
    //   'punjab': 'Punjab (PB)',
    //   'haryana': 'Haryana (HR)',
    //   'bihar': 'Bihar (BR)',
    //   'odisha': 'ODISHA (OD)',
    //   'assam': 'Assam (AS)',
    //   'himachal pradesh': 'Himachal Pradesh (HP)',
    //   'jammu and kashmir': 'Jammu And Kashmir (JK)',
    //   'jharkhand': 'Jharkhand (JH)',
    //   'chattisgarh': 'CHHATTISGARH (CG)',
    //   'goa': 'GOA (GA)',
    //   'meghalaya': 'MEGHALAYA (ML)',
    //   'mizoram': 'MIZORAM (MZ)',
    //   'sikkim': 'SIKKIM (SK)',
    //   'tripura': 'TRIPURA (TR)',
    //   'up west': 'UTTAR PRADESH West (UPW)',
    //   'kolkatta': 'KOLKATTA (CCU)',
    // };
    //  dispatch(setCircleName(cobj));
  }, []);

  // function updateAuthState(data) {
  //   const user_data = {
  //     mobile: data?.phoneNumber,
  //     name: data?.fullName,
  //   };
  //   const user_kyc_status = {
  //     aadharKyc: data?.aadharKyc == 1 ? 1 : 0,
  //     panKyc: data?.panKyc == 1 ? 0 : 0,
  //     aadhardockyc: data?.aadhardockyc == 1 ? 1 : 0,
  //   };
  //   if (data?.profile_image) {
  //     dispatch(setUserLogo(data?.profile_image));
  //   }
  //   if (data?.panNumber) {
  //     dispatch(setPanNumber(data?.panNumber));
  //   }
  //   if (data?.adhaarNumber) {
  //     console.log(data?.adharNumber,'in route ')
  //     dispatch(setAdharNumber(data?.adhaarNumber));
  //   }
  //   if (data?.email) {
  //     dispatch(setEmail(data?.email));
  //   }
  //   dispatch(setUserKycStatus(user_kyc_status));
  //   dispatch(setUserData(user_data));
  //   dispatch(setIsLoggedIn(true));
  // }

  // useEffect(() => {
  //   const number = user?.mobile;
  //   if (number && isLoggedIn) {
  //     userCollection
  //       .getUser(number)
  //       .then(res => {
  //         if (res) {
  //           updateAuthState(res);
  //         }
  //       })
  //       .catch(e => {
  //         console.log(e, 'error');
  //       });
  //   }
  // }, []);

  useEffect(() => {
    //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //     title: 'Contacts',
    //     message: 'This app would like to view your contacts.',
    //     buttonPositive: 'Please accept bare mortal',
    // }).then((res) => {
    //         console.log('Permission: ', res);
    // Contacts.getAll()
    //     .then((contacts) => {
    //         // work with contacts
    //         console.log(contacts,"contracts");
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     });
    // })
    // .catch((error) => {
    //     console.error('Permission error: ', error);
    // });
  }, []);

  return (
    <>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'WalletScreen' : 'Instruction'}
        screenOptions={{
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen
          name="RechargePayment"
          component={RechargePayment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TrustScore"
          component={TrustScore}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TransactionDetailV2Router"
          component={TransactionDetailV2Router}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UcpiSettings"
          component={UcpiSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CashbackOffers"
          component={CashbackOffers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReferandEarn"
          component={ReferandEarn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImportAccountByPrivateKey"
          component={ImportAccountByPrivateKey}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddBank"
          component={AddBank}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />

        <Stack.Screen
          name="DthRecharge"
          component={DthRecharge}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DthPlan"
          component={DthPlan}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="FastagRecharge"
          component={FastagRecharge}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MetroRecharge"
          component={MetroRecharge}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Datacard"
          component={Datacard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ElectricityBill"
          component={ElectricityBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GasBill"
          component={GasBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WaterBill"
          component={WaterBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BroadbandBill"
          component={BroadbandBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LandlineBill"
          component={LandlineBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LPGCylinderBill"
          component={LPGCylinderBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PipeGasBill"
          component={PipeGasBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MunicipalTaxes"
          component={MunicipalTaxes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CableTvBill"
          component={CableTvBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PropertyTaxes"
          component={PropertyTaxes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HospitalsBill"
          component={HospitalsBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FeePayments"
          component={FeePayments}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LicInsurance"
          component={LicInsurance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoanRepayment"
          component={LoanRepayment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreditCard"
          component={CreditCard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EMIPayments"
          component={EMIPayments}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="recieve"
          component={RecieveScreen}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />
        <Stack.Screen
          name="send"
          component={SendScreen}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="SwapScreen"
          component={SwapScreen}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="ZeroXLiquidity"
          component={ZeroXLiquidity}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetail}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="SwapTokensList"
          component={SwapTokensList}
          options={{headerShown: false, animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="Xchain"
          component={Xchain}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="xchainchains"
          component={Chains}
          options={{headerShown: false, animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="xchainpair"
          component={Pairs}
          options={{headerShown: false, animation: 'slide_from_right'}}
        />
        {/* <Stack.Screen
          name="xchainTransaction"
          component={xChainTransaction}
          options={{headerShown: false, animation: 'slide_from_right'}}
        /> */}
        <Stack.Screen
          name="CreateTokenScreen"
          component={CreateTokenScreen}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="LockScreen"
          component={LockScreen}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="MultisenderScreen"
          component={MultisenderScreen}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="MultiSenderPreview"
          component={MultisenderPreview}
          options={{headerShown: false, animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="AuditReport"
          component={AuditReport}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BankScreen"
          component={BankScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="WalletInfo"
          component={WalletInfo}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="importtoken"
          component={ImportToken}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AlltokenList"
          component={AlltokenList}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="BuyTokenlist"
          component={BuyTokenlist}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="StakingScreen"
          component={StakingScreen}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />
        <Stack.Screen
          name="StakebuyCoin"
          component={StakebuyCoin}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />

        <Stack.Screen
          name="StakeCoin"
          component={StakeCoin}
          options={{headerShown: false, animation: 'slide_from_left'}}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Instruction"
          component={Instruction}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WalletScreen"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConnetWallet"
          component={ConnetWallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateNewWallet"
          component={CreateNewWallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TranscationDetails"
          component={TranscationDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Browser"
          component={Browser}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="InnerBrowser"
          component={Browser}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="PriceAlert"
          component={PriceAlert}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="V2TokenList"
          component={V2TokenList}
          options={{headerShown: false}}
        />
        {/* <MainStack.Screen
        name="offerServices"
        component={ServicesOffer}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="WalletConnect"
        component={WalletConnect}
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
      /> */}

        <Stack.Screen
          name="AddContacts"
          component={AddContacts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PanCardVerificationScreen"
          component={PanCardVerificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DocumentVerificationScreen"
          component={DocumentVerificationScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="kyc"
          component={KycScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CurrencyPreference"
          component={CurrencyPreference}
          options={{headerShown: false, animation: 'fade_from_bottom'}}
        />
        <Stack.Screen
          name="LanguagePreference"
          component={LanguagePreference}
          options={{headerShown: false, animation: 'fade_from_bottom'}}
        />
        <Stack.Screen
          name="TypewriterComponent"
          component={TypewriterComponent}
          options={{headerShown: false, animation: 'fade_from_bottom'}}
        />

        <Stack.Screen
          name="CreateMywallet"
          component={CreateMywallet}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="PendingStatus"
          component={PendingStatus}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="VerifiedUser"
          component={VerifiedUser}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="UploadDocumentSingle"
          component={UploadDocumentSingle}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="ManualKycUploadDoc"
          component={ManualKycUploadDoc}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="NewlistScreen"
          component={NewlistScreen}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="MultisenderWatchScreen"
          component={MultisenderWatchScreen}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </>
  );
};

export default Routes;