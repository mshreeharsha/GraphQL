import React from 'react'
import Layout from '../Components/Layout'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';

const SINGLE_USER = gql`
    query getSingleUser($id : ID!){
        user(id : $id){
            id,
            name,
            username,
            age,
            nationality
        }
    }
`

const SingleUser = () => {
    const params = useParams()
    const {data,loading,error} = useQuery(SINGLE_USER)

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
        return(
            <Layout>
                <div>
                    <h3 className='text-center'>{error}</h3>
                </div>
            </Layout>
        )
    }

  return (
    <Layout>
        <div>
            
        </div>
    </Layout>
  )
}

export default SingleUser
