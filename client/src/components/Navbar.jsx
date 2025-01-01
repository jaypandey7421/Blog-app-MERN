import React, { useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  const [linkToggle, setLinkToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <>
      <nav className="navbar">
        <div className="brand">
            <span className="brand-name">Brand</span>
        </div>
        <ul className={"nav-links "+ (linkToggle ? 'nav-active': '')}>
            <li>
              <Link to={"/"} className={currentPath=== '/'? 'active-link': ''}>Home</Link>
            </li>
            <li>
              <Link to={"/about"} className={currentPath=== '/about'? 'active-link': ''} >About</Link>
            </li>
            <li>
              <Link to={"/contact"}  className={currentPath=== '/contact'? 'active-link': ''} >Services</Link>
            </li>
        </ul>
        <div className={"search-container "}  >
            <button className="search-icon" 
              aria-label="Search" 
              onClick={()=> handleSearchToggle(setSearchToggle)}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input type="text" 
              className={"search-bar "+  (searchToggle? 'display-search-input': '')} 
              placeholder="Search..." 
            />
        </div>
        <button className="sign-in-btn">Sign In</button>
        <button 
          className="toggle-btn" 
          aria-label="Toggle navigation" 
          onClick={()=> handleLinkToggle(setLinkToggle)}>
            ☰
        </button>
    </nav>
    </>
  )
}

function handleLinkToggle( setLinkToggle){
  setLinkToggle(pre => !pre);
}

function handleSearchToggle(setSearchToggle){
  setSearchToggle(pre => !pre);
}
