import React from 'react'
import { useSelector } from 'react-redux'
import './styles/dashProfile.css'

export default function DashProfile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="dash-profile">
      <h3>Profile</h3>
      <form className='profile-form'>
        <div className="img-box">
          <img src={currentUser.profilePicture} alt="profile" />
        </div>
        <div className="inputs">
          <input 
            type="text"
            id='username'
            placeholder='username'
            defaultValue={currentUser.username} 
            />
          <input 
            type="email"
            id='email'
            placeholder='email'
            defaultValue={currentUser.email} 
            />
        </div>
        <button  type='submit'>
          Update
        </button>
      </form>
      <div className="d-op">
        <span >Delete account</span>
        <span >Sign out</span>
      </div>
    </div>
  )
}
