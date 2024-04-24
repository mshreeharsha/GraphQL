import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({user}) => {
  return (
    <>
    <div className="col-1"></div>
    <div className='col-5 rounded-2 p-4' style={{border: "solid 2px #f6009c",backgroundColor:"#F6F5F2"}}>
        <h3 className='text-center pb-2'><Link to={`/user/${user.id}`} key={user.id} style={{textDecoration: "none",color:"inherit"}}>{user.name}</Link></h3>
        <div style={{lineHeight: "0.7"}}>
            <p>UserName : <b>{user.username}</b></p>
            <p>Age : {user.age}</p>
            <p>Nationality : {user.nationality}</p>
        </div>
    </div>
    </>
  )
}

export default UserCard