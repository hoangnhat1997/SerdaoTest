# How to run app

Because disable to not use flipper

- IOS: cd ios && rm -rf Pods build Podfile.lock && NO_FLIPPER=1 pod install && cd .. && NO_FLIPPER=1 npm run ios
- Android: npm run android

# Note

- Adding ibantools library to check validate of IBAN
- Adding formik library to submit form when creating beneficiary
- HomeScreen: Show Transaction history
- List Beneficiaries: Show Beneficiaries list
- Create Beneficiary: Create Beneficiaries (Name, IBAN)
- Transaction : Show Beneficiaries list created previously and able to select a beneficiary and type amount
