import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  isLoggedIn: false,
  user: {
    mobile: '',
    name: '',
  },
  user_logo: '',
  aadharKyc: 0,
  panKyc: 0,
  aadhardockyc: 0,
  kyc: 0,
  adminKycVerified:0,
  panNumber:'',
  adhaarNumber:'',
  email:'',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setUserKycStatus: (state, action) => {
      const kst =
        action.payload.aadharkyc == 1 &&
        action.payload.pankyc == 1 &&
        action.payload.aadhardockyc == 1
          ? 1
          : 0;
      state.aadharKyc = action.payload.aadharKyc;
      state.panKyc = action.payload.pankyc;
      state.aadhardockyc = action.payload.aadhardockyc;
      state.adminKycVerified=action.payload.adminKycVerified;
      state.kyc = kst;
    },
    setUserLogo: (state, action) => {
      state.user_logo = action.payload;
    },
    setPanNumber: (state, action) => {
      state.panNumber = action.payload;
    },
    setAdharNumber: (state, action) => {
      state.adhaarNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    resetAuthState: (state, action) => {
      state.isLoggedIn = false;
      state.user = {
        mobile: '',
        name: '',
      };
      state.user_logo = '';
      state.aadharKyc= 0;
      state.panKyc = 0;
      state.aadhardockyc = 0;
      state.kyc = 0;
      state.adminKycVerified=0;
      state.adhaarNumber=0;
      state.panNumber=0;
      state.panHolderName="";
      state.fullName="";
      state.email="";
    },
  },
});

export default authSlice;

export const {
  setIsLoggedIn,
  setUserData,
  setUserKycStatus,
  setUserLogo,
  resetAuthState,
  setPanNumber,
  setAdharNumber,
  setFullName,
  setPanHolderName,
  setEmail,
} = authSlice.actions;
