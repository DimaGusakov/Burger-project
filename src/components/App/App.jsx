import React from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import Home from '../Home/Home.jsx'
import Register from '../Auth/register.jsx'
import Login from '../Auth/login.jsx'
import ResetPassword from '../Auth/resetPassword.jsx'
import { useEffect } from 'react'
import { auth } from '../../firebase/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import './App.scss'
import Footer from "../Footer/Footer.jsx";
function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home')
      } else {
        navigate('/register')
      }
    })
    return () => unsubscribe()
  }, [])
  return (
    <>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
    </>
  )
}

export default App
