import { createSelector } from "reselect"; // ... for memoization

// input selector (doesnot use createSelector)
const selectCart = (state) => state.cart;

// output selector (uses createSelector)  ... for memoization
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

// output selector (uses createSelector)  ... for memoization
export const selectCartIsHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// output selector (uses createSelector)  ... for memoization
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

// output selector (uses createSelector)  ... for memoization
export const selectCartItemsTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

export const toggleCartDetails = () => {
  return {
    type: "TOGGLE_CART_DETAILS",
  };
};

export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const reduceQuantity = (item) => {
  return {
    type: "REDUCE_QUANTITY",
    payload: item,
  };
};

export const removeFromCart = (item) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: item,
  };
};
