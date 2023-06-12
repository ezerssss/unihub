export enum ListingStatus {
  OPEN = 'OPEN',
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface ProductListings {
  image: string;
  title: string;
  status: ListingStatus;
  price: number;
}
