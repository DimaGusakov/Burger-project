import { useState, useEffect } from "react"
import { useGetUserQuery, useDeleteUserMutation } from '../../../Service/databaseApi.js'
import { ref, get, onValue, off } from 'firebase/database'
import { db } from '../../../firebase/firebase'
import './Users.scss'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteUser] = useDeleteUserMutation()

  useEffect(() => {
    const usersRef = ref(db, 'users')
  
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const snapshot = await get(usersRef)
        
        if (snapshot.exists()) {
          const usersData = snapshot.val()
          const usersArray = Object.entries(usersData).map(([userId, userData]) => ({
            id: userId,
            ...userData
          }))
          setUsers(usersArray)
        } else {
          setUsers([])
        }
      } 
      catch (err) {
        setError('Ошибка при загрузке пользователей: ' + err.message)
      } 
      finally {
        setLoading(false)
      }
    }
    
    const userListener = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val()
        const usersArray = Object.entries(usersData).map(([userId, userData]) => ({
          id: userId,
          ...userData
        }))
        setUsers(usersArray)
        setLoading(false)
      } else {
        setUsers([])
        setLoading(false)
      }
    }, (err) => {
      setError('Ошибка при загрузке пользователей: ' + err.message)
      setLoading(false)
    })
    return () => {
      off(usersRef, 'value', userListener)
    }
  }, [])

  const handleDelete = async (userId) => {
    try {      
      await deleteUser({ userId })
    } 
    catch (err) {
      setError('Ошибка при удалении пользователя: ' + err.message)
    }
  }

  const getUserDisplayName = (user) => {
    if (user.name && user.lastName) {
      return `${user.name} ${user.lastName}`;
    }
    else if (user.name) {
      return user.name;
    }
    else if (user.lastName) {
      return user.lastName;
    }
    else {
      return 'Без имени';
    }
  }

  return (
    <div className="users">
      <div className="users-wrapper">
        <h1>Пользователи</h1>
        
        <div className="users-content">
          {loading && <p className="loading">Загрузка пользователей...</p>}
          {error && <p className="error">{error}</p>}
          
          {!loading && !error && (
            <div className="users-grid">
              {users.length === 0 ? (
                <p className="no-users">Нет зарегистрированных пользователей</p>
              ) : (
                users.map(user => (
                  <div key={user.id} className="user-card">
                    <div className="user-info">
                      <h3>{getUserDisplayName(user)}</h3>
                      <p>Email: {user.email}</p>
                      <p>Телефон: {user.phone || 'Не указан'}</p>
                      <p>Роль: {user.role || 'user'}</p>
                    </div>
                    <div className="user-actions">
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(user.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 