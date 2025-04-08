import './ProductCard.scss'

export const ProductCard = ({stateModal, product, stateSelectedProduct}) => {
  const {modalActive, setModalActive} = stateModal;
  const {selectedProduct, setSelectedProduct} = stateSelectedProduct;
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.price}₽</h3>
      <p>{product.name}</p>
      <span>{product.weight}</span>
      <button onClick={() => {
        product.quantity = 1;
        setSelectedProduct(product);
        setModalActive(true);
      }}>Добавить</button>
    </div>
  )  
}

export default ProductCard;