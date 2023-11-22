import { ERC20ABI } from '../ABI';
import {setDefaultAccount, setProvider} from './web3';

export async function swapV2Router(
  fromWeth,
  token0,
  token1,
  args,
  chainId,
  rpc,
  wallet,
  Toast,
) {
  const v2Router = {
    56: '0x6946318b6a3bCD5B4a03b7FE674a059F2962856e',
    1: '0x827179dD56d07A7eeA32e3873493835da2866976',
  };
  const v2RouterAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'tokenIn',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'tokenOut',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountIn',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountOutMin',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountOut',
          type: 'uint256',
        },
      ],
      name: 'Route',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'claimFee',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'claimFee',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'tokenIn',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amountIn',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'tokenOut',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amountOutMin',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'route',
          type: 'bytes',
        },
      ],
      name: 'processRoute',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_fee',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_fee_divider',
          type: 'uint256',
        },
      ],
      name: 'setFee',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '__owner',
          type: 'address',
        },
        {
          internalType: 'contract IProcessRouter',
          name: '_router',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'fee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'FEE_DIVIDER',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'router',
      outputs: [
        {
          internalType: 'contract IProcessRouter',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
console.log(rpc,"rpc:::::::::::")
  setProvider(rpc);
  const web3 = setDefaultAccount(wallet.privateKey);
  const {tokenIn, amountIn, tokenOut, amountOutMin, routeCode} = args.args;
  console.log(
    tokenIn,
    fromWeth,
    tokenOut,
    amountOutMin.replace('#bigint.', ''),
    wallet.address,
    routeCode,
    'const {tokenIn,amountIn,tokenOut,amountOutMin,route}= args.args;',
  );
  const contract = new web3.eth.Contract(v2RouterAbi, v2Router[chainId]);
  const tokenContract = new web3.eth.Contract(ERC20ABI, token0.token_address);
  try {
    const gasPrice = await web3.eth.getGasPrice();

    if (
      token0.symbol?.toUpperCase() == 'BNB' ||
      token0.symbol?.toUpperCase() == 'ETH' ||
      token0.symbol?.toUpperCase() == 'MATIC'
    ) {
      const gas = await contract.methods
        .processRoute(
          tokenIn,
          fromWeth,
          tokenOut,
          amountOutMin.replace('#bigint.', ''),
          wallet.address,
          routeCode,
        )
        .estimateGas({
          from: wallet.address,
          gasPrice: gasPrice,
          value: fromWeth,
        });
      const res = await contract.methods
        .processRoute(
          tokenIn,
          fromWeth,
          tokenOut,
          amountOutMin.replace('#bigint.', ''),
          wallet.address,
          routeCode,
        )
        .send({
          from: wallet.address,
          value: fromWeth,
          gasPrice: gasPrice,
          gas: gas,
        });
      return res;
    } else {
      const allowance_check = await tokenContract.methods
        .allowance(wallet.address, v2Router[chainId])
        .call();
      console.log(allowance_check, 'allowanceCheck');
      if (Number(allowance_check) >= Number(fromWeth)) {
        const gas = await contract.methods
          .processRoute(
            tokenIn,
            fromWeth,
            tokenOut,
            amountOutMin.replace('#bigint.', ''),
            wallet.address,
            routeCode,
          )
          .estimateGas({
            from: wallet.address,
            gasPrice: gasPrice,
          });
        const res = await contract.methods
          .processRoute(
            tokenIn,
            fromWeth,
            tokenOut,
            amountOutMin.replace('#bigint.', ''),
            wallet.address,
            routeCode,
          )
          .send({
            from: wallet.address,
            gasPrice: gasPrice,
            gas: gas,
          });
        return res;
      } else {
        const approveA = await approveAllowance(
          gasPrice,
          tokenContract,
          v2Router[chainId],
          fromWeth,
          wallet,
          Toast,
        );
        if (approveA) {
          await swapV2Router(token0, token1, args, chainId, rpc, wallet, Toast);
        } else {
          Toast.show('error', 'Contract Approval Failed.');
        }
      }
    }
  } catch (error) {
    console.log('error::', error);
    Toast.show('error', 'Contract Approval Failed.');
  }
}
export async function v2Slippage(rpc, chainId) {
  setProvider(rpc);
  const web3 = setDefaultAccount(wallet.privateKey);
  const contract = new web3.eth.Contract(v2RouterAbi, v2Router[chainId]);
  const slippage = await contract.methods.slippage().call();
  return slippage;
}
