import './Cart.scss';
import { useState } from 'react';
import CartItem from '../CartItem/CartItem';

export default function Cart({
  stateCart: { cart, totalCount, totalPrice, changeQuantity },
  stateModalContent: { setModalContent },
  stateModal: {setModalActive }
}) {
  const freeDelivery = totalCount > 7 || totalPrice > 2500;
  const [cartActive, setCartActive] = useState(false);

  return (
    <div className="cart">
      <button onClick={() => setCartActive(!cartActive)} className={`cart-btn ${cartActive ? 'active' : ''}`}>
        <p>Корзина</p>
        <div className="cart-count">
          <p>{totalCount}</p>
        </div>
      </button>
      <div className="cart-container">
        <div className={`cart__wrapper ${cartActive ? 'active' : ''}`}>
          <div className={`cart-header ${cart.length === 0 ? 'opacity-0-5' : ''}`}>
            <h3 className="cart-title">Корзина</h3>
            <p className="cart-count">{totalCount}</p>
          </div>
          {cart.length === 0 ? (
            <div className="cart-empty opacity-0-5">
              <p>Тут пока пусто :(</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} changeQuantity={changeQuantity} />
                ))}
              </div>
              <div className="cart-total">
                <p className="total-text">Итого</p>
                <p className="total-price">{totalPrice}₽</p>
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