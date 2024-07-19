import { auth, db } from '../firebase/utils';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

class UserModel {
  uid: string;
  email: string;
  name: string;
  user: User | null;

  constructor(
    uid: string,
    email: string,
    name: string = '',
    user: User | null = null
  ) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.user = user;
  }

  static async createUser(
    email: string,
    password: string,
    displayName: string,
    data: { [key: string]: string | number } = {}
  ): Promise<UserModel | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const newUser = new UserModel(user.uid, email, displayName, user);
        await setDoc(doc(db, 'users', user.uid), {
          ...data,
          uid: user.uid,
          email: email,
          displayName,
        });
        return newUser;
      }

      return null;
    } catch (error) {
      console.error('Error creating user: ', error);
      return null;
    }
  }

  static async signIn(
    email: string,
    password: string
  ): Promise<UserModel | null> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      const newUser = new UserModel(
        user.uid,
        email,
        user.displayName || '',
        user
      );
      return newUser;
    }
    return null;
  }

  static async signOut() {
    await auth.signOut();
  }

  static async signInWithGoogle() {
    const GoogleProvider = new GoogleAuthProvider();
    GoogleProvider.setCustomParameters({ prompt: 'select_account' });

    const userCredential = await signInWithPopup(auth, GoogleProvider);
    const user = userCredential.user;
    if (user) {
      const newUser = new UserModel(
        user.uid,
        user.email || '',
        user.displayName || '',
        user
      );
      return newUser;
    }
    return null;
  }

  static async sendPasswordResetEmail(email: string) {
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/login`,
    });
  }
}

export default UserModel;
