import { ListingStatus } from '../enums/productListings';
import { Categories } from '../enums/categories';

export interface Product {
  images: string[];
  title: string;
  price: number;
  description: string;
  category: Categories;
  meetup: {
    time: Date;
    location: string;
  };
  isFeatured?: boolean;
  seller: string;
  sellerExpoPushToken?: string;
}

export interface ProductListings extends Pick<Product, 'title' | 'price'> {
  image: string;
  status: ListingStatus;
}
