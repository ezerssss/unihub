import type { Product, ProductListings } from '../types/product';
import { ListingStatus } from '../enums/productListings';

export const featuredProduct: Product = {
  images: [
    'https://media.karousell.com/media/photos/products/2020/9/30/grade_9_math_textbook_1601468442_dddb9ac9.jpg',
    'https://media.karousell.com/media/photos/products/2020/9/30/grade_9_math_textbook_1601468442_dddb9ac9.jpg',
    'https://media.karousell.com/media/photos/products/2020/9/30/grade_9_math_textbook_1601468442_dddb9ac9.jpg',
  ],
  title: 'Old Math Textbook',
  price: 500,
  description: 'test',
  category: 'test',
  meetup: {
    time: new Date(),
    location: 'test',
  },
};

export const products: Product[] = [
  {
    images: [
      'https://thenextsomewhere.com/wp-content/uploads/2021/04/FilipinaAuthors-BlogPost.jpg',
    ],
    title: 'Old Books',
    price: 99,
    description: 'test',
    category: 'test',
    meetup: {
      time: new Date(),
      location: 'test',
    },
  },
  {
    images: [
      'https://s.alicdn.com/@sc04/kf/H8666353031fe4496bb8740ea13108a889.jpg_300x300.jpg',
    ],
    title: 'Old Unifrom',
    price: 299,
    description: 'test',
    category: 'test',
    meetup: {
      time: new Date(),
      location: 'test',
    },
  },
  {
    images: [
      'https://www.permajet.com/wp-content/uploads/2021/03/longridge-pencil-pack.jpg',
    ],
    title: 'Pencils',
    price: 9,
    description: 'test',
    category: 'test',
    meetup: {
      time: new Date(),
      location: 'test',
    },
  },
  {
    images: [
      'https://www.officewarehouse.com.ph/__resources/_web_data_/products/products/images/4640.jpg',
    ],
    title: 'Paper',
    price: 2000,
    description: 'test',
    category: 'test',
    meetup: {
      time: new Date(),
      location: 'test',
    },
  },
];

export const productListings: ProductListings[] = [
  {
    image:
      'https://2f96be1b505f7f7a63c3-837c961929b51c21ec10b9658b068d6c.ssl.cf2.rackcdn.com/products/072177.jpg',
    title: 'Old Math Textbook',
    status: ListingStatus.OPEN,
    price: 180,
  },
  {
    image:
      'https://media.sketchfab.com/models/dd7ef37c175945db9e11266e9f32c8c4/thumbnails/f33f649e975c4bd2a505cb0c46561f63/b552809abfdd435592090b1c5e68b3d3.jpeg',
    title: 'Old School Uniform',
    status: ListingStatus.WAITING,
    price: 280,
  },
];
