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
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [location, setLocation] = useState("")
  const [postalCode, setPostalCode] = useState("")
  
  const [updateUser] = useUpdateUserMutation()

 
  useEffect(() => {
    if (userData) {
      setName(userData.name || "")
      setEmail(userData.email || "")
      setPhone(userData.phone || "")
      setLastName(userData.lastName || "")
      setDateBirthday(userData.dateBirthday || "")
      setGender(userData.gender || "")
      setAddress(userData.address || "")
      setLocation(userData.location || "")
      setPostalCode(userData.postalCode || "")
    }
  }, [userData]);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const formSubmit = async (e) => {
   
    try {
      const result = await updateUser({
        userId,
        userData: {
          name,
          email,
          phone,
          lastName,
          dateBirthday,
          gender,
          address,
          location,
          postalCode
        }
      });
    } 
    catch (error) {
      (`Ошибка при сохранении: ${error.message}`);
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
          <button 
            type="button" 
            className={gender === "Мужской" ? "active" : ""} 
            onClick={() => handleGenderSelect("Мужской")}
          >
            Мужской
          </button>
          <button 
            type="button" 
            className={gender === "Женский" ? "active" : ""} 
            onClick={() => handleGenderSelect("Женский")}
          >
            Женский
          </button>
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Введите почтовый индекс"
          />
        </div>
      </div>

      <div className="actions">
        <button type="submit">Сохранить изменения</button>
      </div>
    </form>
    
  )
}