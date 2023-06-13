import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Chat: undefined;
  Sell: undefined;
  Product: { product: string };
  ProductListings: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamsList>;
export type ProductNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'Product'
>;
