import { Category } from '../types/category';
import { Categories } from '../enums/categories';

export const categories: Category[] = [
  {
    id: '1',
    image:
      'https://ph-test-11.slatic.net/p/5c3121dd522ddbd86338323f6691002d.jpg',
    name: Categories.BOOKS,
  },
  {
    id: '2',
    image:
      'https://blog.japanwondertravel.com/wp-content/uploads/2021/10/Japanese-clothing-store.jpg',
    name: Categories.CLOTHING,
  },
  {
    id: '3',
    image:
      'https://ibvi.org/wp-content/uploads/2019/12/IBVI_Blog_MustHaveBackToSchoolSupplies_1920x820.jpg',
    name: Categories.SCHOOL_SUPPLIES,
  },
  {
    id: '4',
    image:
      'https://identity.missouri.edu/wp-content/uploads/2020/11/StudentOrg-Apparel-4.png',
    name: Categories.ORG_MERCH,
  },
  {
    id: '5',
    image:
      'https://www.thetechedvocate.org/wp-content/uploads/2019/05/photo-1519389950473-47ba0277781c-660x400@2x.jpg',
    name: Categories.DEVICES,
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    name: Categories.ELECTRONICS,
  },
];
