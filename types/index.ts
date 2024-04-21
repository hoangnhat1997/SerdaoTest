export type RootStackParamList = {
  Home: undefined;
  Transaction: undefined;
  BeneficiaryList: undefined;
  BeneficiaryCreate: undefined;
};

export type Beneficary = {
  name: string;
  iban: string;
};

export type BankAccount = {
  name: string;
  iban: string;
};

export type Transaction = {
  id: number;
  amount: number;
  account: BankAccount;
};
