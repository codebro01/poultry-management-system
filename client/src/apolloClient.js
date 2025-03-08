import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://poultry-management-system-ten.vercel.app/graphql",
  credentials: "include",  // ✅ Ensures cookies are sent
});

const client = new ApolloClient({
  link: httpLink,   // ✅ Use HttpLink with credentials
  cache: new InMemoryCache(),
});

export { client, ApolloProvider };
