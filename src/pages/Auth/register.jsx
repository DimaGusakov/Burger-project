import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth'
import { auth } from '../../firebase/firebase.js'
import { useAddUserMutation } from '../../Service/databaseApi.js'
import './register.scss'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false)
  const [addUser, { isLoading }] = useAddUserMutation()

  const handleSubmit = e => {
    e.preventDefault()
    if (name === '' || email === '' || password === '' || passwordConfirm === '') {
      setError('Заполните все поля')
      return
    }
    if (password !== passwordConfirm) {
      setError('Пароли не совпадают')
      return
    }
    let createdUser
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        createdUser = userCredential.user
        return addUser({
          userId: createdUser.uid,
          userData: {
            name,
            email,
            role: 'Пользователь',
            cart: [],
            createdAt: new Date().toISOString()
          }
        }).unwrap()
      })
      .then(() => {
        setName('')
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setError('')
        navigate('/home')
      })
      .catch(err => {
        setError(err.message)
        if (createdUser) {
          deleteUser(createdUser).catch((err) => {setError(err.message)})
        }
      })
  }

  return (
    <div className="register">
      <div className="register__wrapper">
        <div className="register__img">
          <img src="/images/donut.png" alt="Доставка" />
        </div>
        <form onSubmit={handleSubmit} className="register__form">
          {error && <p className="register__form-error">{error}</p>}
          <h4>Регистрация</h4>
          <div className="register__form-info">
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="input user-name" placeholder="Имя" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input user-email" placeholder="Email" />
            <div className="register__form-info-password">
              <input value={password} onChange={e => setPassword(e.target.value)} className="input user-password" type={passwordVisible ? 'text' : 'password'} placeholder="Пароль" />
              <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="register__form-info-password-btn">
                {passwordVisible ? '🔒' : '👁️'}
              </button>
            </div>
            <div className="register__form-info-password">
              <input value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} className="input user-password" type={passwordConfirmVisible ? 'text' : 'password'} placeholder="Повторите пароль" />
              <button type="button" onClick={() => setPasswordConfirmVisible(!passwordConfirmVisible)} className="register__form-info-password-btn">
                {passwordConfirmVisible ? '🔒' : '👁️'}
              </button>
            </div>
          </div>
          <button type="submit" className="register__button" disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
          <p className="register__form-link">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </form>
      </div>
    </div>
  )
}
