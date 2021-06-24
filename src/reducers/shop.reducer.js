import SHOP_DATA from "../pages/shop/shop.data";

const initialState = {
  // collections: SHOP_DATA,
  collections: {},
};

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COLLECTION":
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};
