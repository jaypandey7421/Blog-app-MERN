import React, { useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import './styles/navbar.css'

export default function Navbar() {
  const [linkToggle, setLinkToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const location = useLocation();
  const {currentUser} = useSelector((state)=> state.user);
  const currentPath = location.pathname;
  const dispatch = useDispatch();

  const handleSignout = async ()=>{
      try{
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }else{
          dispatch(signoutSuccess());
        }
      }catch (err){
        console.log(err.message);
      }
    };


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
        {
          currentUser? 
              (<div className="dropdown">
                <div className='drop-dwn-img'>
                  <img src={currentUser.profilePicture} alt="user" />
                </div>
                <div className="dropdown-content">
                  <ul>
                    <li>{currentUser.username}</li>
                      <li>{currentUser.email}</li>
                    <li>
                      <Link to={'/dashboard?tab=profile'}>Profile</Link>
                    </li>
                    <li onClick={handleSignout}>Sign out</li>
                  </ul>
                </div>
              </div> ): (
                <button className="sign-in-btn">
                  <Link to={"/signin"}>
                    Sign In
                  </Link>
                </button>
              )
        }
        
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
