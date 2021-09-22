import { useSelector } from 'react-redux';
import { Payment, Secret, State } from '../types';

export const useIsFirstTimeOnTheApplication = (): boolean => {
  return useSelector((state: State) => {
    return state.application?.isFirstTime;
  });
};

export const usePayments = (): Payment[] => {
  return useSelector((state: State) => {
    return state.application && state.application.payments.length > 0
      ? state.application.payments
      : [];
  });
};

export const useSecrets = (): Secret[] => {
  return useSelector((state: State) => {
    return state.application && state.application.secrets.length > 0
      ? state.application.secrets
      : [];
  });
};

export const useGuardPrivateEndpoints = (): boolean => {
  return useSelector((state: State) => {
    return state.application && state.application.secrets.length > 0;
  });
};
