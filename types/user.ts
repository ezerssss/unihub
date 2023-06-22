import type { Transaction } from './transaction';

export interface UserInterface {
  displayName: string;
  email: string;
  transactions: Transaction[];
}
