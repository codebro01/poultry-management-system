import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",  // ✅ Ensures cookies are sent
});

const client = new ApolloClient({
  link: httpLink,   // ✅ Use HttpLink with credentials
  cache: new InMemoryCache(),
});

export { client, ApolloProvider };
