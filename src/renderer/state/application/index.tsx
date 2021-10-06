import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { Dispatch } from 'redux';
import Joi from 'joi';
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
  // Check it's valid
  const manager = paymentsOrigin.Manager;
  if (manager.length === 46 && manager.startsWith("ronin:")) {
    dispatch(addManager(manager));
  } else {
    console.log("Invalid Manager")
    // TODO: Add nice error msg!
    dispatch(removeAllPayments());
    return;
  }

  const scholarsSchema = Joi.object({
    Name: Joi.string().alphanum(),
    AccountAddress: Joi.string()
      .pattern(new RegExp('^ronin:'))
      .min(46)
      .max(46)
      .required(),
    ScholarPayoutAddress: Joi.string()
      .pattern(new RegExp('^ronin:'))
      .min(46)
      .max(46)
      .required(),
    ScholarPayout: Joi.number().greater(1).required(),
    ManagerPayout: Joi.number().greater(1).required(),
    TrainerPayoutAddress: Joi.string()
      .pattern(new RegExp('^ronin:'))
      .min(46)
      .max(46),
    TrainerPayout: Joi.number().greater(1),
  })
    .with('TrainerPayoutAddress', 'TrainerPayout')
    .with('TrainerPayout', 'TrainerPayoutAddress');

  dispatch(removeAllPayments());
  paymentsOrigin.Scholars.forEach((payment) => {
    const validation = scholarsSchema.validate(payment);
    if (!validation.error) {
      dispatch(addPayment(payment));
    } else {
      console.log('Invalid Payment');
      console.log(validation.error);
      // TODO: Add nice error msg and stop this!
      dispatch(removeAllPayments());
    }
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
