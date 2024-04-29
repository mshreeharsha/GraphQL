import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'

const ALL_USERS = gql`
    query getUsers{
        users{
            id,
            name
        }
    }
`

const ALL_MOVIES = gql`
    query getAllMovies{
        movies{
            id,
            title
        }
    }
`

const UPDATE_USER = gql`
    mutation updateUser($updateUser: UpdateUserType!, $id:ID!){
        updateUser(updateUser : $updateUser,id:$id){
            id,
            name,
            username,
            age,
            nationality
        }
    }
`

const EditModal = ({openEditModal,cancelModal,user,refetch}) => {

    const [name,setName] = useState(user?.name)
    const [userName,setUserName] = useState(user?.username)
    const [age,setAge] = useState(user?.age)

    const friends = user?.friends.map((friend)=>(friend.id))
    const [selectedFriends,setSelectedFriends] = useState(friends)

    const movies = user?.favouriteMovies.map((movie)=>(movie.id))
    const [selectedMovies,setSelectedMovies] = useState(movies)

    const {data,loading,error} = useQuery(ALL_USERS)
    const allUsers = data?.users.filter((u)=>u.id !== user.id)

    const [handleSubmit,{data:updateData,error:updateUserError}] = useMutation(UPDATE_USER)
    const {data:movieData} = useQuery(ALL_MOVIES)

    const isMissing = !name || !age || !userName

    const handleClick= (e)=>{
        if(e.target === e.currentTarget){
            cancelModal(false)
        }
    }

    //Handling the selection of Friends
    const handleFriendsSelection = (e)=>{
        const userId = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedFriends((prev) => [...prev, userId]);
        } else {
            setSelectedFriends((prev) => prev.filter((id) => id !== userId));
        }
    }

    //Handle Selection of Movies
    const handleMoviesSelection = (e)=>{
        const movieId = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedMovies((prev) => [...prev, movieId]);
        } else {
            setSelectedMovies((prev) => prev.filter((id) => id !== movieId));
        }
    }

    if(!openEditModal)return null

  return (
    <div className='outerModalContainer' onClick={handleClick}>
      <div className='innerModalContainer'>
        {updateData ? <div className='text-center' style={{color: "#65B741"}}>
            <b>User Updated Successfully!!</b>
        </div>:<></>}
        {error ? <div className='text-center' style={{color: "#FF6363"}}>
            <b>{error.message}</b>
        </div>:isMissing? <div className='text-center' style={{color: "#FF6363"}}>
            <b>Fields must not be empty!!</b>
        </div>:<></>}
        {updateUserError ? <div className='text-center' style={{color: "#FF6363"}}>
            <b>{updateUserError.message}</b>
        </div>:<></>}
        {loading?<div className='text-center'>
            Loading...
        </div>:<></>}
        <div className='d-flex flex-row justify-content-between align-items-center py-2'>
            <h2 className='text-center' style={{color:"#a30070"}}>Update User Details</h2>
            <button className='btn btn-danger my-2' onClick={()=>cancelModal(false)} >X</button>
        </div>
        <form>
            <div className="form-group py-1">
                <label htmlFor="name">Name : </label>
                <input type="text" className="form-control" id="name" placeholder="Name" 
                value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group py-1">
                <label htmlFor="username">UserName : </label>
                <input type="text" className="form-control" id="username" placeholder="Username" 
                value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className="form-group py-1">
                <label htmlFor="age">Age : </label>
                <input type="number" className="form-control" id="age" placeholder="Age" min={0} value={age}
                onChange={(e)=>setAge(e.target.value)}/>
            </div>
            <div className="form-group py-1">
                <label htmlFor="nationality">Nationality : </label>
                <input type="text" className="form-control" disabled id="nationality" placeholder="Nationality" value={user?.nationality}/>
            </div>
            <label>Friends : </label>
            <div className='py-2'>
                {allUsers.map((user)=>(
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="box1" value={user.id} 
                            onChange={handleFriendsSelection}
                            checked={selectedFriends?.includes(user.id)}
                        />
                        <label className="form-check-label" htmlFor="box1">{user.name}</label>
                    </div>
                ))}
            </div>
            <label>Favourite Movies : </label>
            <div>
                {movieData?.movies.map((movie)=>(
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="box1" value={movie.id} 
                            onChange={handleMoviesSelection}
                            checked={selectedMovies?.includes(movie.id)}
                        />
                        <label className="form-check-label" htmlFor="box1">{movie.title}</label>
                    </div>
                ))}
            </div>
            <button type='button' disabled={isMissing} onClick={()=>{handleSubmit(
                {variables:
                    {
                        "updateUser":
                        {
                            "name":name,
                            "username":userName,
                            "age":Number(age),
                            "friends":selectedFriends,
                            "favouriteMovies":selectedMovies
                        },
                        "id":user.id
                    }})
                    refetch();
                }} 
                className='btn btn-info my-2'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditModal
