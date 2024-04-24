import React from 'react'
import Layout from '../Components/Layout'
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

//GraphQL query to fetch single movie details
const GET_SINGLE_MOVIE = gql`
    query getSingleMovie($id : ID!){
        movie(id: $id){
            id,
            title,
            yearOfRelease,
            languages,
            inTheaters
        }
    }
`

const SingleMovie = () => {
    const params = useParams()

    const {data,loading,error} = useQuery(GET_SINGLE_MOVIE,{variables:{"id":params.id}})

    if(loading){
        return(
            <Layout>
                <div>
                    <h1 className='text-center'>Loading...</h1>
                </div>
            </Layout>
        )
    }

    if(error){
        console.log(error)
        return(
            <Layout>
                <div className="text-center">
                    <h4 style={{color:"red"}}>Error in Fetching Movie Details</h4>
                </div>
            </Layout>
        )
    }

  return (
    <Layout>
        <div className='py-2'>
        <h2 className='text-center' style={{color:"#a30070"}}>Movie Details</h2>
         <div className='rounded-2 p-4 mx-auto my-5' style={{border: "solid 2px #f6009c",backgroundColor:"#F6F5F2", width:"50%"}}>
            <h3 className='text-center pb-2'>{data?.movie.title}</h3>
            <div style={{lineHeight: "1.0"}}>
                <p>Year of Release : <b>{data?.movie.yearOfRelease}</b></p>
                <p>Released in : </p>
                <ul>
                    {data?.movie.languages.map((lang)=>(
                        <li><i>{lang}</i></li>
                    ))}
                </ul>
                <p>Currently in Threaters : <b>{data?.movie.inThreaters? "YES":"NO"}</b></p>
            </div>
        </div>
       </div>
    </Layout>
  )
}

export default SingleMovie