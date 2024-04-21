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


Video Recording

https://github.com/hoangnhat1997/SerdaoTest/assets/83819988/c86be18b-67ee-4629-8ed8-f5b2625773fa

