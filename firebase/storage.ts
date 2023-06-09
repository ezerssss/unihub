import app from './firebase';
import { getStorage } from 'firebase/storage';

const storage = getStorage(app);

export default storage;
