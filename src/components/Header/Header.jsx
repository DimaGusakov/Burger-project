import LogoImg from './../../assets/logo.svg';
import BurgerImg from './../../assets/burger-img.svg';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="#"><img src={LogoImg} alt=""/></a>
      </div>
      <div className="header__inner">
        <div className="header__burger">
          <img src={BurgerImg} alt=""/>
        </div>
        <div className="header__text">
          <div>
            <h1>Только самые <strong>сочные бургеры!</strong></h1>
            <p>Бесплатная доставка от 599₽</p>
          </div>
          <button>Добавить</button>
        </div>
      </div>
    </header>
  )
}