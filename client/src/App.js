import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import UsersList from './pages/UsersList';
import SingleUser from './pages/SingleUser';
import SingleMovie from './pages/SingleMovie';
import MoviesList from './pages/MoviesList';
function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(), 
    uri: "http://localhost:4000/graphql" // URL of our GraphQL server.
  })

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/users' element={<UsersList/>}/>
        <Route path='/user/:id' element={<SingleUser/>}/>
        <Route path='/movies' element={<MoviesList/>}/>
        <Route path='/movie/:id' element={<SingleMovie/>} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
