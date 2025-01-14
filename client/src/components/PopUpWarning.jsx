import React from 'react'
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess 
  } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import './styles/popUpWarning.css'

export default function PopUpWarning({deleteWarning}) {
  const {currentUser, error} = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  function handleClick(){
    deleteWarning(false);
  }

  async function handleDeleteUser() {
    deleteWarning(false);
    try{
      dispatch(deleteUserStart());
      console.log(`user-id: ${currentUser._id}`);
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }else{
        dispatch(deleteUserSuccess(data));
      }
    }catch(err){
      dispatch(deleteUserFailure(err.message));
    }
  }

  return (
    <div className="pop-up-warning">
        <h4><i className="fa-solid fa-xmark" onClick={handleClick}></i></h4>
        <span><i className="fa-solid fa-circle-exclamation"></i></span>
        <p>Are you sure you wanna delete account?</p>
        <button className='dlt-user' onClick={handleDeleteUser} >Yes</button>
        <button className='cancel-dlt' onClick={handleClick}>Cancel</button>
    </div>
  )
}
