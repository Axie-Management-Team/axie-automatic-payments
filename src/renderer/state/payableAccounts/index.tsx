import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PayableAccountsState } from '../types';
import { getPaymentsWithSecrets } from '../application/hooks';

const initialState: PayableAccountsState = {
  payableAccounts: [],
  isLoading: true,
};
export const fetchPayableAccountsThunk = createAsyncThunk<any, any>(
  'fetchPayableAccountsThunk',
  async (address) => {
    const response = await axios.get(
      `https://game-api.skymavis.com/game-api/clients/${address.payment?.AccountAddress.replace(
        'ronin:',
        '0x'
      )}/items/1`
    );
    return {
      ...address,
      unclaimed: response.data.claimable_total,
    };
  }
);

export const payableAccountsState = createSlice({
  name: 'payableAccounts',
  initialState,
  reducers: {
    init: () => {
      return initialState;
    },
    pendingAccount: (state, action) => {
      return {
        ...state,
        payableAccounts: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchPayableAccountsThunk.fulfilled, (state, action) => {
      const index = state.payableAccounts.findIndex(
        (account) =>
          account.payment?.AccountAddress ===
          action.payload.payment.AccountAddress
      );
      state.payableAccounts[index].unclaimed = action.payload.unclaimed;
    });
  },
});

export const { init, pendingAccount } = payableAccountsState.actions;

export const fetchPayableAccounts = () => async (dispatch, getState) => {
  const addresses = getPaymentsWithSecrets(getState().application);
  dispatch(
    pendingAccount(
      addresses.map((address) => ({
        ...address,
        unclaimed: 'loading...',
      }))
    )
  );
  addresses.forEach((address) => {
    dispatch(fetchPayableAccountsThunk(address));
  });
};
export const payableAccounts = () => async (dispatch, getState) => {
  const addresses = getPaymentsWithSecrets(getState().application);
  dispatch(
    pendingAccount(
      addresses.map((address) => ({
        ...address,
        unclaimed: '',
      }))
    )
  );
};
export default payableAccountsState.reducer;
