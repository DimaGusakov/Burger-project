import { useGetUserQuery, useUpdateUserMutation } from "../../../Service/databaseApi"
import { auth } from "../../../firebase/firebase";
import { useState, useEffect } from "react";

export default function PersonalInfo() {
  
  const userId = auth.currentUser?.uid
  const {data: userData, isLoading, isError, error} = useGetUserQuery(userId, {
    skip: !userId
  })
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateBirthday, setDateBirthday] = useState("")
  
  const [updateUser] = useUpdateUserMutation()

 
  useEffect(() => {
    if (userData) {
      setName(userData.name || "")
      setEmail(userData.email || "")
      setPhone(userData.phone || "")
      setLastName(userData.lastName || "")
      setDateBirthday(userData.dateBirthday || "")
    }
  }, [userData]);

  const formSubmit = async () => {
    try {
      const result = await updateUser({
        userId,
        userData: {
          name,
          email,
          phone,
          lastName,
          dateBirthday
        }
      });
    } 
    catch (error) {
      return <div>Ошибка: {error.message}</div>;
    }
  }
  
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка: {error.message}</div>;
  if (!userData) return <div>Данные пользователя не найдены</div>;

  return (
    <form onSubmit={formSubmit} className="form">
      <h2>Личная информация</h2>

      <div className="gender">
        <label>Пол</label>
        <div>
          <button>Мужской</button>
          <button>Женский</button>
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            name="firstName"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Введите имя"
          />
        </div>
        <div className="form-group">
          <label>Фамилия</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Введите фамилию"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          disabled
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
        />
      </div>

      <div className="form-group">
        <label>Адрес</label>
        <input
          type="text"
          name="address"
          placeholder="Введите адрес"
        />
      </div>

      <div className="row">
        <div className="form-group">
          <label>Телефон</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}

            placeholder="Введите номер телефона"
          />
        </div>
        <div className="form-group">
          <label>Дата рождения</label>
          <input
            type="text"
            name="dob"
            placeholder="ДД.ММ.ГГГГ"
            value={dateBirthday}
            onChange={(e) => setDateBirthday(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <label>Местоположение</label>
          <select
            name="location"

          >
            <option value="Минск, Беларусь">Минск, Беларусь</option>
            <option value="Брест, Беларусь">Брест, Беларусь</option>
            <option value="Гродно, Беларусь">Гродно, Беларусь</option>
            <option value="Гомель, Беларусь">Гомель, Беларусь</option>
            <option value="Витебск, Беларусь">Витебск, Беларусь</option>
            <option value="Могилев, Беларусь">Могилев, Беларусь</option>
          </select>
        </div>
        <div className="form-group">
          <label>Почтовый индекс</label>
          <input
            type="text"
            name="postalCode"
            placeholder="Введите почтовый индекс"
          />
        </div>
      </div>

      <div className="actions">
        <button>Сохранить изменения</button>
      </div>
    </form>
    
  )
}