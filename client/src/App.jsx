import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import PageNotFound from './pages/PageNotFound'
import SignupForm from './pages/Signup'
import Footer from './components/Footer'
import SigninForm from './pages/Signin'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdmicPost from './components/OnlyAdmicPost'
import UpdatePost from './pages/UpdatePost'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' Component={Contact} />
        <Route path='/signup' Component={SignupForm} />
        <Route path='/signin' Component={SigninForm} />
        <Route path='/post/:postSlug' element={<PostPage/>} />
        <Route Component={PrivateRoute}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route Component={OnlyAdmicPost}>
          <Route path='/create-post' Component={CreatePost} />
          <Route path='/update-post/:postId' Component={UpdatePost} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
