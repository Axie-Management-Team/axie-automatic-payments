import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ClaimableAccounts, PayableAccountsState } from '../types';

const initialState: PayableAccountsState = {
  payableAccounts: [],
};

export const loadFromPaymentsWithSecrets = createAsyncThunk<any, any>(
  'loadFromPaymentsWithSecrets',
  async (paymentsWithSecrets: any) => {
    console.log('llego', paymentsWithSecrets);
    return paymentsWithSecrets;
  }
);

export const payableAccountsState = createSlice({
  name: 'payableAccounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(loadFromPaymentsWithSecrets.fulfilled, (state, action) => {
      console.log('fullfiled');
      // Do the call of the claimedSLP and calculate splits.
      // return {
      //   ...state,
      //   payableAccounts: state.payableAccounts.concat(action.payload),
      // };
    });
  },
});

export default payableAccountsState.reducer;
