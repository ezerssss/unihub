import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsList } from './types/navigation';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
import Sell from './screens/Sell/Sell';
import Chat from './screens/Chat/Chat'
import { Routes } from './enums/routes';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Login} name={Routes.LOGIN} />
          <Stack.Screen component={Home} name={Routes.HOME} />
          <Stack.Screen component={Sell} name={Routes.SELL} />
          <Stack.Screen component={Chat} name={Routes.CHAT} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
