import { Timestamp } from 'firebase/firestore';
import { Product } from '../types/product';
import { SearchResult } from '../types/search';

export function createProductFromAlgoliaSearch(result: SearchResult): Product {
  const {
    images,
    title,
    price,
    description,
    category,
    meetup,
    isFeatured,
    seller,
    sellerExpoPushToken,
  } = result;

  const { seconds, nanoseconds } = meetup.time as unknown as Timestamp;
  const timestamp = new Timestamp(seconds, nanoseconds) as unknown as Date;
  meetup.time = timestamp;

  const product: Product = {
    images,
    title,
    price,
    description,
    category,
    meetup,
    isFeatured,
    seller,
    sellerExpoPushToken,
  };

  return product;
}
