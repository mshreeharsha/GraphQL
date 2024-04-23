import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#f6009c"}}>
            <div className="container-fluid flex justify-content-between">
                <div>
                    <a className="navbar-brand" href="/">GraphQL</a>
                </div>
                <div>
                    <ul className="navbar-nav flex justify-content-between fs-5">
                        <li className="nav-item">
                            <Link className='nav-link' to={'/'}><b>Home</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={'/users'}><b>User List</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={'/movies'}><b>Movie List</b></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header
