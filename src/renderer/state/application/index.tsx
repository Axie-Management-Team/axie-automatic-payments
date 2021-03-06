import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { Dispatch } from 'redux';
import { Application, Secret } from '../types';

const initialState: Application = {
  payments: [],
  secrets: [],
  manager: '',
  isFirstTime: true,
};

export const application = createSlice({
  name: 'Application',
  initialState,
  reducers: {
    addPayment: (state, action) => {
      return {
        ...state,
        payments: state.payments.concat(action.payload),
      };
    },
    addManager: (state, value) => {
      return {
        ...state,
        manager: value,
      };
    },
    addSecret: (state, action) => {
      const existingPaymentIndex = state.secrets.findIndex((s) => {
        return s.AccountAddress === action.payload.AccountAddress;
      });

      if (existingPaymentIndex !== -1) {
        return update(state, {
          secrets: {
            [existingPaymentIndex]: {
              PrivateKey: { $set: action.payload.PrivateKey },
            },
          },
        });
      }

      return {
        ...state,
        secrets: state.secrets.concat(action.payload),
      };
    },
    markAsExistingUser: (state) => {
      return {
        ...state,
        isFirstTime: false,
      };
    },
    removeAllPayments: (state) => {
      return {
        ...state,
        payments: [],
      };
    },
  },
});

export const {
  addPayment,
  addSecret,
  addManager,
  markAsExistingUser,
  removeAllPayments,
} = application.actions;

export const hideWelcome = () => async (dispatch: Dispatch) => {
  dispatch(markAsExistingUser());
};

export const addPayments = (paymentsOrigin) => async (dispatch: Dispatch) => {
  const manager = paymentsOrigin.Manager;
  dispatch(addManager(manager));

  dispatch(removeAllPayments());
  paymentsOrigin.Scholars.forEach((payment) => {
    dispatch(addPayment(payment));
  });
};

export const addSecretAction =
  (publicRonin: string, privateKey: string) => async (dispatch: Dispatch) => {
    const secret: Secret = {
      AccountAddress: publicRonin,
      PrivateKey: privateKey,
    };

    dispatch(addSecret(secret));
  };

export default application.reducer;
