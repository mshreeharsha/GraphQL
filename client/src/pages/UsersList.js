
import Layout from "../Components/Layout"
import { gql, useQuery } from '@apollo/client';
import UserCard from "../Components/UserCard";

const QUERY_ALL_USERS = gql`
    query getAllUsers{
        users{
            id,
            name,
            username,
            age,
            nationality
        }
    }
`

const UsersList = ()=>{

    const {data, loading, error} = useQuery(QUERY_ALL_USERS)

    if(loading){
        return(
           <Layout>
            <div className="text-center">
                Loading...
            </div>
           </Layout>
        )
    }

    if(error){
        return(
            <Layout>
                <div className="text-center">
                    {error}
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