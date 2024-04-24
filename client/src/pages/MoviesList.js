import React from 'react'
import Layout from '../Components/Layout'
import { gql, useQuery } from '@apollo/client';
import MovieCard from '../Components/MovieCard';

//GraphQL query to fetch all movies
const GET_ALL_MOVIES = gql`
    query getAllMovies{
        movies{
            id,
            title,
            yearOfRelease,
            languages,
            inTheaters
        }
    }
`

const MoviesList = () => {

    const {data,loading,error} = useQuery(GET_ALL_MOVIES)

    if(loading){
        return(
            <Layout>
                <div className='text-center'>
                    <h1>Loading...</h1>
                </div>
            </Layout>
        )
    }

    if(error){
        console.log(error)
        return(
            <Layout>
                <div className="text-center">
                    <h4 style={{color:"red"}}>Error in Fetching Movies List!!</h4>
                </div>
            </Layout>
        )
    }

  return (
    <Layout>
        <div>
            <h1 className="text-center" style={{"color":"#a30070"}}>Movies List</h1>
            <div className="container mx-auto py-4" style={{width:"70%"}}>
                    <div className="row g-3">
                        {data.movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                </div>
        </div>
    </Layout>
  )
}

export default MoviesList
