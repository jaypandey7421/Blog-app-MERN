import React from 'react'
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/dashProfile.css'


export default function DashProfile() {
  const {currentUser} = useSelector((state) => state.user);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const [imgFileUploadErr, setImgFileUploadErr] = useState(null);
  const filePickerRef = useRef();

  const handleImgChange = (e)=>{
    const file = e.target.files[0];
    const fileExtension = file.name.split('.').pop();
    if(!file) return;
    if(fileExtension === 'png' || 
       fileExtension === 'jpg' || 
       fileExtension === 'jpeg')
    {
      setImgFileUrl(URL.createObjectURL(file));
    }else{
      setImgFileUploadErr('Invalid file type(only jpg, jpeg and png)');
      return;
    }
    setImgFileUploadErr(null);
  };

  
  return (
    <div className="dash-profile">
      <h3>Profile</h3>
      <form className='profile-form'>
        <input 
          type='file'
          accept='image/*'
          className='file-input'
          onChange={handleImgChange}
          ref={filePickerRef}
          hidden
        /> 
        <div 
          className="img-box"
          onClick={()=> filePickerRef.current.click()}
          >

          <img 
            src={imgFileUrl || currentUser.profilePicture} 
            alt="profile" 
            />

        </div>
        {imgFileUploadErr && (
          <p className="err-msg">{imgFileUploadErr}</p>
        )}
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
