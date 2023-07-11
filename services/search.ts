import { searchIndex } from '../search/search';
import { Product } from '../types/product';
import { SearchResult } from '../types/search';

interface CleanedSearchableProduct {
  title: string;
  description: string;
  seller: string;
  objectID: string;
}

export async function saveAsSearchableItem(
  product: Product,
  productDocID: string
) {
  const { title, description, seller } = product;

  const cleanedSearchableProduct: CleanedSearchableProduct = {
    title,
    description,
    seller,
    objectID: productDocID,
  };

  await searchIndex.saveObject(cleanedSearchableProduct);
}

export async function deleteSearchableItem(productDocID: string) {
  await searchIndex.deleteObject(productDocID);
}

export async function updateSearchableItem(
  product: Product,
  productDocID: string
) {
  const { title, description, seller } = product;

  const object: CleanedSearchableProduct = {
    title,
    description,
    seller,
    objectID: productDocID,
  };

  await searchIndex.partialUpdateObject(object);
}

export async function search(query: string): Promise<SearchResult[]> {
  const response = await searchIndex.search(query);
  const results: SearchResult[] = [];

  const { hits } = response;
  for (const item of hits) {
    const { objectID, title } = item as CleanedSearchableProduct;

    const result: SearchResult = {
      docID: objectID,
      searchText: title,
    };

    results.push(result);
  }

  return results;
}
