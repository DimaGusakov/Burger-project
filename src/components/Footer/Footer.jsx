import './Footer.scss'
import VK from './../../assets/vk.svg'
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer__top">
          <div className="footer__logo">
            <a href="#"><img src="src/assets/footer-logo.svg" alt="Логотип"/></a>
          </div>
          <div className="footer__info">
            <div className="footer__info-phone">
              <p>Номер для заказа</p>
              <a href="tel:+79308333811"><img src="src/assets/phone.svg" alt="Телефон"/>+7(930)833-38-11</a>
            </div>
            <div className="footer__info-social">
              <p>Мы в соцсетях</p>
              <div>
                <a href="#">
                  <img src={VK} alt="VK"/>
                </a>
                <a href="#">
                  <img src="src/assets/telegram.svg" alt="Telegram"/>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© YouMeal, 2022</p>
          <p>Design: Anastasia Ilina</p>
        </div>
      </div>
    </footer>
  )
}

