import { gql, useMutation} from '@apollo/client'
import React, { useState } from 'react'


const languageList = ["Hindi","Kannada","English","Telugu","Tamil","Malayalum"]

const UPDATE_MOVIE = gql`
    mutation updateMvie($updateMovie: UpdateMovieType!, $id: ID!){
        updateMovie(updateMovie : $updateMovie, id : $id){
            id,
            title
        }
    }
`

const EditMovieModal = ({openEditModal,cancelModal, refetch, movie}) => {

    const [title,setTitle] = useState(movie.title)
    const [yearOfRelease,setYearOfRelease] = useState(movie.yearOfRelease)
    const [selectedLanguages,setSelectedLanguages]= useState([...movie.languages])
    const [inTheaters,setInThreaters] = useState(movie.inTheaters === true?1:0)

    const [visited,setVisited] = useState({
        title:false,
        yearOfRelease:false,
        selectedLanguages:false,
    })

    //Add user Mutation
    const [handleSubmit,{data,loading,error}] = useMutation(UPDATE_MOVIE)

    //Handling Friend Selection
    const handleLanguageSelection = (e)=>{
        const language = e.target.value
        const checked = e.target.checked

        if(checked){
            setSelectedLanguages((prev)=> [...prev,language])
        }
        else{
            setSelectedLanguages((prev)=>prev.filter((id)=> id !== language))
        }
    }

    if(!openEditModal){
        return null
    }

    const handleClick = (e)=>{
        if(e.target === e.currentTarget){
            cancelModal(false)
        }
    }

    const isMissing = (!title || !yearOfRelease || !selectedLanguages) && (visited.title && visited.yearOfRelease && visited.selectedLanguages)

    const isDisabled =(!title || !yearOfRelease || !selectedLanguages)

  return (
    <div className='outerModalContainer' onClick={handleClick}>
      <div className='innerModalContainer'>
        {data ? <div className='text-center' style={{color: "#65B741"}}>
            <b>Movie Updated Successfully!!</b>
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
            <h2 className='text-center' style={{color:"#a30070"}}>Update Movie</h2>
            <button className='btn btn-danger my-2' onClick={()=>cancelModal(false)} >X</button>
        </div>
        <form>
            <div className="form-group py-1">
                <label htmlFor="title">Title : </label>
                <input type="text" className="form-control" id="title" placeholder="Title" 
                value={title} onChange={(e)=>setTitle(e.target.value)}
                onFocus={()=>setVisited((prev)=>({...prev,title:true}))} />
            </div>
            <div className="form-group py-1">
                <label htmlFor="yearOfRelease">Year Of Release : </label>
                <input type="number" className="form-control" id="yearOfRelease" placeholder="Year Of Release" 
                value={yearOfRelease} onChange={(e)=>setYearOfRelease(e.target.value)}
                onFocus={()=>setVisited((prev)=>({...prev,yearOfRelease:true}))}/>
            </div>
            <label>Languages : </label>
            <div className='py-2'>
                {languageList.map((language)=>(
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="box1" value={language} 
                            onChange={handleLanguageSelection}
                            checked={selectedLanguages?.includes(language)}
                        />
                        <label className="form-check-label" htmlFor="box1">{language}</label>
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <label>Currently In Threaters : </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="yes" value={1} onChange={(e)=>setInThreaters(Number(e.target.value))}
                    checked={inTheaters === 1}/>
                    <label className="form-check-label" htmlFor="yes">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="no" value={0} onChange={(e)=>setInThreaters(Number(e.target.value))}
                    checked={inTheaters === 0}/>
                    <label className="form-check-label" htmlFor="no">No</label>
                </div>
            </div>
            <button type='button' disabled={isDisabled} onClick={()=>{handleSubmit(
                {variables:
                    {
                        "updateMovie":
                        {
                            "title":title,
                            "yearOfRelease":Number(yearOfRelease),
                            "languages":selectedLanguages,
                            "inTheaters": Boolean(Number(inTheaters))
                        },
                        "id":movie.id
                    }})
                    refetch();
                }} 
                className='btn btn-info my-2'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditMovieModal