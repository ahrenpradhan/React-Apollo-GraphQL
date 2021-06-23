import { createSelector } from "reselect";

const mapCollection = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionParam) =>
  createSelector([selectCollections], (collections) => {
    // without data Normalization (using array for huge data)
    /* return collections.find(
    (collection) => collection.id === mapCollection[collectionParam]);
    */

    // with data Normalization (convert array into objects for huge data)
    return collections[collectionParam];
  });
