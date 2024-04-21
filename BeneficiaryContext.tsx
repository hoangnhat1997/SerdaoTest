import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {Beneficary} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BeneficaryContext = createContext<{
  beneficiaries: Beneficary[];
  addBeneficiary: (beneficiary: Beneficary) => void;
  removeBeneficiary: (index: number) => void;
}>({
  beneficiaries: [],
  addBeneficiary: () => {},
  removeBeneficiary: () => {},
});

export const useBeneficiaries = () => useContext(BeneficaryContext);

export const BeneficiaryProvider = ({children}: {children: ReactNode}) => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficary[]>();

  useEffect(() => {
    if (beneficiaries) {
      AsyncStorage.setItem('@db/beneficiaries', JSON.stringify(beneficiaries));
    }
  }, [beneficiaries]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('@db/beneficiaries');
      if (data) {
        setBeneficiaries(JSON.parse(data));
      }
    })();
  }, []);

  const addBeneficiary = (beneficiary: Beneficary) => {
    setBeneficiaries([...(beneficiaries || []), beneficiary]);
  };

  const removeBeneficiary = (index: number) => {
    const newBeneficiaries = [...(beneficiaries || [])];
    newBeneficiaries.splice(index, 1);
    setBeneficiaries(newBeneficiaries);
  };

  return (
    <BeneficaryContext.Provider
      value={{
        beneficiaries: beneficiaries || [],
        addBeneficiary,
        removeBeneficiary,
      }}>
      {children}
    </BeneficaryContext.Provider>
  );
};
