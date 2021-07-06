import {gql} from '@apollo/client'
import { addItemToCart, toggleCartDetails } from "./cartResolvers";

// "extend type Mutation/type" extends or updates the existing Mutation/Type on GraphQL Server
//  Type "Item" is defined on backend, we can access it as we extend that Type
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartDetails: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

export const resolvers = {
  Mutation: {
    /* (https://www.apollographql.com/docs/apollo-server/data/resolvers/)
        _root: parentType of the respective type 
        _args: arguments passed to the graphql query
        _context: Apollo client has access to _context for cache (local store) or Client itself
        */
    toggleCartDetails: toggleCartDetails,
    addItemToCart: addItemToCart,
  },
};
