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
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
