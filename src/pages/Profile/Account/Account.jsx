import { useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from "../../../firebase/firebase";
import { signOut } from 'firebase/auth';


import PersonalInfo from './PersonalInfo'
import InfoLoginandPassword from './InfoLoginandPassword'

export default function Account() {
    const [activeTab, setActiveTab] = useState("personal")
    const navigate = useNavigate()
    const signOutClick = () => {
        signOut(auth)
        navigate('/login')
    }
    return (
    <>
      <div className="tabs">
        <button
          className={activeTab === 'personal' ? 'active' : ''}
          onClick={() => setActiveTab('personal')}
        >
          Личная информация
        </button>
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          Логин и пароль
        </button>
        <button onClick={signOutClick}>Выйти</button>
      </div>
      {activeTab === 'personal' && <PersonalInfo />}
      {activeTab === 'login' && <InfoLoginandPassword/>}
    </>
  )
}