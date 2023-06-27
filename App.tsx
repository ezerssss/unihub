import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsList } from './types/navigation';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
import Sell from './screens/Sell/Sell';
import Chat from './screens/Chat/Chat';
import SpecificProduct from './screens/SpecificProduct/SpecificProduct';
import ProductListing from './screens/ProductListings/ProductListings';
import Buy from './screens/SpecificProduct/BuyConfirmation';
import { Routes } from './enums/routes';
import UserContext from './context/UserContext';
import { useMemo, useState } from 'react';
import { User } from 'firebase/auth';
import Category from './screens/Category/Category';
import ProductSold from './screens/SpecificProduct/ProductSold';
import Transactions from './screens/Transactions/Transactions';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={userContextValue}>
      <SafeAreaProvider className="flex-1">
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={Home} name={Routes.HOME} />
            <Stack.Screen component={Login} name={Routes.LOGIN} />
            <Stack.Screen component={Sell} name={Routes.SELL} />
            <Stack.Screen component={Chat} name={Routes.CHAT} />
            <Stack.Screen component={SpecificProduct} name={Routes.PRODUCT} />
            <Stack.Screen component={Buy} name={Routes.BUY} />
            <Stack.Screen component={Category} name={Routes.CATEGORY} />
            <Stack.Screen component={ProductSold} name={Routes.PRODUCT_SOLD} />
            <Stack.Screen
              component={ProductListing}
              name={Routes.PRODUCT_LISTINGS}
            />
            <Stack.Screen component={Transactions} name={Routes.TRANSACTIONS} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserContext.Provider>
  );
}
