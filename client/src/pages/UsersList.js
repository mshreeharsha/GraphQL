
import Layout from "../Components/Layout"
import { gql, useQuery } from '@apollo/client';
import UserCard from "../Components/UserCard";
import AddUserModal from "../Components/AddUserModal";
import { useState } from "react";

//GraphQL query to fetch all users
export const QUERY_ALL_USERS = gql`
    query getAllUsers{
        users{
            id,
            name,
            username,
            age,
            nationality,
            friends{
                id,
                name
            },
            favouriteMovies{
                id,
                title
            }
        }
    }
`

const UsersList = ()=>{

    const {data, loading, error, refetch} = useQuery(QUERY_ALL_USERS)

    const [openAddModal,setOpenAddModal] = useState(false)

    if(loading){
        return(
           <Layout>
            <div className="text-center">
                <h1>Loading...</h1>
            </div>
           </Layout>
        )
    }

    if(error){
        console.log(error.message)
        return(
            <Layout>
                <div className="text-center">
                    <h4 style={{color:"red"}}>Error in Fetching Users List!!</h4>
                </div>
            </Layout>
        )
    }

    if(openAddModal){
        return(
            <AddUserModal openAddModal={openAddModal} cancelModal={setOpenAddModal} refetch={refetch}/>
        )
    }
    console.log(data?.users)
    return (
        <Layout>
            <div>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <h1 className="text-center mx-4" style={{"color":"#a30070"}}>Users List</h1>
                    <button className="btn btn-warning" onClick={()=>setOpenAddModal(true)}><b>Add User</b></button>
                </div>
                <div className="container mx-auto py-4" style={{width:"70%"}}>
                    <div className="row g-3">
                        {data.users.map((user)=>(
                            <UserCard user={user}/>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UsersList