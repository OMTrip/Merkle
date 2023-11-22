import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   fromToken:{
    "name": "SEEDx Token",
    "symbol": "SEEDx",
    "token_address": "0x0cBfDea4F45A486Cc7dB53CB6e37b312A137C605",
    "chainId": 56,
    "decimals": 18,
    "logo": "https://tokens.seedx.app/images/0x0cBfDea4F45A486Cc7dB53CB6e37b312A137C605.png",
    "isQuote":true,
    "slug":"bsc"
  },
   toToken:{
    "name": "WBNB Token",
    "symbol": "BNB",
    "token_address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "chainId": 56,
    "decimals": 18,
    "logo": "https://tokens.seedx.app/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png",
    "isQuote":true,
    "slug":"bsc"
    
  }
};




const v2RouterSlice = createSlice({
  name: 'V2Router',
  initialState,
  reducers: {
    setXChain: (state, action) => {
        state.xchains = [action.payload]; 
      },
      initilizeToken: (state, action) => {
        const {fromToken,toToken} = action.payload
        state.fromToken = {...fromToken};
        state.toToken = {...toToken};
      },
      setFromToken: (state, action) => {
        state.fromToken =  action.payload
        
      },
      setToToken: (state, action) => {
        state.toToken =  action.payload
        
      },
     
  },
});

export default v2RouterSlice;

export const {
    initilizeToken,
    setFromToken,
    setToToken,
   
 
} = v2RouterSlice.actions;
