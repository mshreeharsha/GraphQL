import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({movie}) => {
  return (
    <>
    <div className="col-1"></div>
    <div className='col-5 rounded-2 p-4' style={{border: "solid 2px #f6009c",backgroundColor:"#F6F5F2"}}>
        <h3 className='text-center pb-2'><Link to={`/movie/${movie._id}`} key={movie._id} style={{textDecoration: "none",color:"inherit"}}>{movie.title}</Link></h3>
        <div style={{lineHeight: "1.0"}}>
            <p>Year of Release : <b>{movie.yearOfRelease}</b></p>
            <p>Released in : </p>
            <ul>
                 {movie.languages.map((lang)=>(
                    <li><i>{lang}</i></li>
                 ))}
            </ul>
            <p>Currently in Theaters : <b>{movie.inTheaters ? "YES":"NO"}</b></p>
        </div>
    </div>
    </>
  )
}

export default MovieCard