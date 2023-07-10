import { Category } from '../types/category';
import { Categories } from '../enums/categories';

export const categories: Category[] = [
  {
    id: '1',
    image:
      'https://i.imgur.com/w2n45Ty.png',
    name: Categories.BOOKS,
  },
  {
    id: '2',
    image:
      'https://i.imgur.com/GY3hZt2.png',
    name: Categories.CLOTHING,
  },
  {
    id: '3',
    image:
      'https://i.imgur.com/k7nA74l.png',
    name: Categories.SCHOOL_SUPPLIES,
  },
  {
    id: '4',
    image:
      'https://i.imgur.com/3EN63t8.png',
    name: Categories.ORG_MERCH,
  },
  {
    id: '5',
    image:
      'https://i.imgur.com/IawpIP1.png',
    name: Categories.ELECTRONICS,
  },
];
