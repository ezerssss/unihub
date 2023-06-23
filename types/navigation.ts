import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from './product';
import { Chat, Transaction } from './transaction';
import { Routes } from '../enums/routes';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Transaction: Transaction;
  Chat: undefined;
  Sell: undefined;
  Product: { product: Product; isRedirect?: boolean };
  ProductListings: undefined;
  Buy: { product: Product };
  Category: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamsList>;
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
