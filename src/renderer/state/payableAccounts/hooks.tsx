import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../index';
import { fetchPayableAccounts, init, payableAccounts } from "./index";
import { PayableAccounts, State } from '../types';

export const useFetchPayableAccounts = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPayableAccounts());
  }, [dispatch]);
};

export const useFetchPayableAccountsWithOutSLP = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(init());
    dispatch(payableAccounts());
  }, [dispatch]);
};
export const usePayableAccounts = (): PayableAccounts[] => {
  return useSelector((state: State) => {
    return state.payableAccounts.payableAccounts;
  });
};
