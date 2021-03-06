import { configureStore } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import { useDispatch } from 'react-redux';
import applicationReducer from './application/index';
import claimableAccountsReducer from './claimableAccounts/index';
import payableAccountsReducer from './payments/index';
// eslint-disable-next-line import/no-named-as-default
import updateVersion from './global/actions';

const PERSISTED_KEYS: string[] = [
  'application',
  'claimableAccounts',
  'payableAccounts',
];

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    application: applicationReducer,
    claimableAccounts: claimableAccountsReducer,
    payableAccounts: payableAccountsReducer,
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
