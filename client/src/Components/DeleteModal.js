import { gql, useMutation} from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { QUERY_ALL_USERS } from '../pages/UsersList'

const DELETE_USER = gql`
    mutation deleteUser($id:ID!){
        deleteUser(id:$id){
            _id
        }
    }
`

const DeleteModal = ({openDeleteModal,cancelModal,id}) => {

    const navigate = useNavigate()
    const [handleDelete,{error}] = useMutation(DELETE_USER,{
        refetchQueries: [{ query: QUERY_ALL_USERS }],
        onCompleted:()=>{
            navigate('/users')
        }
    })

    if(!openDeleteModal)return null

    const handleClick = (e)=>{
        if(e.target === e.currentTarget){
            cancelModal(false)
        }
    }

  return (
    <div className='outerModalContainer' onClick={handleClick}>
      <div className='innerModalContainer'>
        {error ? <div className='text-center' style={{color: "#FF6363"}}>
            <b>{error.message}</b>
        </div>:<></>}
        <div className='d-flex flex-row justify-content-between align-items-center py-2'>
            <h2 className='text-center' style={{color:"#a30070"}}>Delete User</h2>
            <button className='btn btn-danger my-2' onClick={()=>cancelModal(false)} >X</button>
        </div>
        <div className='mx-auto'>
            <h5 className='text-center' style={{color:"red"}}>Do you want to delete the User Details??</h5>
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <button className='btn btn-danger mx-4 my-2' onClick={()=>{handleDelete({variables:{"id":id}})}}>Yes</button>
                <button className='btn btn-info' onClick={()=>cancelModal(false)}>No</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
