import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  limit,
  DocumentData,
  QuerySnapshot,
  DocumentReference,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { DB } from '../enums/db';
import db from '../firebase/db';
import { generateErrorMessage } from '../helpers/error';
import { Product } from '../types/product';
import { Categories } from '../enums/categories';
import { uploadBlob } from '../helpers/upload';
import { StatusEnum } from '../enums/status';
import {
  getAllProductTransactionsDocs,
  updateTransactionProduct,
  updateTransactionStatus,
} from './transaction';
import { User } from 'firebase/auth';
import { Transaction } from '../types/transaction';
import { deleteObject, ref } from 'firebase/storage';
import storage from '../firebase/storage';
import { deleteSearchableItem } from './search';
import uuid from 'react-native-uuid';

export async function uploadProductPhotos(
  imageURIs: string[]
): Promise<string[]> {
  const photoURLs: string[] = [];

  for (const uri of imageURIs) {
    const id = uuid.v4();
    const path = `products/${id}`;

    const url = await uploadBlob(uri, path);
    photoURLs.push(url);
  }

  return photoURLs;
}

export async function deleteProductPhotos(product: Product) {
  const { images } = product;

  for (let i = 1; i < 3; i++) {
    const storageRef = ref(storage, images[i]);

    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.error(error);
    }
  }
}
export async function cancelAllProductTransactions(
  product: Product,
  user: User,
  excludeMeetupTransactions?: boolean
) {
  try {
    const allProductTransactionDocs = await getAllProductTransactionsDocs(
      product,
      user,
      excludeMeetupTransactions
    );

    if (allProductTransactionDocs.length < 1) {
      return;
    }

    for (const transactionDoc of allProductTransactionDocs) {
      const transaction = transactionDoc.data() as Transaction;
      await updateTransactionStatus(user, transaction, StatusEnum.CANCEL);
    }
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(error);
    throw new Error(message);
  }
}

async function updateAllProductTransactions(product: Product, user: User) {
  try {
    const allProductTransactionDocs = await getAllProductTransactionsDocs(
      product,
      user
    );

    if (allProductTransactionDocs.length < 1) {
      return;
    }

    for (const transactionDoc of allProductTransactionDocs) {
      const transaction = transactionDoc.data() as Transaction;
      await updateTransactionProduct(user, transaction, product);
    }
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(error);
    throw new Error(message);
  }
}

interface ProductAndUserProductRefs {
  productRef: DocumentReference<DocumentData>;
  userProductRef: DocumentReference<DocumentData>;
}

async function getProductAndUserProductRefs(
  product: Product,
  user: User
): Promise<ProductAndUserProductRefs> {
  const { title, seller } = product;

  const productsRef = collection(db, DB.PRODUCTS);
  const userProductsRef = collection(db, DB.USERS, user.uid, DB.PRODUCTS);
  const qProductsCollection = query(
    productsRef,
    where('title', '==', title),
    where('seller', '==', seller)
  );
  const qUsersCollection = query(
    userProductsRef,
    where('title', '==', title),
    where('seller', '==', seller)
  );

  const productsSnapshot = await getDocs(qProductsCollection);
  const userSnapshot = await getDocs(qUsersCollection);

  if (productsSnapshot.empty || userSnapshot.empty) {
    throw new Error('Product not found!');
  }

  const productsDocID = productsSnapshot.docs[0].id;
  const productRef = doc(db, DB.PRODUCTS, productsDocID);

  const userProductsDocId = userSnapshot.docs[0].id;
  const userProductRef = doc(
    db,
    DB.USERS,
    user.uid,
    DB.PRODUCTS,
    userProductsDocId
  );

  return {
    productRef,
    userProductRef,
  };
}

export async function deleteProduct(product: Product, user: User) {
  try {
    const { productRef, userProductRef } = await getProductAndUserProductRefs(
      product,
      user
    );

    await deleteDoc(productRef);
    await deleteDoc(userProductRef);
    await cancelAllProductTransactions(product, user);
    await deleteProductPhotos(product);

    const productDocID = (await getDoc(productRef)).id;
    await deleteSearchableItem(productDocID);
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with deleting your product.'
    );

    throw new Error(message);
  }
}

export async function updateProduct(product: Product, user: User) {
  try {
    const { productRef, userProductRef } = await getProductAndUserProductRefs(
      product,
      user
    );

    await updateDoc(productRef, { ...product });
    await updateDoc(userProductRef, { ...product });
    await updateAllProductTransactions(product, user);
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with updating your product.'
    );

    throw new Error(message);
  }
}

export async function getRandomProducts(size: number): Promise<Product[]> {
  try {
    const productsCollectionRef = collection(db, DB.PRODUCTS);

    const randomDocID = doc(productsCollectionRef).id;

    const productsQuery = query(
      productsCollectionRef,
      where('__name__', '>=', randomDocID),
      limit(size)
    );

    let querySnapshot = await getDocs(productsQuery);

    if (querySnapshot.size < size) {
      const firstThreeQuery = query(productsCollectionRef, limit(size));
      querySnapshot = await getDocs(firstThreeQuery);
    }

    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        products.push(doc.data() as Product);
      }
    });

    return products;
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong fetching the products.'
    );

    throw new Error(message);
  }
}

export async function getProductsByCategory(
  category: Categories
): Promise<Product[]> {
  try {
    const products: Product[] = [];

    const productsRef = collection(db, DB.PRODUCTS);
    let querySnapshot: QuerySnapshot<DocumentData>;

    if (category === Categories.ALL) {
      querySnapshot = await getDocs(productsRef);
    } else {
      const productsQuery = query(
        productsRef,
        where('category', '==', category)
      );
      querySnapshot = await getDocs(productsQuery);
    }

    if (querySnapshot.empty) {
      return [];
    }

    querySnapshot.forEach((doc) => {
      products.push(doc.data() as Product);
    });

    return products;
  } catch (error) {
    console.error(error);

    const message = generateErrorMessage(
      error,
      'Something went wrong with fetching the products.'
    );

    throw new Error(message);
  }
}

export async function getUserListings(uid: string): Promise<Product[]> {
  try {
    const userRef = collection(db, DB.USERS, uid, DB.PRODUCTS);
    const querySnapshot = await getDocs(userRef);

    if (querySnapshot.empty) {
      return [];
    }

    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data() as Product);
    });

    return products;
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with fetching your products.'
    );

    throw new Error(message);
  }
}

export async function hasProductDuplicate(
  uid: string,
  title: string
): Promise<boolean> {
  const userProductsRef = collection(db, DB.USERS, uid, DB.PRODUCTS);
  const qProduct = query(
    userProductsRef,
    where('title', '==', title),
    limit(1)
  );
  const productSnap = await getDocs(qProduct);

  return !productSnap.empty;
}

export async function getProductByDocID(id: string): Promise<Product> {
  const docRef = doc(db, DB.PRODUCTS, id);

  const product = (await getDoc(docRef)).data() as Product;

  return product;
}
