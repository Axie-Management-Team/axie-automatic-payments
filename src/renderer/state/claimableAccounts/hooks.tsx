import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../index';
import { fetchClaimableAccounts, init, claimableAccounts } from "./index";
import { ClaimableAccounts, State } from '../types';

export const useFetchClaimableAccounts = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchClaimableAccounts());
  }, [dispatch]);
};

export const useFetchClaimableAccountsWithOutSLP = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(init());
    dispatch(claimableAccounts());
  }, [dispatch]);
};
export const useClaimableAccounts = (): ClaimableAccounts[] => {
  return useSelector((state: State) => {
    return state.claimableAccounts.claimableAccounts;
  });
};
