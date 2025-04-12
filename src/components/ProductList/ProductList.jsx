import { ProductCard } from '../ProductCard/ProductCard.jsx'
import './ProductList.scss'
export default function ProductList({ navActive, stateProducts, stateModalContent, stateSelectedProduct, stateModal, stateCart }) {
  const { products, setProducts } = stateProducts;
  const productArr = products[navActive]
  const { modalActive, setModalActive } = stateModal;
  const { cart, setCart } = stateCart;
  const { modalContent, setModalContent } = stateModalContent;

  return (
    <section className="product-list-container">
      <h2>{productArr.title}</h2>
      <div className="product-grid">
        {
          productArr.items.map(product => (
            <ProductCard 
              stateModalContent={stateModalContent} 
              navActive={navActive} 
              key={product.id} 
              product={product} 
              stateSelectedProduct={stateSelectedProduct}
              stateModal={stateModal}
              stateCart={stateCart}
            />
          ))
        }
      </div>
    </section>
  )
}