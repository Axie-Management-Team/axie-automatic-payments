import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { Application, Secret, State } from '../types';

const initialState: Application = {
  payments: [],
  secrets: [],
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

export const { addPayment, addSecret, markAsExistingUser, removeAllPayments } =
  application.actions;

export const hideWelcome = () => async (dispatch) => {
  dispatch(markAsExistingUser());
};

export const addPayments = (payments) => async (dispatch, state: State) => {
  // Check it's valid
  dispatch(removeAllPayments());
  payments.forEach((payment) => {
    dispatch(addPayment(payment));
  });
};

export const addSecretAction =
  (publicRonin: string, privateKey: string) =>
  async (dispatch, state: State) => {
    const secret: Secret = {
      AccountAddress: publicRonin,
      PrivateKey: privateKey,
    };

    dispatch(addSecret(secret));
  };

export default application.reducer;
