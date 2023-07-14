import { Product } from './product';

export interface SearchResult extends Product {
  docID: string;
  searchText: string;
}
