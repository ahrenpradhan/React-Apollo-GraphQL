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

  // Document reference to check whether the data exist or not
  const userRef = fireStore.doc(`users/${userAuth.uid}`);

  const snapshot = userRef.get(); // ... Document snapshot

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // document reference for setting the data of resp document
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

export const addDataToFirestore = async (collectionKey, data) => {
  // Collection reference to check whether the collection exist or not
  const collectionRef = fireStore.collection(collectionKey);

  // for providing batch updates
  const batch = fireStore.batch();
  data.forEach((document) => {
    // creating document reference
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, document);
  });

  // firing batch requests
  return await batch.commit();
};

export const collectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((document) => {
    const { title, items } = document.data();

    return {
      routeName: encodeURI(title.toLowerCase()), //  encodeURI is JS method which will return validate url format
      id: document.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, document) => {
    accumulator[document.title.toLowerCase()] = document;
    return accumulator;
  }, {});
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
