import { ListingStatus } from '../enums/productListings';

export interface Product {
  images: string[];
  title: string;
  price: number;
  description: string;
  category: string;
  meetup: {
    time: Date;
    location: string;
  };
}

export interface ProductListings extends Pick<Product, 'title' | 'price'> {
  image: string;
  status: ListingStatus;
}
