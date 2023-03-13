import { initializeApp } from 'firebase/app'; 
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2ga89zb47VUrr4u-zKaMM0lvR575tjSU",
  authDomain: "crwn-clothing-db-58be2.firebaseapp.com",
  projectId: "crwn-clothing-db-58be2",
  storageBucket: "crwn-clothing-db-58be2.appspot.com",
  messagingSenderId: "96738817377",
  appId: "1:96738817377:web:19834ba563693dae8e4120"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (err) {
      console.log('error creating the user', err.message);
    }
  }

  return userDocRef;
};