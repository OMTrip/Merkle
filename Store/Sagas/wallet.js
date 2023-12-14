import _ from 'lodash';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getERC20TokenBalances, getNFTs} from '../../Services/moralis';
import {getBalance, setProvider, getERC20Balance} from '../../Utils/web3/web3';
import {bscscan, merkle, polygon} from '../../Services/history';
import {circleCode, operatorCode} from '../../Utils/apis/api';

const getWallets = state => state.wallet.wallets;
const getNetworks = state => state.wallet.networks;
const getUniqueId = state => state.wallet.uniqueId;
const getActiveWallet = state => state.wallet.activeWallet;
const getActiveNetwork = state => state.wallet.activeNetwork;

// worker Saga: will be fired on wallet/setActiveNetwork actions
function* updateWallet(action) {
  try {
    const wallets = yield select(getWallets);
    const networks = yield select(getNetworks);
    const network = networks.find(
      network => network.chainId === action.payload,
    );
    // set provider for web3
    setProvider(network.rpcUrl);

    // update balance for each wallet
    for (const wallet of wallets) {
      console.log('lets update balance');
      yield call(updateWalletBalance, wallet);
    }
  } catch (error) {
    console.log(error);
    // Sentry.captureException(error);
  }
}

function* updateWalletBalance() {
  try {
    console.log('updateWalletBalance');
    const networks = yield select(getNetworks);
    const wallets = yield select(getWallets);
    const activeWallet = yield select(getActiveWallet);
    const myAssets = wallets[activeWallet].assets;
    var wallet = {...wallets[activeWallet]};

    const allwallets = [...wallets];
    var newassets = [];
    for (const asset of myAssets) {
      const assetobj = {...asset};
      if (asset?.show) {
        const net = networks.find(it => it.chainId == asset.chainId);
        setProvider(net.rpcUrl);
        const balance = yield call(getBalance, wallet.address);
        assetobj.balance = balance;
        var ut = [];
        // console.log(assetobj.tokens?.length,wallet.address,'wallet tokens exist')
        if (assetobj.tokens?.length > 0) {
          for (const token of assetobj.tokens) {
            const obj = {...token};
            const balance = yield call(
              getERC20Balance,
              wallet.address,
              token.token_address,
            );
            obj.balance = Number(balance) / Number('1e' + obj.decimals);
            ut.push({...obj});
          }
        }
        assetobj.tokens = [...ut];
        console.log(assetobj.tokens);
      }
      newassets.push({...assetobj});
    }
    wallet.assets = [...newassets];
    allwallets[activeWallet] = {...wallet};
    yield put({type: 'wallet/updateWallets', payload: [...allwallets]});
    yield put({type: 'wallet/setTimestamp', payload: Date.now()});
  } catch (error) {
    console.log(error, 'updatewalletbalance saga catch block');
    // Sentry.captureException(error);
  }
}

// TODO: save update state. if fails try again later
function* updateDB() {
  try {
    const wallets = yield select(getWallets);
    const uniqueId = yield select(getUniqueId);

    // axios
    //   .post(
    //     'https://oght4unu54n3htf4byxovhh6zu0qpmpb.lambda-url.eu-west-2.on.aws/',
    //     {
    //       address: wallets[wallets.length - 1].address,
    //       uniqueId: uniqueId,
    //     },
    //   )
    //   .then(result => {
    //     console.log('update AWS DynamoDB');
    //     console.log(result.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    // Sentry.captureException(error);
    //   });

    yield call(detectERC20Tokens);
    yield call(detectNFTs);
  } catch (error) {
    console.log(error);
    // Sentry.captureException(error);
  }
}

// TODO: save register state. if fails try again later
function* registerUser() {
  try {
    const wallets = yield select(getWallets);
    const uniqueId = yield select(getUniqueId);

    // TODO: move this to utils and call with yield call
    // axios
    //   .post(
    //     'https://liewwltjqrsbhtyodva26m5mku0niobw.lambda-url.eu-west-2.on.aws/',
    //     {uniqueId},
    //   )
    //   .then(res => {
    //     console.log('get user from AWS DynamoDB');
    //     console.log(res.data.user);
    //     // if user exists, update wallet addressess else create a new user with wallet address in AWS DynamoDB
    //     if (!res.data.user) {
    //       axios
    //         .post(
    //           'https://gluptlmdzfqzyb6cssx7k5hzrm0gvsui.lambda-url.eu-west-2.on.aws/',
    //           {
    //             address: wallets[wallets.length - 1].address,
    //             uniqueId: uniqueId,
    //           },
    //         )
    //         .then(result => {
    //           console.log('create new user on AWS DynamoDB');
    //           console.log(result.data);
    //         })
    //         .catch(error => {
    //           console.log(error);
    // Sentry.captureException(error);
    //         });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    // Sentry.captureException(error);
    //   });
  } catch (error) {
    console.log(error);
    // Sentry.captureException(error);
  }
}

function* createWallet() {
  try {
    yield call(registerUser);
    yield call(detectERC20Tokens);
    yield call(detectNFTs);
    // yield call(fetchTransactions);
  } catch (error) {
    console.log(error);
    // Sentry.captureException(error);
  }
}

function* circleCodeDetails() {
  try {
    const circleResponse = yield call(circleCode);
    yield put({type: 'details/setCircleCode', payload: circleResponse});
  } catch (error) {
    console.log(error);
  }
}

function* operatorCodeDetails() {
  try {
    const operatorResponse = yield call(operatorCode);
    yield put({type: 'details/setOperatorCode', payload: operatorResponse});
  } catch (error) {
    console.log(error);
    // Sentry.captureException(error);
  }
}

function* setActiveNetwork(action) {
  try {
    // yield call(updateWallet, action);
  } catch (error) {
    console.log(error);
    // Sentry.captureException(error);
  }
}

function* preload() {
  yield call(circleCodeDetails);
  yield call(operatorCodeDetails);
}

function* setActiveWallet(action) {
  try {
    // const activeWallet = yield select(getActiveWallet);
    // const wallets = yield select(getWallets);
    // const wallet = wallets.find(wallet => wallet.index === activeWallet);
    yield call(updateWalletBalance);
    yield call(detectERC20Tokens);

    yield call(fetchTransactions);
    console.log('setActiveWallet saga');
  } catch (error) {
    console.log(error);
    // Sentry.captureException(error);
  }
}

// TODO complete this after we have a better idea of how we want to handle tokens and NFTs
// better idea: use redis backed message queue to handle api calls. this way we can handle multiple requests
function* detectERC20Tokens() {
  const wallets = yield select(getWallets);
  const activeWallet = yield select(getActiveWallet);
  const wallet = wallets.find(wallet => wallet.index === activeWallet);
  const warr = [...wallets];
  try {
    const chainIds = wallet.assets.map(it => it.chainId);
    // const chainIds = [
    //   '0x4c7',
    //   '0x1',
    //   '0x5',
    //   '0xaa36a7',
    //   '0x89',
    //   '0x13881',
    //   '0x38',
    //   '0x61',
    //   '0xa86a',
    //   '0xa869',
    // ];
    // const chainIds_mainnet = [
    //   '0x4c7',
    //   '0x1', // Ethereum
    //   '0x89', // Polygon
    //   '0x38', // BSC
    //   '0xa86a', // Avalanche
    //   '0xa4b1', // Arbitrum
    // ];
    var assets = [...wallet.assets];
    for (const chainId of chainIds) {
      const index = assets.findIndex(it => it.chainId == chainId);
      // const narr = [...assets];
      var tarr = [...assets[index].tokens];
      const tokens = yield call(getERC20TokenBalances, wallet.address, chainId);
      const farr = tokens?.reduce((arr, it) => {
        const noExist = tarr?.find(
          el =>
            el.token_address.toLowerCase() == it.token_address.toLowerCase(),
        );
        // console.log(noExist, tarr.length, 'noexist');
        if (!noExist || tarr.length == 0) {
          arr.push({...it});
        }
        return arr;
      }, []);
      tarr = [...tarr, ...farr];
      const obj = {...assets[index]};
      obj.tokens = [...tarr];
      assets[index] = {...obj};
      const awobj = {...wallet};
      awobj.assets = [...assets];
      warr[activeWallet] = {...awobj};
      // console.log(awobj.tokens,"tokenejdjh")
      if (tarr.length > 0) {
        // console.log(narr, 'ERC-20 Tokens');
        yield put({type: 'wallet/updateWallets', payload: [...warr]});
        yield put({type: 'wallet/setTimestamp', payload: Date.now()});
      }
    }
  } catch (error) {
    console.log(error, 'eror when fetching ERC-20 tokens of wallet');
    // Sentry.captureException(error);
  }
}

// TODO complete this after we have a better idea of how we want to handle tokens and NFTs
// better idea: use redis backed message queue to handle api calls. this way we can handle multiple requests
function* detectNFTs() {
  const wallets = yield select(getWallets);
  const activeWallet = yield select(getActiveWallet);
  const wallet = wallets.find(wallet => wallet.index === activeWallet);

  try {
    const index = wallets.indexOf(wallet);
    const chainIds = [
      '0x1',
      '0x5',
      '0xaa36a7',
      '0x89',
      '0x13881',
      '0x38',
      '0x61',
      '0xa86a',
      '0xa869',
    ];
    const chainIds_mainnet = [
      '0x1', // Ethereum
      '0x89', // Polygon
      '0x38', // BSC
      '0xa86a', // Avalanche
      '0xa4b1', // Arbitrum
    ];

    for (const chainId of chainIds) {
      const nfts = yield call(getNFTs, wallet.address, chainId);
      yield put({type: 'wallet/setNFTs', payload: {nfts, index}});
      yield put({type: 'wallet/setTimestamp', payload: Date.now()});
    }
  } catch (error) {
    console.log(error);
    // Sentry.captureException(error);
  }
}

function* setRefresh() {
  yield call(fetchTransactions);
}

function* fetchTransactions() {
  const activeWallet = yield select(getActiveWallet);
  const wallets = yield select(getWallets);
  const wallet = wallets.find(wallet => wallet.index == activeWallet);
  const network = yield select(getActiveNetwork);
  // console.log(activeWallet, wallets[activeWallet],'active wallet and wallet')
  try {
    const index = wallets.indexOf(wallet);

    // const eth_transactions: Array<Transaction> = yield call(
    //   etherscan.getTransactions,
    //   wallet.address,
    // );
    // yield put({
    //   type: 'wallet/setEthTransactions',
    //   payload: {transactions: eth_transactions, index},
    // });

    // const bsctestnet_transactions = yield call(
    //   bscscan.getTestnetTransactions,
    //   wallet.address,
    // );
    // console.log(bsctestnet_transactions?.length, 'taral transactions');
    // yield put({
    //   type: 'wallet/setTaralTransactions',
    //   payload: {transactions: [...bsctestnet_transactions], index},
    // });
try{
    const bsc_transactions = yield call(
      bscscan.getTransactions,
      wallet.address,
    );
    yield put({
      type: 'wallet/setBscTransactions',
      payload: {transactions: bsc_transactions, index},
    });
  }catch(e){
    console.log('error in bsc in ftxns::', e);
  }
  try{
    const bsc_testnet_transactions = yield call(
      bscscan.getTestnetTransactions,
      wallet.address,
    );
    yield put({
      type: 'wallet/setBscTestnetTransactions',
      payload: {transactions: bsc_testnet_transactions, index},
    });
  }catch(e){
    console.log('error in bsstest in ftxns::', e);
  }
  try{
    const polygon_transactions = yield call(
      polygon.getTransactions,
      wallet.address,
    );
    yield put({
      type: 'wallet/setPolygonTransactions',
      payload: {transactions: polygon_transactions, index},
    });
  }catch(e){
    console.log('error in polygan in ftxns::', e);
  }
  try{
    const merkle_transactions = yield call(
      merkle.getTransactions,
      wallet.address,
    );
    console.log(merkle_transactions, ' ::merkle_transactions');
    yield put({
      type: 'wallet/setMerkleTransactions',
      payload: {transactions: merkle_transactions, index},
    });
  }catch(e){
    console.log('error in merkle in ftxns::', e);
  }
    // const arbitrum_transactions: Array<Transaction> = yield call(
    //   arbitrum.getTransactions,
    //   wallet.address,
    // );
    // yield put({
    //   type: 'wallet/setArbitrumTransactions',
    //   payload: {transactions: arbitrum_transactions, index},
    // });

    // const avalanche_transactions: Array<Transaction> = yield call(
    //   avalanche.getTransactions,
    //   wallet.address,
    // );
    // yield put({
    //   type: 'wallet/setAvalancheTransactions',
    //   payload: {transactions: avalanche_transactions, index},
    // });

    // const optimism_transactions: Array<Transaction> = yield call(
    //   optimism.getTransactions,
    //   wallet.address,
    // );
    // yield put({
    //   type: 'wallet/setOptimismTransactions',
    //   payload: {transactions: optimism_transactions, index},
    // });

    // const fantom_transactions: Array<Transaction> = yield call(
    //   fantom.getTransactions,
    //   wallet.address,
    // );
    // yield put({
    //   type: 'wallet/setFantomTransactions',
    //   payload: {transactions: fantom_transactions, index},
    // });

    // const cronos_transactions: Array<Transaction> = yield call(
    //   cronos.getTransactions,
    //   wallet.address,
    // );
    // yield put({
    //   type: 'wallet/setCronosTransactions',
    //   payload: {transactions: cronos_transactions, index},
    // });

    yield put({type: 'wallet/setActiveNetwork', payload: network});
    yield put({type: 'wallet/setIsRefreshing', payload: false});
  } catch (error) {
    // yield put({type: 'wallet/setActiveNetwork', payload: network});
    console.log(error);
    // Sentry.captureException('fetchTransactions: ' + JSON.stringify(error));
  }
}

/*
  Does not allow concurrent fetches of wallet. If "action" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run. This is useful for preventing multiple fetches of the same wallet. 
  You may also want to use takeEvery instead of takeLatest if you want to allow concurrent fetches.
*/
function* walletSaga() {
  yield takeLatest('wallet/addWallet', updateDB);
  yield takeLatest('wallet/createWallet', createWallet);
  yield takeLatest('wallet/setActiveNetwork', setActiveNetwork);
  yield takeLatest('wallet/setActiveWallet', setActiveWallet);
  yield takeLatest('wallet/setRefresh', setRefresh);
  yield takeLatest('details/preload', preload);
}

export default walletSaga;
