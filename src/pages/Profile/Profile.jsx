import UserIcon from '../../components/icons/UserIcon'
import { Link } from 'react-router'
import Account from './Account/Account'
import Order from './Order/Order'
import { auth } from '../../firebase/firebase'
import { useGetUserQuery } from "../../Service/databaseApi"
import { useState } from 'react'

import './Profile.scss'
export default function Profile() {
  
  
  const userId = auth.currentUser?.uid
  const { data: userData, isLoading, isError } = useGetUserQuery(userId, {
    skip: !userId
  })
  
  const [activeTab, setActiveTab] = useState('account')
  return (
    <div className="profile">
      <div className="sidebar">
        <div className="sidebar-logo"></div>
        <nav>
          <ul>
            <li><Link to="/home">Главная</Link></li>

            <li><span className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>Аккаунт</span></li>
            <li><span className={activeTab === 'order' ? 'active' : ''} onClick={() => setActiveTab('order')}>Заказы</span></li>
            <li><span className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>История</span></li>
            <li><span className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>Отчет</span></li>
            <li><span className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>Уведомления</span></li>
            <li><span className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Настройки</span></li>
          </ul>
        </nav>
      </div>
      
      <div className="content">
        <div className="profile-card">
          <div className="header">
            <UserIcon />
            <div>
              {isLoading && <h3>Загрузка...</h3>}
              {isError && <h3>Ошибка при загрузке данных</h3>}
              {userData && (
                <>
                  <h3>{userData.name} {userData.lastName}</h3>
                  <p>{userData.role}</p>
                </>
              )}
            </div>
          </div>
          {activeTab === 'account' && <Account/>}
          {activeTab === 'order' && <Order/>}
          {/* {activeTab === 'history' && <History/>}
          {activeTab === 'report' && <Report/>}
          {activeTab === 'notifications' && <Notifications/>}
          {activeTab === 'settings' && <Settings/>}
         */}
        </div>
      </div>
    </div>
  )
} 
