import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { typeDefs, resolvers } from "../resolvers";

export const getApolloClient = () => {
  // create an apollo link instance, a network interface for apollo client
  const httpLink = createHttpLink({
    uri: "https://crwn-clothing.com/",
  });
  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache()
  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link: httpLink,
    cache,
    typeDefs,
    resolvers,
  });
  return client;
}

// local State
// client.writeData({
//   data: {
//     isCartDetailsHidden: true,
//     cartItems: [],
//     totalCartItems: 0,
//   },
// });
