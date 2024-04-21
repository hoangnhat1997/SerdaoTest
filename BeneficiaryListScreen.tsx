import React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {useBeneficiaries} from './BeneficiaryContext';

type Props = NativeStackScreenProps<RootStackParamList, 'BeneficiaryList'>;

const BeneficiaryListScreen = ({navigation}: Props) => {
  const {beneficiaries, removeBeneficiary} = useBeneficiaries();

  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Create Beneficiary"
          onPress={() => navigation.navigate('BeneficiaryCreate')}
        />
        <View>
          {beneficiaries.map((beneficiary, index) => (
            <View key={index} style={styles.item}>
              <Text>
                {beneficiary.name} - {beneficiary.iban}
              </Text>
              <Button title="Remove" onPress={() => removeBeneficiary(index)} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default BeneficiaryListScreen;
