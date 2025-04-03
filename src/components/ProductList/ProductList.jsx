import { ProductCard } from '../ProductCard/ProductCard.jsx'
import './ProductList.scss'
export default function ProductList({ navActive, stateProducts, stateCart }) {
  const {cart, setCart} = stateCart
  const { products, setProducts } = stateProducts;
  const productArr = products[navActive]


  return (
    <section className="product-list-container">
      <h2>{productArr.title}</h2>
      <div className="product-grid">
        {
          productArr.items.map(product => (
            
            <ProductCard stateCart={stateCart} key={product.id} product={product} />
          ))
        }
      </div>
    </section>
  )
}