import './Cart.scss';
import {changeQuantity} from './helper/helper.js';
import { useState } from 'react';

export default function Cart({stateCart, stateModalContent, stateModal}) {
  const {cart, setCart} = stateCart;
  const {modalContent, setModalContent} = stateModalContent;
  const {modalActive, setModalActive} = stateModal;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const price = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeDelivery = count > 7 || price > 2500;

  const [cartActive, setCartActive] = useState(false);
  return (
    
    <div className="cart">
      <button onClick={() => setCartActive(!cartActive)} className={`cart-btn ${cartActive ? 'active' : ''}`}>
        <p>Корзина</p>
        <div className="cart-count">
          <p>{count}</p>
        </div>
      </button>
      <div className="cart-container">
        <div className={`cart__wrapper ${cartActive ? 'active' : ''}`}>
          <div className={`cart-header ${cart.length === 0 ? 'opacity-0-5' : ''}`}>
            <h3 className="cart-title">Корзина</h3>
            <p className="cart-count">{count}</p>
          </div>
          {cart.length === 0 ? (
            <div className="cart-empty opacity-0-5">
              <p>Тут пока пусто :(</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item__info">
                      <img src={item.image} alt={item.name} className="cart-item__image" />
                      <div className="cart-item__details">
                        <div className="cart-item__detail-wrapper">
                          <h4 className="cart-item__name">{item.name}</h4>
                          <p className="cart-item__weight">{item.weight}</p>
                          <p className="cart-item__price">{item.price}₽</p>
                        </div>
                        <div className="cart-item__quantity">
                          <button
                            className="quantity-btn"
                            onClick={() => changeQuantity(item.id, -1, cart, setCart)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => changeQuantity(item.id, 1, cart, setCart)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

              <div className="cart-total">
                <p className="total-text">Итого</p>
                <p className="total-price">{price}₽</p>
              </div>

              <button className="checkout-btn" onClick={() => {
                setModalContent('delivery');
                setModalActive(true);
              }}>Оформить заказ</button>

              {freeDelivery && (
                <div className="delivery-info">
                  <img src="/images/icon-delivery.png" alt="Доставка" className="delivery-icon" />
                    <p>Бесплатная доставка</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}