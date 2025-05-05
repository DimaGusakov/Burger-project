import { useGetUserQuery, useUpdateUserMutation } from "../../../Service/databaseApi"
import { auth } from "../../../firebase/firebase";
import { useState, useEffect } from "react";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'

export default function InfoLoginandPassword() {
  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const handlePasswordChange = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setError("Новые пароли не совпадают")
      return
    }
    
    if (newPassword.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      return
    }
    
    try {
      const user = auth.currentUser
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
      
      setSuccess("Пароль успешно изменен")
      setError("")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setError("Неверный текущий пароль")
    }
  }
  
  return (
    <form onSubmit={handlePasswordChange} className="form">
      <h2>Изменение пароля</h2>
      
      <div className="form-group">
        <label>Текущий пароль</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Введите текущий пароль"
        />
      </div>
      
      <div className="form-group">
        <label>Новый пароль</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Введите новый пароль"
        />
      </div>
      
      <div className="form-group">
        <label>Подтвердите новый пароль</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите новый пароль"
        />
      </div>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <div className="actions">
        <button type="submit" className="submit-button">
          Изменить пароль
        </button>
      </div>
      
    </form>
  )
}
