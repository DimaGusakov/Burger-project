import { useState } from 'react';
import './Cart.scss';
import DeliveryImg from '/src/assets/icon-delivery.png'
import DataCart from '../../Data/Cart.json';

export default function Cart() {
  const [cartItems, setCartItems] = useState(DataCart);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeDelivery = totalItems > 7 || totalPrice > 2500;

  const changeQuantity = (id, change) => {
    const arr = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: Math.max(1, newQuantity)
        }
      }
      return item
    })
    setCartItems(arr)
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__wrapper">
          <div className="cart-header">
            <h3 className="cart-title">Корзина</h3>
            <p className="cart-count">{totalItems}</p>
          </div>
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Тут пока пусто :(</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item__info">
                      <img src={item.url} alt={item.name} className="cart-item__image" />
                      <div className="cart-item__details">
                        <div className="cart-item__detail-wrapper">
                          <h4 className="cart-item__name">{item.name}</h4>
                          <p className="cart-item__weight">{item.weight}г</p>
                          <p className="cart-item__price">{item.price}₽</p>
                        </div>
                        <div className="cart-item__quantity">
                          <button
                            className="quantity-btn"
                            onClick={() => changeQuantity(item.id, -1)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => changeQuantity(item.id, 1)}
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
                <p className="total-price">{totalPrice}₽</p>
              </div>

              <button className="checkout-btn">Оформить заказ</button>

              {freeDelivery && (
                <div className="delivery-info">
                  <img src={DeliveryImg} alt="Доставка" className="delivery-icon" /> 
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