import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'

const ALL_USERS = gql`
    query getUsers{
        users{
            id,
            name
        }
    }
`
const EditModal = ({openEditModal,cancelModal,user}) => {

    const [name,setName] = useState('')
    const [userName,setUserName] = useState('')
    const [age,setAge] = useState(null)

    const {data,loading,error} = useQuery(ALL_USERS)

    const handleSubmit = ()=>{
        return;
    }

    const handleClick= (e)=>{
        if(e.target === e.currentTarget){
            cancelModal(false)
        }
    }

    if(!openEditModal)return null
  return (
    <div className='outerModalContainer' onClick={handleClick}>
      <div className='innerModalContainer'>
        {error ? <div className='text-center' style={{color: "#FF6363"}}>
            <b>{error.message}</b>
        </div>:<></>}
        {loading?<div className='text-center'>
            Loading...
        </div>:<></>}
        <div className='d-flex flex-row justify-content-between align-items-center py-2'>
            <h2 className='text-center' style={{color:"#a30070"}}>Update User Details</h2>
            <button className='btn btn-danger my-2' onClick={()=>cancelModal(false)} >X</button>
        </div>
        <form onSubmit={()=>handleSubmit({variables:{"updateUser":{"name":name,"username":userName,"age":age}}})}>
            <div className="form-group py-1">
                <label htmlFor="name">Name : </label>
                <input type="text" className="form-control" id="name" placeholder="Name" 
                value={user?.name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group py-1">
                <label htmlFor="username">UserName : </label>
                <input type="text" className="form-control" id="username" placeholder="Username" 
                value={user?.username} onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className="form-group py-1">
                <label htmlFor="age">Age : </label>
                <input type="number" className="form-control" id="age" placeholder="Age" min={0} value={user?.age}
                onChange={(e)=>setAge(e.target.value)}/>
            </div>
            <div className="form-group py-1">
                <label htmlFor="nationality">Nationality : </label>
                <input type="text" className="form-control" disabled id="nationality" placeholder="Nationality" value={user?.nationality}/>
            </div>
            <label>Friends : </label>
            <div>
                {data?.users.map((user)=>(
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="box1" value={user.id}/>
                        <label className="form-check-label" htmlFor="box1">{user.name}</label>
                    </div>
                ))}
            </div>
            <button type='submit' className='btn btn-info my-2'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditModal
