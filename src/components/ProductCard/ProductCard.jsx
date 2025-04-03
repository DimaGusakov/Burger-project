import './ProductCard.scss'
import addToCart from './helper/helper'

export const ProductCard = ({product, stateCart}) => {
  const {cart, setCart} = stateCart

  return (
    <div key={product.id} className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.price}₽</h3>
      <p>{product.name}</p>
      <span>{product.weight}</span>
      <button onClick={() => addToCart(product, cart, setCart)}>Добавить</button>
    </div>
  )

  
}
export default ProductCard;