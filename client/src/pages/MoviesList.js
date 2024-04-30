import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { gql, useQuery } from '@apollo/client';
import MovieCard from '../Components/MovieCard';
import AddMovieModal from '../Components/AddMovieModal';

//GraphQL query to fetch all movies
export const GET_ALL_MOVIES = gql`
    query getAllMovies{
        movies{
            _id,
            title,
            yearOfRelease,
            languages,
            inTheaters
        }
    }
`

const MoviesList = () => {

    const {data,loading,error} = useQuery(GET_ALL_MOVIES)

    const [openAddModal,setOpenAddModal] = useState(false)

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

    if(openAddModal){
        return(
            <AddMovieModal openAddModal={openAddModal} cancelModal={setOpenAddModal}/>
        )
    }

  return (
    <Layout>
        <div>
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <h1 className="text-center mx-4" style={{"color":"#a30070"}}>Movies List</h1>
                <button className='btn btn-warning' onClick={()=>setOpenAddModal(true)} ><b>Add Movie</b></button>
            </div>
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
