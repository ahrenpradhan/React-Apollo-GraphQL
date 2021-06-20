import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB4oJIWnZuCofbfxPzstXqhFwGYA8PSZEM",
  authDomain: "crown-clothing-db-4a67f.firebaseapp.com",
  projectId: "crown-clothing-db-4a67f",
  storageBucket: "crown-clothing-db-4a67f.appspot.com",
  messagingSenderId: "226820811711",
  appId: "1:226820811711:web:40d5d7370a2d4e960fcf0a",
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const fireStore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, addtionalData) => {
  if (!userAuth) return;

  const userRef = fireStore.doc(`users/${userAuth.uid}`);
  // using collection reference for getting the data
  const snapshot = userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // using document reference for getting the data
      userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData,
      });
    } catch (error) {
      console.log("Error while creating user ", error.message);
    }
  }
  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
