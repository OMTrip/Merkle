import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  user: {
    address: {},
    adhaarNumber: '',
    care_of: '',
    client_id: '',
    dob: '',
    email: '',
    fullName: '',
    gender: '',
    isEmailVerify: false,
    isNewUser: false,
    // login: false,
    phoneNumber: '',
    profile_image: '',
    panNumber: '',
    panHolderName: '',
    adharKyc: 0,
    adharDocKyc:0,
    panKyc: 0,
    resetUser:'',
  },
  login:false,
  kyc: 0,
  profileupdated: false,
  searchHistory: [],
  searchhistoryupdate: false,
  merklePrice:0,
  BtycPrice:0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {...state.user,...action.payload};
    },
    resetUser: (state) => {
      state.user = { ...initialState.user };
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setKYCStatus: (state, action) => {
      state.kyc = action.payload;
      state.profileupdated = action.payload;
    },
    setMerklePrice: (state, action) => {
      state.merklePrice = action.payload;
    },
    setBtycPricePrice: (state, action) => {
      state.BtycPrice = action.payload;
    },
    setAdharKyc: (state, action) => {
      const kycobj = {...state.user}
      kycobj.adharKyc = action.payload;
      state.user =  kycobj;
    },
    setPanKyc: (state, action) => {
      const kycobj = {...state.user}
      kycobj.panKyc = action.payload;
      state.user =  kycobj;
    },
    setAdharDocKyc: (state, action) => {
      const kycobj = {...state.user}
      kycobj.adharDocKyc = action.payload;
      state.user =  kycobj;
    },
    setPhoneNumber: (state, action) => {
      const kycobj = {...state.user}
      kycobj.phoneNumber = action.payload;
      state.user =  kycobj;
    },
    setPanUserNumber: (state, action) => {
      const kycobj = {...state.user}
      kycobj.panUserNumber = action.payload;
      state.user =  kycobj;
    },
    setPanUserName: (state, action) => {
      const kycobj = {...state.user}
      kycobj.panUserName = action.payload;
      state.user =  kycobj;
    },
    setSearchHistory: (state, action) => {
      var arr = state?.searchHistory ? [...state?.searchHistory] : [];
      if (arr?.length > 10) {
        arr.shift();
      } else {
        arr.push(action.payload);
      }
      state.searchHistory = [...arr];
      state.searchhistoryupdate = !state.searchhistoryupdate;
    },
  },
});

export default userSlice;

export const {
  setUser,
  setLogin,
  setKYCStatus,
  setSearchHistory,
  setPhoneNumber,
  setPanUserName,
  setPanUserNumber,
  setAdharKyc,
  setPanKyc,
  resetUser,
  setAdharDocKyc,
  setMerklePrice,
  setBtycPricePrice
} = userSlice.actions;
