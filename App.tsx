import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsList } from './types/navigation';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
import Sell from './screens/Sell/Sell';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={Home} name="Home" />
          <Stack.Screen component={Sell} name="Sell" />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
