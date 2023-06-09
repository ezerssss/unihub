import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import storage from '../firebase/storage';

export async function uploadBlob(uri: string, path: string): Promise<string> {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    const result = await uploadBytes(storageRef, blob);
    const uploadedPath = result.metadata.fullPath;

    const imageRef = ref(storage, uploadedPath);
    const url = await getDownloadURL(imageRef);

    return url;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong uploading the image.');
  }
}
