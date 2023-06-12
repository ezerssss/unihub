import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Chat: undefined;
  Sell: undefined;
  Buy: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamsList>;
