import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({user}) => {
  return (
    <>
    <div className="col-1"></div>
    <div className='col-5 rounded-2 p-4' style={{border: "solid 2px #f6009c",backgroundColor:"#F6F5F2"}}>
        <h3 className='text-center pb-2'><Link to={`/user/${user.id}`} key={user.id} style={{textDecoration: "none",color:"inherit"}}>{user.name}</Link></h3>
        <div style={{lineHeight: "1.0"}}>
            <p>UserName : <b>{user.username}</b></p>
            <p>Age : {user.age}</p>
            <p>Nationality : {user.nationality}</p>
            {user.friends.length > 0 && <><p>Friends : </p>
            <ul>
                 {user.friends?.map((friend)=>(
                    <li key={friend.id}><i>{friend.name}</i></li>
                 ))}
            </ul></>}
            {user.favouriteMovies.length > 0 && <><p>Favourite Movies : </p>
            <ul>
                 {user.favouriteMovies?.map((movie)=>(
                    <li key={movie.id}><i>{movie.title}</i></li>
                 ))}
            </ul></>}
        </div>
    </div>
    </>
  )
}

export default UserCard