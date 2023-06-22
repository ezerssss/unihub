import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from './product';
import { Categories } from '../enums/categories';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Chat: undefined;
  Sell: undefined;
  Product: { product: Product; isRedirect?: boolean };
  ProductListings: undefined;
  Buy: undefined;
  Category: { category: Categories };
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamsList>;
export type CategoryNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'Category'
>;
export type ProductNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'Product'
>;
