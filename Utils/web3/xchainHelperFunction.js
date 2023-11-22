import {ERC20ABI} from '../ABI';
import {crossSwapERC20_abi, xchain_router_abi} from './config';
import { toPlainString } from './helperFunction';
import {getGasPrice, setDefaultAccount, setProvider} from './web3';
import { approveAllowance } from './web3Functions';
const bsc_test='https://data-seed-prebsc-1-s2.bnbchain.org:8545'

export function getTokenDetails(tokenAddress, wallet) {
  return new Promise(async (resolve, reject) => {
    const web3 = setDefaultAccount(wallet.privateKey);
    const tokenContract = new web3.eth.Contract(ERC20ABI, tokenAddress);
    try {
      const symbol = await tokenContract.methods.symbol().call();
      const decimals = await tokenContract.methods.decimals().call();
      const name = await tokenContract.methods.name().call();
      const balance = await tokenContract.methods
        .balanceOf(wallet.address)
        .call();

      const tokenDetails = {symbol, decimals, name, balance};
      resolve(tokenDetails);
    } catch (error) {
      reject(error);
    }
  });
}

export async function xchainSwapOut(data, Toast, wallet) {

  try {
    console.log("f1")
    const {token, amount, chainId,routerContract,underlying} = data;
    setProvider(bsc_test);
    const web3 =  setDefaultAccount(wallet.privateKey);
    const contract = new web3.eth.Contract(
      xchain_router_abi,
      routerContract,
    );

    const tokenContract = new web3.eth.Contract(
      ERC20ABI,
      underlying,
    );
    
    const allowance = await tokenContract.methods
    .allowance(wallet.address, routerContract)
    .call();
    const gasPrice = await getGasPrice();
    console.log(gasPrice,"gasPrice",allowance,amount)

    if(allowance>=amount){
    const gasLimit = await contract.methods
      .SwapOutUnderlying(token,wallet.address,amount, chainId)
      .estimateGas({
        from: wallet.address,
        gasPrice: gasPrice,
      });
      console.log(gasLimit,"gasLimit")
     const resp = await contract.methods
      .SwapOutUnderlying(token,wallet.address,amount, chainId).send({
        from: wallet.address,
        gasPrice: gasPrice,
        gas:gasLimit
      })
      return resp;
    }else{
      const approve = await approveAllowance(
        gasPrice,
        tokenContract,
        routerContract,
        amount,
        wallet,
        Toast,
      )
      if (approve) {
       const resp=await xchainSwapOut(data, Toast, wallet);
        Toast.show('success', 'Approval done.');
        return resp;
      } else {
        Toast.show('error', 'Approval failed.');
      }
    }
  } catch (e) {
    console.log(e, 'bridge err.');
    if (e.message.includes('reverted:')) {
      const errorMessage = e.message.split('reverted: ')[1];
      console.log('Reverted with error message:', errorMessage);
    } else {
      console.log('Error:', e);
    }
  }
}

export async function estimateGasBridge(data, wallet){
  try {
    

  const {token, amount, chainId,routerContract,underlying} = data;
    const web3 =  setDefaultAccount(wallet.privateKey);
    const contract = new web3.eth.Contract(
      xchain_router_abi,
      routerContract,
    ); 
    const gasPrice = await getGasPrice();
    const gasFeeWei = await contract.methods
      .SwapOutUnderlying(token,wallet.address,amount, chainId)
      .estimateGas({
        from: wallet.address,
        gasPrice: gasPrice,
      });
      const actualP = gasPrice*gasFeeWei
      return web3.utils.fromWei(toPlainString(actualP), 'ether');
    } catch (error) {
    console.log(error,"err")
    return 0;
    }

}

export function toAmount(srcAmount, config) {
  const fee = (Number(srcAmount) * Number(config.swapFeeRatePerMillion)) / 100;
  let value = Number(srcAmount) - fee;
  if (fee < Number(config.minimumSwapFee)) {
    value = Number(srcAmount) - Number(config.minimumSwapFee);
  } else if (fee > config.maximumSwapFee) {
    value = Number(srcAmount) - Number(config.maximumSwapFee);
  }
  if (!config?.swapfeeon) {
    value = Number(srcAmount);
  }
  return value;
}
