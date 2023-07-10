import { StatusBar } from 'expo-status-bar';
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
import SearchScreen from './screens/Search/Search';
import EditSell from './screens/Sell/EditSell';
import NotificationContext from './context/NotificationContext';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>(
    undefined
  );
  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const notificationContextValue = useMemo(
    () => ({ expoPushToken, setExpoPushToken }),
    [expoPushToken, setExpoPushToken]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <NotificationContext.Provider value={notificationContextValue}>
        <SafeAreaProvider className="flex-1">
          <StatusBar style="auto" />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={Routes.HOME}
              screenOptions={{ animation: 'none' }}
            >
              <Stack.Screen component={Home} name={Routes.HOME} />
              <Stack.Screen component={Login} name={Routes.LOGIN} />
              <Stack.Screen component={Sell} name={Routes.SELL} />
              <Stack.Screen component={EditSell} name={Routes.EDIT_SELL} />
              <Stack.Screen component={Chat} name={Routes.CHAT} />
              <Stack.Screen component={SpecificProduct} name={Routes.PRODUCT} />
              <Stack.Screen component={Buy} name={Routes.BUY} />
              <Stack.Screen component={Category} name={Routes.CATEGORY} />
              <Stack.Screen
                component={ProductSold}
                name={Routes.PRODUCT_SOLD}
              />
              <Stack.Screen
                component={ProductListing}
                name={Routes.PRODUCT_LISTINGS}
              />
              <Stack.Screen
                component={Transactions}
                name={Routes.TRANSACTIONS}
              />
              <Stack.Screen component={SearchScreen} name={Routes.SEARCH} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
}
