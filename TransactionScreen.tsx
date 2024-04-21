import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useTransactions} from './TransactionContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {useBeneficiaries} from './BeneficiaryContext';
import {validateIBAN} from 'ibantools';

type Props = NativeStackScreenProps<RootStackParamList, 'Transaction'>;

const TransactionScreen = ({navigation}: Props) => {
  const {beneficiaries} = useBeneficiaries();

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const {addTransaction} = useTransactions();

  const handleTransaction = () => {
    const accountDetails = {name, iban};
    if (name === '' || iban === '' || amount === '') {
      Alert.alert('Invalid Transaction', 'Please fill in all fields');
      return;
    }
    if (!validateIBAN(iban).valid) {
      Alert.alert('Invalid IBAN', 'Please enter a valid IBAN');
      return;
    }
    addTransaction(amount, accountDetails);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.itemInput}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <View>
        {beneficiaries.map((beneficiary, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                setName(beneficiary.name);
                setIban(beneficiary.iban);
              }}>
              <Text>
                {beneficiary.name} - {beneficiary.iban}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TextInput
        style={styles.itemInput}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.itemInput}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
  },
});

export default TransactionScreen;
