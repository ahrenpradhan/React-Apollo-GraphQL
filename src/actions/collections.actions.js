import { createSelector } from "reselect"; //... for memoization
import { collectionsSnapshotToMap, fireStore } from "../utils/firebase.utils";

const mapCollection = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

// input selector (doesnot use createSelector)
const selectShop = (state) => state.shop;

// output selector (uses createSelector)  ... for memoization
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// output selector (uses createSelector)  ... for memoization
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

// output selector (uses createSelector)  ... for memoization
export const selectCollection = (collectionParam) =>
  createSelector([selectCollections], (collections) => {
    // without data Normalization (using array for huge data)
    /* return collections.find(
    (collection) => collection.id === mapCollection[collectionParam]);
    */

    // with data Normalization (convert array into objects for huge data)
    return collections[collectionParam];
  });

export const setCollections = (collections) => {
  return {
    type: "SET_COLLECTION",
    payload: collections,
  };
};

export const fetchCollections = () => (dispatch) => {
  const collectionRef = fireStore.collection("collections");
  collectionRef.get().then((collectionSnapshot) => {
    const collectionsMap = collectionsSnapshotToMap(collectionSnapshot);
    dispatch(setCollections(collectionsMap));
  });
};

// Saga Actions
export const fetchAllCollections = () => {
  return {
    type: "FETCH_ALL_COLLECTIONS",
  };
};
