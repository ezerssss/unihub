import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from './product';
import { Transaction } from './transaction';
import { Categories } from '../enums/categories';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Chat: { transaction: Transaction };
  Sell: undefined;
  EditSell: { product: Product };
  Product: { product: Product; isRedirect?: boolean };
  ProductListings: undefined;
  Buy: { product: Product; transaction: Transaction };
  Category: { category: Categories };
  ProductSold: undefined;
  Transactions: undefined;
  Search: undefined;
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
export type BuyNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'Buy'
>;

export type ChatNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'Chat'
>;

export type EditSellNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'EditSell'
>;
