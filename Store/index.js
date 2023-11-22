import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import createSagaMiddleware from 'redux-saga';
import {MMKV} from 'react-native-mmkv';
import walletSaga from './Sagas/wallet';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import wallet from './web3';
import user from './userinfo';
import details from "./paymentDetails"
import authSlice from './authSlice';
import xchainSlice from './xchainSlice';
import v2RouterSlice from './V2RouterSlice';

const reducers = combineReducers({
  wallet: wallet.reducer,
  user: user.reducer,
  details:details.reducer,
  auth: authSlice.reducer,
  xchain: xchainSlice.reducer,
  v2Router: v2RouterSlice.reducer,
});

const storage = new MMKV();

export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth','wallet','user','details'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck:false,
      //  {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    //   immutableCheck: {
    //     // Ignore state paths, e.g. state for 'items':
    //     ignoredPaths: ['user.user']
    // },
    }).concat(sagaMiddleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

sagaMiddleware.run(walletSaga);

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};