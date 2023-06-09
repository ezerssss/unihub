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
