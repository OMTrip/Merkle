import {createSlice} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
    xchains:[],
    xpair:[],
    xtoken:[],
    xchainFrom:{},
    xchainTo:{},
    xchainCoin:{}
};




const xchainSlice = createSlice({
  name: 'xchain',
  initialState,
  reducers: {
    setXChain: (state, action) => {
        state.xchains = [action.payload]; 
      },
      setXPair: (state, action) => {
        state.xpair = action.payload;
      },
      setXToken: (state, action) => {
        state.xtoken = action.payload;
      },
      setXChainFrom: (state, action) => {
        state.xchainFrom = action.payload;
      },
      setXChainTo: (state, action) => {
        state.xchainTo = action.payload;
      },
      setXChainCoin: (state, action) => {
        state.xchainCoin = action.payload;
      },
  },
});

export default xchainSlice;

export const {
    setXChain,
    setXPair,
    setXToken,
    setXChainFrom,
    setXChainTo,
    setXChainCoin
 
} = xchainSlice.actions;
