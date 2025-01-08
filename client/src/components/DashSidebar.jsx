import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles/dashSidebar.css'

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');

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
          <p>Sign out</p>
        </div>
    </div>
  );
}
