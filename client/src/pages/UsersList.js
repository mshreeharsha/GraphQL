
import Layout from "../Components/Layout"
import { gql, useQuery } from '@apollo/client';
import UserCard from "../Components/UserCard";

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

    const {data, loading, error} = useQuery(QUERY_ALL_USERS)

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

    return (
        <Layout>
            <div>
                <h1 className="text-center" style={{"color":"#a30070"}}>Users List</h1>
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