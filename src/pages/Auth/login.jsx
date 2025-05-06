import { Link } from 'react-router'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase.js'

import './login.scss'
import { useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Заполните все поля');
      return
    } 
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log('Пользователь успешно авторизован');
        console.log(user);
        setEmail('');
        setPassword('');
        setError('');
        navigate('/home')
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          setError('Неверный email');
        } else if (errorCode === 'auth/wrong-password') {
          setError('Неверный пароль');
        } else {
          setError('Ошибка авторизации');
        }
      })
  }
  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__img">
          <img src="/images/donut.png" alt="Доставка" />
        </div>
        <form onSubmit={handleSubmit} className='login__form'>
          {error && <p className='login__form-error'>{error}</p>}
          <h4>Вход</h4>
          <div className='login__form-info'>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='input user-email' type="text" placeholder='Email' />
            <div className='login__form-info-password'>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='input user-password' type={passwordVisible ? 'text' : 'password'} placeholder='Пароль' />
              <button onClick={() => (!passwordVisible ? setPasswordVisible(true) : setPasswordVisible(false))} type='button' className='login__form-info-password-btn'>{passwordVisible ? '🔒' : '👁️'}</button>
            </div>    
          </div>
          <p className='login__form-forgot-password'>Забыли пароль? <Link to="/reset-password">Сбросить пароль</Link></p>
          <button className='login__button'>Войти</button>
          <p className='login__form-link'>Уже есть аккаунт? <Link to="/register">Зарегистрироваться</Link></p>
        </form>
      </div>
    </div>
  )
}
