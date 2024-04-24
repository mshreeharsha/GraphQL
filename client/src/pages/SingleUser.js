import React from 'react'
import Layout from '../Components/Layout'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';

//GraphQL query to fetch single user details
const GET_SINGLE_USER = gql`
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
    const {data,loading,error} = useQuery(GET_SINGLE_USER,{variables:{"id":params.id}})

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
                    <h4 style={{color:"red"}}>Error in Fetching user Details</h4>
                </div>
            </Layout>
        )
    }

  return (
    <Layout>
       <div className='py-2'>
        <h2 className='text-center' style={{color:"#a30070"}}>User Profile</h2>
         <div className='rounded-2 p-4 mx-auto my-5' style={{border: "solid 2px #f6009c",backgroundColor:"#F6F5F2", width:"50%"}}>
            <h3 className='text-center pb-2'>{data?.user.name}</h3>
            <div style={{lineHeight: "0.7"}}>
                <p>UserName : <b>{data?.user.username}</b></p>
                <p>Age : {data?.user.age}</p>
                <p>Nationality : {data?.user.nationality}</p>
            </div>
        </div>
       </div>
    </Layout>
  )
}

export default SingleUser
