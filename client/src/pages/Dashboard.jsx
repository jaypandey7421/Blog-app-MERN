import React from 'react'
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import './styles/dashboard.css'
import DashPosts from '../components/DashPosts';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);

  return (
    <section className="dashboard-container">
      <DashSidebar />
      {/* Profile */}
      {tab ==='profile' && <DashProfile />}
      {tab === 'posts' && <DashPosts/>}
    </section>
  );
}
