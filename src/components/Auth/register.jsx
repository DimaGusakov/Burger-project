import { Link } from 'react-router'
import deliveryImg from '../../assets/donut.png'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase.js'
import './register.scss'
import { useNavigate } from 'react-router'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || passwordConfirm === '') {
      setError('Заполните все поля');
      return
    }
    if (password !== passwordConfirm) {
      setError('Пароли не совпадают');
      return
    }
    createUserWithEmailAndPassword(auth, name, email, password)
      .then((user) => {
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setError('');
        navigate('/home')
      })
      .catch((error) => {
        setError("Пользователь с таким email уже существует");
      })
  }
  return (
    <div className="register">
      <div className="register__wrapper">
        <div className="register__img">
          <img src={deliveryImg} alt="Доставка" />
        </div>
        <form onSubmit={handleSubmit} className='register__form'>
          {error && <p className='register__form-error'>{error}</p>}
          <h4>Регистрация</h4>
          <div className='register__form-info'>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='input user-name' placeholder='Имя' />
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='input user-email' placeholder='Email' />
            <div className='register__form-info-password'>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='input user-password' type={passwordVisible ? 'text' : 'password'} placeholder='Пароль' />
              <button onClick={() => (!passwordVisible ? setPasswordVisible(true) : setPasswordVisible(false))} type='button' className='register__form-info-password-btn'>{passwordVisible ? '🔒' : '👁️'}</button>
            </div>
            <div className='register__form-info-password'>
              <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className='input user-password' type={passwordConfirmVisible ? 'text' : 'password'} placeholder='Повторите пароль' />
              <button onClick={() => (!passwordConfirmVisible ? setPasswordConfirmVisible(true) : setPasswordConfirmVisible(false))} type='button' className='register__form-info-password-btn'>{passwordConfirmVisible ? '🔒' : '👁️'}</button>
            </div>

          </div>
          <button className='register__button'>Зарегистрироваться</button>
          <p className='register__form-link'>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </form>
      </div>
    </div>
  )
}
