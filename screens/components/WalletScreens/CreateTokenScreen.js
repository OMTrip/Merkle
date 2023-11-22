import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';

import {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, {useRef} from 'react';
import {Checkbox} from 'react-native-paper';
import Standard from './tokenComponent/Standard';
import Safemoon from './tokenComponent/Safemoon';
import LiquidityGenerator from './tokenComponent/LiquidityGenerator';
import Dynamic from './tokenComponent/Dynamic';
import MarketingTax from './tokenComponent/MarketingTax';
import ProMax from './tokenComponent/ProMax';
import Smarttax from './tokenComponent/Smarttax';
import Reward from './tokenComponent/Reward';
import {ethers} from 'ethers';
import ERC20_Type from '../../../Utils/erc20.json';
import {useDispatch, useSelector} from 'react-redux';
import Web3 from 'web3';
import Toast from 'react-native-toast-message';
import {fetchChainData} from '../../../Utils/apis/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  validateFieldStandard,
  validateFieldsDynamic,
  validateFieldsLiquidity,
  validateFieldsMarketing,
  validateFieldsProMax,
  validateFieldsReward,
  validateFieldsSafemoon,
  validateFieldsSmartTax,
} from './tokenComponent/FormValidation.';
import {setSelectChain} from '../../../Store/web3';
import {verifyToken} from './tokenComponent/verifyTokenApi';
import sourcecode from '../../../Utils/sourcecode.json';
import LinearGradient from 'react-native-linear-gradient';
import NewlistScreen from './NewlistScreen';

const tokenType = [
  {
    title: 'Standard Token',
    value: 'standard',
  },
  {
    title: 'Liquidity Generator',
    value: 'liquiditygenerator',
  },
  {
    title: 'Safemoon (Deflationary)',
    value: 'safemoon',
  },
  {
    title: 'Dynamic',
    value: 'dynamic',
  },
  {
    title: 'Marketing Tax',
    value: 'marketingtax',
  },
  {
    title: 'Smart Tax',
    value: 'smarttax',
  },
  {
    title: 'Reward Token',
    value: 'rewardtoken',
  },
  {
    title: 'Pro',
    value: 'promax',
  },
];
const router = {
  bsc_testnet: [
    {
      name: 'Pancakeswap',
      address: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
    },
  ],
  polygon: [
    {
      name: 'Pancakeswap',
      address: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    },
  ],
  bsc: [
    {
      name: 'Pancakeswap',
      address: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    },
  ],
  ethereum: [
    {name: 'Uniswap', address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'},
    {
      name: 'Sushiswap',
      address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    },
  ],
  fantom: [],
  optimism: [],
  arbitrum: [],
  avalanche: [],
};

const CreateTokenScreen = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [type, setType] = useState({
    title: 'standard Token',
    value: 'standard',
  });
  const [isLoader, setIsLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const {wallets, activeWallet} = useSelector(store => store.wallet);
  const wallet = wallets[activeWallet];
  const [activeChain, setActiveChain] = useState({
    blockExplorerUrl: 'https://testnet.bscscan.com',
    rpcUrl: 'https://data-seed-prebsc-2-s1.bnbchain.org:8545',
    chainId: '0x61',
    mainnet: false,
    name: 'BNB Smart Chain Testnet',
    nativeCurrency: {
      address: '0x0000000000000000000000000000000000000000',
      balance: '0',
      decimals: 18,
      name: 'Binance Coin',
      slug: 'bsc_testnet',
      symbol: 'BNB',
    },
  });
  const activeChainRouter = router[activeChain.nativeCurrency.slug];

  const [allChain, setAllChain] = useState([]);

  const [standards, setStandard] = useState({
    tokenname: '',
    tokensymbol: '',
    tokensupply: '',
    decimal: '',
    canmints: false,
    canburns: false,
  });

  const [safemoons, setSafemoon] = useState({
    tokenname: '',
    tokensymbol: '',
    tokensupply: '',
    decimal: '',
    taxfeesperc: '',
    liquidityfeesperc: '',
    maxtransactionamount: '1000000000000000',
    numTokensSellToAddToLiquidity: '',
    router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  });

  const [liquiditygenerators, setliquiditygenerator] = useState({
    tokenname: '',
    tokensymbol: '',
    tokensupply: '',
    decimal: '',
    marketinguser: '',
    marketingtaxperc: '10',
    maxtransactionamounts: '1000000000000000',
    liquidityfeesperc: '5',
    cappedsupply: '0',
    router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  });

  const [dynamics, setdynamic] = useState({
    tokenname: '',
    tokensymbol: '',
    tokensupply: '',
    decimal: '',
    canmint: false,
    canburn: false,
    canrecover: false,
    ownerburn: false,
    ownerpause: false,
    canpause: false,
    iscapped: false,
    cappedsupply: '1000000000000000000000000000',
    router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  });

  const [marketingtaxs, setmarketingtax] = useState({
    tokenname: '',
    tokensymbol: '',
    tokensupply: '',
    decimal: '',
    marketinguser: '',
    buytaxperc: '1000',
    selltaxperc: '1000',
    maxtransactionperc: '10000',
    maxuserperc: '10000',
    router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  });

  const [smarttaxs, setsmarttax] = useState({
    tokenreward: '',
    tokenname: '',
    tokensymbol: '',
    tokensupply: '',
    decimal: '',
    maxuserperc: '101',
    maxtransactionamount: '1000000000000000',
    liquidityfeesperc: '2',
    marketinguser: '',
    marketingfeeperc: '3',
    taxfeesperc: '1',
    router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  });

  const [rewardtokens, setRewardToken] = useState({
    tokenreward: '',
    tokenname: '',
    tokensymbol: '',
    tokensupply: '',
    decimal: '',
    rewardtoholder: '0x55dcEbc1021197F55fF560Dc3657D27120cA7415',
    rewardfeeperc1: '7',
    minimumholds: '10000',
    marketinguser: '',
    marketingfeeperc: '3',
    liquidityfeesperc: '2',
    extrasellfeesperc: '1',
    router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  });

  const [promaxs, setProMax] = useState({
    tokenreward: '',
    tokenname: '',
    tokensymbol: '',
    tokensupply: '',
    decimal: '',
    maxuserperc: '0',
    maxtransactionperc: '0',
    rewardfeespercpro: '0',
    mintokenbalance: '0',
    liquidityfeeperc: '0',
    burnfeesperc: '0',
    marketinguserpro: '0x0000000000000000000000000000000000000000',
    marketingfeeperc: '0',
    charityuser: '0x0000000000000000000000000000000000000000',
    charityfeesperc: '0',
    rewardtoholders: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    taxs: '1',
    buyback: '0',
    marketingeth: false,
    charityeth: false,
    router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  });
  const dispatch = useDispatch();

  // console.log(liquiditygenerators,"safemoonssafemoons")
  const refTxnSheet = useRef();
  const refChainSteet = useRef();
  function openSheet() {
    return refTxnSheet.current.open();
  }
  function closeSheet() {
    return refTxnSheet.current.close();
  }

  function openChainSheet() {
    return refChainSteet.current.open();
  }

  function closeChainSheet() {
    return refChainSteet.current.close();
  }

  const fetchSigner = () => {
    try {
      // const BSC_TESTNET_RPC = 'https://data-seed-prebsc-1-s2.bnbchain.org:8545';

      // const provider = new ethers.providers.JsonRpcProvider(BSC_TESTNET_RPC);
      // const signer = new ethers.Wallet(wallet.privateKey, provider);

      // // const signers = provider.getSigner();
      // return signer;
      console.log(activeChain?.rpcUrl, 'activeChain?.rpcUrl');
      const web3 = new Web3(activeChain?.rpcUrl);
      return web3;
    } catch (error) {
      console.log(error, 'errr');
    }
  };

  function encodeConstructorParams(type, params) {
    const abiCoder = new ethers.utils.AbiCoder();
    return abiCoder.encode(type, params);
  }
  // function encodeConstructorParams(type, params) {
  //   const web3=fetchSigner()
  //   return web3.eth.abi.encodeParameters(type, params);
  // }

  async function handleSubmit() {
    setIsLoader(true);
    setErrors({});
    try {
      const senderAddress = wallet.address; // Replace with your sender's address
      const privateKey = wallet.privateKey;
      if (type.value == 'standard') {
        const {
          tokenname,
          tokensymbol,
          tokensupply,
          decimal,
          canmints,
          canburns,
        } = standards;
        if (validateFieldStandard(standards, setErrors)) {
          let encode = encodeConstructorParams(ERC20_Type.standard.inputs, [
            tokenname,
            tokensymbol,
            tokensupply,
            decimal,
            canmints,
            canburns,
            wallet.address,
          ]).slice(2);
          // console.log(encode, 'enceode');

          const data = ERC20_Type.standard.bytesCode + encode;
          // console.log(ERC20_Type.standard.bytesCode, 'dtat');
          const web3 = fetchSigner();

          const transactionObject = {
            from: senderAddress,
            value: '0',
            gasPrice: await web3.eth.getGasPrice(),
            gas: 2000000,
            nonce: await web3.eth.getTransactionCount(senderAddress),
            data: data,
          };
          const estimatedGas = await web3.eth.estimateGas(transactionObject);

          transactionObject.gas = estimatedGas;
          console.log(transactionObject, 'transactionObject');

          const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey,
          );

          web3.eth
            .sendSignedTransaction(signedTransaction.rawTransaction)
            .then(async receipt => {
              setIsLoader(false);
              console.log('Transaction Receipt:', receipt);
              if (receipt.status) {
                Toast.show({
                  type: 'success',
                  text1: 'Contract Deployment Status',
                  text2:
                    'Contract Deployed With transaction hash' +
                    receipt.transactionHash.slice(0, 4) +
                    '...' +
                    receipt.transactionHash.slice(-4),
                });
                dispatch(setSelectChain(activeChain));
                await verifyToken(
                  receipt,
                  sourcecode.standards,
                  'StandardToken',
                  encode,
                  activeChain?.nativeCurrency.slug,
                  Toast,
                );
                navigation.navigate('importtoken', {
                  qr: true,
                  address: receipt.contractAddress,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Transaction Reverted.',
                });
              }
            })
            .catch(error => {
              setIsLoader(false);
              Toast.show({
                type: 'error',
                text1: error ? error : 'Transaction Reverted.',
              });
              console.error('Error:', error);
            });
        } else {
          setIsLoader(false);
        }
      } else if (type.value == 'liquiditygenerator') {
        const {
          tokenname,
          tokensymbol,
          tokensupply,
          decimal,
          marketinguser,
          liquidityfeesperc,
          marketingtaxperc,
          maxtransactionamounts,
          router,
        } = liquiditygenerators;
        if (validateFieldsLiquidity(liquiditygenerators, setErrors)) {
          let encode = encodeConstructorParams(ERC20_Type.liqudity.inputs, [
            tokenname,
            tokensymbol,
            tokensupply,
            decimal,
            liquidityfeesperc,
            marketinguser,
            marketingtaxperc,
            maxtransactionamounts,
            router,
            wallet.address,
          ]).slice(2);
          let data = ERC20_Type.liqudity.bytesCode + encode;
          // console.log(data, 'encode');

          const web3 = fetchSigner();

          const transactionObject = {
            from: senderAddress,
            value: '0',
            gasPrice: await web3.eth.getGasPrice(),
            gas: 1500000000,
            nonce: await web3.eth.getTransactionCount(senderAddress),
            data: data,
          };
          const estimatedGas = await web3.eth.estimateGas(transactionObject);

          transactionObject.gas = estimatedGas + 1000;
          // console.log(estimatedGas + 1000, 'estimatedGas');

          const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey,
          );

          web3.eth
            .sendSignedTransaction(signedTransaction.rawTransaction)
            .then(async receipt => {
              setIsLoader(false);
              console.log('Transaction Receipt:', receipt);
              if (receipt.status) {
                Toast.show({
                  type: 'success',
                  text1: 'Contract Deployment Status',
                  text2:
                    'Contract Deployed With transaction hash' +
                    receipt.transactionHash.slice(0, 4) +
                    '...' +
                    receipt.transactionHash.slice(-4),
                });
                dispatch(setSelectChain(activeChain));
                await verifyToken(
                  receipt,
                  sourcecode.liquidity,
                  'LiquidityGenerator',
                  encode,
                  activeChain?.nativeCurrency.slug,
                  Toast,
                );
                navigation.navigate('importtoken', {
                  qr: true,
                  address: receipt.contractAddress,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Transaction Reverted.',
                });
              }
            })
            .catch(error => {
              setIsLoader(false);
              Toast.show({
                type: 'error',
                text1: error ? error : 'Transaction Reverted.',
              });
              console.error('Error:', error);
            });
        } else {
          setIsLoader(false);
        }
      } else if (type.value == 'safemoon') {
        const {
          tokenname,
          tokensymbol,
          tokensupply,
          decimal,
          taxfeesperc,
          liquidityfeesperc,
          maxtransactionamount,
          numTokensSellToAddToLiquidity,
          router,
        } = safemoons;
        if (validateFieldsSafemoon(safemoons, setErrors)) {
          const encode = encodeConstructorParams(ERC20_Type.safe.inputs, [
            tokenname,
            tokensymbol,
            tokensupply,
            decimal,
            taxfeesperc,
            liquidityfeesperc,
            maxtransactionamount,
            numTokensSellToAddToLiquidity,
            router,
            wallet.address,
          ]).slice(2);

          let data = ERC20_Type.safe.bytesCode + encode;
          const web3 = fetchSigner();

          const transactionObject = {
            from: senderAddress,
            value: '0', // Amount in wei (0 for this example)
            gasPrice: await web3.eth.getGasPrice(), // Gas price in wei
            gas: 7000000, // Gas limit
            nonce: await web3.eth.getTransactionCount(senderAddress),
            data: data,
          };
          const estimatedGas = await web3.eth.estimateGas(transactionObject);

          transactionObject.gas = estimatedGas + 2000;

          const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey,
          );

          web3.eth
            .sendSignedTransaction(signedTransaction.rawTransaction)
            .then(async receipt => {
              setIsLoader(false);
              console.log('Transaction Receipt:', receipt);
              if (receipt.status) {
                Toast.show({
                  type: 'success',
                  text1: 'Contract Deployment Status',
                  text2:
                    'Contract Deployed With transaction hash' +
                    receipt.transactionHash.slice(0, 4) +
                    '...' +
                    receipt.transactionHash.slice(-4),
                });
                dispatch(setSelectChain(activeChain));
                await verifyToken(
                  receipt,
                  sourcecode.safe,
                  'SafeToken',
                  encode,
                  activeChain?.nativeCurrency.slug,
                  Toast,
                );

                navigation.navigate('importtoken', {
                  qr: true,
                  address: receipt.contractAddress,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Transaction Reverted.',
                });
              }
            })
            .catch(error => {
              setIsLoader(false);
              Toast.show({
                type: 'error',
                text1: error ? error : 'Transaction Reverted.',
              });
              console.error('Error:', error);
            });
        } else {
          setIsLoader(false);
        }
      } else if (type.value == 'dynamic') {
        const {
          tokenname,
          tokensymbol,
          tokensupply,
          decimal,
          cappedsupply,
          canmint,
          canburn,
          canrecover,
          canpause,
          ownerburn,
          ownerpause,
          iscapped,
          router,
        } = dynamics;
        if (validateFieldsDynamic(dynamics, setErrors)) {
          let encode = encodeConstructorParams(ERC20_Type.dynamic.inputs, [
            tokenname,
            tokensymbol,
            tokensupply,
            decimal,
            [canmint, iscapped],
            cappedsupply,
            [canburn, ownerburn],
            canrecover,
            [canpause, ownerpause],
            [router, wallet.address],
          ]).slice(2);
          const data = ERC20_Type.dynamic.bytesCode + encode;
          const web3 = fetchSigner();
          const transactionObject = {
            from: senderAddress,
            value: '0', // Amount in wei (0 for this example)
            gasPrice: await web3.eth.getGasPrice(), // Gas price in wei
            gas: 75000000, // Gas limit
            nonce: await web3.eth.getTransactionCount(senderAddress),
            data: data,
          };
          const estimatedGas = await web3.eth.estimateGas(transactionObject);

          transactionObject.gas = estimatedGas + 1000;

          const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey,
          );
          web3.eth
            .sendSignedTransaction(signedTransaction.rawTransaction)
            .then(async receipt => {
              setIsLoader(false);
              console.log('Transaction Receipt:', receipt);
              if (receipt.status) {
                Toast.show({
                  type: 'success',
                  text1: 'Contract Deployment Status',
                  text2:
                    'Contract Deployed With transaction hash' +
                    receipt.transactionHash.slice(0, 4) +
                    '...' +
                    receipt.transactionHash.slice(-4),
                });
                dispatch(setSelectChain(activeChain));
                await verifyToken(
                  receipt,
                  sourcecode.dynamic,
                  'DynamicToken',
                  encode,
                  activeChain?.nativeCurrency.slug,
                  Toast,
                );
                navigation.navigate('importtoken', {
                  qr: true,
                  address: receipt.contractAddress,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Transaction Reverted.',
                });
              }
            })
            .catch(error => {
              setIsLoader(false);
              Toast.show({
                type: 'error',
                text1: error ? error : 'Transaction Reverted.',
              });
              console.error('Error:', error);
            });
        } else {
          setIsLoader(false);
        }
      } else if (type.value == 'marketingtax') {
        const {
          tokenname,
          tokensymbol,
          tokensupply,
          decimal,
          marketinguser,
          buytaxperc,
          selltaxperc,
          maxtransactionperc,
          maxuserperc,
          router,
        } = marketingtaxs;
        if (validateFieldsMarketing(marketingtaxs, setErrors)) {
          let encode = encodeConstructorParams(ERC20_Type.marketing.inputs, [
            tokenname,
            tokensymbol,
            tokensupply,
            decimal,
            [
              buytaxperc,
              selltaxperc,
              marketinguser,
              maxtransactionperc,
              maxuserperc,
            ],
            router,
            wallet.address,
          ]).slice(2);
          const data = ERC20_Type.marketing.bytesCode + encode;
          const web3 = fetchSigner();
          const transactionObject = {
            from: senderAddress,
            value: '0', // Amount in wei (0 for this example)
            gasPrice: await web3.eth.getGasPrice(), // Gas price in wei
            gas: 1500000, // Gas limit
            nonce: await web3.eth.getTransactionCount(senderAddress),
            data: data,
          };
          const estimatedGas = await web3.eth.estimateGas(transactionObject);

          transactionObject.gas = estimatedGas + 1000;

          const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey,
          );
          web3.eth
            .sendSignedTransaction(signedTransaction.rawTransaction)
            .then(async receipt => {
              setIsLoader(false);
              console.log('Transaction Receipt:', receipt);
              if (receipt.status) {
                Toast.show({
                  type: 'success',
                  text1: 'Contract Deployment Status',
                  text2:
                    'Contract Deployed With transaction hash' +
                    receipt.transactionHash.slice(0, 4) +
                    '...' +
                    receipt.transactionHash.slice(-4),
                });
                dispatch(setSelectChain(activeChain));
                await verifyToken(
                  receipt,
                  sourcecode.marketing,
                  'MarketingTax',
                  encode,
                  activeChain?.nativeCurrency.slug,
                  Toast,
                );
                navigation.navigate('importtoken', {
                  qr: true,
                  address: receipt.contractAddress,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Transaction Reverted.',
                });
              }
            })
            .catch(error => {
              setIsLoader(false);
              Toast.show({
                type: 'error',
                text1: error ? error : 'Transaction Reverted.',
              });
              console.error('Error:', error);
            });
        } else {
          setIsLoader(false);
        }
      } else if (type.value == 'smarttax') {
        const {
          tokenreward,
          tokenname,
          tokensymbol,
          tokensupply,
          decimal,
          maxuserperc,
          maxtransactionamount,
          marketinguser,
          marketingfeeperc,
          taxfeesperc,
          liquidityfeesperc,
          router,
        } = smarttaxs;
        if (validateFieldsSmartTax(smarttaxs, setErrors)) {
          let encode = encodeConstructorParams(ERC20_Type.smarttax.inputs, [
            tokenname,
            tokensymbol,
            decimal,
            tokensupply,
            [
              liquidityfeesperc,
              marketingfeeperc,
              taxfeesperc,
              maxuserperc,
              maxtransactionamount,
            ],
            [tokenreward, marketinguser],
            router,
            wallet.address,
          ]).slice(2);
          const data = ERC20_Type.smarttax.bytesCode + encode;
          const web3 = fetchSigner();
          const transactionObject = {
            from: senderAddress,
            value: '0', // Amount in wei (0 for this example)
            gasPrice: await web3.eth.getGasPrice(), // Gas price in wei
            gas: 750000000, // Gas limit
            nonce: await web3.eth.getTransactionCount(senderAddress),
            data: data,
          };
          const estimatedGas = await web3.eth.estimateGas(transactionObject);

          transactionObject.gas = estimatedGas + 1000;

          const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey,
          );
          web3.eth
            .sendSignedTransaction(signedTransaction.rawTransaction)
            .then(async receipt => {
              setIsLoader(false);
              console.log('Transaction Receipt:', receipt);
              if (receipt.status) {
                Toast.show({
                  type: 'success',
                  text1: 'Contract Deployment Status',
                  text2:
                    'Contract Deployed With transaction hash' +
                    receipt.transactionHash.slice(0, 4) +
                    '...' +
                    receipt.transactionHash.slice(-4),
                });
                dispatch(setSelectChain(activeChain));
                await verifyToken(
                  receipt,
                  sourcecode.smarttax,
                  'SmartTax',
                  encode,
                  activeChain?.nativeCurrency.slug,
                  Toast,
                );
                navigation.navigate('importtoken', {
                  qr: true,
                  address: receipt.contractAddress,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Transaction Reverted.',
                });
              }
            })
            .catch(error => {
              setIsLoader(false);
              Toast.show({
                type: 'error',
                text1: error ? error : 'Transaction Reverted.',
              });
              console.error('Error:', error);
            });
        } else {
          setIsLoader(false);
        }
      } else if (type.value == 'rewardtoken') {
        const {
          tokenname,
          tokensymbol,
          tokensupply,
          decimal,
          rewardtoholder,
          rewardfeeperc1,
          minimumholds,
          marketinguser,
          marketingfeeperc,
          liquidityfeesperc,
          extrasellfeesperc,
          router,
        } = rewardtokens;
        if (validateFieldsReward(rewardtokens, setErrors)) {
          let encode = encodeConstructorParams(ERC20_Type.reward.inputs, [
            tokenname,
            tokensymbol,
            tokensupply,
            decimal,
            rewardtoholder,
            rewardfeeperc1,
            minimumholds,
            [liquidityfeesperc, marketingfeeperc, extrasellfeesperc],
            marketinguser,
            router,
            wallet.address,
          ]).slice(2);
          let data = ERC20_Type.reward.bytesCode + encode;
          const web3 = fetchSigner();
          const transactionObject = {
            from: senderAddress,
            value: '0', // Amount in wei (0 for this example)
            gasPrice: await web3.eth.getGasPrice(), // Gas price in wei
            gas: 150000000, // Gas limit
            nonce: await web3.eth.getTransactionCount(senderAddress),
            data: data,
          };
          const estimatedGas = await web3.eth.estimateGas(transactionObject);

          transactionObject.gas = estimatedGas + 1000;

          const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey,
          );
          web3.eth
            .sendSignedTransaction(signedTransaction.rawTransaction)
            .then(async receipt => {
              setIsLoader(false);
              console.log('Transaction Receipt:', receipt);
              if (receipt.status) {
                Toast.show({
                  type: 'success',
                  text1: 'Contract Deployment Status',
                  text2:
                    'Contract Deployed With transaction hash' +
                    receipt.transactionHash.slice(0, 4) +
                    '...' +
                    receipt.transactionHash.slice(-4),
                });
                dispatch(setSelectChain(activeChain));
                await verifyToken(
                  receipt,
                  sourcecode.rewardtoken,
                  'Rewardtoken',
                  encode,
                  activeChain?.nativeCurrency.slug,
                  Toast,
                );
                navigation.navigate('importtoken', {
                  qr: true,
                  address: receipt.contractAddress,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Transaction Reverted.',
                });
              }
            })
            .catch(error => {
              setIsLoader(false);
              Toast.show({
                type: 'error',
                text1: error ? error : 'Transaction Reverted.',
              });
              console.error('Error:', error);
            });
        } else {
          setIsLoader(false);
        }
      } else if (type.value == 'promax') {
        const {
          rewardtoholders,
          tokenname,
          tokensymbol,
          tokensupply,
          decimal,
          maxuserperc,
          maxtransactionperc,
          rewardfeespercpro,
          mintokenbalance,
          liquidityfeeperc,
          burnfeesperc,
          buyback,
          marketinguserpro,
          taxs,
          charityuser,
          charityfeesperc,
          marketingeth,
          charityeth,
          router,
        } = promaxs;
        if (validateFieldsProMax(promaxs, setErrors)) {
          let encode = encodeConstructorParams(ERC20_Type.pro.inputs, [
            tokenname,
            tokensymbol,
            decimal,
            tokensupply,
            maxtransactionperc,
            maxuserperc,
            [marketinguserpro, charityuser, marketingeth, charityeth],
            rewardtoholders,
            mintokenbalance,
            [
              taxs,
              liquidityfeeperc,
              burnfeesperc,
              maxuserperc,
              buyback,
              charityfeesperc,
              rewardfeespercpro,
            ],
            [router, wallet.address],
          ]).slice(2);
          const data = ERC20_Type.pro.bytesCode + encode;
          const web3 = fetchSigner();
          const transactionObject = {
            from: senderAddress,
            value: '0', // Amount in wei (0 for this example)
            gasPrice: await web3.eth.getGasPrice(), // Gas price in wei
            gas: 150000000, // Gas limit
            nonce: await web3.eth.getTransactionCount(senderAddress),
            data: data,
          };
          const estimatedGas = await web3.eth.estimateGas(transactionObject);

          transactionObject.gas = estimatedGas + 1000;

          const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey,
          );
          web3.eth
            .sendSignedTransaction(signedTransaction.rawTransaction)
            .then(async receipt => {
              setIsLoader(false);
              console.log('Transaction Receipt:', receipt);
              if (receipt.status) {
                Toast.show({
                  type: 'success',
                  text1: 'Contract Deployment Status',
                  text2:
                    'Contract Deployed With transaction hash' +
                    receipt.transactionHash.slice(0, 4) +
                    '...' +
                    receipt.transactionHash.slice(-4),
                });
                dispatch(setSelectChain(activeChain));
                await verifyToken(
                  receipt,
                  sourcecode.promax,
                  'ProToken',
                  encode,
                  activeChain?.nativeCurrency.slug,
                  Toast,
                );
                navigation.navigate('importtoken', {
                  qr: true,
                  address: receipt.contractAddress,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Transaction Reverted.',
                });
              }
            })
            .catch(error => {
              setIsLoader(false);
              Toast.show({
                type: 'error',
                text1: error ? error : 'Transaction Reverted.',
              });
              console.error('Error:', error);
            });
        } else {
          setIsLoader(false);
        }
      }
    } catch (error) {
      setIsLoader(false);
      const err = 'Error: Returned error: insufficient funds for transfer';
      const err1 = 'Error: Returned error: execution reverted';
      if (error.toString() == err) {
        Toast.show({
          type: 'error',
          text1: 'Insufficient Funds.',
        });
      }
      if (error.toString() == err1) {
        Toast.show({
          type: 'error',
          text1: err1 ? err1 : 'Execution Reverted.',
        });
      }

      Toast.show({
        type: 'error',
        text1: error.toString(),
      });

      console.log(error.toString(), 'eerrr resultresult');
    }
  }
  useEffect(() => {
    (async () => {
      const chainData = await fetchChainData();
      const ch = [...chainData];
      setAllChain([...ch]);
    })();
  }, []);

  return (
    <LinearGradient
      colors={[
        '#d6fffd',
        '#f2fffe',
        '#ffff',
        '#fff',
        '#fffaff',
        '#fef8ff',
        '#faf4ff',
        '#fcf5fe',
        '#f5eefe',
        '#f1e9fe',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={styles.header}>
        <View>         
        <MaterialIcons
            name="arrow-back"
            size={25}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: hp(2.2),
              fontWeight: '600',
            }}>
            Create Token
          </Text>
        </View>
        <View>
        <View>
          <MaterialCommunityIcons
            name="eye-outline"
            size={22}
            color={'#000'}
            onPress={()=> navigation.navigate(NewlistScreen)}
            
          />
        </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', marginHorizontal: wp(4)}}>
          <View style={[styles.wrapper, {justifyContent: 'space-between'}]}>
            <View>
              <Text style={styles.labels}>Network Type</Text>
            </View>

            <TouchableOpacity
              onPress={() => openChainSheet()}
              style={styles.selectCard}>
              <Text style={styles.headinglabels}>{activeChain.name}</Text>

              <View>
                <MaterialIcons
                  onPress={() => openSheet()}
                  style={styles.arrowIcon}
                  name="keyboard-arrow-right"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.labels}>Token Type</Text>
            </View>

            <TouchableOpacity
              onPress={() => openSheet()}
              style={styles.selectCard}>
              <Text style={styles.headinglabels}>{type.title}</Text>

              <View>
                <MaterialIcons
                  onPress={() => openSheet()}
                  style={styles.arrowIcon}
                  name="keyboard-arrow-right"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>

          {type.value == 'standard' ? (
            <Standard
              standards={standards}
              setStandard={setStandard}
              errors={errors}
              setErrors={setErrors}
            />
          ) : type.value == 'safemoon' ? (
            <Safemoon
              safemoons={safemoons}
              setSafemoon={setSafemoon}
              errors={errors}
              setErrors={setErrors}
              router={activeChainRouter}
            />
          ) : type.value == 'liquiditygenerator' ? (
            <LiquidityGenerator
              liquiditygenerators={liquiditygenerators}
              setliquiditygenerator={setliquiditygenerator}
              errors={errors}
              setErrors={setErrors}
              router={activeChainRouter}
            />
          ) : type.value == 'dynamic' ? (
            <Dynamic
              dynamics={dynamics}
              setdynamic={setdynamic}
              errors={errors}
              setErrors={setErrors}
              router={activeChainRouter}
            />
          ) : type.value == 'marketingtax' ? (
            <MarketingTax
              marketingtaxs={marketingtaxs}
              setmarketingtax={setmarketingtax}
              errors={errors}
              setErrors={setErrors}
              router={activeChainRouter}
            />
          ) : type.value == 'rewardtoken' ? (
            <Reward
              rewardtokens={rewardtokens}
              setRewardToken={setRewardToken}
              errors={errors}
              setErrors={setErrors}
              router={activeChainRouter}
            />
          ) : type.value == 'smarttax' ? (
            <Smarttax
              smarttaxs={smarttaxs}
              setsmarttax={setsmarttax}
              errors={errors}
              setErrors={setErrors}
              router={activeChainRouter}
            />
          ) : type.value == 'promax' ? (
            <ProMax
              promaxs={promaxs}
              setProMax={setProMax}
              errors={errors}
              setErrors={setErrors}
              router={activeChainRouter}
            />
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: wp(4),
          }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text
            style={{
              color: '#444',
              fontSize: wp(4),
            }}>
            Impliment SEEDx Anti-Bot System?
          </Text>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity style={styles.send} onPress={() => handleSubmit()}>
            {/* <View > */}
            {isLoader ? (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={{padding: 10}}
              />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  padding: 10,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                Create Token
              </Text>
            )}
            {/* </View> */}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <RBSheet
        ref={refTxnSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={600}
        draggableIcon={false}
        openDuration={400}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            // justifyContent: 'space-between',
            padding: 10,
          }}>
          <ScrollView>
            <View style={styles.sheetContainer}>
              <View style={{alignItems: 'center', paddingBottom: wp(2)}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '600',
                    paddingHorizontal: 10,
                    marginBottom: wp(2),
                  }}>
                  Select Token Type
                </Text>
              </View>

              {tokenType.map((item, i) => {
                return (
                  <TouchableOpacity
                    style={styles.tokenWrapper}
                    onPress={() => {
                      setType(item);
                      setErrors({});
                      closeSheet();
                    }}
                    key={i + 'abc'}>
                    <View style={styles.tokenInfo}>
                      <Text style={styles.tokenName}>{item.title}</Text>
                    </View>
                    {type.value === item.value && (
                      <View>
                        <MaterialIcons
                          name="check"
                          size={18}
                          color={'#32CD32'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </RBSheet>

      <RBSheet
        ref={refChainSteet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={600}
        draggableIcon={false}
        openDuration={400}
        customStyles={{
          container: {
            backgroundColor: '#fff',
          },
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            // justifyContent: 'space-between',
            padding: 10,
          }}>
          <ScrollView>
            <View style={styles.sheetContainer}>
              <View style={{alignItems: 'center', paddingBottom: wp(2)}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '600',
                    paddingHorizontal: 10,
                    marginBottom: wp(2),
                  }}>
                  Select Chain
                </Text>
              </View>

              {allChain.map((item, i) => {
                return (
                  <TouchableOpacity
                    style={styles.tokenWrapper}
                    onPress={() => {
                      setActiveChain(item);
                      // setErrors({});
                      closeChainSheet();
                    }}
                    key={i + 'abc'}>
                    <View style={styles.tokenInfo}>
                      <Image
                        source={{
                          uri:
                            item?.slug &&
                            `https://raw.githubusercontent.com/Nute-Wallet/Chains/main/resources/${item?.slug}/logo.png`,
                        }}
                        style={styles.flatImage}
                      />
                      <Text style={styles.tokenName}>{item.name}</Text>
                    </View>
                    {activeChain.chainId === item.chainId && (
                      <View>
                        <MaterialIcons
                          name="check"
                          size={18}
                          color={'#32CD32'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#F3F4F7',
  // },
  header: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  input: {
    color: '#444',
    fontSize: 12,
  },
  wrapper: {
    borderRadius: wp(2),
    width: '100%',
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f7',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
  },
  selectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f7',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
  },
  input: {
    color: '#444',
    fontSize: 13,
    // paddingHorizontal: wp(5),
    // marginVertical: 0,
  },
  inputTxt: {
    color: '#000',
    fontSize: wp(4),
    height: 40,
    flex: 1,
    backgroundColor: 'red',
  },
  labels: {
    color: '#666',
    fontSize: hp(1.6),
    paddingVertical: wp(0.8),
  },
  balLabels: {
    color: '#6bd18c',
    fontSize: hp(1.6),
    paddingVertical: wp(1.5),
  },
  headinglabels: {
    color: '#999',
    fontSize: wp(4),
    // fontWeight: '600',
  },

  arrowIcon: {
    paddingTop: wp(0.5),
    color: '#ccc',
  },

  headText: {
    color: '#444',
    fontSize: hp(1.8),
    fontWeight: '600',
  },

  tokenWrapper: {
    // backgroundColor: '#f3f4f7',
    paddingVertical: wp(2),
    // borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    // marginBottom: wp(2),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCoin: {
    width: 40,
    height: 40,
    borderRadius: wp(50),
    marginEnd: wp(1),
    backgroundColor: '#eee',
    // borderWidth:0.5,
    // borderColor:'#ccc'
  },

  tokenName: {
    color: '#000',
    fontSize: hp(2),
  },
  subtoken: {
    color: '#888',
    fontSize: hp(1.5),
  },

  sheetContainer: {
    flex: 1,
    // backgroundColor: '#eee',
    marginHorizontal: wp(5),
  },

  send: {
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
    marginHorizontal: wp(3),
  },
  disabledBtn: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
    flexDirection: 'row',
    textAlign: 'center',
    opacity: 1,
  },

  flatImage: {
    width: 30, // Adjust width to your preference
    height: 30,
    borderRadius: wp(5),
    marginRight: 10,
  },

  checkbocLable: {
    color: '#666',
    fontSize: hp(2),
    paddingVertical: wp(0.8),
  },
});

export default CreateTokenScreen;
