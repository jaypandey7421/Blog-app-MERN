import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
import './styles/dashSidebar.css'

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
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

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    },[location.search]);

  return (
    <div className="sidebar">
        <div className="sidebar-item">
          <i className="fa-solid fa-user"></i>
          <Link to='/dashboard?tab=profile'>Profile</Link>
        </div>
        <div className="sidebar-item">
          <i className="fa-solid fa-arrow-right "></i>
          <p onClick={handleSignout}>Sign out</p>
        </div>
    </div>
  );
}
