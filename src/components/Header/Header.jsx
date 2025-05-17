import './Header.scss';
import UserIcon from '../icons/UserIcon';
import { Link } from 'react-router';
import { useGetUserQuery } from "../../Service/databaseApi";
import { auth } from "../../firebase/firebase";

export default function Header( {stateCart, stateProducts}) {
  const { addToCart } = stateCart
  const {products} = stateProducts
  const productRandom = products.burgers.items[Math.floor(Math.random() * products.burgers.items.length)]

  const userId = auth.currentUser?.uid
  const { data: userData } = useGetUserQuery(userId, {
    skip: !userId
  })
  
  const isProfileFilled = () => {
    if (!userData) return false;
    
    
    const requiredFields = ['name', 'lastName', 'phone', 'address', 'dateBirthday'];
    for (const field of requiredFields) {
      if (!userData[field] || userData[field].trim() === '') {
        return false;
      }
    }
    return true;
  }
  
  return (
    <header className="header">
      <Link to="/profile" className="header__user">
        <UserIcon />
        {!isProfileFilled() && <div className="fill-fields not-filled">•</div>}
      </Link>
      <div className="header__logo">
        <a href="#"><img src="/images/logo.svg" alt=""/></a>

       
      </div>
      <div className="header__inner">
        <div className="header__burger">
          <img src="/images/burger-img.png" alt=""/>
        </div>
        <div className="header__text">
          <div>
            <h1>Только самые <span>сочные бургеры!</span></h1>
            <p>Бесплатная доставка от 599₽</p>
          </div>
          <button className='header__button none' onClick={() => addToCart(productRandom)}>Добавить</button>
        </div>
      </div>
    </header>
  )
}