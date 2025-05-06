import { Link } from 'react-router'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/firebase.js'
import './resetPassword.scss'

export default function ResetPassword() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      setError('Заполните все поля');
      return
    }
    sendPasswordResetEmail(auth, email)
      .then((user) => {
        console.log('Письмо для сброса пароля отправлено');
        console.log(user);
        setEmail('');
        setError('Инструкции по сбросу пароля отправлены на вашу почту');
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      })
  }
  return (
    <div className="reset-password">
      <div className="reset-password__wrapper">
        <div className="reset-password__img">
          <img src="/images/donut.png" alt="Доставка" />
        </div>
        <form onSubmit={handleSubmit} className='reset-password__form'>
          {error && <p className='reset-password__form-error'>{error}</p>}
          <h4>Сброс пароля</h4>
          <div className='reset-password__form-info'>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='input user-email' type="text" placeholder='Email' />
          </div>
          <button className='reset-password__button'>Сбросить пароль</button>
          <p className='reset-password__form-link'>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </form>
      </div>
    </div>
  )
}
