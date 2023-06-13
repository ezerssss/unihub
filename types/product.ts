import { ListingStatus } from '../enums/productListings';

export interface Product {
  id: string;
  images: string[];
  title: string;
  price: number;
  description: string;
  category: string;
  meetup: {
    time: Date;
    location: string;
  };
  isFeatured?: boolean;
}

export interface ProductListings extends Pick<Product, 'title' | 'price'> {
  image: string;
  status: ListingStatus;
}
