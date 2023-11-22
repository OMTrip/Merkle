export const getTokenIcon = symbol => {
  switch (symbol) {
    case 'Taral':
      return {
        url: require('../screens/assets/coins/questions.jpeg'),
        style: {},
      };
    case '0x1':
      return {
        url: require('../screens/assets/coins/ethereum.png'),
        style: {},
      };
    case 'ETH':
      return {
        url: require('../screens/assets/coins/ethereum.png'),
        style: {},
      };
    case 'BNB':
      return {
        url: require('../screens/assets/coins/binance.png'),
        style: {},
      };
    case '0x61':
      return {
        url: require('../screens/assets/coins/binance.png'),
        style: {},
      };
    case '0x38':
      return {
        url: require('../screens/assets/coins/binance.png'),
        style: {},
      };
    case 'USDT':
      return {
        url: require('../screens/assets/coins/tether.png'),
        style: {},
      };
    case 'AVAX':
      return {
        url: require('../screens/assets/coins/avalanche.png'),
        style: {},
      };
    case 'MATIC':
      return {
        url: require('../screens/assets/coins/polygon.png'),
        style: {},
      };
    case '0x89':
      return {
        url: require('../screens/assets/coins/polygon.png'),
        style: {},
      };
    case '0X':
      return {
        url: require('../screens/assets/coins/0x.png'),
        style: {},
      };
    case 'TRX':
      return {
        url: require('../screens/assets/coins/tron.png'),
        style: {},
      };
    case 'DOGE':
      return {
        url: require('../screens/assets/coins/doge.png'),
        style: {},
      };
    case 'BTC':
      return {
        url: require('../screens/assets/coins/bitcoin.png'),
        style: {},
      };
    case 'LINK':
      return {
        url: require('../screens/assets/coins/chainlink.png'),
        style: {},
      };
    case 'WBTC':
      return {
        url: require('../screens/assets/coins/bitcoin.png'),
        style: {},
      };
    case 'WETH':
      return {
        url: require('../screens/assets/coins/ethereum.png'),
        style: {},
      };
    case 'FTM':
      return {
        url: require('../screens/assets/coins/fantom-3d.png'),
        style: {},
      };
    case 'OP':
      return {
        url: require('../screens/assets/coins/optimism.png'),
        style: {
          width: 48,
          height: 48,
          borderRadius: 24,
          marginHorizontal: 8,
          marginVertical: 8,
        },
      };
    case 'CRO':
      return {
        url: require('../screens/assets/coins/cronos-badge.png'),
        style: {},
      };
    default:
      return {
        url: null,
        style: {},
      };
  }
};
