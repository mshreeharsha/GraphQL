import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';
import EditModal from '../Components/EditModal';
import DeleteModal from '../Components/DeleteModal';

//GraphQL query to fetch single user details
export const GET_SINGLE_USER = gql`
    query getSingleUser($id : ID!){
        user(id : $id){
            _id,
            name,
            username,
            age,
            nationality,
            friends{
                _id,
                name
            },
            favouriteMovies{
                _id,
                title
            }
        }
    }
`

const buttonStyles = {border:"solid 1px #a30070",backgroundColor:"#ffe0f5",color:"#a30070"}

const SingleUser = () => {
    const params = useParams()
    const {data,loading,error,refetch} = useQuery(GET_SINGLE_USER,{variables:{"id":params.id}})

    const [openEditModal,setOpenEditModal] = useState(false)
    const [openDeleteModal,setOpenDeleteModal] = useState(false)

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

    if(openEditModal){
        return(
            <EditModal openEditModal={openEditModal} cancelModal={setOpenEditModal} user={data?.user} refetch={refetch}/>
        )
    }

    if(openDeleteModal){
        return(
            <DeleteModal openDeleteModal={openDeleteModal} cancelModal={setOpenDeleteModal} id={params.id}/>
        )
    }

  return (
    <Layout>
       <div className='py-2'>
        <h2 className='text-center' style={{color:"#a30070"}}>User Profile</h2>
         <div className='rounded-2 p-4 py-2 mx-auto my-5' style={{border: "solid 2px #f6009c",backgroundColor:"#F6F5F2", width:"50%"}}>
            <h3 className='text-center pb-2'>{data?.user.name}</h3>
            <div style={{lineHeight: "1.0"}}>
                <p>UserName : <b>{data?.user.username}</b></p>
                <p>Age : {data?.user.age}</p>
                <p>Nationality : {data?.user.nationality}</p>
                {data?.user?.friends?.length > 0 ? <><p>Friends : </p>
                <ul>
                    {data?.user?.friends?.map((friend)=>(
                        <li key={friend._id}><i>{friend.name}</i></li>
                    ))}
                </ul></>:<><p>Friends : Not Yet!!</p></>}
                {data?.user?.favouriteMovies.length > 0 ? <><p>Favourite Movies : </p>
                <ul>
                    {data?.user?.favouriteMovies?.map((movie)=>(
                        <li key={movie._id}><i>{movie.title}</i></li>
                    ))}
                </ul></>:<><p>Favourite Movies : No Data Available!!</p></>}
            </div>
            <div className='d-flex flex-row justify-content-end g-2'>
                <button type="button" className='mx-2 rounded-2' style={buttonStyles}
                onClick={()=>setOpenEditModal(true)}
                ><b>Edit</b></button>
                <button type="button" className='mx-2 rounded-2' 
                style={buttonStyles} 
                onClick={()=>setOpenDeleteModal(true)}><b>Delete</b></button>
            </div>
        </div>
       </div>
    </Layout>
  )
}

export default SingleUser
