import './ProductCard.scss'
import  addToCart  from './helper/helper';

export const ProductCard = ({ stateModalContent, product, stateSelectedProduct, stateModal, stateCart }) => {
  const { modalContent, setModalContent } = stateModalContent;
  const { modalActive, setModalActive } = stateModal;
  const { selectedProduct, setSelectedProduct } = stateSelectedProduct;
  const { cart, setCart } = stateCart;

  return (
    <div className="product-card">
      <img onClick={() => {
        product.quantity = 1;
        setSelectedProduct(product);
        setModalContent('product');
        setModalActive(true);
      }} src={product.image} alt={product.name} />
      <h3>{product.price}₽</h3>
      <p>{product.name}</p>
      <span>{product.weight}</span>
      <button onClick={() => { 
        addToCart(product, cart, setCart)}}>Добавить</button>
    </div>
  )
}

export default ProductCard;