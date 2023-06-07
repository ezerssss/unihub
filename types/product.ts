import type { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  image: ImageSourcePropType;
  title: string;
  price: number;
}
