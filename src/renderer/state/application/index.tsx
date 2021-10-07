import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { Dispatch } from 'redux';
import Joi from 'joi';
import { Application, Secret } from '../types';

const initialState: Application = {
  mode: '',
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
    setMode: (state, value) => {
      return {
        ...state,
        mode: value,
      }
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
  if (manager.length === 46 && manager.startsWith('ronin:')) {
    dispatch(addManager(manager));
  } else {
    dispatch(removeAllPayments());
    throw new Error('Invalid Manager');
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

  const scholarsPercentSchema = Joi.object({
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
    ScholarPayout: Joi.number().greater(1),
    ScholarPercent: Joi.number().greater(1).required(),
    TrainerPayoutAddress: Joi.string()
      .pattern(new RegExp('^ronin:'))
      .min(46)
      .max(46),
    TrainerPercent: Joi.number().greater(1),
    TrainerPayout: Joi.number().greater(1),
  })
    .with('TrainerPayoutAddress', 'TrainerPercent')
    .with('TrainerPercent', 'TrainerPayoutAddress')
    .with('TrainerPayout', 'TrainerPayoutAddress');

  dispatch(removeAllPayments());
  paymentsOrigin.Scholars.forEach((payment) => {
    const validation = scholarsSchema.validate(payment, { allowUnknown: true });
    const validationPercent = scholarsPercentSchema.validate(payment, {
      allowUnknown: true,
    });

    if (!validation.error || !validationPercent.error) {
      dispatch(addPayment(payment));
    } else if (validation.error) {
      dispatch(removeAllPayments());
      throw new Error(`Invalid Format in Scholars. Error: ${validation.error}`);
    } else {
      dispatch(removeAllPayments());
      throw new Error(
        `Invalid Format in Scholars. Error: ${validationPercent.error}`
      );
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
