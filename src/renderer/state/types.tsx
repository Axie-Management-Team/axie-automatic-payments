export interface Application {
  manager: string;
  secrets: Secret[];
  payments: Payment[];
  isFirstTime: boolean;
}

export interface ClaimableAccountsState {
  claimableAccounts: ClaimableAccounts[];
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

export interface ClaimableAccounts {
  secret: Secret;
  payment?: Payment;
  unclaimed?: number;
  claimHash?: string;
  claimed?: number;
  blockchainRelated: ClaimableSignature;
  lastError?: string;
}
export interface ClaimableSignature {
  signature: string;
  amount: number;
  timestamp: number;
}

export interface PayableAccounts {
  name: string;
  address: string;
  scholarPayoutAddress: string;
  scholarPayout: number;
  trainerPayoutAddress: string;
  trainerPayout: number;
  managerPayout: number;
  managerAddress: number;
  feePayout: number;
}

export interface PayableAccountsState {
  payableAccounts: PayableAccounts[];
}

export interface State {
  application: Application;
  claimableAccounts: ClaimableAccountsState;
  payableAccounts: PayableAccountsState;
}
