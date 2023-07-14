import { searchIndex } from '../search/search';
import { Product } from '../types/product';
import { SearchResult } from '../types/search';

interface SearchableProduct extends Product {
  objectID: string;
}

export async function saveAsSearchableItem(
  product: Product,
  productDocID: string
) {
  const searchableProduct: SearchableProduct = {
    ...product,
    objectID: productDocID,
  };

  await searchIndex.saveObject(searchableProduct);
}

export async function deleteSearchableItem(productDocID: string) {
  await searchIndex.deleteObject(productDocID);
}

export async function updateSearchableItem(
  product: Product,
  productDocID: string
) {
  const object: SearchableProduct = {
    ...product,
    objectID: productDocID,
  };

  await searchIndex.partialUpdateObject(object);
}

export async function search(query: string): Promise<SearchResult[]> {
  const response = await searchIndex.search(query);
  const results: SearchResult[] = [];

  const { hits } = response;
  for (const item of hits) {
    const { objectID } = item as SearchableProduct;
    const product = item as SearchableProduct;

    const result: SearchResult = {
      docID: objectID,
      searchText: product.title,
      ...product,
    };

    results.push(result);
  }

  return results;
}
