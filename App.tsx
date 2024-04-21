import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import {TransactionProvider} from './TransactionContext';
import BeneficiaryListScreen from './BeneficiaryListScreen';
import BeneficiaryCreateScreen from './BeneficiaryCreateScreen';
import {BeneficiaryProvider} from './BeneficiaryContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <BeneficiaryProvider>
      <TransactionProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            <Stack.Screen
              name="BeneficiaryList"
              component={BeneficiaryListScreen}
            />
            <Stack.Screen
              name="BeneficiaryCreate"
              component={BeneficiaryCreateScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionProvider>
    </BeneficiaryProvider>
  );
};

export default App;
