import React from 'react';

export default function CartItem({ item, changeQuantity }) {
  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <img src={item.image} alt={item.name} className="cart-item__image" />
        <div className="cart-item__details">
          <div className="cart-item__detail-wrapper">
            <h4 className="cart-item__name">{item.name}</h4>
            <p className="cart-item__weight">{item.weight}</p>
            <p className="cart-item__price">{item.price}₽</p>
          </div>
          <div className="cart-item__quantity">
            <button className="quantity-btn" onClick={() => changeQuantity(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button className="quantity-btn" onClick={() => changeQuantity(item.id, 1)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
} 