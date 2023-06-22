import type { Product } from './product';

export enum StatusEnum {
  CONFIRM = 'CONFIRM',
  MEETUP = 'MEETUP',
  SUCCESS = 'SUCCESS',
}

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

export interface Chat {
  content: string;
  from: string;
  date: Date;
}
