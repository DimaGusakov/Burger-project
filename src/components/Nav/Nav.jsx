import ChesburgerImg from './../../assets/chesburger-nav.svg'
import OnionImg from './../../assets/onion-nav.svg'
import HotdogImg from './../../assets/hotdogs-nav.svg'
import ComboImg from './../../assets/combo-nav.svg'
import ShaurmaImg from './../../assets/shurma-nav.svg'
import PizzaImg from './../../assets/pizza-nav.svg'
import VokImg from './../../assets/vok-nav.svg'
import DonutImg from './../../assets/donut-nav.svg'
import SouseImg from './../../assets/souse.svg'
import './Nav.scss'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav__item active">
          <img src={ChesburgerImg} alt="Бургеры"/>
          <a href="#">Бургеры</a>
        </div>

        <div className="nav__item">
          <img src={OnionImg} alt="Закуски"/>
          <a href="#">Закуски</a>
        </div>

        <div className="nav__item">
          <img src={HotdogImg} alt="Хот-доги"/>
          <a href="#">Хот-доги</a>
        </div>

        <div className="nav__item">
          <img src={ComboImg} alt="Комбо"/>
          <a href="#">Комбо</a>
        </div>

        <div className="nav__item">
          <img src={ShaurmaImg} alt="Шаурма"/>
          <a href="#">Шаурма</a>
        </div>

        <div className="nav__item">
          <img src={PizzaImg} alt="Пицца"/>
          <a href="#">Пицца</a>
        </div>

        <div className="nav__item">
          <img src={VokImg} alt="Вок"/>
          <a href="#">Вок</a>
        </div>

        <div className="nav__item">
          <img src={DonutImg} alt="Десерты"/>
          <a href="#">Десерты</a>
        </div>

        <div className="nav__item">
          <img src={SouseImg} alt="Соусы"/>
          <a href="#">Соусы</a>
        </div>
      </div>


    </nav>
  )
}