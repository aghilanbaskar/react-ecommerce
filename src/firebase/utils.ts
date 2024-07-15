import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => {
    return signInWithPopup(auth, GoogleProvider)
}
