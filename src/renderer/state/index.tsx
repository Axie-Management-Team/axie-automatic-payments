import { configureStore } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import { useDispatch } from 'react-redux';
import applicationReducer from './application/index';
import claimableAccountsReducer from './claimableAccounts/index';
import updateVersion from './global/actions';

const PERSISTED_KEYS: string[] = ['application', 'claimableAccounts'];

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    application: applicationReducer,
    claimableAccounts: claimableAccountsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion());

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
