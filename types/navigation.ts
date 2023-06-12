import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Chat: undefined;
  Sell: undefined;
  Product: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamsList>;
