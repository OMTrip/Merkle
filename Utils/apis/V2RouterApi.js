import axios from 'axios';
import {fetch} from 'whatwg-fetch';
const GRAPHQL_ENDPOINT_BSC =
  'https://open-platform.nodereal.io/2f3433d5cc37483e8d677384580fa0c9/pancakeswap-free/graphql';
const GRAPHQL_ENDPOINT_ETH =
  'https://api.thegraph.com/subgraphs/name/pancakeswap/exhange-eth';
const GRAPHQL_ENDPOINT_POLYGON =
  'https://api.studio.thegraph.com/query/45376/exchange-v2-polygon-zkevm/version/latest';

  const url ="http://192.168.1.70:3000"

// const signal = new AbortController().signal;

function selectNetwork(network) {
  switch (network) {
    case 'BSC':
      return GRAPHQL_ENDPOINT_BSC;
    case 'ETH':
      return GRAPHQL_ENDPOINT_ETH;
    case 'POLYGON':
      return GRAPHQL_ENDPOINT_POLYGON;
    default:
      return GRAPHQL_ENDPOINT_BSC;
  }
}

// export async function v2RouterTokenPrice(token0, token1, network) {
//   const api = selectNetwork(network);
//   console.log(api, 'dhjfs');
//   const graphqlQuery = `
//   query GetTokenPrice($token0: String!, $token1: String!) {
//     pairs(where: { token0: $token0, token1: $token1 }) {
//       token1 {
//         name
//         symbol
//         decimals
//       }
//       token0 {
//         name
//         decimals
//         symbol
//       }
//       token0Price
//       token1Price
//       totalSupply
//       volumeToken0
//       volumeToken1
//       volumeUSD
//     }
//   }
// `;

//   try {
//     const response = await fetch(api, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query: graphqlQuery,
//         variables: {
//           token0: token0,
//           token1: token1,
//         },
//       }),
//     });

//     const result = await response.json();

//     console.log('GraphQL Result:', result.data);

//     return result;
//   } catch (error) {
//     console.error('GraphQL Error:', error);
//     throw error;
//   }
// }

export async function getPriceSushi(token0, token1, amount, network,gasPrice,slippage, wallet) {

  try {
    console.log(`https://swap.sushi.com/v3.2?chainId=${network}&tokenIn=${token0}&tokenOut=${token1}&amount=${amount}&maxPriceImpact=0.005&gasPrice=1000000000&to=0xE1C3218fF0a1E328AfB0d03842A8e6AE49a3dE36&preferSushi=true`);
    const response = await fetch(
      `https://swap.sushi.com/v3.2?chainId=${network}&tokenIn=${token0}&tokenOut=${token1}&amount=${amount}&maxPriceImpact=${slippage}&gasPrice=1000000000&to=${wallet.address}&preferSushi=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();

    console.log('GraphQL Result:', result.data);

    return result;
  } catch (error) {
    console.error('Sushi Error:', error);
    return false
  }
}



// Example GraphQL query


export async function v2RouterTokenPrice(token0, token1,amount,inputType) {
  console.log(token0.symbol,token1.symbol,amount,token0.chainId,url+"/getBestRoute","url+/getBestRoute")
  
 

  try {
    const response = await fetch(url+"/getBestRoute", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       from:token0.symbol,
       to:token1.symbol,  
       amount:amount,
       chainId:token0.chainId,
       inputType:inputType
      }),
    });

    const result = await response.json();

    

    return result;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}