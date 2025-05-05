import React from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import Home from '../../pages/Home/Home.jsx'
import Register from '../../pages/Auth/register.jsx'
import Login from '../../pages/Auth/login.jsx'
import ResetPassword from '../../pages/Auth/resetPassword.jsx'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import {Provider} from 'react-redux'
import { store } from '../../Store/store.js'
import Profile from '../../pages/Profile/Profile.jsx';
import './App.scss'

function App() {
  const navigate = useNavigate()

  const [authChecked, setAuthChecked] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthChecked(true)
      if (user) {
        const currentPath = window.location.pathname;
        if (currentPath === '/profile') {
          return;
        }
        navigate('/home');
      }       
      else {
        navigate('/register');
      }
    })
  }, [])

  if (!authChecked) {
    return <div className="app-loading">Проверка авторизации...</div>
  }

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Provider>
  )
}

export default App
