import './Profile.scss'
import UserIcon from '../icons/UserIcon'
import { Link } from 'react-router'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router'
import { db } from '../../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      const userDocRef = doc(db, 'users', auth.currentUser.uid)
      const userDocSnap = await getDoc(userDocRef)
      if (userDocSnap.exists()) {
        setUser(userDocSnap.data())
      } else {
        setError('Пользователь не найден')
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="profile">
      <div className="profile__wrapper">
        <div className="profile__header">
          <h2>Личный кабинет</h2>
          <Link to="/home" className="profile__return-btn">Вернуться на главную</Link >
        </div>
        <div className="profile__info">
          <div className="profile__avatar">
            <UserIcon />
          </div>
          <div className="profile__details">
            <h3>Информация о пользователе</h3>
            <div className="profile__field">
              <span className="profile__label">Имя:</span>
              <span className="profile__value">{user.name}</span>
            </div>
            <div className="profile__field">
              <span className="profile__label">Email:</span>
              <span className="profile__value">{user.email}</span>
            </div>
            <div className="profile__field">
              <span className="profile__label">Телефон:</span>
              <span className="profile__value">+375 29 166 50 41</span>
            </div>
          </div>
        </div>
        <button onClick={() => {
          signOut(auth)
            .then(() => {
              navigate('/login')
            })
            .catch((error) => {
              console.log(error)
            })
        }} className="profile__logout-btn">Выйти</button>
      </div>
    </div>
  )
} 
