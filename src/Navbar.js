import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
  const roleId=localStorage.getItem("roleId");
  return (
    <div>
       <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid text-light">
    <Link className="navbar-brand " to={'/'}>Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'/read'}>Books</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/create'}>ADD BOOKS</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to={'/edit/:id'}>Edit Movie</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to={'/update/:id'}>EDIT BOOKS</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar