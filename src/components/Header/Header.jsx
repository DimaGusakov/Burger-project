import './Header.scss';
import addToCart from '../InfoCard/helper/helper';
import UserIcon from '../icons/UserIcon';
import { Link } from 'react-router';
export default function Header( {stateCart, stateProducts}) {
  const {cart, setCart} = stateCart
  const {products} = stateProducts
  const productRandom = products.burgers.items[Math.floor(Math.random() * products.burgers.items.length)]
  
  return (
    <header className="header">
      <Link to="/profile" className="header__user">
        <UserIcon />
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
          <button className='header__button none' onClick={() => addToCart(productRandom, cart, setCart)}>Добавить</button>
        </div>
      </div>
    </header>
  )
}