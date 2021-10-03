import { useSelector } from "react-redux";
import { PayableAccounts, Payment, Secret, State } from "../types";

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

export const getPaymentsWithSecrets = ({ secrets, payments }) => {
  const paymentsWithSecrets: PayableAccounts[] = [];
  secrets.forEach((secret) => {
    const payment = payments.find(
      (p) => p.AccountAddress === secret.AccountAddress
    );
    if (payment) {
      paymentsWithSecrets.push({
        secret,
        payment
      });
    }
  });
  return paymentsWithSecrets;
};
export const usePaymentsWithSecrets = (): PayableAccounts[] => {
  return useSelector((state: State) => {
    return getPaymentsWithSecrets(state.application);
  });
};

export const useGuardPrivateEndpoints = (): boolean => {
  return useSelector((state: State) => {
    return state.application && state.application.secrets.length > 0;
  });
};
