import addToCart from './helper/helper.js'

import { changeQuantity } from './helper/helper.js'

import { useState } from 'react'

import './InfoCard.scss'


export default function InfoCart({ stateModal, stateCart, stateSelectedProduct, stateModalContent }) {
  const { modalActive, setModalActive } = stateModal;
  const { cart, setCart } = stateCart;
  const { selectedProduct, setSelectedProduct } = stateSelectedProduct;
  const { modalContent, setModalContent } = stateModalContent;

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    return null;
  }

  const hasIngredients = selectedProduct.ingredients && Array.isArray(selectedProduct.ingredients);
  const hasDescription = selectedProduct.description && selectedProduct.description.length > 0;

  return (
    <>
      <h3>{selectedProduct.name}</h3>
      <div className="modal-info-cart__inner">
        <div className="modal-info-cart__image">
          <img src={selectedProduct.image} alt={selectedProduct.name} />
        </div>
        <div className="modal-info-cart__info">
          {hasDescription && <p className="modal-info-cart__description">{selectedProduct.description}</p>}

          {hasIngredients && (
            <div className="modal-info-cart__ingredients">

              <ul>
                <p>Состав:</p>
                {selectedProduct.ingredients.map(ingredient => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="modal-info-cart__weight">{selectedProduct.weight}{selectedProduct.calories ? `, ккал ${selectedProduct.calories}` : ''}</p>
        </div>
      </div>

      <div className="modal-info-cart__bottom">
        <div className="add-to-cart">
          <button
            onClick={() => {
              addToCart(selectedProduct, cart, setCart);
              setModalActive(false);
              setSelectedProduct(null);
              setQuantity(1);
              setModalContent(null);
            }}
            className="add-to-cart__button"
          >
            Добавить
          </button>
          <div className="add-to-cart__counter">
            <button onClick={() => changeQuantity(quantity, -1, setQuantity, selectedProduct)}>-</button>
            <p>{selectedProduct.quantity || 0}</p>
            <button onClick={() => changeQuantity(quantity, 1, setQuantity, selectedProduct)}>+</button>
          </div>
        </div>
        <p className='modal-info-cart__price'>{selectedProduct.price}₽</p>
      </div>
    </>


  )
}