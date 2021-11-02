import { useAppDispatch } from '../index';
import { loadFromPaymentsWithSecrets } from './index';
import { ClaimableAccounts } from '../types';

export const useLoadPayableAccounts = (
  paymentsWithSecrets: ClaimableAccounts[]
) => {
  const dispatch = useAppDispatch();

  paymentsWithSecrets.forEach((paymentWithSecrets) => {
    dispatch(loadFromPaymentsWithSecrets({ test: 'test' }));
  });
};

export const test = (paymentsWithSecrets: ClaimableAccounts[]) => {};
