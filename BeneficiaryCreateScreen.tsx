import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {useBeneficiaries} from './BeneficiaryContext';
import {validateIBAN} from 'ibantools';
import {Formik} from 'formik';

type Props = NativeStackScreenProps<RootStackParamList, 'BeneficiaryCreate'>;

const BeneficiaryCreateScreen = ({navigation}: Props) => {
  const {addBeneficiary} = useBeneficiaries();

  const onSubmit = ({name, iban}: {name: string; iban: string}) => {
    addBeneficiary({name, iban});

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          iban: '',
        }}
        validate={values => {
          const errors: {[key: string]: string} = {};

          if (!values.name) {
            errors.name = 'Required';
          }

          if (!values.iban) {
            errors.iban = 'Required';
          } else if (!validateIBAN(values.iban).valid) {
            errors.iban = 'Invalid IBAN';
          }

          return errors;
        }}
        onSubmit={onSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={styles.inputContainer}>
            <TextInput
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              style={styles.itemInput}
              placeholder="Name"
            />
            {errors.name && <Text>{errors.name}</Text>}
            <TextInput
              value={values.iban}
              onChangeText={handleChange('iban')}
              onBlur={handleBlur('iban')}
              style={styles.itemInput}
              placeholder="IBAN"
            />
            {errors.iban && <Text>{errors.iban}</Text>}
            <Button title="Add" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  itemInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BeneficiaryCreateScreen;
