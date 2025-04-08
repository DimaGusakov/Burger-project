import { ProductCard } from '../ProductCard/ProductCard.jsx'
import './ProductList.scss'
export default function ProductList({ navActive, stateProducts, stateModal, stateSelectedProduct }) {
  const { products, setProducts } = stateProducts;
  const productArr = products[navActive]

  return (
    <section className="product-list-container">
      <h2>{productArr.title}</h2>
      <div className="product-grid">
        {
          productArr.items.map(product => (
            <ProductCard 
              stateModal={stateModal} 
              navActive={navActive} 
              key={product.id} 
              product={product} 
              stateSelectedProduct={stateSelectedProduct}
            />
          ))
        }
      </div>
    </section>
  )
}