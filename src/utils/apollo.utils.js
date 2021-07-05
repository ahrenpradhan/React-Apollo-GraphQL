import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { typeDefs, resolvers } from "../resolvers";

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com/",
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

// local State
client.writeData({
  data: {
    isCartDetailsHidden: true,
    cartItems: [],
    totalCartItems: 0,
  },
});
