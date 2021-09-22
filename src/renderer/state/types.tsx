export interface Application {
  secrets: Secret[];
  payments: Payment[];
  isFirstTime: boolean;
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

export interface State {
  application: Application;
}
