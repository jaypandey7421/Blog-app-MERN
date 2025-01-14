import React from 'react'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopUpWarning from './PopUpWarning';
import { 
        upadateStart, 
        updateFailure, 
        updateSuccess,
} from '../redux/user/userSlice';
import './styles/dashProfile.css'


export default function DashProfile() {
  const {currentUser, error} = useSelector((state) => state.user);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const [imgFileUploadErr, setImgFileUploadErr] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [formData, setFormData] = useState({})
  const filePickerRef = useRef();
  const dispatch = useDispatch();

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

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if(Object.keys(formData).length === 0 && imgFileUrl === null){
      setUpdateUserError('No changes made.');
      return;
    }

    try{
      dispatch(upadateStart());
      //console.log(currentUser._id);
      const res = await  fetch(`/api/user/update/${currentUser._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(res.ok);
      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        console.log(data);
        setUpdateUserSuccess("Profile updated successfully.");
      }
    }catch (err){
      dispatch(updateFailure(err.message));
      setUpdateUserError(err.message);
    }
  }

  
  return (
    <div className="dash-profile">
      <h3>Profile</h3>
      <form className='profile-form' onSubmit={handleSubmit}>
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
        {
          error && (
            <p className='err-msg'>{error}</p>
          )
        }
        {imgFileUploadErr && (
          <p className="err-msg">{imgFileUploadErr}</p>
        )}
        {
          updateUserError && (
            <p className="err-msg">{updateUserError}</p>
          )
        }
        {
          updateUserSuccess && (
            <p className="success-msg">{updateUserSuccess}</p>
          )
        }
        <div className="inputs">
          <input 
            type="text"
            id='username'
            placeholder='username'
            onChange={handleChange}
            defaultValue={currentUser.username} 
            />
          <input 
            type="email"
            id='email'
            placeholder='email'
            onChange={handleChange}
            defaultValue={currentUser.email} 
            />
          <input 
            type="password"
            id='password'
            placeholder='password'
            onChange={handleChange} 
            />
        </div>
        <button  type='submit'>
          Update
        </button>
      </form>
      <div className="d-op">
        <span onClick={()=>{setDeleteWarning(true)}}>Delete account</span>
        <span >Sign out</span>
      </div>
      {deleteWarning && <PopUpWarning deleteWarning={setDeleteWarning} />}
      
    </div>
  )
}
