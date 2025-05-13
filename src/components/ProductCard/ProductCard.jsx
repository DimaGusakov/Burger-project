import './ProductCard.scss'

export const ProductCard = ({stateModalContent, product, stateSelectedProduct, stateModal, stateCart }) => {
  const { modalContent, setModalContent } = stateModalContent;
  const { modalActive, setModalActive } = stateModal;
  const { selectedProduct, setSelectedProduct } = stateSelectedProduct;
  const { addToCart } = stateCart;

  return (
    <div className="product-card">
      
      <img onClick={() => {
        setSelectedProduct({ ...product, quantity: 1 });
        setModalContent('product');
        setModalActive(true);
      }} src={product.image} alt={product.name} />
      <h3>{product.price}₽</h3>
      <p>{product.name}</p>
      <span>{product.weight}</span>
      <button onClick={() => addToCart(product)}>Добавить</button>
      
    </div>
  )
}




export default ProductCard;