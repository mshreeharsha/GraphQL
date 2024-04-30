import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { QUERY_ALL_USERS } from '../pages/UsersList'

const ADD_NEW_USER = gql`
    mutation addNewUser($newUser : NewUserType!){
        addNewUser(newUser : $newUser){
            _id
        }
    }
`

const GET_ALL_USERS = gql`
    query getAllUsers{
        users{
            _id,
            name
        }
    }
`

const GET_ALL_MOVIES = gql`
    query getAllMovies{
        movies{
            _id,
            title
        }
    }
`

const Nationality = ["INDIA","AUSTRALIA","JAMICA"]

const AddUserModal = ({openAddModal,cancelModal}) => {

    const [name,setName] = useState('')
    const [userName,setUserName] = useState('')
    const [age,setAge] = useState(null)
    const [nationality,setNationality] = useState('')
    const [selectedFriends,setSelectedFriends] = useState([])
    const [selectedMovies, setSelectedMovies] = useState([])

    const [visited,setVisited] = useState({
        name:false,
        userName:false,
        age:false,
        nationality:false
    })

    //Add user Mutation
    const [handleSubmit,{data,loading,error}] = useMutation(ADD_NEW_USER,{
        refetchQueries:[QUERY_ALL_USERS],
        onCompleted:()=>{
            cancelModal(false)
        }
    })

    //fetching all movies and all users
    const {data:movieData} = useQuery(GET_ALL_MOVIES)
    const {data:allUsers} = useQuery(GET_ALL_USERS)

    //Handling Friend Selection
    const handleFriendsSelection = (e)=>{
        const userId = e.target.value
        const checked = e.target.checked

        if(checked){
            setSelectedFriends((prev)=> [...prev,userId])
        }
        else{
            setSelectedFriends((prev)=>prev.filter((id)=> id !== userId))
        }
    }

    //Handling Movie selection
    const handleMoviesSelection = (e)=>{
        const movieId = e.target.value
        const checked = e.target.checked

        if(checked){
            setSelectedMovies((prev)=> [...prev,movieId])
        }
        else{
            setSelectedMovies((prev)=>prev.filter((id)=> id !== movieId))
        }
    }

    if(!openAddModal){
        return null
    }

    const handleClick = (e)=>{
        if(e.target === e.currentTarget){
            cancelModal(false)
        }
    }

    const isMissing = (!name || !userName || !age || !nationality) && (visited.name && visited.userName && visited.age && visited.nationality)
    const isDisabled = !name || !userName || !age || !nationality

  return (
    <div className='outerModalContainer' onClick={handleClick}>
      <div className='innerModalContainer'>
        {data ? <div className='text-center' style={{color: "#65B741"}}>
            <b>User Added Successfully!!</b>
        </div>:<></>}
        {error ? <div className='text-center' style={{color: "#FF6363"}}>
            <b>{error.message}</b>
        </div>:isMissing? <div className='text-center' style={{color: "#FF6363"}}>
            <b>Fields must not be empty!!</b>
        </div>:<></>}
        {loading?<div className='text-center'>
            Loading...
        </div>:<></>}
        <div className='d-flex flex-row justify-content-between align-items-center py-2'>
            <h2 className='text-center' style={{color:"#a30070"}}>Add New User</h2>
            <button className='btn btn-danger my-2' onClick={()=>cancelModal(false)} >X</button>
        </div>
        <form>
            <div className="form-group py-1">
                <label htmlFor="name">Name : </label>
                <input type="text" className="form-control" id="name" placeholder="Name" 
                value={name} onChange={(e)=>setName(e.target.value)}
                onFocus={()=>setVisited((prev)=>({...prev,name:true}))} />
            </div>
            <div className="form-group py-1">
                <label htmlFor="username">UserName : </label>
                <input type="text" className="form-control" id="username" placeholder="Username" 
                value={userName} onChange={(e)=>setUserName(e.target.value)}
                onFocus={()=>setVisited((prev)=>({...prev,userName:true}))}/>
            </div>
            <div className="form-group py-1">
                <label htmlFor="age">Age : </label>
                <input type="number" className="form-control" id="age" placeholder="Age" min={0} value={age}
                onChange={(e)=>setAge(e.target.value)}
                onFocus={()=>setVisited((prev)=>({...prev,age:true}))}/>
            </div>
            <div className="form-group py-3 d-flex flex-row align-items-center">
                <label htmlFor="nationality">Nationality : </label>
                <select className="custom-select mx-2"
                   value={nationality} onChange={(e)=>setNationality(e.target.value)} >
                    <option selected>Select Nationality </option>
                    {Nationality.map((nation)=>(
                        <option key={nation} value={nation}>{nation}</option>
                    ))}
                </select>
            </div>
            <label>Friends : </label>
            <div className='py-2'>
                {allUsers?.users?.map((user)=>(
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="box1" value={user._id} 
                            onChange={handleFriendsSelection}
                        />
                        <label className="form-check-label" htmlFor="box1">{user.name}</label>
                    </div>
                ))}
            </div>
            <label>Favourite Movies : </label>
            <div>
                {movieData?.movies?.map((movie)=>(
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="box1" value={movie._id} 
                            onChange={handleMoviesSelection}
                        />
                        <label className="form-check-label" htmlFor="box1">{movie.title}</label>
                    </div>
                ))}
            </div>
            <button type='button' disabled={isDisabled} onClick={()=>{handleSubmit(
                {variables:
                    {
                        "newUser":
                        {
                            "name":name,
                            "username":userName,
                            "age":Number(age),
                            "nationality":nationality,
                            "friends":selectedFriends,
                            "favouriteMovies":selectedMovies
                        }
                    }})
                }} 
                className='btn btn-info my-2'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal