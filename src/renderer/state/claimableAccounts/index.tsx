import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ClaimableAccountsState } from '../types';
import { getPaymentsWithSecrets } from '../application/hooks';
import {
  axieClaim,
  axieLogin,
  createRandomMessage,
} from '../../services/roninHelper';

const initialState: ClaimableAccountsState = {
  claimableAccounts: [],
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
      blockchainRelated: response.data.blockchain_related.signature,
    };
  }
);

export const claimThunk = createAsyncThunk<any, any>(
  'claimThunk',
  async (pairPublicSecret) => {
    const {
      signedMessage,
      getNonce,
      buildTransaction,
      signClaim,
      sendTransaction,
      getTransactionHash,
    } = window;

    const { publicAddress, privateAddress } = pairPublicSecret;

    const randomMessage = await createRandomMessage();
    const signedMsg = await window.signedMessage(randomMessage, privateAddress);
    const jwt = await axieLogin(signedMsg, publicAddress);

    const { amount, timestamp, signature } = await axieClaim(
      jwt,
      publicAddress
    );

    const nonce = await getNonce(publicAddress);
    const transactionBuilded = buildTransaction({
      publicAddress,
      amount,
      timestamp,
      signature,
      nonce,
    });
    const signedClaim = signClaim(transactionBuilded, privateAddress);
    sendTransaction(signedClaim);
    const hash = getTransactionHash(signedClaim);
    console.log('Transaction hash', hash);
    return { address: publicAddress, hash };
  }
);

export const claimableAccountsState = createSlice({
  name: 'claimableAccounts',
  initialState,
  reducers: {
    init: () => {
      return initialState;
    },
    pendingAccount: (state, action) => {
      return {
        ...state,
        claimableAccounts: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchPayableAccountsThunk.fulfilled, (state, action) => {
      const index = state.claimableAccounts.findIndex(
        (account) =>
          account.payment?.AccountAddress ===
          action.payload.payment.AccountAddress
      );
      state.claimableAccounts[index].unclaimed = action.payload.unclaimed;
    });
    builder.addCase(claimThunk.fulfilled, (state, action) => {
      const index = state.claimableAccounts.findIndex(
        (account) =>
          account.payment?.AccountAddress.replace('ronin:', '0x') ===
          action.payload.address
      );
      state.claimableAccounts[index].claimHash = action.payload.hash;
    });
    builder.addCase(claimThunk.rejected, (state, action) => {
      console.log(action);
      const index = state.claimableAccounts.findIndex(
        (account) =>
          account.payment?.AccountAddress.replace('ronin:', '0x') ===
          action.meta.arg
      );
      state.claimableAccounts[index].lastError = action.error.message;
    });
  },
});

export const { init, pendingAccount } = claimableAccountsState.actions;

export const fetchClaimableAccounts = () => async (dispatch, getState) => {
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
export const claim = () => async (dispatch, getState) => {
  getState().claimableAccounts.claimableAccounts.forEach((account) => {
    const publicAddress = account.secret?.AccountAddress.replace(
      'ronin:',
      '0x'
    );
    const privateAddress = account.secret?.PrivateKey;
    window.initialBalance(publicAddress);

    dispatch(claimThunk({ publicAddress, privateAddress }));
  });
};
export const claimableAccounts = () => async (dispatch, getState) => {
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
export default claimableAccountsState.reducer;
