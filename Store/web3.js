import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  lockwallet: false,
  initialized: false,
  onboarding: false,
  walletCreated: false,
  uniqueId: '',
  mnemonic: '',
  password: '',
  biometrics: false,
  activeWallet: 0,
  priceQuotes: [],
  activeNetwork: '0x61',
  wallets: [
    {
      index: 0,
      address: '0x0000000000000000000000000000000000000000',
      privateKey: '',
      name: 'Account 1',
      networks: ['0x38', '0x1'],
      assets: [
        {
          chainId: '0x775',
          balance: '0',
          tokens: [ {
            "balance": 0,
            "chainId": "0x775",
            "slug": "merkle",
            "decimals": 18,
            "logo": "https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/merkle/0xbB96b900EF03507b530D158cc5A0B0C8c3a8D178/logo.png",
            "explorerLogo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            "name": "Big Tycoon",
            "possible_spam": false,
            "show":true,
            "type": "token",
            "symbol": "BTYC",
            "thumbnail": null,
            "token_address": "0xbB96b900EF03507b530D158cc5A0B0C8c3a8D178"
          }, {
            "balance": 0,
            "chainId": "0x775",
            "slug": "merkle",
            "decimals": 18,
            "logo": "https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/merkle/0x1B1D576Bb6a1E364Ea4674e7A77fECB4BDf2bF08/logo.png",
            "explorerLogo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            "name": "BUZZBT",
            "possible_spam": false,
            "show":true,
            "type": "token",
            "symbol": "BUBT",
            "thumbnail": null,
            "token_address": "0x1B1D576Bb6a1E364Ea4674e7A77fECB4BDf2bF08"
          }
        ],
          nfts: [],
          slug: 'merkle',
          rpcUrl: 'https://marklechain-rpc.merklescan.com/',
          blockExplorerUrl: 'https://merklescan.com/',
          nativeCurrency: {
            name: 'Merkle',
            symbol: 'MRK',
            decimals: 18,
            balance: '0',
            address: '0x0000000000000000000000000000000000000000',
            slug: 'merkle',
          },
          show: true,
        },
        {  
          chainId: '0x38',
          balance: '0',
          tokens: [{
            "balance": 0,
            "chainId": "0x38",
            "slug": "bsc",
            "decimals": 18,
            "logo": "https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x42dABca1aF369FBd9e8Ea286dAFBA45b23fC92D9/logo.png",
            "explorerLogo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            "name": "Big Tycoon",
            "possible_spam": false,
            "show":true,
            "type": "token",
            "symbol": "BTYC",
            "thumbnail": null,
            "token_address": "0x42dABca1aF369FBd9e8Ea286dAFBA45b23fC92D9"
          }, {
            "balance": 0,
            "chainId": "0x38",
            "slug": "bsc",
            "decimals": 18,
            "logo": "https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x2B9ec6d94199F80e63fBAa0a4A502E411B211058/logo.png",
            "explorerLogo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            "name": "BUZZBT",
            "possible_spam": false,
            "show":true,
            "type": "token",
            "symbol": "BUBT",
            "thumbnail": null,
            "token_address": "0x2B9ec6d94199F80e63fBAa0a4A502E411B211058"
          },
          {
            "balance": 0,
            "chainId": "0x38",
            "slug": "bsc",
            "decimals": 18,
            "logo": "https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/images/bsc/0x0A23558A20A128F463b1E7034C89620c862c36F5/logo.png",
            "explorerLogo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            "name": "Big Shot",
            "possible_spam": false,
            "show":true,
            "type": "token",
            "symbol": "BSBT",
            "thumbnail": null,
            "token_address": "0x0A23558A20A128F463b1E7034C89620c862c36F5"
          }
        ],
          nfts: [],
          slug: 'bsc',
          rpcUrl: 'https://bsc-dataseed.binance.org/',
          blockExplorerUrl: 'https://bscscan.com',  
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18,
            address: '0x0000000000000000000000000000000000000000',
            slug: 'bsc',
          },
          show: true,
        },
        {
          chainId: '0x1',
          balance: '0',
          tokens: [],
          nfts: [],
          rpcUrl: 'https://rpc.builder0x69.io',
          blockExplorerUrl: 'https://etherscan.io',
          slug: 'ethereum',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
            address: '0x0000000000000000000000000000000000000000',
            slug: 'ethereum',
          },
          show: true,
        },
        {
          chainId: '0x89',
          balance: '0',
          tokens: [],
          nfts: [],
          rpcUrl: 'https://polygon.llamarpc.com',
          blockExplorerUrl: 'https://polygonscan.com',
          slug: 'polygon',
          nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
            address: '0x0000000000000000000000000000000000000000',
            slug: 'polygon',
          },
          show: true,
        },
        {
          chainId: '0x61',
          balance: '0',
          tokens: [],
          nfts: [],
          slug: 'bsc_testnet',
          rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          blockExplorerUrl: 'https://testnet.bscscan.com',
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18,
            balance: '0',
            address: '0x0000000000000000000000000000000000000000',
            slug: 'bsc_testnet',
          },
          show: true,
        },
       
      ],
      // TODO: Save transaction in realm database and filter by wallet adress, token,
      //network, status (pending, confirmed, failed) and amount and type
      //(sent, received) and add pagination and sorting and filtering by date and in-out
      transactions: {
        ethereum: [],
        bsc: [],
        bsc_testnet: [],
        polygon: [],
        fantom:[],
        merkle:[],
      },
    },
  ],
  networks: [
    {
      "name": "Merkle Chain",
      "chainId": "0x775",
      "mainnet": true,
      "balance": "0",
      "rpcUrl":"https://marklechain-rpc.merklescan.com/",
      "blockExplorerUrl": "https://merklescan.com/",
      "networkVersion": "1909",
      "slug": "merkle",
      "show": false,
      "nativeCurrency": {
        "name": "Merkle",
        "symbol": "MRK",
        "decimals": 18,
        "balance": "0",
        "address": "0x0000000000000000000000000000000000000000",
        "slug": "merkle"
      },
     
      "tokens": [],
      "nfts": []
    },
    {
      name: 'BNB Smart Chain',
      mainnet: true,
      slug: 'bsc',
      show: true,
      chainId: '0x38',
      networkVersion: '56',
      rpcUrl: 'https://bsc-dataseed.binance.org/',
      blockExplorerUrl: 'https://bscscan.com',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
        balance: '0',
        address: '0x0000000000000000000000000000000000000000',
        slug: 'bsc',
      },
      tokens: [],
      nfts: [],
    },
    {
      name: 'Ethereum Mainnet',
      mainnet: true,
      show: true,
      slug: 'ethereum',
      chainId: '0x1',
      networkVersion: '1',
      rpcUrl: 'https://rpc.builder0x69.io',
      blockExplorerUrl: 'https://etherscan.io',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        balance: '0',
        address: '0x0000000000000000000000000000000000000000',
        slug: 'ethereum',
      },
      tokens: [],
      nfts: [],
    },
    {
      name: 'Polygon',
      mainnet: true,
      show: true,
      slug: 'polygon',
      networkVersion: '137',
      chainId: '0x89',
      rpcUrl: 'https://polygon.llamarpc.com',
      blockExplorerUrl: 'https://polygonscan.com',
      nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
        balance: '0',
        address: '0x0000000000000000000000000000000000000000',
        slug: 'polygon',
      },
      tokens: [],
      nfts: [],
    },
    {
      name: 'BNB Smart Chain Testnet',
      mainnet: false,
      show: true,
      slug: 'bsc_testnet',
      networkVersion: '97',
      chainId: '0x61',
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      blockExplorerUrl: 'https://testnet.bscscan.com',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
        balance: '0',
        address: '0x0000000000000000000000000000000000000000',
        slug: 'bsc_testnet',
      },
      tokens: [],
      nfts: [],
    },
  
   
  ],
  tabs: [
    {
      id: '1',
      title: 'Home',
      url: 'https://dappradar.com',
    },
    {
      id: '2',
      title: 'OpenSea',
      url: 'https://opensea.io/',
    },
    {
      id: '3',
      title: 'Rarible',
      url: 'https://rarible.com/',
    },
    {
      id: '4',
      title: 'Portfolio',
      url: 'https://portfolio.metamask.io/',
    },
    {
      id: '5',
      title: 'Test Dapp',
      url: 'https://hsyndeniz.github.io/test-dapp-vconsole/',
    },
    {
      id: '6',
      title: 'Test Dapp 2',
      url: 'https://web3-react-mu.vercel.app/',
    },
    {
      id: '7',
      title: 'Discover Dapps',
      url: 'https://dap.ps/',
    },
    {
      id: '8',
      title: 'Magic Eden',
      url: 'https://magiceden.io',
    },
    {
      id: '9',
      title: 'Solana Test Dapp',
      url: 'https://r3byv.csb.app',
    },
  ],
  bookmarks: [
    {
      id: '2',
      title: 'Bscscan',
      url: 'https://bscscan.com/',
    },
    {
      id: '1',
      title: 'Etherscan',
      url: 'https://etherscan.io/',
    },
    {
      id: '3',
      title: 'Polygonscan',
      url: 'https://polygonscan.com/',
    },
    {
      id: '4',
      title: 'Snowtrace',
      url: 'https://snowtrace.io/',
    },
    {
      id: '5',
      title: 'Test Dapp',
      url: 'https://hsyndeniz.github.io/test-dapp-vconsole/',
    },
  ],
  allToken: [],
  refresh: false,
  isrefreshing: false,
  selectChain: {
    blockExplorerUrl: 'https://bscscan.com',
    chainId: '0x38',
    enabled: true,
    image:
      'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850',
    mainnet: true,
    name: 'BNB Smart Chain',
    nativeCurrency: {
      address: '0x0000000000000000000000000000000000000000',
      balance: '0',
      decimals: 18,
      name: 'Binance Coin',
      slug: 'bsc',
      symbol: 'BNB',
    },
    networkVersion: '56',
    nfts: [],
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    show: true,
    slug: 'bsc',
    tokens: [],
  },
  chainInfo:{
    bsc:{
      rpcUrl: 'https://bsc-dataseed.binance.org/',
      blockExplorerUrl: 'https://bscscan.com',
    },
    ethereum:{
      "rpcUrl": "https://rpc.builder0x69.io",
      "blockExplorerUrl": "https://etherscan.io/",
    },
    matic:{
      "rpcUrl": "https://polygon.llamarpc.com",
      "blockExplorerUrl": "https://polygonscan.com/",
    },
    bsc_testnet:{
      "rpcUrl": "https://data-seed-prebsc-1-s1.binance.org:8545/",
      "blockExplorerUrl": "https://testnet.bscscan.com/",
    },
    fantom:{
      "rpcUrl":"https://fantom.publicnode.com",
      "blockExplorerUrl": "https://ftmscan.com/",
    },arbitrum:{
      "rpcUrl":"https://arb1.arbitrum.io/rpc",
      "blockExplorerUrl": "https://arbiscan.io/",
    },
    optimism:{
      "rpcUrl":"https://mainnet.optimism.io",
      "blockExplorerUrl": "https://optimistic.etherscan.io/",
    },
    avalanche:{
      "rpcUrl":"https://api.avax.network/ext/bc/C/rpc",
      "blockExplorerUrl": "https://snowtrace.io/",
    }
  },
  manuallyVerified:false,
  cloudVerified:false,
  swapFromToken: {
    symbol: 'INRx',
    name: 'INRx Token',
    token_address: '0xDD9a71c92bBf35A2546321A82C88C02a00E27B44',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/25903.png',
    decimals: 2,
    isQuote: true,
  },
  swapToToken: {
    chainId:'0x60',
    symbol: 'BUSD',
    name: 'Binance USD',
    token_address: '0xEa773012280e90BeD2789C3045E765E1Cf788678',
    logo: 'https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=024',
    decimals:18,
    isQuote:true,
  },
  timestamp: Date.now(),
};

const walletSlice = createSlice({
  name: 'wallet',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUniqueId: (state, action) => {
      state.uniqueId = action.payload;
    },
    createWallet: (state, action) => {
      state.wallets = [action.payload];
    },
    addWallet: (state, action) => {
      console.log(state.wallets,"state.wallets")
      state.wallets = [...action.payload];
    },
    updateWallets: (state, action) => {
      state.wallets = [...action.payload];
    },
    setActiveWallet: (state, action) => {
      state.activeWallet = action.payload;
    },
    updateTokens: (state, action) => {
      state.wallets.push(action.payload);
    },
    updateTransactions: (state, action) => {
      state.wallets.push(action.payload);
    },
    setMnemonic: (state, action) => {
      state.mnemonic = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setBiometrics: (state, action) => {
      state.biometrics = action.payload;
    },
    setActiveNetwork: (state, action) => {
      state.activeNetwork = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setIsRefreshing: (state, action) => {
      state.isrefreshing = action.payload;
    },
    setTimestamp: (state, action) => {
      state.timestamp = action.payload;
    },
    setInitialised: (state, action) => {
      state.initialized = action.payload;
      state.walletCreated = true;
    },
    setWalletCreated: (state, action) => {
      state.walletCreated = false;
    },
    setOnboarding: (state, action) => {
      state.onboarding = action.payload;
    },
    lockWallet: (state, action) => {
      state.lockwallet = action.payload;
    },
    setTabs: (state, action) => {
      state.tabs = action.payload;
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
    updateNetworks: (state, action) => {
      state.networks = action.payload;
    },
    setTokens: (state, action) => {
      state.networks = action.payload;
    },
    setNFTs: (state, action) => {
      state.wallets[action.payload.index].nfts.push(...action.payload.nfts);
    },
    setPriceQuotes: (state, action) => {
      state.priceQuotes = action.payload;
    },
    setEthTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.ethereum =
        action.payload.transactions;
    },
    setBscTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.bsc =
        action.payload.transactions;
    },
    setBscTestnetTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.bsc_testnet =
        action.payload.transactions;
    },
    setTaralTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.taral =
        action.payload.transactions;
    },
    setArbitrumTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.arbitrum =
        action.payload.transactions;
    },
    setPolygonTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.polygon =
        action.payload.transactions;
    },
    setAvalancheTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.avalanche =
        action.payload.transactions;
    },
    setOptimismTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.optimism =
        action.payload.transactions;
    },
    setFantomTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.fantom =
        action.payload.transactions;
    },
    setCronosTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.cronos =
        action.payload.transactions;
    },
    setMerkleTransactions: (state, action) => {
      state.wallets[action.payload.index].transactions.merkle =
        action.payload.transactions;
    },
    setAllToken: (state, action) => {
      // const ws = {...state.wallets};
      state.allToken = action.payload;
    },
    updateToken: (state, action) => {
      const data = state.allToken.map(ele => {
        if (
          ele.chainId == action.payload.chainId &&
          ele.symbol == action.payload.symbol
        ) {
          return action.payload;
        }
        return ele;
      });
      state.allToken = data;
    },
    setSelectChain: (state, action) => {
      console.log(action.payload, 'action.payload');
      state.selectChain = action.payload;
    },
    updateChainInfo: (state, action) => {
      state.chainInfo = action.payload;
    },
 
    setManuallyVerified:(state, action) => {
      state.manuallyVerified = action.payload;
    },
    setCloudVerified:(state, action) => {
      state.cloudVerified = action.payload;
    },
    setSwapFromTokenSelection :(state, action) => {
      state.swapFromToken = action.payload;
    },
    setSwapToTokenSelection :(state, action) => {
      state.swapToToken = action.payload;
    },
    initializeSwapTokens:(state,action) => {
      const {swapTo,swapFrom}= action.payload;
       state.swapToToken = swapTo;
       state.swapFromToken = swapFrom
    },

    resetState: state => {
      state = initialState;
    },
  },
});

export default walletSlice;

export const {
  setInitialised,
  setOnboarding,
  setUniqueId,
  setMnemonic,
  setPassword,
  setBiometrics,
  createWallet,
  addWallet,
  updateWallets,
  setActiveWallet,
  setActiveNetwork,
  setTimestamp,
  updateTokens,
  updateTransactions,
  resetState,
  setTabs,
  setBookmarks,
  updateNetworks,
  setPriceQuotes,
  setEthTransactions,
  setBscTransactions,
  setBscTestnetTransactions,
  setArbitrumTransactions,
  setPolygonTransactions,
  setAvalancheTransactions,
  setOptimismTransactions,
  setFantomTransactions,
  setCronosTransactions,
  setMerkleTransactions,
  setTokens,
  setNFTs,
  lockWallet,
  setTaralTransactions,
  setRefresh,
  setIsRefreshing,
  setWalletCreated,
  setAllToken,
  updateToken,
  setSelectChain, 
  updateChainInfo,
  setManuallyVerified,
  setCloudVerified,
  setSwapFromTokenSelection,
  setSwapToTokenSelection,
  initializeSwapTokens
} = walletSlice.actions;
