import { ListingStatus } from '../../enums/productListings';

export interface ProductListings {
  image: string;
  title: string;
  status: ListingStatus;
  price: number;
}
