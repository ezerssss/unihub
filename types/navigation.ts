import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from './product';
import { Chat, Transaction } from './transaction';
import { Routes } from '../enums/routes';
import { Message } from './messages';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Chat: { transaction: Transaction };
  Sell: undefined;
  Product: { product: Product; isRedirect?: boolean };
  ProductListings: undefined;
  Buy: { product: Product; transaction: Transaction };
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
