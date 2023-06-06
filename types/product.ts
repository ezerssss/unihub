import type { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  price: number;
};
