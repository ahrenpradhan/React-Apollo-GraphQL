import { gql } from "apollo-boost";

// query to local store
export const IS_CART_DETAILS_HIDDEN = gql`
  {
    isCartDetailsHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const GET_TOTAL_CART_ITEMS = gql`
  {
    totalCartItems @client
  }
`;

export const toggleCartDetails = (_root, _args, _context, _info) => {
  /* (https://www.apollographql.com/docs/apollo-server/data/resolvers/)
    _root: parentType of the respective type 
    _args: arguments passed to the graphql query
    _context: Apollo client has access to _context for cache (local store) or Client itself
  */

  const data = _context.cache.readQuery({
    query: IS_CART_DETAILS_HIDDEN,
  });

  _context.cache.writeQuery({
    query: IS_CART_DETAILS_HIDDEN,
    data: { isCartDetailsHidden: !data.isCartDetailsHidden },
  });

  return !data.isCartDetailsHidden;
};

export const addItemToCart = (_root, _args, _context, _info) => {
  /* (https://www.apollographql.com/docs/apollo-server/data/resolvers/)
    _root: parentType of the respective type 
    _args: arguments passed to the graphql query
    _context: Apollo client has access to _context for cache (local store) or Client itself
  */

  const data = _context.cache.readQuery({
    query: GET_CART_ITEMS,
  });

  // add item or increase quantity if exist
  const updatedCartItems = addToCart(data.cartItems, _args.item);

  // update local store
  _context.cache.writeQuery({
    query: GET_TOTAL_CART_ITEMS,
    data: { totalCartItems: getTotalCartItems(updatedCartItems) },
  });

  _context.cache.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: updatedCartItems },
  });

  return updatedCartItems;
};

export const addToCart = (existingItems, addedItem) => {
  let itemExists = existingItems.find((item) => item.id === addedItem.id);
  if (itemExists) {
    return existingItems.map((item) =>
      item.id === addedItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...existingItems, { ...addedItem, quantity: 1 }];
  }
};

export const getTotalCartItems = (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);
