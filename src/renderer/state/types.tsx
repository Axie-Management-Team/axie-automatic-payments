export interface Application {
  manager: string;
  secrets: Secret[];
  payments: Payment[];
  isFirstTime: boolean;
}

export interface PayableAccountsState {
  payableAccounts: PayableAccounts[];
  isLoading: boolean;
}

export interface Secret {
  AccountAddress: string;
  PrivateKey: string;
}

export interface Payment {
  Name: string;
  AccountAddress: string;
  ScholarPayoutAddress: string;
  ScholarPayout: number;
  TrainerPayoutAddress: string;
  TrainerPayout: number;
  ManagerPayout: number;
}

export interface PayableAccounts {
  secret: Secret;
  payment?: Payment;
  unclaimed?: number;
  claimed?: number;
}

export interface State {
  application: Application;
  payableAccounts: PayableAccountsState;
}
