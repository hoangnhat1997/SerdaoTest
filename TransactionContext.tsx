import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {BankAccount, Transaction} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionContext = createContext<{
  transactions: Transaction[];
  addTransaction: (amount: string, account: BankAccount) => void;
  balance: number;
}>({
  transactions: [],
  addTransaction: () => {},
  balance: 0,
});

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({children}: {children: ReactNode}) => {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    if (transactions) {
      AsyncStorage.setItem('@db/transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('@db/transactions');
      if (data) {
        setTransactions(JSON.parse(data));
      }
    })();
  }, []);

  const addTransaction = (amount: string, account: BankAccount) => {
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    setTransactions(prevTransactions => [
      ...(prevTransactions || []),
      newTransaction,
    ]);
    setBalance(prevBalance => prevBalance - parseFloat(amount));
  };

  return (
    <TransactionContext.Provider
      value={{transactions: transactions || [], addTransaction, balance}}>
      {children}
    </TransactionContext.Provider>
  );
};
