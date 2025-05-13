import Products from "./Products/Products"
import Users from "./Users/Users"
import Orders from "./Orders/Orders"

import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import './Admin.scss'

export default function Admin() {
  const navigate = useNavigate()
  const signOutClick = () => {
    signOut(auth)
    navigate('/login')
  }

  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="admin">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">YourMeal Admin</h1>
        </div>
        <nav className="navigation">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <span className="nav-icon dashboard-icon">📊</span>
            Дашборд
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
          >
            <span className="nav-icon products-icon">🍔</span>
            Продукты
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
          >
            <span className="nav-icon orders-icon">🛒</span>
            Заказы
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
          >
            <span className="nav-icon users-icon">👥</span>
            Пользователи
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}  `}
          >
            <span className="nav-icon settings-icon">⚙️</span>
            Настройки
          </button>
          <button className="nav-item" onClick={signOutClick}>
            <span className="nav-icon logout-icon">←</span>
            Выйти
          </button>
        </nav>
      </aside>
      <main className="content-products">
        {activeTab === 'products' && <Products />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'users' && <Users />}
      </main>
    </div>
  )
}
