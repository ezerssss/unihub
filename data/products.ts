import type { Product } from '../types/product';

const products: Product[] = [
  {
    id: '1',
    image: require('../assets/images/product-1.png'),
    title: 'Old Math Textbook',
    price: 500,
  },
  {
    id: '2',
    image: require('../assets/images/product-2.jpeg'),
    title: 'Pencil',
    price: 10,
  },
  {
    id: '3',
    image: require('../assets/images/product-3.jpeg'),
    title: 'Arduino',
    price: 1200,
  },
];

export default products;
