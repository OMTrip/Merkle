import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  circleCode: [],
  operatorCode: [],
  preloaded: false,
  operatorObj: {},
  circleObj: {},
  circleName:{
    "delhi": 'DELHI (DL)',
    "maharashtra": 'Maharashtra (MH)',
    'andhra pradesh': 'Andhra Pradesh (AP)',
    'tamil nadu': 'TAMIL NADU (TN)',
    "karnataka": 'Karnataka (KA)',
    'gujarat': 'Gujarat (GJ)',
    'up east': 'UTTAR PRADESH East (UPE)',
    'madhya pradesh': 'Madhya Pradesh (MP)',
    'west bengal': 'West Bengal (WB)',
    'rajasthan': 'Rajasthan (RJ)',
    'kerala': 'Kerala (KL)',
    'punjab': 'Punjab (PB)',
    'haryana': 'Haryana (HR)',
    'bihar': 'Bihar (BR)',
    'odisha': 'ODISHA (OD)',
    'assam': 'Assam (AS)',
    'himachal pradesh': 'Himachal Pradesh (HP)',
    'jammu and kashmir': 'Jammu And Kashmir (JK)',
    'jharkhand': 'Jharkhand (JH)',
    'chattisgarh': 'CHHATTISGARH (CG)',
    'goa': 'GOA (GA)',
    'meghalaya': 'MEGHALAYA (ML)',
    'mizoram': 'MIZORAM (MZ)',
    'sikkim': 'SIKKIM (SK)',
    'tripura': 'TRIPURA (TR)',
    'up west and uttaranchal': 'UTTAR PRADESH West (UPW)',
    'kolkatta': 'KOLKATTA (CCU)',
  },
  contacts:[],
  icon:""

};




const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    preload: (state, action) => {
      state.preloaded = action.payload;
    },
    setCircleCode: (state, action) => {
      state.circleCode = action.payload;
    },
    setOperatorCode: (state, action) => {
      // star;
      state.operatorCode = action.payload;
    },
    setCircleName: (state, action) => {
      state.circleName = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setIcon: (state, action) => {
      state.icon = action.payload;
    },
    // getCircleCode: (state, action) => {
    //   console.log(action.payload.name, 'action.payload.name1');
    //   const stat = state.circleName[action.payload.name.toLowerCase()]

    //    state.circleObj = state?.circleCode?.find(operator => operator.circle_name == stat);

    // },
    // getOperatorCode: (state, action) => {
    //   console.log(action.payload.name, 'action.payload.name2');
    //   // state.circleObj = state.circleCode.find(operator => operator.circle_name == stat);
    //   // state.operatorObj = state.operatorCode.find(operator => operator.operator_name === action.payload.name);
    // },
  },
});

export default detailsSlice;

export const {
  setCircleCode,
  setOperatorCode,
  preload,
  // getCircleCode,
  // getOperatorCode,
  setCircleName,
  setContacts,
  setIcon,
} = detailsSlice.actions;
