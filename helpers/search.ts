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
    seller,
    sellerExpoPushToken,
  } = result;

  meetup.time = new Date(meetup.time);

  const product: Product = {
    images,
    title,
    price,
    description,
    category,
    meetup,
    seller,
    ...(sellerExpoPushToken && { sellerExpoPushToken }),
  };

  return product;
}
