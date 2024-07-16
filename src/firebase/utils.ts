import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
import { omitBy, isNil } from 'lodash';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
  return signInWithPopup(auth, GoogleProvider);
};

export const signOut = () => {
  return auth.signOut();
};

export const fetchOrAddUser = async (
  user: User | null,
  additionalData: object = {}
) => {
  if (!user) return;
  const userRef = doc(collection(db, 'users'), user.uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    const createdAt = new Date();
    try {
      const userJson = omitBy(user.toJSON(), isNil);
      await setDoc(userRef, {
        ...userJson,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error);
    }
  }
  return userRef;
};
