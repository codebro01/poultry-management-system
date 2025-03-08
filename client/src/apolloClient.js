import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
const API_URL = `${import.meta.env.VITE_API_URL}`

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",  // ✅ Ensures cookies are sent
});

const client = new ApolloClient({
  link: httpLink,   // ✅ Use HttpLink with credentials
  cache: new InMemoryCache(),
});

export { client, ApolloProvider };
