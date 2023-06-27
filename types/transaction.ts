import { StatusEnum } from '../enums/status';
import type { Product } from './product';

export interface Transaction {
  product: Product;
  status: StatusEnum;
  date: Date;
  sellerEmail: string;
  buyer: string;
  buyerEmail: string;
  isSeen: boolean;
  lastMessage: string;
}
