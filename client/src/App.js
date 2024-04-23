import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(), 
    uri: "http://localhost:4000/graphql" // URL of our GraphQL server.
  })

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
