const initialState = {
  hidden: true,
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CART_DETAILS":
      return {
        ...state,
        hidden: !state.hidden,
      };
    case "ADD_TO_CART": {
      let exists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "REDUCE_QUANTITY": {
      let exists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (exists && exists.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
    }
    default:
      return state;
  }
};
